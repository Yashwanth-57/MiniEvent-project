const multer = require("multer");

const multerErrorHandler = (err, req, res, next) => {
  // Multer-specific errors (file size, etc.)
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: err.message,
    });
  }

  // Custom file filter errors
  if (err) {
    return res.status(400).json({
      message: err.message || "File upload error",
    });
  }

  next();
};

module.exports = multerErrorHandler;
