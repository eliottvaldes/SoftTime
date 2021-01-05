const express = require("express");
const router = express.Router();

// importamos los objetos dentro del controlador llamado orders controller
const {
  renderCharts
} = require("../controllers/charts.controller");

// requerimos la funcion para mostrar si está autenticado y cuenta con sesión activa
const { checkSession } = require("../helpers/auth");

router.get("/charts/general", checkSession, renderCharts);

//exportamos modulo para acceso global a las rutas
module.exports = router;
