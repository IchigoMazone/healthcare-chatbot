import time
import json
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.pipeline import rag_pipeline
from evaluation.test_cases import TEST_CASES

# ============================================================
# ĐÁNH GIÁ 1 CÂU HỎI
# ============================================================
def evaluate_one(test_case: dict) -> dict:
    start = time.time()
    result = rag_pipeline(test_case["query"], k=5)
    elapsed = round(time.time() - start, 2)

    answer = result["answer"].lower()
    keywords = test_case["expected_keywords"]

    # Kiểm tra có keyword nào trong câu trả lời không
    matched = [kw for kw in keywords if kw.lower() in answer]
    is_correct = len(matched) > 0
    similarity = result["chunks"][0]["similarity"] if result["chunks"] else 0

    return {
        "id":           test_case["id"],
        "category":     test_case["category"],
        "query":        test_case["query"],
        "answer":       result["answer"],
        "correct":      is_correct,
        "matched_kw":   matched,
        "similarity":   round(float(similarity), 3),
        "response_time": elapsed,
        "chunks_used":  len(result["chunks"])
    }

# ============================================================
# CHẠY TOÀN BỘ TEST
# ============================================================
def run_evaluation():
    print("🚀 Bắt đầu evaluation...\n")
    print(f"{'='*70}")

    results = []
    for tc in TEST_CASES:
        print(f"[{tc['id']:02d}/{len(TEST_CASES)}] {tc['query'][:50]}...")
        r = evaluate_one(tc)
        results.append(r)
        status = "✅" if r["correct"] else "❌"
        print(f"      {status} | sim={r['similarity']} | {r['response_time']}s")

    # ── Tổng kết ──
    total       = len(results)
    correct     = sum(1 for r in results if r["correct"])
    accuracy    = round(correct / total * 100, 1)
    avg_sim     = round(sum(r["similarity"] for r in results) / total, 3)
    avg_time    = round(sum(r["response_time"] for r in results) / total, 2)

    print(f"\n{'='*70}")
    print(f"📊 KẾT QUẢ EVALUATION")
    print(f"{'='*70}")
    print(f"  Tổng câu hỏi    : {total}")
    print(f"  Câu trả lời đúng: {correct}/{total}")
    print(f"  Accuracy        : {accuracy}%")
    print(f"  Avg similarity  : {avg_sim}")
    print(f"  Avg response    : {avg_time}s")
    print(f"{'='*70}")

    # ── Kết quả theo category ──
    print(f"\n📂 KẾT QUẢ THEO NHÓM")
    print(f"{'='*70}")
    categories = {}
    for r in results:
        cat = r["category"]
        if cat not in categories:
            categories[cat] = {"correct": 0, "total": 0}
        categories[cat]["total"] += 1
        if r["correct"]:
            categories[cat]["correct"] += 1

    for cat, stat in categories.items():
        acc = round(stat["correct"] / stat["total"] * 100, 1)
        bar = "█" * stat["correct"] + "░" * (stat["total"] - stat["correct"])
        print(f"  {cat:<20} {bar} {stat['correct']}/{stat['total']} ({acc}%)")

    # ── Câu trả lời sai ──
    wrong = [r for r in results if not r["correct"]]
    if wrong:
        print(f"\n❌ CÂU TRẢ LỜI SAI ({len(wrong)} câu)")
        print(f"{'='*70}")
        for r in wrong:
            print(f"  [{r['id']:02d}] {r['query']}")
            print(f"       Answer  : {r['answer'][:80]}...")
            print(f"       Expected: {TEST_CASES[r['id']-1]['expected_keywords']}")
            print()

    # ── Lưu kết quả ra file JSON ──
    output = {
        "summary": {
            "total": total,
            "correct": correct,
            "accuracy": accuracy,
            "avg_similarity": avg_sim,
            "avg_response_time": avg_time
        },
        "details": results
    }
    with open("evaluation/results.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"💾 Kết quả lưu tại: evaluation/results.json")

    return output

if __name__ == "__main__":
    run_evaluation()