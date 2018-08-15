const { Router } = require("express");
const {GetParentOfficesAction, GetChildrenOfficesAction, GetDetailOfficeAction } = require("./controller");
const api = Router();

//Routes
api.get("/", GetParentOfficesAction);
api.get("/:parent_code", GetChildrenOfficesAction);
api.get("/:code", GetDetailOfficeAction);

//Export
module.exports = api;