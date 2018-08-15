const { Router } = require("express");
const {
  CheckRoleAction,
  CheckUserAction,
  GetAllFileAction,
  DeleteFileAction
} = require("./controller");
const api = Router();

//Routes
api.get("/checkRole/:workId", CheckRoleAction);
api.get("/checkUser/:username", CheckUserAction);
api.get("/all/:workId", GetAllFileAction);
api.post("/delete/:workId/:fileId", DeleteFileAction);

//Export
module.exports = api;
