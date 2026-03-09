import psycopg2
import psycopg2.extras
import os
from dotenv import load_dotenv
from core.embedder import embed

load_dotenv()

DB_CONFIG = {
    "host":     os.getenv("DB_HOST", "localhost"),
    "port":     os.getenv("DB_PORT", "5432"),
    "database": os.getenv("DB_NAME", "cskh_yte"),
    "user":     os.getenv("DB_USER", "postgres"),
    "password": os.getenv("DB_PASSWORD", "postgres"),
}

def retrieve(query: str, k: int = 5) -> list[dict]:
    """Tìm k chunks liên quan nhất từ PostgreSQL, lọc similarity > 0.5"""

    # 1. Embed câu hỏi
    query_vec = embed(query)
    vec_str = str(query_vec)

    # 2. Query pgvector tìm chunks gần nhất
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    cur.execute("""
        SELECT
            id,
            source_table,
            source_id,
            content,
            metadata,
            1 - (embedding <=> %s::vector) AS similarity
        FROM rag_documents
        WHERE 1 - (embedding <=> %s::vector) > 0.5
        ORDER BY embedding <=> %s::vector
        LIMIT %s
    """, (vec_str, vec_str, vec_str, k))

    results = cur.fetchall()
    cur.close()
    conn.close()

    return [dict(r) for r in results]