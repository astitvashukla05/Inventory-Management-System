from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import Field


class CustomerCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    phone: str = Field(min_length=10, max_length=20)


class CustomerUpdate(BaseModel):
    full_name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None


class CustomerResponse(BaseModel):
    id: str
    full_name: str
    email: str
    phone: str

    class Config:
        from_attributes = True