from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import seat as seat_model
from schemas import seat as seat_schema
from models.database import get_db

router = APIRouter(prefix="/seats", tags=["Seats"])

@router.get("/{flight_id}", response_model=list[seat_schema.SeatOut])
def get_seats(flight_id: int, db: Session = Depends(get_db)):
    return db.query(seat_model.Seat).filter(seat_model.Seat.flight_id == flight_id).all()

""" @router.post("/book", response_model=seat_schema.SeatOut)
def book_seat(seat: seat_schema.SeatBook, db: Session = Depends(get_db)):

    print("========Incoming seat booking request:")
    print(str(seat.flight_id))
    
    db_seat = db.query(seat_model.Seat).filter(
        seat_model.Seat.flight_id == seat.flight_id,
        seat_model.Seat.seat_number == seat.seat_number
    ).first()

    # if not db_seat:
    #     raise HTTPException(status_code=404, detail="Seat not found")

    if db_seat.is_booked:
        raise HTTPException(status_code=400, detail="Seat already booked")

    db_seat.is_booked = True
    if seat.passenger_id:
        db_seat.passenger_id = seat.passenger_id

    db.commit()
    db.refresh(db_seat)
    return db_seat
 """

@router.post("/book", response_model=seat_schema.SeatOut)
def book_seat(seat: seat_schema.SeatBook, db: Session = Depends(get_db)):

    print("======== Incoming seat booking request ========")
    print("Flight ID:", seat.flight_id)
    print("Seat Number:", seat.seat_number)
    print("Passenger ID:", seat.passenger_id)

    # 1️⃣ Find existing seat
    db_seat = db.query(seat_model.Seat).filter(
        seat_model.Seat.flight_id == seat.flight_id,
        seat_model.Seat.seat_number == seat.seat_number
    ).first()

    # 2️⃣ If seat NOT found -> CREATE seat first
    if not db_seat:
        print("Seat not found — creating new seat in DB")
        db_seat = seat_model.Seat(
            flight_id=seat.flight_id,
            seat_number=seat.seat_number,
            is_booked=False,
            passenger_id=None
        )
        db.add(db_seat)
        db.commit()
        db.refresh(db_seat)

    # 3️⃣ If already booked — reject
    if db_seat.is_booked:
        raise HTTPException(status_code=400, detail="Seat already booked")

    # 4️⃣ Mark seat booked
    db_seat.is_booked = True
    if seat.passenger_id:
        db_seat.passenger_id = seat.passenger_id

    db.commit()
    db.refresh(db_seat)
    print("Seat successfully booked!")

    return db_seat
