const express = require("express");
const router = express.Router();

// importamos los objetos dentro del controlador llamado orders controller
const {
  renderCharts
} = require("../controllers/charts.controller");

// requerimos la funcion para mostrar si está autenticado y cuenta con sesión activa
const { checkSession } = require("../helpers/auth");

//funcion para checar el privilegio del usuario
function requireRole(role) {
  return function (req, res, next) {
    if (req.user.privilege.trim() == role) {
      next();
    } else {
      res.send(403);
    }
  }
}

router.get("/charts/general", checkSession, requireRole("admin"), renderCharts);

//exportamos modulo para acceso global a las rutas
module.exports = router;
