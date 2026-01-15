from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Seat(Base):
    __tablename__ = "seats"

    id = Column(Integer, primary_key=True, index=True)
    seat_number = Column(String, nullable=False)
    flight_id = Column(Integer, ForeignKey("flights.id"), nullable=False)
    passenger_id = Column(Integer, ForeignKey("passengers.id"), nullable=True)
    is_booked = Column(Boolean, default=False)

    passenger = relationship("Passenger", back_populates="seats")
    flight = relationship("Flight", back_populates="seats")
