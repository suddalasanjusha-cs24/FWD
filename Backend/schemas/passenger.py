from pydantic import BaseModel, EmailStr
from typing import Optional

class PassengerCreate(BaseModel):
    full_name: str
    age: int
    gender: str
    passport_number: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None

class PassengerOut(BaseModel):
    id: int
    full_name: str
    age: int
    gender: str
    passport_number: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None

    class Config:
        orm_mode = True
