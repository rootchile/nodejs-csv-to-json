const { NODE_PORT, NODE_ENV, ENABLE_SSL, SSL_PATH} = require("./config");
const app = require("./app");
const fs = require("fs");
const https = require("https");

console.log("ENABLED SSL", ENABLE_SSL)

if (ENABLE_SSL==="true") {
	https
		.createServer({
			key: fs.readFileSync(`${SSL_PATH}/key.pem`),
			cert: fs.readFileSync(`${SSL_PATH}/cert.pem`),
		}, app)
		.listen(NODE_PORT, ()=>{
			// eslint-disable-next-line no-console
			console.log(`RUNNING\nPORT:${NODE_PORT}\nENV:${NODE_ENV}\nHTTPS=${ENABLE_SSL}`);
		});
        
} else {
	app.listen(NODE_PORT, () => {
		// eslint-disable-next-line no-console
		console.log(`RUNNING\nPORT:${NODE_PORT}\nENV:${NODE_ENV}\nHTTPS=${ENABLE_SSL}`);
	});
}
