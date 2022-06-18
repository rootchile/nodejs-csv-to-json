const Live = require("./live/");
const Converter = require("./converter");
module.exports = (app) => {
	app.use(Live);
    app.use(Converter);
};
