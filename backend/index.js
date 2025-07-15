require("dotenv").config()
const express =require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser=require("cookie-parser")
const app =express()
const PORT=3000;


const userRoutes = require("./routes/user")
const noticeRoutes=require("./routes/notice")
const uploadRoutes=require("./routes/upload")
const contactRoutes=require("./routes/contact")


app.use(cors({
  origin: [
    "http://localhost:5173",
    // "https://lix-co-project.vercel.app"  // 여기가 꼭 있어야 함!
  ],
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())

app.use("/api/auth",userRoutes)
app.use("/api/contact",contactRoutes)
app.use("/api/notice",noticeRoutes)
app.use("/api/upload",uploadRoutes)

app.get("/",(req, res)=>{
    res.send("hello world")
})

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongodb와 연결 성공")
}).catch((error)=>console.log("실패",error))

console.log("✅ 현재 MONGO_URI 값:", process.env.MONGO_URI);

app.listen(PORT,()=>{
    console.log('Server is running')
})