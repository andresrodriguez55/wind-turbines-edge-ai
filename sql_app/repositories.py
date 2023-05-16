from sqlalchemy.orm import Session, subqueryload
from . import models, schemas

class HistoryRepo:
  def __init__(self, db: Session):
    self.db = db

  @staticmethod
  async def create(db: Session, history: schemas.HistoryCreate):
    db_history = models.History(**history.dict())

    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    return db_history