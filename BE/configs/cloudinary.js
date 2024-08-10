const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Sử dụng tên biến môi trường chính xác
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Cấu hình Storage cho Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'product_images', // Thay đổi theo nhu cầu của bạn
    allowed_formats: ['jpg', 'png', 'jpeg'],
    // Thêm các tham số khác nếu cần
  },
});

const upload = multer({ storage });

module.exports = { upload, cloudinary };
