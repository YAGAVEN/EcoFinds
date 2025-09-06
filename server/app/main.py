from fastapi import FastAPI
from app.database import Base, engine
from app.routers import users, products, categories, cart, orders

app = FastAPI(title="EcoFinds API")

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(products.router, prefix="/products", tags=["Products"])
app.include_router(categories.router, prefix="/categories", tags=["Categories"])
app.include_router(cart.router, prefix="/cart", tags=["Cart"])
app.include_router(orders.router, prefix="/orders", tags=["Orders"])

@app.get("/")
def root():
    return {"message": "EcoFinds API connected to MySQL successfully!"}
