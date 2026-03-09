from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from core.pipeline import rag_pipeline, rag_pipeline_stream
import time

app = FastAPI(
    title="Chatbot CSKH Y Tế",
    description="Hệ thống hỏi đáp thông minh ứng dụng RAG + LLM",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# MODELS
# ============================================================
class ChatRequest(BaseModel):
    query: str
    k: int = 5

class ChatResponse(BaseModel):
    query: str
    answer: str
    chunks_used: int
    response_time: float

# ============================================================
# ENDPOINTS
# ============================================================

@app.get("/")
def root():
    return {"message": "Chatbot CSKH Y Tế đang hoạt động!", "status": "ok"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="Query không được để trống")

    start = time.time()
    result = rag_pipeline(req.query, k=req.k)
    elapsed = round(time.time() - start, 2)

    return ChatResponse(
        query=result["query"],
        answer=result["answer"],
        chunks_used=len(result["chunks"]),
        response_time=elapsed
    )

@app.post("/chat/stream")
def chat_stream(req: ChatRequest):
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="Query không được để trống")

    def generate():
        for token in rag_pipeline_stream(req.query, k=req.k):
            yield token

    return StreamingResponse(generate(), media_type="text/plain")

@app.post("/retrieve")
def retrieve_chunks(req: ChatRequest):
    from core.retriever import retrieve
    chunks = retrieve(req.query, k=req.k)
    return {
        "query": req.query,
        "chunks": chunks
    }