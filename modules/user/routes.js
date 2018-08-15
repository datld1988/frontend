const { Router } = require("express");
const { GetOneUserAction, GetAllUserAction, EditNoneResearcherAction, EditResearcherAction, ChangePassAction } = require("./controller");
const api = Router();

//Routes
api.get("/one", GetOneUserAction);
api.get("/all", GetAllUserAction);

api.post("/none_researcher", EditNoneResearcherAction);
api.post("/researcher", EditResearcherAction);
api.post("/change_pass", ChangePassAction);

//Export
module.exports = api;