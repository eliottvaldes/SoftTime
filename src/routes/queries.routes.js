const express = require("express");
const router = express.Router();

// importamos los objetos dentro del controlador llamado schedules controller
const {
renderOrdersAdmin,
renderPending,
renderValidated,
renderRejected,
renderRecently,
renderLongAgo,
renderPendinguser,
renderValidateduser,
renderRejecteduser,
renderRecentlyuser,
renderLongAgouser
} = require("../controllers/queries.controller");

// Helpers
const { checkSession } = require("../helpers/auth");

//----------------------ADMIN USER---------------------
// pedidos creados
router.get("/query/filter/orders-admin", checkSession, renderOrdersAdmin);

// pedidos pendientes
router.get("/query/filter/orders-status-pending", checkSession, renderPending);

// pedidos aceptados
router.get("/query/filter/orders-status-validated", checkSession, renderValidated);

// pedidos rechazados
router.get("/query/filter/orders-status-rejected", checkSession, renderRejected);

// pedidos recientes (solo muestra 10)
router.get("/query/filter/orders-date-recently", checkSession, renderRecently);

// pedidos antiguos (solo muestra 10)
router.get("/query/filter/orders-date-Long-Ago", checkSession, renderLongAgo);

//pedidos personalizables
router.get("/query/filter/orders-type-customize", checkSession, renderLongAgo);

//pedidos no personalizables (generales)
router.get("/query/filter/orders-type-non-customize", checkSession, renderLongAgo);




//---------------------NORMAL USER-------------------------- 
// pedidos pendientes
router.get("/user/query/filter/orders-status-pending", checkSession, renderPendinguser);

// pedidos aceptados
router.get("/user/query/filter/orders-status-validated", checkSession, renderValidateduser);

// pedidos rechazados
router.get("/user/query/filter/orders-status-rejected", checkSession, renderRejecteduser);

// pedidos recientes (solo muestra 10)
router.get("/user/query/filter/orders-date-recently", checkSession, renderRecentlyuser);

// pedidos antiguos (solo muestra 10)
router.get("/user/query/filter/orders-date-Long-Ago", checkSession, renderLongAgouser);


//exportamos modulo para acceso global a las rutas
module.exports = router;
