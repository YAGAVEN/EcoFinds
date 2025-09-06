from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.models import Cart, CartItem, Product
from app.schemas import CartOut, CartItemOut
from app.database import get_db
from app.auth import get_current_user
from app.models import User

router = APIRouter()

@router.get("/", response_model=CartOut)
def get_cart(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    cart = db.query(Cart).filter(Cart.user_id == current_user.user_id).first()
    if not cart:
        cart = Cart(user_id=current_user.user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    
    # Get cart items with product details
    cart_items = db.query(CartItem).filter(CartItem.cart_id == cart.cart_id).all()
    
    # Create response with cart_items including product details
    cart_items_with_products = []
    for item in cart_items:
        product = db.query(Product).filter(Product.product_id == item.product_id).first()
        cart_items_with_products.append({
            "cart_item_id": item.cart_item_id,
            "product_id": item.product_id,
            "quantity": item.quantity,
            "product": product
        })
    
    return {
        "cart_id": cart.cart_id,
        "cart_items": cart_items_with_products
    }

@router.post("/add/{product_id}")
def add_to_cart(product_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    cart = db.query(Cart).filter(Cart.user_id == current_user.user_id).first()
    if not cart:
        cart = Cart(user_id=current_user.user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    cart_item = db.query(CartItem).filter(CartItem.cart_id == cart.cart_id, CartItem.product_id == product_id).first()
    if cart_item:
        cart_item.quantity += 1
    else:
        cart_item = CartItem(cart_id=cart.cart_id, product_id=product_id, quantity=1)
        db.add(cart_item)
    db.commit()
    return {"message": "Product added to cart"}

@router.post("/remove/{product_id}")
def remove_from_cart(product_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    cart = db.query(Cart).filter(Cart.user_id == current_user.user_id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    cart_item = db.query(CartItem).filter(CartItem.cart_id == cart.cart_id, CartItem.product_id == product_id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Product not in cart")
    db.delete(cart_item)
    db.commit()
    return {"message": "Product removed from cart"}
