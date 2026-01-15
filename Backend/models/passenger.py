from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from models.database import Base

class Passenger(Base):
    __tablename__ = "passengers"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String(10), nullable=False)
    passport_number = Column(String(50), nullable=True)
    email = Column(String(255), nullable=True)
    phone = Column(String(20), nullable=True)
    # Add more fields as needed (e.g., address, nationality)

    seats = relationship("Seat", back_populates="passenger")

