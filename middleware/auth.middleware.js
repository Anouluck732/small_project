const jwt = require('jsonwebtoken'); // นำเข้าโมดูล jsonwebtoken เพื่อใช้ในการสร้างและตรวจสอบ JWT

const verifyToken = (req, res, next) => {
  console.log('Headers:', req.headers); // แสดง header ทั้งหมดของคำขอในคอนโซล
  const authHeader = req.headers["authorization"]; // ดึงค่า authorization header จากคำขอ
  console.log('Auth Header:', authHeader); // แสดงค่า authorization header ในคอนโซล
  
  if (!authHeader) {
    // ถ้าไม่มี authorization header
    return res.status(403).send({ message: "No authorization header provided" }); // ส่งสถานะ 403 และข้อความว่าไม่มี header ให้
  }

  const token = authHeader.split(' ')[1]; // แยก token ออกมาจากค่า header แบบ Bearer <token>
  if (!token) {
    // ถ้าไม่มี token หลัง Bearer
    return res.status(403).send({ message: "No token found in authorization header" }); // ส่งสถานะ 403 และข้อความว่าไม่มี token ให้
  }

  // ตรวจสอบความถูกต้องของ token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // ถ้ามีข้อผิดพลาดในการตรวจสอบ token
      console.error('Token verification error:', err); // แสดงข้อผิดพลาดในคอนโซล
      return res.status(401).send({ message: "Unauthorized", error: err.message }); // ส่งสถานะ 401 และข้อความข้อผิดพลาด
    }
    
    // สร้าง JWT ใหม่
    const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // สร้าง token ใหม่ โดยใช้ id จาก decoded และ secret ที่เก็บในตัวแปรสภาพแวดล้อม, กำหนดเวลาหมดอายุเป็น 1 ชั่วโมง
    
    // ตั้งค่า header ของคำตอบด้วย token ใหม่
    res.setHeader('Authorization', `Bearer ${newToken}`); // ส่ง token ใหม่กลับไปใน header ของคำตอบ
    
    req.userId = decoded.id; // เก็บ id ของผู้ใช้ใน req.userId เพื่อใช้ในขั้นตอนถัดไป
    next(); // เรียกใช้ middleware ถัดไป
  });
};

module.exports = verifyToken; // ส่งออกฟังก์ชัน verifyToken เพื่อให้สามารถใช้งานในไฟล์อื่นได้
