import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base, sessionmaker

# Carga siempre el .env ubicado junto a este archivo, independientemente
# de desde qué carpeta se ejecute el script.
load_dotenv(Path(__file__).with_name(".env"))

required = ("DB_USER", "DB_PASSWORD", "DB_HOST", "DB_PORT", "DB_NAME")
missing = [name for name in required if os.getenv(name) is None]
if missing:
    raise RuntimeError(
        "Faltan variables de conexión: " + ", ".join(missing)
        + ". Copiá .env.ejemplo como .env y completalo."
    )

URL_BD = URL.create(
    drivername="mysql+pymysql",
    username=os.environ["DB_USER"],
    password=os.environ["DB_PASSWORD"],
    host=os.environ["DB_HOST"],
    port=int(os.environ["DB_PORT"]),
    database=os.environ["DB_NAME"],
)

engine = create_engine(URL_BD, pool_pre_ping=True)
Session = sessionmaker(bind=engine)
Base = declarative_base()


if __name__ == "__main__":
    with engine.connect() as conexion:
        conexion.execute(text("SELECT 1"))
        print("Conexión exitosa con MySQL.")
