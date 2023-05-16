from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import JSONResponse
from sql_app import models
from db import get_db, engine
import sql_app.models as models
import sql_app.schemas as schemas
from sql_app.repositories import HistoryRepo
from sqlalchemy.orm import Session
import uvicorn
from typing import List, Optional
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse

app = FastAPI(
  title="Wind Turbines API",
  description="Wind Turbines API with Swagger and Sqlalchemy",
  version="1.0.0",
)

origins = ["*"]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

@app.exception_handler(Exception)
def validation_exception_handler(request, err):
  base_error_message = f"Failed to execute: {request.method}: {request.url}"
  return JSONResponse(
    status_code=400,
    content={"message": f"{base_error_message}. Detail: {err}"})

@app.post('/histories',
          tags=["History"],
          response_model=schemas.History,
          status_code=201)
async def create_history(history_request: schemas.HistoryCreate,
                         db: Session = Depends(get_db)):
  return await HistoryRepo.create(db=db, history=history_request) 

if __name__ == "__main__":
  uvicorn.run(app, host="0.0.0.0", port=8081)
  # uvicorn.run("main:app", port=9000, reload=True)