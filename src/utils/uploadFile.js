const multer = require("multer");
const { FILE_DIR, FILE_SIZE_MAX_BYTES, FILE_WHITELIST } = require("../config");
const upload = multer({
	dest: FILE_DIR, 
	limits: {
		fileSize: FILE_SIZE_MAX_BYTES 
	},
	fileFilter: (_req, file, cb) => {
		if (!FILE_WHITELIST.includes(file.mimetype)) {
			const error = new Error("File is not allowed");
			error.code = BAD_REQUEST;
			return cb(error);
		}
		cb(null, true);
	}, 
}).single("file");

module.exports = upload;