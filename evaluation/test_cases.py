# ============================================================
# test_cases.py - 25 câu hỏi test + đáp án chuẩn
# ============================================================

TEST_CASES = [
    # ── Địa chỉ / Thông tin cơ sở ──
    {
        "id": 1,
        "category": "co_so",
        "query": "Bệnh viện Đa khoa ở đâu?",
        "expected_keywords": ["125", "Trần Phú", "Hà Đông"]
    },
    {
        "id": 2,
        "category": "co_so",
        "query": "Hotline của Trung tâm Chẩn đoán là bao nhiêu?",
        "expected_keywords": ["0243 888 1002"]
    },
    {
        "id": 3,
        "category": "co_so",
        "query": "Bệnh viện mở cửa lúc mấy giờ?",
        "expected_keywords": ["7:00", "07:00", "7h"]
    },
    {
        "id": 4,
        "category": "co_so",
        "query": "Có bao nhiêu cơ sở y tế?",
        "expected_keywords": ["3", "ba"]
    },

    # ── Khoa phòng ──
    {
        "id": 5,
        "category": "khoa",
        "query": "Khoa Nhi ở tầng mấy phòng nào?",
        "expected_keywords": ["Tầng 1", "P105"]
    },
    {
        "id": 6,
        "category": "khoa",
        "query": "Khoa Mắt thuộc cơ sở nào?",
        "expected_keywords": ["Chuyên khoa", "Cầu Giấy", "Hoàng Quốc Việt"]
    },
    {
        "id": 7,
        "category": "khoa",
        "query": "Khoa Hồi sức cấp cứu ở đâu?",
        "expected_keywords": ["Tầng 1", "P100"]
    },

    # ── Bác sĩ ──
    {
        "id": 8,
        "category": "bac_si",
        "query": "Bác sĩ nào chuyên về tim mạch?",
        "expected_keywords": ["Trần Minh Đức", "tim mạch"]
    },
    {
        "id": 9,
        "category": "bac_si",
        "query": "Khoa Răng Hàm Mặt có bác sĩ nào chuyên chỉnh nha?",
        "expected_keywords": ["Trần Quốc Tuấn", "chỉnh nha"]
    },
    {
        "id": 10,
        "category": "bac_si",
        "query": "Ai là bác sĩ chuyên MRI?",
        "expected_keywords": ["Lê Văn Đức", "MRI"]
    },

    # ── Dịch vụ / Giá ──
    {
        "id": 11,
        "category": "dich_vu",
        "query": "Khám nội tổng quát giá bao nhiêu?",
        "expected_keywords": ["200.000", "200,000", "200000"]
    },
    {
        "id": 12,
        "category": "dich_vu",
        "query": "Chụp CT Scanner cần chuẩn bị gì?",
        "expected_keywords": ["nhịn ăn", "6 giờ"]
    },
    {
        "id": 13,
        "category": "dich_vu",
        "query": "Chụp MRI giá bao nhiêu?",
        "expected_keywords": ["3.000.000", "3,000,000", "3000000"]
    },
    {
        "id": 14,
        "category": "dich_vu",
        "query": "Xét nghiệm máu cần nhịn ăn không?",
        "expected_keywords": ["nhịn ăn", "8 giờ"]
    },

    # ── Gói khám ──
    {
        "id": 15,
        "category": "goi_kham",
        "query": "Gói khám sức khỏe cơ bản giá bao nhiêu?",
        "expected_keywords": ["800.000", "800,000", "800000"]
    },
    {
        "id": 16,
        "category": "goi_kham",
        "query": "Gói khám phụ nữ bao gồm những gì?",
        "expected_keywords": ["phụ khoa", "siêu âm", "sinh sản"]
    },

    # ── Bảng giá BHYT ──
    {
        "id": 17,
        "category": "bang_gia",
        "query": "Khám tim mạch có BHYT giá bao nhiêu?",
        "expected_keywords": ["50.000", "50,000", "50000", "80%"]
    },
    {
        "id": 18,
        "category": "bang_gia",
        "query": "Chụp MRI có BHYT thanh toán không?",
        "expected_keywords": ["BHYT", "800.000", "800,000", "một phần"]
    },

    # ── FAQ ──
    {
        "id": 19,
        "category": "faq",
        "query": "Làm thế nào để đặt lịch khám?",
        "expected_keywords": ["hotline", "website", "lễ tân"]
    },
    {
        "id": 20,
        "category": "faq",
        "query": "Có thanh toán bằng MoMo không?",
        "expected_keywords": ["MoMo", "ZaloPay", "VNPay"]
    },
    {
        "id": 21,
        "category": "faq",
        "query": "Cần mang gì khi khám bằng BHYT?",
        "expected_keywords": ["thẻ BHYT", "CCCD", "hộ chiếu"]
    },
    {
        "id": 22,
        "category": "faq",
        "query": "Kết quả xét nghiệm bao lâu có?",
        "expected_keywords": ["1-2 giờ", "1 giờ", "2 giờ"]
    },

    # ── Triệu chứng ──
    {
        "id": 23,
        "category": "trieu_chung",
        "query": "Tôi bị đau ngực dữ dội nên làm gì?",
        "expected_keywords": ["115", "cấp cứu", "gọi"]
    },
    {
        "id": 24,
        "category": "trieu_chung",
        "query": "Trẻ sốt cao trên 39 độ nên đến khoa nào?",
        "expected_keywords": ["Nhi", "cấp cứu"]
    },
    {
        "id": 25,
        "category": "trieu_chung",
        "query": "Bị mất ngủ kéo dài nên khám ở đâu?",
        "expected_keywords": ["Y học cổ truyền", "châm cứu", "Nội"]
    },
]