from pydantic import BaseModel, Field


class ProductCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    sku: str = Field(min_length=1, max_length=100)
    price: float = Field(gt=0)
    quantity: int = Field(ge=0)


class ProductUpdate(BaseModel):
    name: str | None = None
    sku: str | None = None
    price: float | None = None
    quantity: int | None = None


class ProductResponse(BaseModel):
    id: str
    name: str
    sku: str
    price: float
    quantity: int

    class Config:
        from_attributes = True