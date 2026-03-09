from datetime import datetime, timedelta
from typing import Optional

from fastapi import (
    Depends,
    FastAPI,
    File,
    HTTPException,
    UploadFile,
    status,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from sqlalchemy import Column, Integer, String, Float, ForeignKey, create_engine, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, relationship, sessionmaker


DATABASE_URL = "sqlite:///./fitflow.db"
SECRET_KEY = "CHANGE_ME_TO_A_SECURE_RANDOM_SECRET"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


class User(Base):
  __tablename__ = "users"
  id = Column(Integer, primary_key=True, index=True)
  name = Column(String, nullable=False)
  email = Column(String, unique=True, index=True, nullable=False)
  hashed_password = Column(String, nullable=False)

  profile = relationship("Profile", back_populates="user", uselist=False)


class Profile(Base):
  __tablename__ = "profiles"
  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  age = Column(Integer, nullable=True)
  weight = Column(Float, nullable=True)
  goal = Column(String, nullable=True)
  fitness_level = Column(String, nullable=True)
  medical_condition = Column(String, nullable=True)

  user = relationship("User", back_populates="profile")
  __table_args__ = (UniqueConstraint("user_id", name="uq_profiles_user_id"),)


Base.metadata.create_all(bind=engine)


def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()


def get_password_hash(password: str) -> str:
  return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
  return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
  to_encode = data.copy()
  expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
  to_encode.update({"exp": expire})
  encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
  return encoded_jwt


class TokenResponse(BaseModel):
  access_token: str
  token_type: str = "bearer"
  name: str
  email: EmailStr


class SignupRequest(BaseModel):
  name: str
  email: EmailStr
  password: str


class LoginRequest(BaseModel):
  email: EmailStr
  password: str


class ProfileIn(BaseModel):
  age: Optional[int] = None
  weight: Optional[float] = None
  goal: Optional[str] = None
  fitness_level: Optional[str] = None
  medical_condition: Optional[str] = None


class ProfileOut(ProfileIn):
  email: EmailStr
  name: str


def get_user_by_email(db: Session, email: str) -> Optional[User]:
  return db.query(User).filter(User.email == email).first()


def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> User:
  credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
  )
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    email: str = payload.get("sub")
    if email is None:
      raise credentials_exception
  except JWTError:
    raise credentials_exception

  user = get_user_by_email(db, email=email)
  if user is None:
    raise credentials_exception
  return user


app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


@app.get("/")
def root():
  return {"message": "FitFlow API running"}


@app.post("/signup", response_model=TokenResponse)
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
  existing = get_user_by_email(db, payload.email)
  if existing:
    raise HTTPException(status_code=400, detail="Email already registered")

  user = User(
    name=payload.name.strip(),
    email=payload.email.lower(),
    hashed_password=get_password_hash(payload.password),
  )
  db.add(user)
  db.commit()
  db.refresh(user)

  # Create empty profile row for convenience
  profile = Profile(user_id=user.id)
  db.add(profile)
  db.commit()

  access_token = create_access_token({"sub": user.email})
  return TokenResponse(access_token=access_token, name=user.name, email=user.email)


@app.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
  user = get_user_by_email(db, payload.email.lower())
  if not user or not verify_password(payload.password, user.hashed_password):
    raise HTTPException(status_code=401, detail="Invalid email or password")

  access_token = create_access_token({"sub": user.email})
  return TokenResponse(access_token=access_token, name=user.name, email=user.email)


@app.get("/profile", response_model=ProfileOut)
def get_profile(
  current_user: User = Depends(get_current_user),
  db: Session = Depends(get_db),
):
  profile = (
    db.query(Profile)
    .filter(Profile.user_id == current_user.id)
    .first()
  )
  if not profile:
    profile = Profile(user_id=current_user.id)
    db.add(profile)
    db.commit()
    db.refresh(profile)

  return ProfileOut(
    age=profile.age,
    weight=profile.weight,
    goal=profile.goal,
    fitness_level=profile.fitness_level,
    medical_condition=profile.medical_condition,
    email=current_user.email,
    name=current_user.name,
  )


@app.post("/profile", response_model=ProfileOut)
def update_profile(
  payload: ProfileIn,
  current_user: User = Depends(get_current_user),
  db: Session = Depends(get_db),
):
  profile = (
    db.query(Profile)
    .filter(Profile.user_id == current_user.id)
    .first()
  )
  if not profile:
    profile = Profile(user_id=current_user.id)
    db.add(profile)

  profile.age = payload.age
  profile.weight = payload.weight
  profile.goal = payload.goal
  profile.fitness_level = payload.fitness_level
  profile.medical_condition = payload.medical_condition

  db.commit()
  db.refresh(profile)

  return ProfileOut(
    age=profile.age,
    weight=profile.weight,
    goal=profile.goal,
    fitness_level=profile.fitness_level,
    medical_condition=profile.medical_condition,
    email=current_user.email,
    name=current_user.name,
  )


@app.post("/analyze-food")
async def analyze_food(file: UploadFile = File(...)):
  # Existing mock implementation preserved so the AI Food Scanner continues to work.
  return {
    "food": "Rice & Chicken",
    "calories": 520,
    "protein": "35g",
    "carbs": "60g",
    "fat": "12g",
  }