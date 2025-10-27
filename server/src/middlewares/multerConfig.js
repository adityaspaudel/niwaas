import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure upload directory exists
const uploadPath = path.join("src", "uploads");
if (!fs.existsSync(uploadPath)) {
	fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadPath);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + path.extname(file.originalname));
	},
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
	const allowedTypes = /jpeg|jpg|png/;
	const ext = path.extname(file.originalname).toLowerCase();
	if (allowedTypes.test(ext)) cb(null, true);
	else cb(new Error("Only image files are allowed!"), false);
};

// Multer instance
const upload = multer({ storage, fileFilter });

export default upload;
