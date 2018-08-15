const { Router } = require("express");
const {
  GetAllWorkAction,
  GetUserWorkAction,
  GetFirstLevelWorkAction,
  GetSecondLevelWorkAction,
  GetThirdLevelWorkAction,
  GetDetailWorkAction,
  CreateGoingTopicAction,
  CreateNewTopicAction,
  UpdateTopicAction,
  UpdateNewTopicAction,
  CreateArticleAction,
  UpdateArticleAction,
  DeleteWorkAction,
  SubmitWorkAction,
  OpenWorkAction,
  GetArticleInTopicAction,
  AddArticleToTopicAction,
  DeleteArticleInTopicAction,
  AddPointMemberAction,
  GetReportAction
} = require("./controller");
const api = Router();

//Routes
api.get("/all", GetAllWorkAction);
api.get("/one/:username", GetUserWorkAction);
api.get("/first/:roleCode", GetFirstLevelWorkAction);
api.get("/second/:roleCode", GetSecondLevelWorkAction);
api.get("/third/:roleCode", GetThirdLevelWorkAction);
api.get("/detail/:workId", GetDetailWorkAction);

api.post("/topic/:role", CreateGoingTopicAction);
api.post("/new/topic/:role", CreateNewTopicAction);
api.post("/topic/:topicId/:role", UpdateTopicAction);
api.post("/new/topic/:topicId/:role", UpdateNewTopicAction);

api.post("/article/:role", CreateArticleAction);
api.post("/article/:articleId/:role", UpdateArticleAction);

api.post("/:workId", DeleteWorkAction);

api.post("/submit/:workId", SubmitWorkAction);
api.post("/open/:workId", OpenWorkAction);

api.get("/get/:topicId", GetArticleInTopicAction);
api.post("/add/:topicId/:articleId", AddArticleToTopicAction);
api.post("/delete/:topicId/:articleId", DeleteArticleInTopicAction);

api.post("/point/:topicId", AddPointMemberAction);
api.get("/statistic", GetReportAction);
//Export
module.exports = api;
