from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.product import ProductCreate
from app.schemas.product import ProductResponse
from app.services.product_service import ProductService
from app.schemas.product import ProductUpdate

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post(
    "",
    response_model=ProductResponse,
    status_code=201
)
def create_product(
    payload: ProductCreate,
    db: Session = Depends(get_db)
):
    return ProductService.create_product(
        db,
        payload
    )


@router.get(
    "",
    response_model=list[ProductResponse]
)
def get_products(
    db: Session = Depends(get_db)
):
    return ProductService.get_all_products(db)


@router.get(
    "/{product_id}",
    response_model=ProductResponse
)
def get_product(
    product_id: str,
    db: Session = Depends(get_db)
):
    return ProductService.get_product_by_id(
        db,
        product_id
    )

@router.put(
    "/{product_id}",
    response_model=ProductResponse
)
def update_product(
    product_id: str,
    payload: ProductUpdate,
    db: Session = Depends(get_db)
):
    return ProductService.update_product(
        db,
        product_id,
        payload
    )
@router.delete(
    "/{product_id}"
)
def delete_product(
    product_id: str,
    db: Session = Depends(get_db)
):
    return ProductService.delete_product(
        db,
        product_id
    )