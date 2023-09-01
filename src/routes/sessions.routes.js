const {Router}= require("express")
const sessionsRoutes = Router();

const SessionsControllers = require("../controllers/SessionsControlers");
const sessionsControllers = new SessionsControllers();

sessionsRoutes.post("/", sessionsControllers.create);

module.exports = sessionsRoutes;

