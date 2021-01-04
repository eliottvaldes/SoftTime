const express = require("express");
const router = express.Router();

// importamos los objetos dentro del controlador llamado schedules controller
const {
renderOrdersAdmin,
renderPending,
renderValidated,
renderRejected,
renderRecently,
renderLongAgo
} = require("../controllers/queries.controller");

// Helpers
const { checkSession } = require("../helpers/auth");

// pedidos creados
router.get("/Orders-Admin", checkSession, renderOrdersAdmin);

// pedidos pendientes
router.get("/Orders-Status-Pending", checkSession, renderPending);

// pedidos aceptados
router.get("/Orders-Status-Validated", checkSession, renderValidated);

// pedidos rechazados
router.get("/Orders-Status-Rejected", checkSession, renderRejected);

// pedidos recientes (solo muestra 10)
router.get("/Orders-Date-Recently", checkSession, renderRecently);

// pedidos antiguos (solo muestra 10)
router.get("/Orderes-Date-Long-Ago", checkSession, renderLongAgo);


//exportamos modulo para acceso global a las rutas
module.exports = router;
