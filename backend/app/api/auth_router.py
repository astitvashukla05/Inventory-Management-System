from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.core.dependencies import get_current_user
from app.schemas.auth import (
    UserRegister,
    UserResponse
)
from app.schemas.auth import UserLogin
from app.schemas.auth import TokenResponse
from app.services.auth_service import AuthService


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201
)
def register(
    payload: UserRegister,
    db: Session = Depends(get_db)
):
    return AuthService.register(
        db,
        payload
    )
@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    payload: UserLogin,
    db: Session = Depends(get_db)
):
    return AuthService.login(
        db,
        payload
    )
@router.get(
    "/me"
)
def get_me(
    current_user = Depends(
        get_current_user
    )
):
    return current_user