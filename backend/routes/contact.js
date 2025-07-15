// 필요한 모듈 불러오기
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact"); // Contact 모델 (MongoDB 스키마)
const jwt = require("jsonwebtoken"); // JWT를 이용한 인증 처리

// 미들웨어: JWT 토큰 인증
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // 쿠키에서 토큰을 가져옴

    // 토큰이 없을 경우 요청 거부
    if (!token) {
        return res.status(401).json({ message: "토큰이 없습니다." });
    }

    try {
        // 토큰이 유효한지 검증
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // 검증된 유저 정보를 요청 객체에 저장
        next(); // 다음 미들웨어 또는 라우트 핸들러로 진행
    } catch (error) {
        // 유효하지 않은 토큰일 경우
        return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    }
};

// POST /api/contact : 문의 등록 라우트
router.post("/", async (req, res) => {
    try {
        // 요청 본문에서 문의 정보 추출
        const { name, email, phone, message, status } = req.body;

        // Contact 모델의 새 인스턴스 생성
        const contact = new Contact({
            name,
            email,
            phone,
            message,
            status,
        });

        // DB에 저장
        await contact.save();

        // 성공 응답
        res.status(201).json({ message: "문의가 성공적으로 등록" });
    } catch (error) {
        // 에러 발생 시 로그 출력 및 에러 응답
        console.log(error);
        res.status(500).json({ message: "서버에러" });
    }
});


// 전체 문의 목록 조회 라우터 (GET /api/contact)
router.get("/", async (req, res) => {
    try {
        // Contact 컬렉션에서 모든 문서를 createdAt 기준으로 내림차순 정렬하여 조회
        const contacts = await Contact.find().sort({
            createdAt: -1, // 최신순 정렬
        });

        // 조회 결과를 JSON 형식으로 클라이언트에 응답
        res.json(contacts);
    } catch (error) {
        // 에러 발생 시 콘솔에 출력하고 서버 오류 메시지 응답
        console.log(error);
        res.status(500).json({ message: "서버에러" });
    }
});


// 특정 문의 상세 조회 라우터 (GET /api/contact/:id)
router.get("/:id", async (req, res) => {
    try {
        // URL 파라미터에서 id 추출하여 해당 문의 데이터를 조회
        const contact = await Contact.findById(req.params.id);

        // 해당 ID의 문의가 없을 경우 404 응답
        if (!contact) {
            return res.status(404).json({ message: "문의글 찾을 수 없음" });
        }

        // 조회된 문의 정보를 클라이언트에 응답
        res.json(contact);
    } catch (error) {
        // 예외 처리: 잘못된 ID 형식 등으로 발생할 수 있는 에러를 잡아 처리
        console.log(error);
        res.status(500).json({ message: "서버에러" });
    }
});
// 특정 문의 상세 조회 라우터 (GET /api/contact/:id)
router.put("/:id", async (req, res) => {
    try {
        const { status } = req.body
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
        if (!contact) {
            return res.status(404).json({ message: "문의글 찾을 수 없음" });
        }

    } catch (error) {
        // 예외 처리: 잘못된 ID 형식 등으로 발생할 수 있는 에러를 잡아 처리
        console.log(error);
        res.status(500).json({ message: "서버에러" });
    }
});
// 특정 문의 상세 조회 라우터 (GET /api/contact/:id)
router.delete("/:id", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(
            req.params.id
        )
        if (!contact) {
            return res.status(404).json({ message: "문의글 찾을 수 없음" });
        }

        res.json({ message: "성공적 삭제" })
    } catch (error) {
        // 예외 처리: 잘못된 ID 형식 등으로 발생할 수 있는 에러를 잡아 처리
        console.log(error);
        res.status(500).json({ message: "서버에러" });
    }
});
// 라우터 내보내기
module.exports = router;
