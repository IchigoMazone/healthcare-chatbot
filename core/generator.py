import requests
import os
from dotenv import load_dotenv

load_dotenv()

OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
LLM_MODEL   = os.getenv("LLM_MODEL", "llama3.1:8b")

SYSTEM_PROMPT = """Bạn là nhân viên chăm sóc khách hàng của hệ thống y tế.
Hãy trả lời câu hỏi của khách hàng dựa trên thông tin được cung cấp.
Trả lời ngắn gọn, rõ ràng và thân thiện bằng tiếng Việt.
Nếu không tìm thấy thông tin trong context, hãy nói "Xin lỗi, tôi không có thông tin về vấn đề này. Vui lòng liên hệ hotline để được hỗ trợ."
Không được bịa đặt thông tin không có trong context."""

def generate(context: str, query: str) -> str:
    """Sinh câu trả lời từ context + query"""
    res = requests.post(
        f"{OLLAMA_HOST}/api/chat",
        json={
            "model": LLM_MODEL,
            "stream": False,
            "options": {
                "num_ctx": 2048,
                "keep_alive": "30m"
            },
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Thông tin:\n{context}\n\nCâu hỏi: {query}"}
            ]
        }
    )
    data = res.json()
    # Debug nếu lỗi
    if "message" not in data:
        print(f"❌ Ollama response: {data}")
        return "Lỗi kết nối LLM"
    return data["message"]["content"]

def generate_stream(context: str, query: str):
    """Sinh câu trả lời dạng stream (từng token)"""
    res = requests.post(
        f"{OLLAMA_HOST}/api/chat",
        stream=True,
        json={
            "model": LLM_MODEL,
            "stream": True,
            "options": {
                "num_ctx": 2048,
                "keep_alive": "30m"
            },
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Thông tin:\n{context}\n\nCâu hỏi: {query}"}
            ]
        }
    )
    import json
    for line in res.iter_lines():
        if line:
            chunk = json.loads(line)
            if not chunk.get("done"):
                yield chunk["message"]["content"]