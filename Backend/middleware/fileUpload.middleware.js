const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter: function (req, file, cb) {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    if (path.extname(file.originalname) != ext)
      return cb(new Error("invalid extension"), false);
    cb(false, true);
  },
});
module.exports = upload;
