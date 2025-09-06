from app.database import Base, engine
from . import models


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

#auth.py
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_pw = pwd_context.hash(user.password)
    db_user = User(email=user.email, password_hash=hashed_pw, username=user.username)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not pwd_context.verify(user.password, db_user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token = create_access_token({"sub": str(db_user.user_id)}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=schemas.UserOut)
def get_my_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=schemas.UserOut)
def update_my_profile(user_update: schemas.UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    current_user.username = user_update.username or current_user.username
    current_user.avatar_url = user_update.avatar_url or current_user.avatar_url
    current_user.bio = user_update.bio or current_user.bio
    db.commit()
    db.refresh(current_user)
    return current_user
@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(...).all()

@router.post("/", response_model=ProductOut)
def create_product(product: ProductCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_product = Product(**product.dict(), owner_id=current_user.user_id)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@router.get("/", response_model=List[ProductOut])
def list_products(db: Session = Depends(get_db)):
    return db.query(Product).all()

@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.product_id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/{product_id}", response_model=ProductOut)
def update_product(product_id: int, updated: ProductCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    product = db.query(Product).filter(Product.product_id == product_id, Product.owner_id == current_user.user_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found or not yours")

    for key, value in updated.dict().items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    product = db.query(Product).filter(Product.product_id == product_id, Product.owner_id == current_user.user_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found or not yours")

    db.delete(product)
    db.commit()
    return {"detail": "Product deleted"}

@router.post("/checkout")
def checkout(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    cart = db.query(Cart).filter(Cart.user_id == current_user.user_id).first()
    if not cart or not cart.items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total = 0
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
    db.query(CartItem).filter(CartItem.cart_id == cart.cart_id).delete()
    db.commit()
    return {"message": "Order placed", "order_id": order.order_id, "total": total}

@router.get("/my", response_model=list[schemas.OrderOut])
def get_my_orders(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Order).filter(Order.user_id == current_user.user_id).all()


@router.post("/", response_model=CategoryOut)
def create_category(category: CategoryBase, db: Session = Depends(get_db)):
    db_cat = Category(**category.dict())
    db.add(db_cat)
    db.commit()
    db.refresh(db_cat)
    return db_cat

@router.get("/", response_model=List[CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()

@router.get("/", response_model=schemas.CartOut)
def get_cart(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    cart = db.query(Cart).filter(Cart.user_id == current_user.user_id).first()
    if not cart:
        cart = Cart(user_id=current_user.user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    return cart

@router.post("/add/{product_id}")
def add_to_cart(product_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    cart = db.query(Cart).filter(Cart.user_id == current_user.user_id).first()
    if not cart:
        cart = Cart(user_id=current_user.user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    item = db.query(CartItem).filter(CartItem.cart_id == cart.cart_id, CartItem.product_id == product_id).first()
    if item:
        item.quantity += 1
    else:
        new_item = CartItem(cart_id=cart.cart_id, product_id=product_id, quantity=1)
        db.add(new_item)
    db.commit()
    return {"message": "Added to cart"}
