from pathlib import Path
from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict
# from fastapi.templating import Jinja2Templates
# from fastapi.staticfiles import StaticFiles

BASE_DIR = Path(__file__).resolve().parent


class AuthJWT(BaseModel):
    private_key_path: Path = BASE_DIR / "certs" / "jwt-private.pem"
    public_key_path: Path = BASE_DIR / "certs" / "jwt-public.pem"
    algorithm: str = "RS256"
    access_token_expired_minutes: int = 15
    refresh_token_expired_days: int = 30


class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASS: str
    DB_NAME: str

    @property
    def DATABASE_URL_asyncpg(self):
        # postgresql+asyncpg://postgres:postgres@localhost:5432/sa
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    auth_jwt: AuthJWT = AuthJWT()
    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
# templates = Jinja2Templates(directory="templates")
# static_files = StaticFiles(directory="static")
