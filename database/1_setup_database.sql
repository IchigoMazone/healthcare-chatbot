
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE co_so_y_te (
    id SERIAL PRIMARY KEY,
    ten TEXT,
    dia_chi TEXT,
    hotline TEXT,
    gio_mo_cua TIME,
    gio_dong_cua TIME
);

CREATE TABLE khoa (
    id SERIAL PRIMARY KEY,
    co_so_id INT REFERENCES co_so_y_te(id),
    ten_khoa TEXT,
    mo_ta TEXT,
    tang TEXT,
    phong TEXT
);

CREATE TABLE bac_si (
    id SERIAL PRIMARY KEY,
    khoa_id INT REFERENCES khoa(id),
    ho_ten TEXT,
    hoc_vi TEXT,
    chuyen_sau TEXT
);

CREATE TABLE dich_vu (
    id SERIAL PRIMARY KEY,
    khoa_id INT REFERENCES khoa(id),
    ten_dich_vu TEXT,
    gia DECIMAL,
    huong_dan_chuan_bi TEXT,
    luu_y_sau_kham TEXT
);

CREATE TABLE goi_kham (
    id SERIAL PRIMARY KEY,
    ten_goi TEXT,
    gia_tron_goi DECIMAL,
    mo_ta TEXT
);

CREATE TABLE chi_tiet_goi_kham (
    id SERIAL PRIMARY KEY,
    goi_kham_id INT REFERENCES goi_kham(id),
    dich_vu_id INT REFERENCES dich_vu(id)
);

CREATE TABLE trieu_chung (
    id SERIAL PRIMARY KEY,
    ten_trieu_chung TEXT,
    khoa_id INT REFERENCES khoa(id),
    muc_do TEXT,
    huong_dan_xu_ly TEXT,
    so_hotline TEXT
);

CREATE TABLE faq (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50),
    question TEXT,
    answer TEXT
);

CREATE TABLE bang_gia (
    id SERIAL PRIMARY KEY,
    ten_dich_vu TEXT,
    khoa TEXT,
    gia_khong_bhyt DECIMAL,
    gia_co_bhyt DECIMAL,
    don_vi VARCHAR(20) DEFAULT 'lần',
    ghi_chu TEXT
);

CREATE TABLE trieu_chung_khoa (
    id SERIAL PRIMARY KEY,
    trieu_chung TEXT,
    khoa_de_xuat TEXT,
    muc_do VARCHAR(20),
    huong_dan TEXT,
    can_den_ngay BOOLEAN DEFAULT FALSE
);

CREATE TABLE rag_documents (
    id SERIAL PRIMARY KEY,
    source_table TEXT,          
    source_id INT,              
    content TEXT,               
    embedding vector(768),     
    metadata JSONB             
);

CREATE INDEX ON rag_documents USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 50);

INSERT INTO co_so_y_te (id, ten, dia_chi, hotline, gio_mo_cua, gio_dong_cua) VALUES
(1, 'Bệnh viện Đa khoa', '125 Trần Phú, Hà Đông, Hà Nội', '0243 888 1001', '07:00', '17:00'),
(2, 'Trung tâm Chẩn đoán & Xét nghiệm', '58 Nguyễn Trãi, Thanh Xuân, Hà Nội', '0243 888 1002', '07:30', '17:30'),
(3, 'Bệnh viện Chuyên khoa & Phục hồi', '210 Hoàng Quốc Việt, Cầu Giấy, Hà Nội', '0243 888 1003', '08:00', '17:00');

INSERT INTO khoa (co_so_id, ten_khoa, mo_ta, tang, phong) VALUES
(1, 'Khoa Nội', 'Khám và điều trị các bệnh nội khoa', 'Tầng 1', 'P101'),
(1, 'Khoa Ngoại', 'Phẫu thuật và điều trị ngoại khoa', 'Tầng 2', 'P201'),
(1, 'Khoa Nhi', 'Chăm sóc sức khỏe trẻ em', 'Tầng 1', 'P105'),
(1, 'Khoa Phụ Sản', 'Chăm sóc sức khỏe phụ nữ và trẻ sơ sinh', 'Tầng 3', 'P301'),
(1, 'Khoa Hồi sức cấp cứu', 'Cấp cứu và hồi sức tích cực', 'Tầng 1', 'P100'),
(2, 'Khoa Chẩn đoán hình ảnh', 'Siêu âm, X-quang, CT, MRI', 'Tầng 1', 'P110'),
(2, 'Khoa Xét nghiệm', 'Xét nghiệm máu, nước tiểu, vi sinh', 'Tầng 1', 'P112'),
(2, 'Khoa Dược', 'Cung ứng và quản lý thuốc', 'Tầng 1', 'P115'),
(2, 'Khoa Kiểm soát nhiễm khuẩn', 'Quản lý vệ sinh và tiệt trùng', 'Tầng 4', 'P401'),
(3, 'Khoa Mắt', 'Khám và điều trị các bệnh về mắt', 'Tầng 2', 'P205'),
(3, 'Khoa Tai Mũi Họng', 'Điều trị các bệnh lý tai mũi họng', 'Tầng 2', 'P206'),
(3, 'Khoa Răng Hàm Mặt', 'Khám và điều trị răng miệng', 'Tầng 2', 'P207'),
(3, 'Khoa Da liễu', 'Điều trị các bệnh về da', 'Tầng 3', 'P305'),
(3, 'Khoa Phục hồi chức năng', 'Vật lý trị liệu và phục hồi', 'Tầng 1', 'P120'),
(3, 'Khoa Y học cổ truyền', 'Điều trị bằng phương pháp đông y', 'Tầng 3', 'P310');

INSERT INTO bac_si (khoa_id, ho_ten, hoc_vi, chuyen_sau) VALUES
(1,'Nguyễn Văn Hưng','Thạc sĩ','Nội tổng quát'),
(1,'Trần Minh Đức','BS CKI','Tim mạch'),
(1,'Phạm Quang Hải','Tiến sĩ','Nội tiết'),
(1,'Lê Anh Tuấn','Thạc sĩ','Tiêu hóa'),
(1,'Hoàng Quốc Bảo','BS CKII','Hô hấp'),
(1,'Vũ Văn Nam','Thạc sĩ','Bệnh chuyển hóa'),
(2,'Nguyễn Văn Bình','Thạc sĩ','Phẫu thuật tổng quát'),
(2,'Trần Quốc Huy','BS CKI','Ngoại tiêu hóa'),
(2,'Phạm Minh Tuấn','Thạc sĩ','Ngoại gan mật'),
(2,'Lê Văn Thành','BS CKII','Phẫu thuật nội soi'),
(2,'Hoàng Văn Sơn','Thạc sĩ','Chấn thương chỉnh hình'),
(2,'Vũ Quốc Khánh','BS CKI','Ngoại tổng hợp'),
(3,'Nguyễn Thị Lan','Thạc sĩ','Nhi tổng quát'),
(3,'Trần Văn Dũng','BS CKI','Nhi hô hấp'),
(3,'Phạm Thị Hương','Thạc sĩ','Nhi tiêu hóa'),
(3,'Lê Thị Mai','BS CKII','Nhi sơ sinh'),
(3,'Hoàng Thị Thu','Thạc sĩ','Nhi truyền nhiễm'),
(4,'Nguyễn Thị Hồng','Thạc sĩ','Sản khoa'),
(4,'Trần Thị Thu','BS CKI','Chăm sóc thai kỳ'),
(4,'Phạm Thị Lan','Thạc sĩ','Siêu âm thai'),
(4,'Lê Thị Ngọc','BS CKII','Sản phụ khoa'),
(4,'Hoàng Thị Mai','Thạc sĩ','Hỗ trợ sinh sản'),
(4,'Vũ Thị Hạnh','BS CKI','Đỡ sinh'),
(5,'Nguyễn Minh Anh','Thạc sĩ','Hồi sức tích cực'),
(5,'Trần Quốc Bảo','BS CKI','Cấp cứu đa chấn thương'),
(5,'Phạm Văn Long','Thạc sĩ','Cấp cứu tim mạch'),
(5,'Lê Hoàng Nam','BS CKII','Hồi sức ngoại khoa'),
(5,'Hoàng Văn Phúc','Thạc sĩ','Cấp cứu tổng quát'),
(5,'Vũ Thanh Tùng','BS CKI','Hồi sức hô hấp'),
(6,'Nguyễn Văn Khánh','Thạc sĩ','Siêu âm'),
(6,'Trần Quốc Huy','BS CKI','X-quang'),
(6,'Phạm Minh Tuấn','Thạc sĩ','CT Scanner'),
(6,'Lê Văn Đức','BS CKII','MRI'),
(7,'Nguyễn Thu Trang','Thạc sĩ','Sinh hóa'),
(7,'Trần Thị Hương','BS CKI','Huyết học'),
(7,'Phạm Thị Lan','Thạc sĩ','Vi sinh'),
(8,'Nguyễn Văn Tâm','Dược sĩ CKI','Dược lâm sàng'),
(8,'Trần Văn Bình','Thạc sĩ','Quản lý thuốc'),
(8,'Phạm Văn Hùng','Dược sĩ','Cấp phát thuốc'),
(9,'Nguyễn Minh Quang','Thạc sĩ','Kiểm soát nhiễm khuẩn'),
(9,'Trần Văn Duy','BS CKI','Vệ sinh bệnh viện'),
(9,'Phạm Văn Khánh','Thạc sĩ','Khử trùng'),
(10,'Nguyễn Văn Nam','Thạc sĩ','Khám mắt tổng quát'),
(10,'Trần Quốc Huy','BS CKI','Phẫu thuật đục thủy tinh thể'),
(10,'Phạm Minh Tuấn','Thạc sĩ','Khúc xạ nhãn khoa'),
(10,'Lê Văn Đức','BS CKII','Glaucoma'),
(10,'Hoàng Văn Sơn','Thạc sĩ','Bệnh võng mạc'),
(10,'Vũ Quốc Khánh','BS CKI','Phẫu thuật LASIK'),
(11,'Nguyễn Văn Hưng','Thạc sĩ','Bệnh tai giữa'),
(11,'Trần Văn Dũng','BS CKI','Phẫu thuật tai'),
(11,'Phạm Văn Long','Thạc sĩ','Viêm xoang'),
(11,'Lê Văn Hải','BS CKII','Nội soi tai mũi họng'),
(11,'Hoàng Văn Phúc','Thạc sĩ','Thính học'),
(12,'Nguyễn Văn Bình','Thạc sĩ','Răng tổng quát'),
(12,'Trần Quốc Tuấn','BS CKI','Chỉnh nha'),
(12,'Phạm Minh Khánh','Thạc sĩ','Implant nha khoa'),
(12,'Lê Văn Hòa','BS CKII','Phẫu thuật hàm mặt'),
(12,'Hoàng Văn Duy','Thạc sĩ','Nha khoa thẩm mỹ'),
(12,'Vũ Văn Nam','BS CKI','Điều trị tủy'),
(13,'Nguyễn Thị Lan','Thạc sĩ','Bệnh da liễu'),
(13,'Trần Thị Hương','BS CKI','Điều trị mụn'),
(13,'Phạm Thị Mai','Thạc sĩ','Thẩm mỹ da'),
(13,'Lê Thị Ngọc','BS CKII','Laser da'),
(13,'Hoàng Thị Thu','Thạc sĩ','Bệnh da dị ứng'),
(13,'Vũ Thị Thanh','BS CKI','Chăm sóc da'),
(14,'Nguyễn Văn Hòa','Thạc sĩ','Vật lý trị liệu'),
(14,'Trần Văn Bình','BS CKI','Phục hồi sau chấn thương'),
(14,'Phạm Văn Sơn','Thạc sĩ','Phục hồi vận động'),
(14,'Lê Văn Dũng','BS CKII','Phục hồi sau phẫu thuật'),
(14,'Hoàng Văn Nam','Thạc sĩ','Chấn thương chỉnh hình'),
(15,'Nguyễn Văn Phúc','Thạc sĩ','Châm cứu'),
(15,'Trần Văn Hòa','BS CKI','Y học cổ truyền'),
(15,'Phạm Văn Quang','Thạc sĩ','Bốc thuốc đông y'),
(15,'Lê Văn Bình','BS CKII','Xoa bóp bấm huyệt'),
(15,'Hoàng Văn Tài','Thạc sĩ','Điều trị bằng thảo dược'),
(15,'Vũ Văn Thành','BS CKI','Châm cứu phục hồi');

INSERT INTO dich_vu (khoa_id, ten_dich_vu, gia, huong_dan_chuan_bi, luu_y_sau_kham) VALUES
(1,'Khám nội tổng quát',200000,'Mang theo kết quả xét nghiệm cũ nếu có','Uống thuốc theo đơn bác sĩ'),
(1,'Khám tim mạch',250000,'Không uống cà phê trước khi khám','Theo dõi huyết áp tại nhà'),
(1,'Khám tiêu hóa',220000,'Nhịn ăn 6 giờ trước khi khám','Ăn uống nhẹ sau khám'),
(2,'Khám ngoại tổng quát',200000,'Vệ sinh vùng cần khám','Theo dõi vết thương'),
(2,'Tiểu phẫu',800000,'Nhịn ăn 6 giờ trước thủ thuật','Giữ vệ sinh vết mổ'),
(2,'Cắt chỉ vết thương',150000,'Không bôi thuốc trước khi đến','Tránh vận động mạnh'),
(3,'Khám nhi tổng quát',150000,'Cho trẻ ăn nhẹ trước khi khám','Theo dõi nhiệt độ cơ thể'),
(3,'Khám dinh dưỡng trẻ em',180000,'Mang sổ theo dõi cân nặng','Điều chỉnh chế độ ăn'),
(3,'Tư vấn tiêm chủng',120000,'Mang sổ tiêm chủng','Theo dõi phản ứng sau tiêm'),
(4,'Khám phụ khoa',250000,'Không quan hệ trước 24h','Giữ vệ sinh cá nhân'),
(4,'Siêu âm thai',300000,'Uống nhiều nước trước khi siêu âm','Theo dõi thai kỳ'),
(4,'Tư vấn sinh sản',200000,'Mang hồ sơ khám trước đó','Tuân thủ lịch tái khám'),
(5,'Khám cấp cứu ban đầu',300000,'Đưa bệnh nhân đến nhanh nhất','Theo dõi tình trạng sau cấp cứu'),
(5,'Hồi sức tích cực',1000000,'Theo chỉ định bác sĩ','Theo dõi sát dấu hiệu sinh tồn'),
(6,'Siêu âm ổ bụng',300000,'Nhịn ăn 6 giờ','Ăn uống bình thường sau khám'),
(6,'Chụp X-quang',250000,'Tháo vật kim loại','Không cần chăm sóc đặc biệt'),
(6,'Chụp CT Scanner',1500000,'Nhịn ăn trước 6 giờ','Uống nhiều nước sau chụp'),
(7,'Xét nghiệm máu tổng quát',200000,'Nhịn ăn 8 giờ','Ăn nhẹ sau xét nghiệm'),
(7,'Xét nghiệm nước tiểu',150000,'Lấy mẫu buổi sáng','Uống nhiều nước'),
(7,'Xét nghiệm sinh hóa',250000,'Nhịn ăn trước khi lấy mẫu','Theo dõi kết quả'),
(8,'Tư vấn sử dụng thuốc',100000,'Mang theo đơn thuốc','Uống thuốc đúng liều'),
(8,'Cấp phát thuốc theo đơn',0,'Mang theo đơn bác sĩ','Bảo quản thuốc đúng cách'),
(9,'Khử trùng dụng cụ',500000,'Không áp dụng cho bệnh nhân','Đảm bảo vô khuẩn'),
(9,'Tư vấn phòng chống nhiễm khuẩn',150000,'Tuân thủ hướng dẫn','Giữ vệ sinh cá nhân'),
(10,'Khám mắt tổng quát',200000,'Không đeo kính áp tròng trước khám','Nghỉ mắt sau khám'),
(10,'Đo thị lực',150000,'Không dùng điện thoại trước khám','Đeo kính đúng số'),
(11,'Khám tai mũi họng',200000,'Không dùng thuốc xịt trước khám','Giữ ấm cổ họng'),
(11,'Nội soi tai mũi họng',350000,'Không ăn trước 3 giờ','Uống nước ấm'),
(12,'Khám răng tổng quát',150000,'Đánh răng trước khi khám','Tránh đồ ăn cứng'),
(12,'Lấy cao răng',300000,'Đánh răng trước khi đến','Tránh đồ nóng lạnh'),
(13,'Khám da liễu',200000,'Không bôi mỹ phẩm trước khám','Tránh ánh nắng'),
(13,'Điều trị mụn',500000,'Rửa mặt sạch trước khi khám','Chăm sóc da theo hướng dẫn'),
(14,'Vật lý trị liệu',300000,'Mặc đồ thoải mái','Tập luyện theo hướng dẫn'),
(14,'Phục hồi sau chấn thương',350000,'Mang hồ sơ bệnh án','Tập luyện đều đặn'),
(15,'Châm cứu',250000,'Ăn nhẹ trước khi châm cứu','Nghỉ ngơi sau điều trị'),
(15,'Xoa bóp bấm huyệt',300000,'Mặc đồ rộng','Uống nước ấm sau trị liệu');

INSERT INTO trieu_chung (ten_trieu_chung, khoa_id, muc_do, huong_dan_xu_ly, so_hotline) VALUES
('Đau ngực',1,'cap_cuu','Nghỉ ngơi, gọi cấp cứu nếu đau kéo dài','115'),
('Khó thở',1,'cap_cuu','Ngồi thẳng, hít thở chậm và gọi cấp cứu','115'),
('Đau bụng',1,'trung_binh','Theo dõi cơn đau và đi khám sớm','115'),
('Chóng mặt',1,'nhe','Nghỉ ngơi, uống đủ nước','115'),
('Vết thương chảy máu',2,'cap_cuu','Băng ép cầm máu và đến cơ sở y tế','115'),
('Gãy xương nghi ngờ',2,'cap_cuu','Cố định vùng bị thương và gọi cấp cứu','115'),
('Đau sau chấn thương',2,'trung_binh','Chườm lạnh và đi khám','115'),
('Sốt cao ở trẻ',3,'trung_binh','Lau mát và theo dõi nhiệt độ','115'),
('Ho kéo dài ở trẻ',3,'nhe','Cho trẻ uống nước ấm và đi khám nếu kéo dài','115'),
('Nôn ói ở trẻ',3,'trung_binh','Bù nước và theo dõi','115'),
('Đau bụng khi mang thai',4,'cap_cuu','Đến bệnh viện ngay','115'),
('Ra máu âm đạo',4,'cap_cuu','Đi khám phụ khoa khẩn cấp','115'),
('Rối loạn kinh nguyệt',4,'nhe','Theo dõi chu kỳ và đi khám','115'),
('Ngất xỉu',5,'cap_cuu','Đặt bệnh nhân nằm nghiêng và gọi cấp cứu','115'),
('Co giật',5,'cap_cuu','Đặt bệnh nhân nằm an toàn và gọi cấp cứu','115'),
('Nghi ngờ tổn thương nội tạng',6,'trung_binh','Thực hiện chẩn đoán hình ảnh','115'),
('Nghi ngờ thiếu máu',7,'trung_binh','Làm xét nghiệm máu','115'),
('Phản ứng thuốc',8,'cap_cuu','Ngừng thuốc và đến cơ sở y tế','115'),
('Sốt nghi nhiễm trùng',9,'trung_binh','Theo dõi và xét nghiệm','115'),
('Mắt đỏ',10,'nhe','Tránh dụi mắt và đi khám','115'),
('Nhìn mờ',10,'trung_binh','Kiểm tra thị lực','115'),
('Đau họng',11,'nhe','Uống nước ấm và nghỉ ngơi','115'),
('Ù tai',11,'trung_binh','Tránh tiếng ồn và đi khám','115'),
('Đau răng',12,'nhe','Súc miệng nước muối và đi khám','115'),
('Chảy máu nướu',12,'trung_binh','Vệ sinh răng miệng và khám nha khoa','115'),
('Ngứa da',13,'nhe','Tránh gãi và giữ da sạch','115'),
('Nổi mẩn đỏ',13,'trung_binh','Tránh dị ứng và đi khám','115'),
('Đau lưng',14,'trung_binh','Nghỉ ngơi và tập vật lý trị liệu','115'),
('Mất ngủ',15,'nhe','Thư giãn và có thể điều trị bằng châm cứu','115');

INSERT INTO goi_kham (ten_goi, gia_tron_goi, mo_ta) VALUES
('Gói khám sức khỏe tổng quát cơ bản', 800000, 'Khám tổng quát và xét nghiệm cơ bản'),
('Gói khám sức khỏe tổng quát nâng cao', 1500000, 'Khám chuyên sâu và chẩn đoán hình ảnh'),
('Gói khám tim mạch', 1200000, 'Tầm soát bệnh tim mạch'),
('Gói khám phụ nữ', 1300000, 'Khám sức khỏe phụ khoa tổng quát'),
('Gói khám trẻ em', 900000, 'Khám tổng quát dành cho trẻ em'),
('Gói khám mắt', 600000, 'Kiểm tra thị lực và bệnh lý mắt'),
('Gói khám răng miệng', 500000, 'Khám và vệ sinh răng miệng'),
('Gói khám da liễu', 700000, 'Khám và tư vấn các bệnh về da');

INSERT INTO chi_tiet_goi_kham (goi_kham_id, dich_vu_id) VALUES
(1,1),(1,2),(1,3),
(2,1),(2,2),(2,3),(2,4),(2,5),
(3,1),(3,6),(3,7),
(4,8),(4,9),(4,10),
(5,11),(5,12),(5,13),
(6,14),(6,15),
(7,16),(7,17),
(8,18),(8,19);

INSERT INTO faq (category, question, answer) VALUES
('dat_lich', 'Làm thế nào để đặt lịch khám?', 'Bạn có thể đặt lịch qua 3 cách: gọi hotline của từng cơ sở, đến trực tiếp quầy lễ tân, hoặc đặt qua website. Nên đặt trước 1-2 ngày để đảm bảo có lịch.'),
('dat_lich', 'Có thể hủy hoặc đổi lịch khám không?', 'Có thể hủy hoặc đổi lịch trước 24 giờ bằng cách gọi hotline của cơ sở y tế. Nếu hủy trễ hơn, vui lòng liên hệ trực tiếp để được hỗ trợ.'),
('dat_lich', 'Đặt lịch khám cần cung cấp thông tin gì?', 'Cần cung cấp họ tên, số điện thoại, ngày sinh, dịch vụ hoặc khoa muốn khám và thời gian mong muốn.'),
('dat_lich', 'Có thể đặt lịch cho người thân không?', 'Có thể đặt lịch cho người thân, cần cung cấp đầy đủ thông tin của người đi khám.'),
('dat_lich', 'Bao lâu trước khi khám cần có mặt?', 'Nên đến trước giờ hẹn 15-20 phút để hoàn tất thủ tục đăng ký.'),
('bao_hiem', 'Bệnh viện có nhận bảo hiểm y tế không?', 'Có, tất cả cơ sở đều nhận BHYT đúng tuyến và trái tuyến. Mức thanh toán phụ thuộc vào loại thẻ BHYT của bạn.'),
('bao_hiem', 'Cần mang giấy tờ gì khi khám bằng BHYT?', 'Cần mang thẻ BHYT còn hiệu lực, CCCD hoặc hộ chiếu. Nếu khám trái tuyến cần có giấy chuyển viện.'),
('bao_hiem', 'BHYT có thanh toán cho tất cả dịch vụ không?', 'BHYT thanh toán cho các dịch vụ trong danh mục được bảo hiểm. Một số dịch vụ cao cấp như MRI, CT có thể cần thanh toán thêm phần chênh lệch.'),
('bao_hiem', 'Khám trái tuyến BHYT thanh toán bao nhiêu?', 'Khám trái tuyến tại bệnh viện tuyến tỉnh được thanh toán 60%, tuyến trung ương được thanh toán 40% chi phí theo quy định.'),
('bao_hiem', 'Thẻ BHYT hết hạn có khám được không?', 'Thẻ BHYT hết hạn sẽ không được hưởng quyền lợi BHYT. Bạn cần gia hạn thẻ trước khi khám hoặc thanh toán toàn bộ chi phí.'),
('thanh_toan', 'Có những hình thức thanh toán nào?', 'Chấp nhận thanh toán bằng tiền mặt, chuyển khoản ngân hàng, thẻ ATM/tín dụng và các ví điện tử như MoMo, ZaloPay, VNPay.'),
('thanh_toan', 'Có xuất hóa đơn VAT không?', 'Có xuất hóa đơn VAT theo yêu cầu. Vui lòng thông báo với nhân viên thu ngân trước khi thanh toán.'),
('thanh_toan', 'Thanh toán ở đâu sau khi khám?', 'Thanh toán tại quầy thu ngân ở tầng 1 hoặc tại quầy của từng khoa sau khi có kết quả và đơn thuốc từ bác sĩ.'),
('thanh_toan', 'Có được hoàn tiền nếu hủy dịch vụ không?', 'Có thể hoàn tiền nếu hủy dịch vụ trước khi thực hiện. Liên hệ quầy thu ngân để được hỗ trợ theo quy định từng dịch vụ.'),
('chuan_bi', 'Khám xét nghiệm máu cần chuẩn bị gì?', 'Cần nhịn ăn ít nhất 8 tiếng trước khi lấy mẫu máu, chỉ được uống nước lọc. Nên đến vào buổi sáng sớm để có kết quả chính xác nhất.'),
('chuan_bi', 'Trẻ em đi khám cần mang gì?', 'Cần mang theo sổ tiêm chủng, giấy khai sinh, thẻ BHYT nếu có và các kết quả xét nghiệm hoặc đơn thuốc cũ nếu đã từng điều trị.'),
('chuan_bi', 'Khám phụ khoa cần lưu ý gì?', 'Không nên quan hệ tình dục trong 24 giờ trước khi khám, không thụt rửa âm đạo và nên mặc quần áo dễ thay.'),
('chuan_bi', 'Siêu âm ổ bụng cần nhịn ăn không?', 'Cần nhịn ăn ít nhất 6 giờ và uống nhiều nước (khoảng 4-6 ly) để bàng quang đầy, giúp hình ảnh siêu âm rõ hơn.'),
('chuan_bi', 'Đến khám lần đầu cần mang gì?', 'Cần mang CCCD hoặc hộ chiếu, thẻ BHYT nếu có, và các kết quả xét nghiệm hoặc hồ sơ bệnh án cũ nếu có liên quan.'),
('chung', 'Giờ làm việc của bệnh viện như thế nào?', 'Bệnh viện Đa khoa làm việc từ 7:00-17:00, Trung tâm Chẩn đoán từ 7:30-17:30, Bệnh viện Chuyên khoa từ 8:00-17:00. Cấp cứu hoạt động 24/7.'),
('chung', 'Có dịch vụ cấp cứu 24/7 không?', 'Có, Khoa Hồi sức cấp cứu hoạt động 24/7. Trong trường hợp khẩn cấp hãy gọi 115 hoặc hotline 0243 888 1001.'),
('chung', 'Có chỗ đậu xe không?', 'Có bãi đậu xe miễn phí cho bệnh nhân và người nhà tại tất cả cơ sở. Xe máy và ô tô có khu vực riêng biệt.'),
('chung', 'Người nhà có được vào khu khám không?', 'Mỗi bệnh nhân được đi kèm tối đa 1 người thân vào khu khám. Trẻ em dưới 15 tuổi cần có người lớn đi cùng.'),
('chung', 'Kết quả xét nghiệm bao lâu có?', 'Xét nghiệm máu cơ bản có kết quả sau 1-2 giờ. Xét nghiệm đặc biệt có thể từ 24-48 giờ. Kết quả được thông báo qua số điện thoại đăng ký.');

INSERT INTO bang_gia (ten_dich_vu, khoa, gia_khong_bhyt, gia_co_bhyt, don_vi, ghi_chu) VALUES
('Khám nội tổng quát', 'Khoa Nội', 200000, 0, 'lần', 'BHYT thanh toán 100% đúng tuyến'),
('Khám tim mạch', 'Khoa Nội', 250000, 50000, 'lần', 'BHYT thanh toán 80%'),
('Khám tiêu hóa', 'Khoa Nội', 220000, 44000, 'lần', 'BHYT thanh toán 80%'),
('Khám ngoại tổng quát', 'Khoa Ngoại', 200000, 0, 'lần', 'BHYT thanh toán 100% đúng tuyến'),
('Tiểu phẫu', 'Khoa Ngoại', 800000, 160000, 'lần', 'BHYT thanh toán 80%'),
('Khám nhi tổng quát', 'Khoa Nhi', 150000, 0, 'lần', 'BHYT thanh toán 100% đúng tuyến'),
('Khám phụ khoa', 'Khoa Phụ Sản', 250000, 50000, 'lần', 'BHYT thanh toán 80%'),
('Khám cấp cứu', 'Khoa Cấp cứu', 300000, 0, 'lần', 'BHYT thanh toán 100%'),
('Khám mắt tổng quát', 'Khoa Mắt', 200000, 40000, 'lần', 'BHYT thanh toán 80%'),
('Khám tai mũi họng', 'Khoa TMH', 200000, 40000, 'lần', 'BHYT thanh toán 80%'),
('Khám răng tổng quát', 'Khoa RHM', 150000, 30000, 'lần', 'BHYT thanh toán 80%'),
('Khám da liễu', 'Khoa Da liễu', 200000, 40000, 'lần', 'BHYT thanh toán 80%'),
('Châm cứu', 'Khoa YHCT', 250000, 50000, 'lần', 'BHYT thanh toán 80%'),
('Vật lý trị liệu', 'Khoa PHCN', 300000, 60000, 'buổi', 'BHYT thanh toán 80%'),
('Siêu âm ổ bụng', 'Chẩn đoán hình ảnh', 300000, 60000, 'lần', 'BHYT thanh toán 80%'),
('Siêu âm thai', 'Khoa Phụ Sản', 300000, 60000, 'lần', 'BHYT thanh toán 80%'),
('Chụp X-quang phổi', 'Chẩn đoán hình ảnh', 250000, 50000, 'lần', 'BHYT thanh toán 80%'),
('Chụp CT Scanner', 'Chẩn đoán hình ảnh', 1500000, 400000, 'lần', 'BHYT thanh toán một phần'),
('Chụp MRI', 'Chẩn đoán hình ảnh', 3000000, 800000, 'lần', 'BHYT thanh toán một phần'),
('Xét nghiệm máu tổng quát', 'Khoa Xét nghiệm', 200000, 40000, 'lần', 'BHYT thanh toán 80%'),
('Xét nghiệm nước tiểu', 'Khoa Xét nghiệm', 150000, 30000, 'lần', 'BHYT thanh toán 80%'),
('Xét nghiệm sinh hóa', 'Khoa Xét nghiệm', 250000, 50000, 'lần', 'BHYT thanh toán 80%'),
('Gói khám sức khỏe cơ bản', 'Tổng hợp', 800000, 200000, 'gói', 'Tiết kiệm 20% so với lẻ'),
('Gói khám sức khỏe nâng cao', 'Tổng hợp', 1500000, 400000, 'gói', 'Tiết kiệm 25% so với lẻ'),
('Gói khám tim mạch', 'Khoa Nội', 1200000, 300000, 'gói', 'Bao gồm ECG, siêu âm tim'),
('Gói khám phụ nữ', 'Khoa Phụ Sản', 1300000, 350000, 'gói', 'Bao gồm tầm soát ung thư cổ tử cung'),
('Gói khám trẻ em', 'Khoa Nhi', 900000, 200000, 'gói', 'Phù hợp trẻ 1-15 tuổi'),
('Gói khám mắt', 'Khoa Mắt', 600000, 150000, 'gói', 'Bao gồm đo thị lực và khám chuyên sâu'),
('Gói khám răng miệng', 'Khoa RHM', 500000, 120000, 'gói', 'Bao gồm lấy cao răng'),
('Gói khám da liễu', 'Khoa Da liễu', 700000, 180000, 'gói', 'Tư vấn và điều trị cơ bản');

INSERT INTO trieu_chung_khoa (trieu_chung, khoa_de_xuat, muc_do, huong_dan, can_den_ngay) VALUES
('Đau ngực dữ dội, lan ra vai trái', 'Khoa Hồi sức cấp cứu', 'cap_cuu', 'Gọi 115 ngay, không tự lái xe đến bệnh viện, nằm nghỉ và nới lỏng quần áo', TRUE),
('Khó thở đột ngột, không thở được', 'Khoa Hồi sức cấp cứu', 'cap_cuu', 'Gọi 115 ngay, ngồi thẳng lưng, không nằm xuống', TRUE),
('Ngất xỉu, mất ý thức', 'Khoa Hồi sức cấp cứu', 'cap_cuu', 'Gọi 115 ngay, đặt người bệnh nằm nghiêng an toàn', TRUE),
('Co giật toàn thân', 'Khoa Hồi sức cấp cứu', 'cap_cuu', 'Gọi 115, không giữ chặt người bệnh, dọn vật cứng xung quanh', TRUE),
('Chảy máu không cầm được', 'Khoa Hồi sức cấp cứu', 'cap_cuu', 'Băng ép chặt vết thương và đến cấp cứu ngay', TRUE),
('Đau bụng dữ dội đột ngột', 'Khoa Ngoại / Cấp cứu', 'cap_cuu', 'Đến cấp cứu ngay, không ăn uống, không dùng thuốc giảm đau', TRUE),
('Đau bụng khi đang mang thai', 'Khoa Phụ Sản', 'cap_cuu', 'Đến bệnh viện ngay, gọi hotline Khoa Phụ Sản', TRUE),
('Ra máu âm đạo bất thường', 'Khoa Phụ Sản', 'cap_cuu', 'Đến khám phụ khoa khẩn cấp, nằm nghỉ trong khi chờ', TRUE),
('Trẻ sốt cao trên 39 độ kèm co giật', 'Khoa Nhi / Cấp cứu', 'cap_cuu', 'Đưa trẻ đến cấp cứu ngay, lau mát bằng khăn ấm', TRUE),
('Dị ứng nặng, nổi mề đay toàn thân, sưng môi', 'Khoa Hồi sức cấp cứu', 'cap_cuu', 'Gọi 115, đây có thể là sốc phản vệ rất nguy hiểm', TRUE),
('Sốt cao trên 38.5 độ kéo dài', 'Khoa Nội', 'trung_binh', 'Uống thuốc hạ sốt, uống nhiều nước và đến khám trong ngày', FALSE),
('Đau đầu dữ dội kèm nôn', 'Khoa Nội', 'trung_binh', 'Nghỉ ngơi nơi tối yên tĩnh, đến khám sớm nếu không giảm', FALSE),
('Tiêu chảy trên 5 lần/ngày kèm mất nước', 'Khoa Nội', 'trung_binh', 'Bù nước điện giải, đến khám nếu không cải thiện sau 24 giờ', FALSE),
('Trẻ sốt từ 38-39 độ', 'Khoa Nhi', 'trung_binh', 'Lau mát, cho uống thuốc hạ sốt phù hợp cân nặng, đến khám nếu sốt không hạ', FALSE),
('Trẻ nôn ói nhiều, không uống được nước', 'Khoa Nhi', 'trung_binh', 'Bù nước từng ngụm nhỏ, đến khám nếu nôn trên 3 lần', FALSE),
('Đau mắt đỏ kèm chảy mủ', 'Khoa Mắt', 'trung_binh', 'Không dụi mắt, rửa mắt bằng nước muối sinh lý, đến khám sớm', FALSE),
('Nhìn mờ đột ngột', 'Khoa Mắt', 'trung_binh', 'Đến khám mắt trong ngày, tránh lái xe', FALSE),
('Ù tai, nghe kém đột ngột', 'Khoa Tai Mũi Họng', 'trung_binh', 'Tránh tiếng ồn lớn, đến khám trong 24-48 giờ', FALSE),
('Đau họng kèm sốt, khó nuốt', 'Khoa Tai Mũi Họng', 'trung_binh', 'Uống nước ấm, không ăn đồ cứng, đến khám nếu sốt cao', FALSE),
('Đau răng sưng má', 'Khoa Răng Hàm Mặt', 'trung_binh', 'Súc miệng nước muối ấm, đến khám trong ngày', FALSE),
('Ngứa da, nổi mẩn đỏ lan rộng', 'Khoa Da liễu', 'trung_binh', 'Tránh gãi, không dùng xà phòng, đến khám để xác định nguyên nhân', FALSE),
('Đau lưng dữ dội không đi lại được', 'Khoa Phục hồi chức năng / Ngoại', 'trung_binh', 'Nằm nghỉ trên mặt phẳng cứng, đến khám trong ngày', FALSE),
('Ho khan kéo dài trên 2 tuần', 'Khoa Nội', 'nhe', 'Uống nhiều nước ấm, đặt lịch khám để kiểm tra phổi', FALSE),
('Chóng mặt nhẹ khi đứng lên', 'Khoa Nội', 'nhe', 'Đứng dậy từ từ, uống đủ nước, đặt lịch khám nếu kéo dài', FALSE),
('Mất ngủ kéo dài', 'Khoa Y học cổ truyền / Nội', 'nhe', 'Tạo thói quen ngủ đúng giờ, hạn chế caffeine, đặt lịch nếu kéo dài trên 2 tuần', FALSE),
('Đau lưng âm ỉ khi ngồi lâu', 'Khoa Phục hồi chức năng', 'nhe', 'Tập thể dục nhẹ, điều chỉnh tư thế ngồi, đặt lịch vật lý trị liệu', FALSE),
('Trẻ ho nhẹ không sốt', 'Khoa Nhi', 'nhe', 'Cho trẻ uống nước ấm, mật ong (trẻ trên 1 tuổi), đặt lịch nếu ho trên 5 ngày', FALSE),
('Ngứa mắt, mắt khô', 'Khoa Mắt', 'nhe', 'Nhỏ nước mắt nhân tạo, giảm thời gian nhìn màn hình, đặt lịch kiểm tra', FALSE),
('Đau răng nhẹ khi ăn đồ ngọt', 'Khoa Răng Hàm Mặt', 'nhe', 'Hạn chế đồ ngọt, đánh răng đúng cách, đặt lịch khám răng định kỳ', FALSE),
('Mụn trứng cá nhiều', 'Khoa Da liễu', 'nhe', 'Rửa mặt sạch 2 lần/ngày, không nặn mụn, đặt lịch tư vấn điều trị', FALSE),
('Tê bì tay chân', 'Khoa Nội / Phục hồi chức năng', 'nhe', 'Vận động nhẹ, kiểm tra tư thế ngủ, đặt lịch khám nếu kéo dài trên 1 tuần', FALSE);
