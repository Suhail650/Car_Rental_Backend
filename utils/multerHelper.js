const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + file.originalname;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg and jpg files are allowed!"));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
