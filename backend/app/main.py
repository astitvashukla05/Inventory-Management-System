from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.product_router import router as product_router
from app.api.customer_router import router as customer_router
from app.api.order_router import router as order_router
from app.api.auth_router import router as auth_router


app = FastAPI(
    title="Inventory Management API",
    version="1.0.0"
)


# CORS CONFIGURATION
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(auth_router)


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