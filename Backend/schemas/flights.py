from pydantic import BaseModel
from datetime import date

class FlightCreate(BaseModel):
    flight_number: str
    source: str
    destination: str
    departure_date: date
    return_date: date | None = None
    airline: str
    price: float
    travel_class: str
    seats_available: int

class FlightOut(BaseModel):
    id: int
    flight_number: str
    source: str
    destination: str
    departure_date: date
    return_date: date | None
    airline: str
    price: float
    travel_class: str
    seats_available: int   # include if needed

    class Config:
        orm_mode = True  # ✅ This must be inside the model

class FlightSearch(BaseModel):
    source: str
    destination: str
    departure_date: date
    travel_class: str
    passengers: int
