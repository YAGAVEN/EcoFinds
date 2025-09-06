from fastapi import FastAPI
from app.database import Base, engine
from app.routers import users, products, categories, cart, orders
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="EcoFinds API")
origins = [
    "http://localhost",
    "http://localhost:3000",  # React dev server default port
    "http://127.0.0.1:3000",
    # Add your frontend domain here in production
]

# from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your frontend url
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
