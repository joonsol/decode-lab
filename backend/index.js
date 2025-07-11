require("dotenv").config()
const express =require("express")
const mongoose = require("mongoose")
const cookieParser=require("cookie-parser")

const app =express()
const PORT=3000;


const userRoutes = require("./routes/user")

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())

app.use("/api/auth",userRoutes)
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