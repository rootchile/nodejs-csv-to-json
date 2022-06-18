require("dotenv").config();

const NODE_PORT = process.env.NODE_PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "dev";
const ENABLE_SSL = process.env.ENABLE_SSL || false;
const SSL_PATH = process.env.SSL_PATH = "./ssl";
const FILE_SIZE_MAX_BYTES = process.env.FILE_SIZE_MAX_MB ? process.env.FILE_SIZE_MAX_MB*1024*1024  : 1024*1024*1;
const FILE_TMP_DIR = process.env.FILE_TMP_DIR || "./tmp";
const FILE_DIR = process.env.FILE_DIR || "upload";
const FILE_WHITELIST = ["text/csv"];

module.exports = {
	NODE_PORT,
	NODE_ENV,
	ENABLE_SSL,
	SSL_PATH,
	FILE_SIZE_MAX_BYTES,
	FILE_TMP_DIR,
	FILE_DIR,
	FILE_WHITELIST,
};