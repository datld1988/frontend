const expressRouter = require("./routes");

module.exports = {
	name: "activity",
	router: expressRouter,
	auth: "*"
}