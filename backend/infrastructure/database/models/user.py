from datetime import datetime
from typing import TYPE_CHECKING
from sqlalchemy import DDL, BigInteger, DateTime, ForeignKey, Index, event, func, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.infrastructure.database.models.base import Base


if TYPE_CHECKING:
    from backend.infrastructure.database.models import University, Group, LessonUser


class User(Base):
    __tablename__ = "users"
    
    tg_id: Mapped[int] = mapped_column(BigInteger, unique=True)
    email: Mapped[str] = mapped_column(nullable=True, unique=True)
    name: Mapped[str] = mapped_column(nullable=False)
    surname: Mapped[str] = mapped_column(nullable=False)
    middlename: Mapped[str] = mapped_column(nullable=True)
    gender: Mapped[str]
    role: Mapped[str]
    birdthdate: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    university_id: Mapped[int] = mapped_column(ForeignKey("universities.id"), nullable=False)
    group_id: Mapped[int] = mapped_column(ForeignKey("groups.id"), nullable=True)
    
    university: Mapped["University"] = relationship(back_populates="users")
    group: Mapped["Group"] = relationship(back_populates="customers")
    lessons: Mapped[list["LessonUser"]] = relationship(back_populates="user")


index = DDL("""
CREATE INDEX IF NOT EXISTS ix_users_full_name_trgm
ON users
USING gin ((surname || ' ' || name || ' ' || COALESCE(middlename, '')) gin_trgm_ops);
""")

event.listen(User.__table__, "after_create", index)
