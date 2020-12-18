const express = require("express");
const router = express.Router();

// del archivo controladores solamente voy a requerir el renderIndex y rendeAbout del objeto
const { renderIndex, renderAbout } = require("../controllers/index.controller");

//ruta para pagina principal
router.get("/", renderIndex);

//ruta para renderizar vista about
router.get("/about", renderAbout);


//exportamos para tener acceso de cualquier parte del proyecto
module.exports = router;
