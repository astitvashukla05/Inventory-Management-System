from fastapi import HTTPException

from app.models.customer import Customer
from app.repositories.customer_repository import CustomerRepository


class CustomerService:

    @staticmethod
    def create_customer(
        db,
        data
    ):
        existing = CustomerRepository.get_by_email(
            db,
            data.email
        )

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Email already exists"
            )

        customer = Customer(
            full_name=data.full_name,
            email=data.email,
            phone=data.phone
        )

        return CustomerRepository.create(
            db,
            customer
        )

    @staticmethod
    def get_all_customers(db):
        return CustomerRepository.get_all(
            db
        )

    @staticmethod
    def get_customer_by_id(
        db,
        customer_id: str
    ):
        customer = CustomerRepository.get_by_id(
            db,
            customer_id
        )

        if not customer:
            raise HTTPException(
                status_code=404,
                detail="Customer not found"
            )

        return customer

    @staticmethod
    def delete_customer(
        db,
        customer_id: str
    ):
        customer = CustomerRepository.get_by_id(
            db,
            customer_id
        )

        if not customer:
            raise HTTPException(
                status_code=404,
                detail="Customer not found"
            )

        CustomerRepository.delete(
            db,
            customer
        )

        return {
            "message": "Customer deleted successfully"
        }
    @staticmethod
    def update_customer(
    db,
    customer_id: str,
    data
):


     customer = CustomerRepository.get_by_id(
        db,
        customer_id
    )

     if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

     if data.full_name is not None:
        customer.full_name = data.full_name

     if data.email is not None:

        existing = CustomerRepository.get_by_email(
            db,
            data.email
        )

        if existing and existing.id != customer.id:
            raise HTTPException(
                status_code=400,
                detail="Email already exists"
            )

        customer.email = data.email

     if data.phone is not None:
        customer.phone = data.phone

     return CustomerRepository.update(
        db,
        customer
    )