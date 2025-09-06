from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas import UserCreate, UserOut, UserBase
from app.models import User
from app.database import get_db
from app.auth import get_password_hash, verify_password, create_access_token, get_current_user
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter((User.email == user.email) | (User.username == user.username)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email or username already registered")
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, username=user.username, password_hash=hashed_password, avatar_url=user.avatar_url, bio=user.bio)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    access_token = create_access_token({"sub": str(user.user_id)})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=UserOut)
def update_me(user_update: UserBase, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    current_user.username = user_update.username or current_user.username
    current_user.avatar_url = user_update.avatar_url or current_user.avatar_url
    current_user.bio = user_update.bio or current_user.bio
    db.commit()
    db.refresh(current_user)
    return current_user
