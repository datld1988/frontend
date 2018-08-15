const expressRouter = require("./routes");

module.exports = {
	name: "work",
	router: expressRouter,
	auth: "*"
}