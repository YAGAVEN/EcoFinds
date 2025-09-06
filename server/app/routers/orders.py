from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.models import Cart, CartItem, Order, OrderItem, Product
from app.schemas import OrderOut
from app.database import get_db
from app.auth import get_current_user
from app.models import User

router = APIRouter()

@router.post("/checkout")
def checkout(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    cart = db.query(Cart).filter(Cart.user_id == current_user.user_id).first()
    if not cart or not cart.items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    total = 0.0
    order = Order(user_id=current_user.user_id, total_price=0)
    db.add(order)
    db.commit()
    db.refresh(order)

    for item in cart.items:
        product = db.query(Product).filter(Product.product_id == item.product_id).first()
        if not product:
            continue
        total += float(product.price) * item.quantity
        order_item = OrderItem(order_id=order.order_id, product_id=product.product_id, title=product.title, price=product.price, quantity=item.quantity)
        db.add(order_item)

    order.total_price = total
    # Clear cart items
    db.query(CartItem).filter(CartItem.cart_id == cart.cart_id).delete()
    db.commit()
    return {"message": "Order placed", "order_id": order.order_id, "total": total}

@router.get("/my", response_model=List[OrderOut])
def get_my_orders(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Order).filter(Order.user_id == current_user.user_id).all()
