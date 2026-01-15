from models.database import Base, engine
from models.user import User

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully.")
