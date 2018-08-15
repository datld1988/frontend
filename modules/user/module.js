const expressRouter = require("./routes");

module.exports = {
	name: "user",
	router: expressRouter,
	auth: "*"
}