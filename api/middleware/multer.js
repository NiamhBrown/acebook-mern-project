const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("!!!FILE", file); 
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, req.user_id);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
