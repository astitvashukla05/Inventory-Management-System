from fastapi import FastAPI

from app.api.product_router import router as product_router
from app.api.customer_router import router as customer_router
from app.api.order_router import router as order_router

app = FastAPI(
    title="Inventory Management API",
    version="1.0.0"
)

app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)
@app.get("/")
def root():
    return {
        "message": "Inventory Management API Running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }