from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, declared_attr, Mapped, mapped_column

from config import settings


class Base(DeclarativeBase):
    __abstract__ = True

    @declared_attr.directive
    def __tablename__(cls):
        return f"{cls.__name__.lower()}s"

    id: Mapped[int] = mapped_column(primary_key=True)


async_engine = create_async_engine(
    url=settings.DATABASE_URL_asyncpg,  # echo=True
)  # POSTGRESQL
async_session_factory = async_sessionmaker(
    async_engine, expire_on_commit=False
)  # POSTGRESQL

# DATABASE_URL = f"sqlite+aiosqlite:///{BASE_DIR}/test.db"  # для sqlite


async def create_tables():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def drop_tables():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


async def get_async_session():
    async with async_session_factory() as session:
        yield session


async def db_moves():
    await drop_tables()
    await create_tables()
