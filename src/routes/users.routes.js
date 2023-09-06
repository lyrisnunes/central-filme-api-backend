const {Router}= require("express");
const usersRoutes = Router();


const UsersControllers = require("../controllers/UsersControllers")
const usersControllers = new UsersControllers();

const ensureAuthenticaded = require("../middlewares/ensureAuthenticaded");



usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/", ensureAuthenticaded, usersControllers.update);

module.exports = usersRoutes;