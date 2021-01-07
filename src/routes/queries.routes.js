const express = require("express");
const router = express.Router();

// importamos los objetos dentro del controlador llamado queries controller
const {
renderOrdersAdmin,
renderPending,
renderValidated,
renderRejected,
renderRecently,
renderLongAgo,
renderCustomizable,
renderNonCustomizable,
renderAllOrders,
renderPendinguser,
renderValidateduser,
renderRejecteduser,
renderRecentlyuser,
renderLongAgouser,
renderDetailsuser,
renderCustomizableuser,
renderNonCustomizableuser
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
router.get("/query/filter/orders-type-customize", checkSession, renderCustomizable);

//pedidos no personalizables (generales)
router.get("/query/filter/orders-type-non-customize", checkSession, renderNonCustomizable);




//---------------------NORMAL USER-------------------------- 
// pedidos creados
router.get("/query/filter/orders-all", checkSession, renderAllOrders);

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

//Muestra los detalles de el producto
router.get("/user/query/filter/datails-order/:id", checkSession, renderDetailsuser);

//pedidos personalizables
router.get("/user/query/filter/orders-type-customizable", checkSession, renderCustomizableuser);

//pedidos no personalizables (generales)
router.get("/user/query/filter/orders-type-non-customizable", checkSession, renderNonCustomizableuser);


//exportamos modulo para acceso global a las rutas
module.exports = router;
