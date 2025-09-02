from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    """

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Reading List API with FastApi"
    mongodb_url: str


settings = Settings()
