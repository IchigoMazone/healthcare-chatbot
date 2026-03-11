import os
from dotenv import load_dotenv

load_dotenv()

class Config():
    DB_CONFIG = {
        "host": os.getenv("DB_HOST"),
        "port": os.getenv("DB_PORT"),
        "database": os.getenv("DB_NAME"),
        "user": os.getenv("DB_USER"),
        "password": os.getenv("DB_PASSWORD"),
    }
    OLLAMA_HOST = os.getenv("OLLAMA_HOST")
    EMBED_MODEL = os.getenv("EMBED_MODEL")
