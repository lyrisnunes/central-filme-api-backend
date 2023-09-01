const {Router}= require("express");
const notesRoutes = Router();

const NotesControllers = require("../controllers/Notescontrollers")
const notesControllers = new NotesControllers();

const sessionsControllers = require("../middlewares/ensureAuthenticated");
notesRoutes.use(sessionsControllers);

notesRoutes.get("/", notesControllers.index);
notesRoutes.post("/", notesControllers.create);
notesRoutes.get("/:id", notesControllers.show);
notesRoutes.delete("/:id", notesControllers.delete);


module.exports = notesRoutes;