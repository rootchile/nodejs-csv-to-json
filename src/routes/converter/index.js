const express = require("express");
const upload = require("../../utils/uploadFile");
const parserColumn = require("../../utils/parseColumns");
const router = express.Router();
const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("http-status-codes").StatusCodes;
const fs = require("fs");
const readLine = require("readline");
const multer = require("multer");
const Ajv = require("ajv");
const { bodyPostSchema } = require("../../utils/schema");
const ajv = new Ajv({ coerceTypes: true })

router.post("/upload", async (req, res,) => {
	upload(req, res, async (err) => {
		if (err instanceof multer.MulterError) {
			return res.status(BAD_REQUEST).json({ 
				code: err.code,
				message: err.message,
			});
		} else if (err) {
			const status = err.code || INTERNAL_SERVER_ERROR;
			return res.status(status).json({ 
				code: status,
				message: err.message || "Error trying to upload file",
			});
		}
	
		const validate = ajv.compile(bodyPostSchema);
		const isValidData = validate(req.body);

		if(!isValidData) {
			return res.status(BAD_REQUEST).json({ 
				code: BAD_REQUEST,
				errors: validate.errors,
			});
		}

		const { header, delimiter } = req.body;

		let lineReader = readLine.createInterface({
			input: fs.createReadStream(req.file.path),
		})
		let lineNumber = 0;
		let columns = null;

		if(!header) {
			columns = req.columns.split(delimiter)
		}
		const csvToJSON = [];
		
		for await (const line of lineReader) {
			const objJSON = {};

			if(header && lineNumber===0) {
				columns = line.split(delimiter);
			}
			
			if (lineNumber > 0) {
				const data = line.split(delimiter);

				for (let i in columns) {
					objJSON[columns[i]] = parserColumn(data[i])
				}

				csvToJSON.push(objJSON);
			}
			lineNumber++;
		}
		fs.unlinkSync(req.file.path);
		return res.status(OK).json(csvToJSON);
	});
});

module.exports = router;