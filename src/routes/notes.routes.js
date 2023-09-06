const {Router}= require("express");
const notesRoutes = Router();

const NotesControllers = require("../controllers/Notescontrollers")
const notesControllers = new NotesControllers();


notesRoutes.post("/", notesControllers.create);
notesRoutes.get("/:id", notesControllers.show);
notesRoutes.get("/", notesControllers.index);
notesRoutes.delete("/:id", notesControllers.delete);


module.exports = notesRoutes;