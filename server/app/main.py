from fastapi import FastAPI
from app.database import Base, engine

# Import models so Base.metadata can see them
from app import models

app = FastAPI(title="EcoFinds API")

@app.on_event("startup")
def startup():
    # Create all tables
    Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "EcoFinds API connected to MySQL successfully!"}
