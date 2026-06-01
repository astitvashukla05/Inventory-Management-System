from fastapi import HTTPException

from app.models.order import Order
from app.models.order_item import OrderItem

from app.repositories.customer_repository import CustomerRepository
from app.repositories.product_repository import ProductRepository
from app.repositories.order_repository import OrderRepository
from app.repositories.order_item_repository import OrderItemRepository


class OrderService:

    @staticmethod
    def create_order(
        db,
        data
    ):

        if not data.items:
            raise HTTPException(
                status_code=400,
                detail="Order must contain at least one item"
            )

        customer = CustomerRepository.get_by_id(
            db,
            data.customer_id
        )

        if not customer:
            raise HTTPException(
                status_code=404,
                detail="Customer not found"
            )

        total_amount = 0

        validated_products = []

        for item in data.items:

            product = ProductRepository.get_by_id(
                db,
                item.product_id
            )

            if not product:
                raise HTTPException(
                    status_code=404,
                    detail=f"Product {item.product_id} not found"
                )

            if product.quantity < item.quantity:
                raise HTTPException(
                    status_code=400,
                    detail=f"Insufficient stock for {product.name}"
                )

            subtotal = (
                product.price *
                item.quantity
            )

            total_amount += subtotal

            validated_products.append(
                {
                    "product": product,
                    "quantity": item.quantity,
                    "subtotal": subtotal
                }
            )

        order = Order(
            customer_id=data.customer_id,
            total_amount=total_amount,
            status="PENDING"
        )

        order = OrderRepository.create(
            db,
            order
        )

        for item_data in validated_products:

            product = item_data["product"]

            order_item = OrderItem(
                order_id=order.id,
                product_id=product.id,
                quantity=item_data["quantity"],
                unit_price=product.price,
                subtotal=item_data["subtotal"]
            )

            OrderItemRepository.create(
                db,
                order_item
            )

            product.quantity -= item_data["quantity"]

            ProductRepository.update(
                db,
                product
            )

        return order

    @staticmethod
    def get_all_orders(
        db
    ):
        return OrderRepository.get_all(
            db
        )

    @staticmethod
    def get_order_by_id(
        db,
        order_id: str
    ):

        order = OrderRepository.get_by_id(
            db,
            order_id
        )

        if not order:
            raise HTTPException(
                status_code=404,
                detail="Order not found"
            )

        return order

    @staticmethod
    def delete_order(
        db,
        order_id: str
    ):

        order = OrderRepository.get_by_id(
            db,
            order_id
        )

        if not order:
            raise HTTPException(
                status_code=404,
                detail="Order not found"
            )

        OrderItemRepository.delete_by_order_id(
            db,
            order_id
        )

        OrderRepository.delete(
            db,
            order
        )

        return {
            "message": "Order deleted successfully"
        }

    @staticmethod
    def update_order_status(
        db,
        order_id: str,
        data
    ):
        order = OrderRepository.get_by_id(
            db,
            order_id
        )

        if not order:
            raise HTTPException(
                status_code=404,
                detail="Order not found"
            )

        allowed_statuses = [
            "PENDING",
            "PROCESSING",
            "SHIPPED",
            "DELIVERED",
            "CANCELLED"
        ]

        if data.status not in allowed_statuses:
            raise HTTPException(
                status_code=400,
                detail="Invalid order status"
            )

        order.status = data.status

        return OrderRepository.update(
            db,
            order
        )