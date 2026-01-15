from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.database import SessionLocal
from models.user import User
from schemas.user import UserCreate, UserLogin
from passlib.context import CryptContext

router = APIRouter(prefix="/api", tags=["Users"])

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")



# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/signup/")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    # Create user
    hashed_password = pwd_context.hash(user.password)

    new_user = User(
        full_name=user.username,     # username sent from frontend means full name
        email=user.email,
        phone="",                    # React does not send phone in body
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Signup successful!"}

@router.post("/login/")
def login(user: UserLogin, db: Session = Depends(get_db)):

    username = user.username
    password = user.password

    if not username or not password:
        raise HTTPException(status_code=400, detail="Missing fields")

    # Check if user exists (matching username with full_name)
    existing_user = db.query(User).filter(User.full_name == username).first()

    if not existing_user:
        raise HTTPException(status_code=401, detail="Invalid Credentials")

    # Validate password
    if not pwd_context.verify(password, existing_user.password):
        raise HTTPException(status_code=401, detail="Invalid Credentials")

    return {
        "message": "Login Successful ✅",
        "username": existing_user.full_name
    }