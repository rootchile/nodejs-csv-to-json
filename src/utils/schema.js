const bodyPostSchema = {
	type: 'object',
	required: ["delimiter", "header"],
	properties: {
		delimiter: { 
			type: "string", 
			maxLength: 1,
			minLength: 1,
		},
		header: {
			type: "boolean"
		},
		columns: {
			type: "string"
		},
	},
};

module.exports = {
    bodyPostSchema,
}