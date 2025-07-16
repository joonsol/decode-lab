const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")
const multer = require("multer")
const { v4: uuidv4 } = require("uuid")
const router = require("express").Router()

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

const imageUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

const fileUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024
    }
})


const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: '인증되지 않은 요청입니다.' })
    }
    next()
}

router.post('/image', verifyToken, imageUpload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        const fileExtension = file.originalname.split('.').pop()
        const fileName = `${uuidv4()}.${fileExtension}`;


        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `post-images/${fileName}`,
            Body: file.buffer,
            ContentType: file.mimetype
        }

        const command = new PutObjectCommand(uploadParams)
        await s3Client.send(command)
        const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/post-images/${fileName}`;

        res.json({ imageUrl })

    } catch (error) {
        console.error('s3 upload error: ', error)
        res.status(500).json({ error: 'Failed to upload image' })
    }
})
router.post('/work-image', verifyToken, imageUpload.array('image', 3), async (req, res) => {
    try {
        const files = req.files;
        const uploadUrls = [];

    console.log("✅ 업로드된 파일 수:", req.files.length);
        for (const file of files) {

            const fileExtension = file.originalname.split('.').pop()
            const fileName = `${uuidv4()}.${fileExtension}`;


            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `work-images/${fileName}`,
                Body: file.buffer,
                ContentType: file.mimetype
            }

            const command = new PutObjectCommand(uploadParams)
            await s3Client.send(command)
            const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/work-images/${fileName}`;
            uploadUrls.push(imageUrl)

        }
        res.json({ imageUrls:uploadUrls })

    } catch (error) {
        console.error('s3 upload error: ', error)
        res.status(500).json({ error: 'Failed to upload image' })
    }
})
router.post('/file', verifyToken, fileUpload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const originalname = file.originalname;
        const decodedFileName = decodeURIComponent(originalname);




        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `post-files/${decodedFileName}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ContentDisposition: `attachment; filename*=UTF-8''${encodeURIComponent(decodedFileName)}`,
        }

        const command = new PutObjectCommand(uploadParams)
        await s3Client.send(command)
        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/post-files/${decodedFileName}`;

        res.json({
            fileUrl,
            originalname: decodedFileName
        })

    } catch (error) {
        console.error('s3 upload error: ', error)
        res.status(500).json({ error: 'Failed to upload image' })
    }
})


module.exports = router
