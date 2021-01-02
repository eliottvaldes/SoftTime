const express = require("express");
const router = express.Router();

// importamos los objetos dentro del controlador llamado schedules controller
const {
renderOrdersAdmin,
renderPending,
renderValidated,
renderRejected
} = require("../controllers/queries.controller");

// Helpers
const { checkSession } = require("../helpers/auth");

// ruta para renderizar la vista de todos los pedidos creados
router.get("/Orders-Admin", checkSession, renderOrdersAdmin);

// ruta para renderizar la vista de todos los pedidos pendientes
router.get("/Orders-Status-Pending", checkSession, renderPending);

// ruta para renderizar la vista de todos los pedidos aceptados
router.get("/Orders-Status-Validated", checkSession, renderValidated);

// ruta para renderizar la vista de todos los pedidos rechazados
router.get("/Orders-Status-Rejected", checkSession, renderRejected);


//exportamos modulo para acceso global a las rutas
module.exports = router;
