from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2

POSTGRE_DATABASE_URL = "postgresql://edgeai_user:XRDdUauaMxVLJh757NXpxxBTxHewbXAz@dpg-chh65ve4dadbuda75d4g-a.frankfurt-postgres.render.com/edgeai"
# SQLITE_DATABASE_URL = "sqlite:///./data.db"

engine = create_engine(POSTGRE_DATABASE_URL, 
                       echo=True)
                      # connect_args={"check_same_thread": False},
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency
def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()
