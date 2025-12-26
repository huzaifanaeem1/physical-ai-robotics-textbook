import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up database URL
os.environ.setdefault("DATABASE_URL", "sqlite:///./test.db")

def init_db_tables():
    """Initialize database tables for the application"""
    from sqlalchemy import create_engine
    from sqlalchemy.ext.declarative import declarative_base
    from sqlalchemy.orm import sessionmaker
    from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, UUID
    from sqlalchemy.dialects.postgresql import UUID as PostgresUUID
    from sqlalchemy.sql import func
    from sqlalchemy.orm import relationship
    import uuid

    # Create a new Base for this script to avoid import issues
    Base = declarative_base()

    # Define the models directly in this script to avoid import issues
    class User(Base):
        __tablename__ = "users"

        id = Column(
            PostgresUUID(as_uuid=True),
            primary_key=True,
            default=uuid.uuid4,
            index=True
        )
        email = Column(String, unique=True, index=True, nullable=False)
        password_hash = Column(String, nullable=False)
        hardware_exp = Column(String, nullable=True)
        software_exp = Column(String, nullable=True)
        robotics_level = Column(String, nullable=False)
        goals = Column(Text, nullable=True)
        created_at = Column(DateTime(timezone=True), server_default=func.now())

        auth_sessions = relationship("AuthSession", back_populates="user", cascade="all, delete-orphan")


    class AuthSession(Base):
        __tablename__ = "auth_sessions"

        id = Column(
            PostgresUUID(as_uuid=True),
            primary_key=True,
            default=uuid.uuid4,
            index=True
        )
        user_id = Column(
            PostgresUUID(as_uuid=True),
            ForeignKey("users.id", ondelete="CASCADE"),
            nullable=False
        )
        token = Column(String, unique=True, nullable=False, index=True)
        expires_at = Column(DateTime(timezone=True), nullable=False)
        created_at = Column(DateTime(timezone=True), server_default=func.now())

        user = relationship("User", back_populates="auth_sessions")


    # Also define the existing models
    class Session(Base):
        __tablename__ = "sessions"

        id = Column(String, primary_key=True, index=True)
        created_at = Column(DateTime(timezone=True), server_default=func.now())

        messages = relationship("Message", back_populates="session")


    class Message(Base):
        __tablename__ = "messages"

        id = Column(Integer, primary_key=True, index=True)
        session_id = Column(String, ForeignKey("sessions.id"))
        sender = Column(String)  # 'user' or 'ai'
        text = Column(Text)
        timestamp = Column(DateTime(timezone=True), server_default=func.now())

        session = relationship("Session", back_populates="messages")

    # Create database tables
    DATABASE_URL = os.getenv("DATABASE_URL")
    engine = create_engine(DATABASE_URL)

    print("Initializing database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

if __name__ == "__main__":
    init_db_tables()