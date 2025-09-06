from pydantic import BaseModel, EmailStr
from typing import Optional, List
from decimal import Decimal
from datetime import datetime
from enum import Enum


# ------------ ENUMS (same as your DB Enums) ------------
class ProductStatus(str, Enum):
    active = "active"
    inactive = "inactive"

class OrderStatus(str, Enum):
    pending = "pending"
    completed = "completed"
    cancelled = "cancelled"


# ------------ USER SCHEMAS ------------
class UserBase(BaseModel):
    email: EmailStr
    username: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    user_id: int
    created_at: datetime

    class Config:
        orm_mode = True


# ------------ CATEGORY SCHEMAS ------------
class CategoryBase(BaseModel):
    name: str
    slug: str

class CategoryOut(CategoryBase):
    category_id: int

    class Config:
        orm_mode = True


# ------------ PRODUCT SCHEMAS ------------
class ProductBase(BaseModel):
    title: str
    description: Optional[str] = None
    category_id: int
    price: Decimal
    image_url: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    product_id: int
    owner_id: int
    status: ProductStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


# ------------ CART SCHEMAS ------------
class CartItemBase(BaseModel):
    product_id: int
    quantity: int = 1

class CartItemOut(CartItemBase):
    cart_item_id: int

    class Config:
        orm_mode = True

class CartOut(BaseModel):
    cart_id: int
    items: List[CartItemOut] = []

    class Config:
        orm_mode = True


# ------------ ORDER SCHEMAS ------------
class OrderItemBase(BaseModel):
    product_id: int
    title: str
    price: Decimal
    quantity: int

class OrderItemOut(OrderItemBase):
    order_item_id: int

    class Config:
        orm_mode = True

class OrderOut(BaseModel):
    order_id: int
    total_price: Decimal
    status: OrderStatus
    created_at: datetime
    items: List[OrderItemOut]

    class Config:
        orm_mode = True
