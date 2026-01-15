from sqlalchemy import Column, Integer, String, Float, Date
from sqlalchemy.orm import relationship
from models.database import Base

class Flight(Base):
    __tablename__ = "flights"

    id = Column(Integer, primary_key=True, index=True)
    flight_number = Column(String(20), unique=True, index=True, nullable=False)
    source = Column(String(50), nullable=False)
    destination = Column(String(50), nullable=False)
    departure_date = Column(Date, nullable=False)
    return_date = Column(Date, nullable=True)
    airline = Column(String(50), nullable=False)
    price = Column(Float, nullable=False)
    travel_class = Column(String(20), nullable=False)   # Economy / Business / First
    seats_available = Column(Integer, nullable=False)


    seats = relationship("Seat", back_populates="flight")
