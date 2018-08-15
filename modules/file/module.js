const expressRouter = require("./routes");

module.exports = {
	name: "file",
	router: expressRouter,
	auth: "*"
}