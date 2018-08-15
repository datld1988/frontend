const { Router } = require("express");
const {
  GetAllActivityAction,
  CreateActivityAction,
  UpdateActivityAction,
  DeleteActivityAction
} = require("./controller");
const api = Router();

//Routes
api.get("/:workId", GetAllActivityAction);

api.post("/:workId", CreateActivityAction);
api.post("/update/:activityId", UpdateActivityAction);
api.post("/delete/:activityId", DeleteActivityAction);

//Export
module.exports = api;
