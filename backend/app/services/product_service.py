from fastapi import HTTPException

from app.models.product import Product
from app.repositories.product_repository import ProductRepository


class ProductService:

    @staticmethod
    def create_product(db, data):
        print("Service Called")
        existing = ProductRepository.get_by_sku(
            db,
            data.sku
        )

        if existing:
            raise HTTPException(
                status_code=400,
                detail="SKU already exists"
            )

        product = Product(
            name=data.name,
            sku=data.sku,
            price=data.price,
            quantity=data.quantity
        )
        print(product)
        return ProductRepository.create(
            db,
            product
        )

    @staticmethod
    def get_all_products(db):

        return ProductRepository.get_all(
            db
        )

    @staticmethod
    def get_product_by_id(
        db,
        product_id: str
    ):

        product = ProductRepository.get_by_id(
            db,
            product_id
        )

        if not product:
            raise HTTPException(
                status_code=404,
                detail="Product not found"
            )

        return product

    @staticmethod
    def update_product(
        db,
        product_id: str,
        data
    ):

        product = ProductRepository.get_by_id(
            db,
            product_id
        )

        if not product:
            raise HTTPException(
                status_code=404,
                detail="Product not found"
            )

        if data.name is not None:
            product.name = data.name

        if data.sku is not None:
            existing = ProductRepository.get_by_sku(
                db,
                data.sku
            )

            if existing and existing.id != product.id:
                raise HTTPException(
                    status_code=400,
                    detail="SKU already exists"
                )

            product.sku = data.sku

        if data.price is not None:
            product.price = data.price

        if data.quantity is not None:
            product.quantity = data.quantity

        return ProductRepository.update(
            db,
            product
        )

    @staticmethod
    def delete_product(
        db,
        product_id: str
    ):

        product = ProductRepository.get_by_id(
            db,
            product_id
        )

        if not product:
            raise HTTPException(
                status_code=404,
                detail="Product not found"
            )

        ProductRepository.delete(
            db,
            product
        )

        return {
            "message": "Product deleted successfully"
        }