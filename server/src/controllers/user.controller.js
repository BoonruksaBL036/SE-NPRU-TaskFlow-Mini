// import library สำหรับเข้ารหัสรหัสผ่าน
const bcrypt = require("bcrypt");

// import library สำหรับสร้าง JWT token
const jwt = require("jsonwebtoken");

// import Model ของ User จาก mongoose
const UserModel = require("../models/User");

// โหลดตัวแปรจากไฟล์ .env
require("dotenv").config();

// ดึง secret key สำหรับใช้ sign JWT
const { generateToken } = require("../../libs/utils");

const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  // ตรวจสอบ input
  if (!fullName || !email || !password) {
    return res.status(400).json({
      message: "Please provide fullname, email and password",
    });
  }

  try {
    // เช็ค email ซ้ำ
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "This email is already existed",
      });
    }

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // สร้าง user ใหม่
    const user = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    if (user) {
      const token = generateToken(user._id, res);

      // ส่ง response ตาม format ที่ต้องการ
      res.status(201).json({
        user: {
          _id: user._id,
          name: user.fullName,
          email: user.email,
        },
        accessToken: token,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some errors occurred while registering user",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // ตรวจสอบ input
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }

  try {
    // หา user จาก email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ตรวจสอบ password
    const isPasswordMatched = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // สร้าง JWT token และเก็บลง cookie
    const token = generateToken(user._id, res);

    console.log(`User Logged In: ${user.email} (${user.fullName})`);

    // ส่งข้อมูล user กลับ
    res.json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.fullName,
      },
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some errors occurred while logging in user",
    });
  }
};

// ฟังก์ชันสำหรับ logout โดยลบ cookie token
const logOut = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 }); // ลบ cookie โดยตั้งค่าเป็นค่าว่างและหมดอายุทันที
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some errors occurred while logging out user",
    });
  }
};

const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error while checking auth" });
  }
};

module.exports = { register, login, logOut, checkAuth };
