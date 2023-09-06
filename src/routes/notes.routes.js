const {Router}= require("express");
const notesRoutes = Router();

const NotesControllers = require("../controllers/Notescontrollers")
const notesControllers = new NotesControllers();

const ensureAuthenticaded = require("../middlewares/ensureAuthenticaded");
notesRoutes.use(ensureAuthenticaded);

notesRoutes.post("/", notesControllers.create);
notesRoutes.get("/:id", notesControllers.show);
notesRoutes.delete("/:id", notesControllers.delete);
notesRoutes.get("/", notesControllers.index);



module.exports = notesRoutes;