import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Make sure your .env file exists in Backend/ with DATABASE_URL
DB_URL = os.getenv("DATABASE_URL")

if not DB_URL:
    raise ValueError("DATABASE_URL not found in .env file")
