const {Router}= require("express");
const tagsRoutes = Router();

const TagsControllers = require("../controllers/TagsControllers")
const tagsControllers = new TagsControllers();

const ensureAuthenticaded = require("../middlewares/ensureAuthenticaded");

tagsRoutes.get("/", ensureAuthenticaded,  tagsControllers.index);


module.exports = tagsRoutes;