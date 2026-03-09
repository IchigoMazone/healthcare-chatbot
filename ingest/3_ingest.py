import psycopg2
import psycopg2.extras
import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

# ============================================================
# CONFIG
# ============================================================
DB_CONFIG = {
    "host":     os.getenv("DB_HOST", "localhost"),
    "port":     os.getenv("DB_PORT", "5432"),
    "database": os.getenv("DB_NAME", "cskh_yte"),
    "user":     os.getenv("DB_USER", "ichigomazone"),
    "password": os.getenv("DB_PASSWORD", "postgresql123"),
}
OLLAMA_HOST  = os.getenv("OLLAMA_HOST", "http://localhost:11434")
EMBED_MODEL  = os.getenv("EMBED_MODEL", "nomic-embed-text")

# ============================================================
# KẾT NỐI DB
# ============================================================
def get_conn():
    return psycopg2.connect(**DB_CONFIG)

# ============================================================
# EMBED TEXT BẰNG OLLAMA
# ============================================================
def embed(text: str) -> list[float]:
    res = requests.post(
        f"{OLLAMA_HOST}/api/embeddings",
        json={"model": EMBED_MODEL, "prompt": text}
    )
    return res.json()["embedding"]

# ============================================================
# INSERT VÀO RAG_DOCUMENTS
# ============================================================
def insert_doc(cur, source_table, source_id, content, metadata):
    vector = embed(content)
    cur.execute("""
        INSERT INTO rag_documents (source_table, source_id, content, embedding, metadata)
        VALUES (%s, %s, %s, %s::vector, %s)
    """, (source_table, source_id, content, str(vector), json.dumps(metadata)))

# ============================================================
# INGEST TỪNG BẢNG
# ============================================================
def ingest_co_so_y_te(cur, conn):
    print("📥 Ingesting co_so_y_te...")
    cur.execute("SELECT * FROM co_so_y_te")
    rows = cur.fetchall()
    for r in rows:
        content = (
            f"Cơ sở y tế: {r['ten']}. "
            f"Địa chỉ: {r['dia_chi']}. "
            f"Hotline: {r['hotline']}. "
            f"Giờ mở cửa: {r['gio_mo_cua']} - {r['gio_dong_cua']}."
        )
        insert_doc(cur, "co_so_y_te", r["id"], content, {"ten": r["ten"]})
    conn.commit()
    print(f"   ✅ {len(rows)} records")

def ingest_khoa(cur, conn):
    print("📥 Ingesting khoa...")
    cur.execute("""
        SELECT k.*, c.ten as ten_co_so 
        FROM khoa k JOIN co_so_y_te c ON k.co_so_id = c.id
    """)
    rows = cur.fetchall()
    for r in rows:
        content = (
            f"Khoa: {r['ten_khoa']}. "
            f"Thuộc: {r['ten_co_so']}. "
            f"Mô tả: {r['mo_ta']}. "
            f"Vị trí: {r['tang']}, Phòng {r['phong']}."
        )
        insert_doc(cur, "khoa", r["id"], content, {"ten_khoa": r["ten_khoa"], "co_so": r["ten_co_so"]})
    conn.commit()
    print(f"   ✅ {len(rows)} records")

def ingest_bac_si(cur, conn):
    print("📥 Ingesting bac_si...")
    cur.execute("""
        SELECT b.*, k.ten_khoa 
        FROM bac_si b JOIN khoa k ON b.khoa_id = k.id
    """)
    rows = cur.fetchall()
    for r in rows:
        content = (
            f"Bác sĩ: {r['ho_ten']}. "
            f"Học vị: {r['hoc_vi']}. "
            f"Chuyên sâu: {r['chuyen_sau']}. "
            f"Khoa: {r['ten_khoa']}."
        )
        insert_doc(cur, "bac_si", r["id"], content, {"ho_ten": r["ho_ten"], "khoa": r["ten_khoa"]})
    conn.commit()
    print(f"   ✅ {len(rows)} records")

def ingest_dich_vu(cur, conn):
    print("📥 Ingesting dich_vu...")
    cur.execute("""
        SELECT d.*, k.ten_khoa 
        FROM dich_vu d JOIN khoa k ON d.khoa_id = k.id
    """)
    rows = cur.fetchall()
    for r in rows:
        content = (
            f"Dịch vụ: {r['ten_dich_vu']}. "
            f"Khoa: {r['ten_khoa']}. "
            f"Giá: {int(r['gia']):,} VNĐ. "
            f"Chuẩn bị: {r['huong_dan_chuan_bi']}. "
            f"Lưu ý sau khám: {r['luu_y_sau_kham']}."
        )
        insert_doc(cur, "dich_vu", r["id"], content, {"ten_dich_vu": r["ten_dich_vu"]})
    conn.commit()
    print(f"   ✅ {len(rows)} records")

def ingest_goi_kham(cur, conn):
    print("📥 Ingesting goi_kham...")
    cur.execute("""
        SELECT g.*, STRING_AGG(d.ten_dich_vu, ', ') as danh_sach_dich_vu
        FROM goi_kham g
        LEFT JOIN chi_tiet_goi_kham c ON g.id = c.goi_kham_id
        LEFT JOIN dich_vu d ON c.dich_vu_id = d.id
        GROUP BY g.id
    """)
    rows = cur.fetchall()
    for r in rows:
        content = (
            f"Gói khám: {r['ten_goi']}. "
            f"Giá trọn gói: {int(r['gia_tron_goi']):,} VNĐ. "
            f"Mô tả: {r['mo_ta']}. "
            f"Bao gồm: {r['danh_sach_dich_vu']}."
        )
        insert_doc(cur, "goi_kham", r["id"], content, {"ten_goi": r["ten_goi"]})
    conn.commit()
    print(f"   ✅ {len(rows)} records")

def ingest_trieu_chung(cur, conn):
    print("📥 Ingesting trieu_chung...")
    cur.execute("""
        SELECT t.*, k.ten_khoa 
        FROM trieu_chung t JOIN khoa k ON t.khoa_id = k.id
    """)
    rows = cur.fetchall()
    for r in rows:
        content = (
            f"Triệu chứng: {r['ten_trieu_chung']}. "
            f"Mức độ: {r['muc_do']}. "
            f"Khoa phụ trách: {r['ten_khoa']}. "
            f"Hướng dẫn xử lý: {r['huong_dan_xu_ly']}. "
            f"Hotline: {r['so_hotline']}."
        )
        insert_doc(cur, "trieu_chung", r["id"], content, {"trieu_chung": r["ten_trieu_chung"]})
    conn.commit()
    print(f"   ✅ {len(rows)} records")

def ingest_faq(cur, conn):
    print("📥 Ingesting faq...")
    cur.execute("SELECT * FROM faq")
    rows = cur.fetchall()
    for r in rows:
        content = f"Câu hỏi: {r['question']} Trả lời: {r['answer']}"
        insert_doc(cur, "faq", r["id"], content, {"category": r["category"]})
    conn.commit()
    print(f"   ✅ {len(rows)} records")

def ingest_bang_gia(cur, conn):
    print("📥 Ingesting bang_gia...")
    cur.execute("SELECT * FROM bang_gia")
    rows = cur.fetchall()
    for r in rows:
        content = (
            f"Dịch vụ: {r['ten_dich_vu']}. "
            f"Khoa: {r['khoa']}. "
            f"Giá không BHYT: {int(r['gia_khong_bhyt']):,} VNĐ. "
            f"Giá có BHYT: {int(r['gia_co_bhyt']):,} VNĐ. "
            f"Ghi chú: {r['ghi_chu']}."
        )
        insert_doc(cur, "bang_gia", r["id"], content, {"ten_dich_vu": r["ten_dich_vu"]})
    conn.commit()
    print(f"   ✅ {len(rows)} records")

def ingest_trieu_chung_khoa(cur, conn):
    print("📥 Ingesting trieu_chung_khoa...")
    cur.execute("SELECT * FROM trieu_chung_khoa")
    rows = cur.fetchall()
    for r in rows:
        can_den = "Cần đến ngay" if r["can_den_ngay"] else "Có thể đặt lịch"
        content = (
            f"Triệu chứng: {r['trieu_chung']}. "
            f"Khoa đề xuất: {r['khoa_de_xuat']}. "
            f"Mức độ: {r['muc_do']}. "
            f"Hướng dẫn: {r['huong_dan']}. "
            f"{can_den}."
        )
        insert_doc(cur, "trieu_chung_khoa", r["id"], content, {"muc_do": r["muc_do"]})
    conn.commit()
    print(f"   ✅ {len(rows)} records")

# ============================================================
# MAIN - CHẠY TẤT CẢ
# ============================================================
def ingest_all():
    print("🚀 Bắt đầu ingest data...\n")
    conn = get_conn()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    # Xóa data cũ nếu có
    cur.execute("DELETE FROM rag_documents")
    conn.commit()
    print("🗑️  Đã xóa data cũ\n")

    try:
        ingest_co_so_y_te(cur, conn)
        ingest_khoa(cur, conn)
        ingest_bac_si(cur, conn)
        ingest_dich_vu(cur, conn)
        ingest_goi_kham(cur, conn)
        ingest_trieu_chung(cur, conn)
        ingest_faq(cur, conn)
        ingest_bang_gia(cur, conn)
        ingest_trieu_chung_khoa(cur, conn)

        # Tổng kết
        cur.execute("SELECT COUNT(*) as total FROM rag_documents")
        total = cur.fetchone()["total"]
        print(f"\n✅ Ingest hoàn tất! Tổng: {total} documents trong rag_documents")

    except Exception as e:
        print(f"❌ Lỗi: {e}")
        conn.rollback()
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    ingest_all()