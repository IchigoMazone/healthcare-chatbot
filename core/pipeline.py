from core.retriever import retrieve
from core.generator import generate, generate_stream

def rag_pipeline(query: str, k: int = 3) -> dict:
    """
    RAG Pipeline hoàn chỉnh:
    1. Retrieve chunks liên quan từ PostgreSQL
    2. Generate câu trả lời từ context
    """

    # Bước 1: Tìm chunks liên quan
    chunks = retrieve(query, k=k)

    # Bước 2: Ghép context
    context = "\n\n".join([
        f"[{c['source_table']}] {c['content']}"
        for c in chunks
    ])

    # Bước 3: Sinh câu trả lời
    answer = generate(context, query)

    return {
        "query": query,
        "answer": answer,
        "chunks": chunks,      # Trả về để dùng cho evaluation
        "context": context
    }

def rag_pipeline_stream(query: str, k: int = 3):
    """RAG Pipeline với streaming response"""

    # Retrieve
    chunks = retrieve(query, k=k)
    context = "\n\n".join([
        f"[{c['source_table']}] {c['content']}"
        for c in chunks
    ])

    # Stream generate
    for token in generate_stream(context, query):
        yield token


# ============================================================
# TEST NHANH
# ============================================================
if __name__ == "__main__":
    test_queries = [
        "Bệnh viện Đa khoa ở đâu?",
        "Khám tim mạch giá bao nhiêu?",
        "Tôi bị đau ngực nên khám khoa nào?",
        "Cần mang gì khi khám bằng BHYT?",
    ]

    for q in test_queries:
        print(f"\n{'='*50}")
        print(f"❓ {q}")
        result = rag_pipeline(q)
        print(f"💬 {result['answer']}")
        print(f"📊 Similarity cao nhất: {result['chunks'][0]['similarity']:.2f}")