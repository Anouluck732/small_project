const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    console.log('Upload path:', uploadPath);

    // Ensure the uploads directory exists
    try {
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
    } catch (err) {
      console.error("Error creating directory:", err);
      return cb(new Error("Failed to create upload directory"));
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    console.log('Generated filename:', uniqueFileName);
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

module.exports = upload;
