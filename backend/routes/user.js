
const express = require("express");// Express 모듈 불러오기
const router = express.Router();// Express의 Router 기능 사용 (라우터 분리용)
const bcrypt = require("bcrypt");// 비밀번호 해시화를 위한 bcrypt 불러오기
const axios = require("axios")
const jwt = require("jsonwebtoken")

// Mongoose 사용자 모델 불러오기
const User = require("../models/User");


// POST /signup : 회원가입 처리 라우트
router.post("/signup", async (req, res) => {
  try {
    // 클라이언트에서 전달된 username과 password 추출
    const { username, password } = req.body;

    // 동일한 username이 이미 존재하는지 확인
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      // 이미 존재하면 400 에러 반환
      return res.status(400).json({ message: "이미 존재하는 사용자입니다." });
    }

    // 비밀번호를 bcrypt로 해시 처리 (보안 강화)
    const hashedPassword = await bcrypt.hash(password, 10); //  10진수 암호화

    // 새로운 사용자 인스턴스 생성
    const user = new User({
      username,                  // 사용자 이름
      password: hashedPassword, // 해시된 비밀번호 저장
    });

    // DB에 사용자 저장
    await user.save();

    // 성공 응답 반환
    res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    // 서버 오류 발생 시 500 에러 응답
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
    console.log(error); // 콘솔에 에러 로그 출력
  }
});


router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username }).select("+password")

    console.log(user)
    if (!user) {
      return res.status(401).json({ message: "사용자 없음" })

    }
    if (!user.isActive) {
      return res.status(401).json({ message: "비활성 계정입니다. 관리자에게 물어봐요" })

    }
    if (user.isLoggedIn) {

      const existingToken = req.cookies.token;
      if (!existingToken) {
        user.isLoggedIn = false;
        await user.save()
      } else {
        return res.status(401).json({ message: "이미 다른 기기에서 로그인 되었어요." })
      }


    }
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      user.failedLoginAttempts += 1;
      user.lastLoginAttempt = new Date()

      if (user.failedLoginAttempts >= 5) {
        user.isActive = false;
        await user.save()
        return res.status(401).json({ message: "비밀번호가 5회이상 틀려 비활성 되었습니다." })
      }
      await user.save()
      return res.status(401).json({
        message: "비밀번호가 일치하지 않습니다.",
        remainingAttempts: 5 - user.failedLoginAttempts,
      })
    }

    user.failedLoginAttempts = 0;
    user.lastLoginAttempt = new Date()
    user.isLoggedIn = true

    try {
      const response = await axios.get("https://api.ipify.org?format=json")
      const ipAddress = response.data.ip
      user.ipAddress = ipAddress;

    } catch (ipError) {
      console.error("IP주소 가져오는 중 오류 발생: ", ipError.message)
    }
    await user.save()

    const token = jwt.sign({
      userId: user._id,
      username: user.username
    },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    )

    console.log(token)

    res.cookie('token', token, {
      httpOnly: true,
       secure: true,               // ✅ 배포환경이면 true
  sameSite: 'None'            // ✅ Vercel → Cloudtype 간 요청 허용을 위해 꼭 필요
      //나중에'None'으로 바꾸기.
      //     maxAge: 24 * 60 * 60 * 1000
    })
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.json({ user: userWithoutPassword });

  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." })

    console.log(error)
  }
})


router.post("/logout", async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("🍪 받은 쿠키:", req.cookies);
    if (!token) {
      return res.status(400).json({ message: "이미 로그아웃된 상태입니다." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (user) {
        user.isLoggedIn = false;
        await user.save();
      }
    } catch (error) {
      console.log("토큰 검증 오류: ", error.message);
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.json({ message: "로그아웃되었습니다." });
  } catch (error) {
    console.log("로그아웃 오류: ", error.message);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});
router.delete("/delete/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
    res.json({ message: "사용자가 성공적으로 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});


router.post("/verify-token", (req, res) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(400).json({
      isValid: false,
      message: "토큰이 없습니다."
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return res.status(200).json({
      isValid: true,
      user: decoded
    })
  } catch (error) {
    return res.status(401).
      json({

        isValid: false,
        message: "유효하지 않은 토큰입니다."
      })
  }
})
// 이 라우터를 외부에서 사용할 수 있도록 내보내기
module.exports = router;
