from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.order import (
    OrderCreate,
    OrderUpdate,
    OrderResponse
)

from app.services.order_service import OrderService

from app.core.permissions import require_admin
from app.core.dependencies import get_current_user


router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.post(
    "",
    response_model=OrderResponse,
    status_code=201
)
def create_order(
    payload: OrderCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return OrderService.create_order(
        db,
        payload
    )


@router.get(
    "",
    response_model=list[OrderResponse]
)
def get_orders(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return OrderService.get_all_orders(
        db
    )


@router.get(
    "/{order_id}",
    response_model=OrderResponse
)
def get_order(
    order_id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return OrderService.get_order_by_id(
        db,
        order_id
    )


@router.put(
    "/{order_id}",
    response_model=OrderResponse
)
def update_order(
    order_id: str,
    payload: OrderUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return OrderService.update_order_status(
        db,
        order_id,
        payload
    )


@router.delete(
    "/{order_id}"
)
def delete_order(
    order_id: str,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return OrderService.delete_order(
        db,
        order_id
    )