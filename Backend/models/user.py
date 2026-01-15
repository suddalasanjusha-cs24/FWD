from sqlalchemy import Column, Integer, String
from models.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255))
    email = Column(String(255), unique=True, index=True)
    phone = Column(String(20))
    password = Column(String(255))
