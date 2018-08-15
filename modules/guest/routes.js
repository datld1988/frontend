const { Router } = require("express");
const {
  LoginAction,
  ForgotPassAction,
  ChangePassAction,
  NoneResearcherRegisterAction,
  ResearcherRegisterAction,
  InviteAction,
  JoinAction
} = require("./controller");
const api = Router();

//Routes
api.post("/login", LoginAction);
api.post("/forgot/:username", ForgotPassAction);
api.post("/changePass/:username", ChangePassAction);
api.post("/invite/:username", InviteAction);
api.post("/register/none_researcher", NoneResearcherRegisterAction);
api.post("/register/researcher", ResearcherRegisterAction);
api.post("/join/:username", JoinAction);

//Export
module.exports = api;
