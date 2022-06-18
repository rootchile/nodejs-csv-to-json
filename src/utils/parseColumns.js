const parserColumn = (col) => {
	if (col === "") 
		return col;

	const number = Number(col)
	const booleans = ["true", "false"]
	if (booleans.includes(col)) {
		return col === "true" ? true : false
	}
	return isNaN(number) ? col : number
}
module.exports = parserColumn;
