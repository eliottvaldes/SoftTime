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
    var privilege = req.user.privilege.trim() == role ? true : false;
    var admin = req.user.privilege.trim() == "admin" ? true : false;
    if (privilege) {
      next();
    } else {
      res.render("error", {
        admin: admin,
        httperr: "Sin autorizacion",
        descripcion: "Usted no tiene acceso a esta pagina."
      });
    }
  }
}

router.get("/charts/general", checkSession, requireRole("admin"), renderCharts);

//exportamos modulo para acceso global a las rutas
module.exports = router;
