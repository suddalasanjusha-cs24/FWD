from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import passenger as passenger_model
from schemas import passenger as passenger_schema
from models.database import get_db

router = APIRouter(
    prefix="/passengers",
    tags=["passengers"]
)

@router.post("/", response_model=passenger_schema.PassengerOut)
def create_passenger(passenger: passenger_schema.PassengerCreate, db: Session = Depends(get_db)):
    db_passenger = passenger_model.Passenger(**passenger.dict())
    db.add(db_passenger)
    db.commit()
    db.refresh(db_passenger)
    return db_passenger
