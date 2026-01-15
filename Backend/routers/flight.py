from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.database import SessionLocal
from models.flight import Flight
from schemas.flights import FlightCreate, FlightOut,FlightSearch
from typing import List

router = APIRouter(prefix="/api/flights", tags=["Flight"])

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/add/", response_model=FlightOut)
def add_flight(flight: FlightCreate, db: Session = Depends(get_db)):


    existing = db.query(Flight).filter(Flight.flight_number == flight.flight_number).first()
    if existing:
        raise HTTPException(status_code=400, detail="Flight already exists")

    new_flight = Flight(
        flight_number=flight.flight_number,
        source=flight.source,
        destination=flight.destination,
        departure_date=flight.departure_date,
        return_date=flight.return_date,
        airline=flight.airline,
        price=flight.price,
        travel_class=flight.travel_class,
        seats_available=flight.seats_available
    )

    db.add(new_flight)
    db.commit()
    db.refresh(new_flight)

    return new_flight

@router.post("/search", response_model=List[FlightOut])
def search_flights(query: FlightSearch, db: Session = Depends(get_db)):
    flights = db.query(Flight).filter(
        Flight.source == query.source,
        Flight.destination == query.destination,
        Flight.departure_date == query.departure_date
    ).all()

    if not flights:
        raise HTTPException(status_code=404, detail="No flights found")

    return flights
