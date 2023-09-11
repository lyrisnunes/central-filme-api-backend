const {Router} = require("express");
const usersRoutes = Router();

const multer = require("multer"); // inicializando
const uploadConfig = require("../config/upload"); // Importou 
const upload = multer(uploadConfig.MULTER); // passa info do upload

const UsersControllers = require("../controllers/UsersControllers")
const usersControllers = new UsersControllers();

const ensureAuthenticaded = require("../middlewares/ensureAuthenticaded");

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/", ensureAuthenticaded, usersControllers.update);
usersRoutes.patch("/avatar", ensureAuthenticaded, upload.single("avatar"), (request, response) => {
   console.log(request.file.filename);
   response.json();
})

module.exports = usersRoutes;