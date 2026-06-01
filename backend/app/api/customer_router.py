from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.customer import CustomerCreate
from app.schemas.customer import CustomerResponse
from app.services.customer_service import CustomerService
from app.schemas.customer import CustomerUpdate

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


@router.post(
    "",
    response_model=CustomerResponse,
    status_code=201
)
def create_customer(
    payload: CustomerCreate,
    db: Session = Depends(get_db)
):
    return CustomerService.create_customer(
        db,
        payload
    )


@router.get(
    "",
    response_model=list[CustomerResponse]
)
def get_customers(
    db: Session = Depends(get_db)
):
    return CustomerService.get_all_customers(
        db
    )


@router.get(
    "/{customer_id}",
    response_model=CustomerResponse
)
def get_customer(
    customer_id: str,
    db: Session = Depends(get_db)
):
    return CustomerService.get_customer_by_id(
        db,
        customer_id
    )


@router.delete(
    "/{customer_id}"
)
def delete_customer(
    customer_id: str,
    db: Session = Depends(get_db)
):
    return CustomerService.delete_customer(
        db,
        customer_id
    )
    
@router.put(
    "/{customer_id}",
    response_model=CustomerResponse
)
def update_customer(
    customer_id: str,
    payload: CustomerUpdate,
    db: Session = Depends(get_db)
):
    return CustomerService.update_customer(
        db,
        customer_id,
        payload
    )