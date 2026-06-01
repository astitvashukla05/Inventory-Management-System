from sqlalchemy.orm import Session

from app.models.order_item import OrderItem


class OrderItemRepository:

    @staticmethod
    def create(
        db: Session,
        item: OrderItem
    ):
        db.add(item)
        db.commit()
        db.refresh(item)

        return item

    @staticmethod
    def get_by_order_id(
        db: Session,
        order_id: str
    ):
        return (
            db.query(OrderItem)
            .filter(
                OrderItem.order_id == order_id
            )
            .all()
        )

    @staticmethod
    def delete_by_order_id(
        db: Session,
        order_id: str
    ):
        (
            db.query(OrderItem)
            .filter(
                OrderItem.order_id == order_id
            )
            .delete()
        )

        db.commit()