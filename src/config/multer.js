import multer from "multer";

// Store files in memory before uploading
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 },
});

export default upload;
