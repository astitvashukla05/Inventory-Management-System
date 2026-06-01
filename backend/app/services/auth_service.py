from fastapi import HTTPException
from passlib.context import CryptContext

from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.core.security import create_access_token

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


class AuthService:

    @staticmethod
    def register(
        db,
        data
    ):
        existing_username = (
            UserRepository.get_by_username(
                db,
                data.username
            )
        )

        if existing_username:
            raise HTTPException(
                status_code=400,
                detail="Username already exists"
            )

        existing_email = (
            UserRepository.get_by_email(
                db,
                data.email
            )
        )

        if existing_email:
            raise HTTPException(
                status_code=400,
                detail="Email already exists"
            )

        hashed_password = (
            pwd_context.hash(
                data.password
            )
        )

        user = User(
            username=data.username,
            email=data.email,
            hashed_password=hashed_password,
            role="USER"
        )

        return UserRepository.create(
            db,
            user
            )
    @staticmethod
    def login(
        db,
        data
    ):
        user = UserRepository.get_by_email(
            db,
            data.email
        )

        if not user:
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )

        if not pwd_context.verify(
            data.password,
            user.hashed_password
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )

        token = create_access_token(
            {
                "sub": user.email,
                "role": user.role
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer"
        }