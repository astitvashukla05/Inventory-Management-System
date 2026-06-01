from fastapi import FastAPI

from app.api.product_router import router as product_router

app = FastAPI(
    title="Inventory Management API",
    version="1.0.0"
)

app.include_router(product_router)


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