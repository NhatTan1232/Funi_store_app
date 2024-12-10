from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = (
   "postgresql://postgres:pray4HN<3@localhost:5432/home_essence" # Replace with local host's database URL
 #   "postgresql://postgres:3000@localhost:5432/home_essence" # Replace with local host's database URL
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
