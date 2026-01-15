from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config import DB_URL

# Create engine
engine = create_engine(DB_URL)

# SessionLocal
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Base class for models
Base = declarative_base()

# Dependency to get DB session
from sqlalchemy.orm import Session
from typing import Generator

def get_db() -> Generator[Session, None, None]:
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()
