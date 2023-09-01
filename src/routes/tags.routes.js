const {Router}= require("express");
const tagsRoutes = Router();

const sessionsControllers = require("../middlewares/ensureAuthenticated");

const TagsControllers = require("../controllers/TagsControllers")
const tagsControllers = new TagsControllers();

tagsRoutes.get("/", sessionsControllers, tagsControllers.index);


module.exports = tagsRoutes;