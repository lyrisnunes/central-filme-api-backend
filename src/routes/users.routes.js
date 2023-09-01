const {Router}= require("express");
const usersRoutes = Router();

 const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const UsersControllers = require("../controllers/UsersControllers")
const usersControllers = new UsersControllers();

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/", ensureAuthenticated, usersControllers.update);

module.exports = usersRoutes;