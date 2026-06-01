from fastapi import FastAPI

app = FastAPI(
    title="Inventory Management API",
    version="1.0.0"
)

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
    