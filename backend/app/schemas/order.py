from enum import Enum

from pydantic import BaseModel
from pydantic import Field


class OrderStatus(str, Enum):
    PENDING = "PENDING"
    PROCESSING = "PROCESSING"
    SHIPPED = "SHIPPED"
    DELIVERED = "DELIVERED"
    CANCELLED = "CANCELLED"


class OrderItemCreate(BaseModel):
    product_id: str
    quantity: int = Field(gt=0)


class OrderCreate(BaseModel):
    customer_id: str
    items: list[OrderItemCreate]


class OrderUpdate(BaseModel):
    status: OrderStatus


class OrderItemResponse(BaseModel):
    id: str
    product_id: str
    quantity: int
    unit_price: float
    subtotal: float

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: str
    customer_id: str
    total_amount: float
    status: OrderStatus
    items: list[OrderItemResponse] = []

    class Config:
        from_attributes = True