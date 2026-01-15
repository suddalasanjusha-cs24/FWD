from pydantic import BaseModel

class SeatBase(BaseModel):
    seat_number: str
    flight_id: int
    is_booked: bool | None = False
    passenger_id: int | None = None

class SeatOut(SeatBase):
    id: int

    class Config:
        orm_mode = True

class SeatBook(BaseModel):
    flight_id: int
    seat_number: str
    passenger_id: int | None = None
