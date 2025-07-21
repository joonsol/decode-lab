const express = require("express");
const router = express.Router();
const Work = require("../models/Work");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3'); // S3 파일 삭제
const { marked } = require('marked'); // 마크다운 파서
// S3 클라이언트 설정
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY
    }
});
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "토큰이 없습니다.11" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next()
    } catch (error) {

        return res.status(403).json({ message: "유효하지 않은 토큰 123" })
    }
}
router.post("/", async (req, res) => {
    try {
        const { title, desc1, desc2, client, category, thumb, link } = req.body;

        const latestWork = await Work.findOne().sort({ number: -1 })
        const nextNumber = latestWork ? latestWork.number + 1 : 1;

        const work = new Work({
            number: nextNumber,
            title,
            desc1,
            desc2,
            client,
            category,
            thumb,
            link
        })

        await work.save();
        res.status(201).json({ message: "성공적 등록" })
    } catch (error) {
         console.error("❌ Work 저장 중 오류:", error); // ← 이거 꼭 추가
        return res.status(500).json({
            message: "서버 오류가 발생했습니다.",

        })

    }
})

router.get("/", async (req, res) => {
    try {
        const works = await Work.find().sort({
            createdAt: -1
        })
        res.json(works)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "서버에러" })
    }
})
router.get("/:id", async (req, res) => {
    try {
        const work = await Work.findById(req.params.id)
        if (!work) {
            return res.status(404).json({ message: "작업물을 찾을 수 없음" })
        }

        let ip;

        try {
            const response = await axios.get("https://api.ipify.org?format=json");
            ip = response.data.ip;
        } catch (error) {
            console.log("IP를 가져오던 중 오류 발생:", error.message)
            ip = req.ip
        }
        const userAgent = req.headers["user-agent"];

        let htmlContent;
        try {
            htmlContent = marked.parse(work.thumb || '')
        } catch (error) {
            console.log("마크다운 변환 실패", error)
            htmlContent = work.thumb
        }

        const responseData = {
            ...work.toObject(),
            renderedContent: htmlContent
        }

        res.json(responseData)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "서버에러" })

    }
})
router.put("/:id", async (req, res) => {
    try {
        const {
            title,
            desc1,
            desc2,
            client,
            category,
            thumb,
            link
        } = req.body;
        const work = await Work.findById(req.params.id)
        if (!work) {
            return res.status(404).json({ message: "작업물을 찾을 수 없음" })
        }


        const imgRegex = /https:\/\/[^"']*?\.(?:png|jpg|jpeg|gif|PNG|JPG|JPEG|GIF)/g;

        const oldContentImages = (work.thumb || []).filter(url => imgRegex.test(url));
        const newContentImages = (thumb || []).filter(url => imgRegex.test(url));
        const deletedImages = oldContentImages.filter(
            (url) => !newContentImages.includes(url)
        );


        const deletedFiles = (work.thumb).filter(
            (url) => !(thumb || []).includes(url)
        )

        const getS3KeyFromUrl = (url) => {
            try {
                const urlObj = new URL(url)
                return decodeURIComponent(urlObj.pathname.substring(1));
            } catch (error) {
                console.log('url 파싱 에러:', error);
                return null;
            }
        }

        const allDeletedFiles = [...deletedFiles, ...deletedImages]

        for (const thumb of allDeletedFiles) {
            const key = getS3KeyFromUrl(thumb);
            if (key) {
                console.log("파일 삭제 완료: ", key)

                try {
                    await s3Client.send(
                        new DeleteObjectCommand({
                            Bucket: process.env.AWS_BUCKET_NAME,
                            key: key
                        })
                    )
                } catch (error) {
                    console.log("s3 파일 삭제 에러:", error)
                }
            }
        }

        work.title = title;
        work.desc1 = desc1;
        work.desc2 = desc2;
        work.client = client;
        work.category = category;
        work.thumb = thumb;
        work.link = link;

        await work.save()
        res.json({ message: "성공적 수정" }, work)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "서버에러" })
    }
})
router.delete("/:id", async (req, res) => {
    try {

        const work = await Work.findById(req.params.id)


        if (!work) {
            return res.status(404).json({ message: "문의 찾을 수 없음" })
        }

        const imgRegex =
            /https:\/\/[^"']*?\.(?:png|jpg|jpeg|gif|PNG|JPG|JPEG|GIF)/g;
       const contentImages = (work.thumb || []).filter((url) => imgRegex.test(url));

        const getS3KeyFromUrl = (url) => {
            try {
                const urlObj = new URL(url);
                return decodeURIComponent(urlObj.pathname.substring(1));
            } catch (error) {
                console.log("URL 파싱 에러: ", error);
                return null;
            }
        };
        const allFiles = [...contentImages, ...(work.thumb || [])];

        for (const fileUrl of allFiles) {
            const key = getS3KeyFromUrl(fileUrl)

            if (key) {
                console.log("파일 삭제 완료: ", key)
                try {
                    await s3Client.send(
                        new DeleteObjectCommand({
                            Bucket: process.env.AWS_BUCKET_NAME,
                            Key: key,
                        })
                    )
                } catch (error) {
                    console.log("S3 파일 삭제 에러: ", error)
                }
            }
        }
        await work.deleteOne()
          res.json({ message: "작업 게시글 및 관련 파일 삭제 완료" }); // ✅ 응답 추가
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "서버에러" })

    }
})
module.exports = router
