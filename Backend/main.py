from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import flight
from routers import users   # adjust if paths differ
from routers import passenger  # add this import
from routers import seat  # import seat router
from routers.email import router as email_router
from models.database import Base, engine
from models.flight import Flight

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# include routers
app.include_router(users.router)
app.include_router(flight.router)
app.include_router(passenger.router)  # add this line after other routers
app.include_router(seat.router)  # register seat router
app.include_router(email_router)