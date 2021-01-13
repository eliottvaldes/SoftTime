const express = require("express");
const router = express.Router();

// importamos los objetos dentro del controlador llamado queries controller
const {
    renderAllUsers,
    renderUserDetails,
    renderAllOrdersAdmin,
    renderOrdersAdmin,
    renderSellAdminOrders,
    renderPending,
    renderValidated,
    renderRejected,
    renderRecently,
    renderLongAgo,
    renderDetails,
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

//----------------------ADMIN USER---------------------
// all users
router.get("/query/my-team", checkSession, requireRole("admin"), renderAllUsers);

// details specific user
router.get("/query/my-team/details/:id", checkSession, requireRole("admin"), renderUserDetails);

// TODOS pedidos creados
router.get("/query/filter/all-orders", checkSession, requireRole("admin"), renderAllOrdersAdmin);

// pedidos por administrador de ventas
router.get("/query/filter/sell-admins-orders/:user", checkSession, requireRole("admin"), renderSellAdminOrders);

// pedidos creados
router.get("/query/filter/orders-admin", checkSession, requireRole("admin"), renderOrdersAdmin);

// pedidos pendientes
router.get("/query/filter/orders-status-pending", checkSession, requireRole("admin"), renderPending);

// pedidos aceptados
router.get("/query/filter/orders-status-validated", checkSession, requireRole("admin"), renderValidated);

// pedidos rechazados
router.get("/query/filter/orders-status-rejected", checkSession, requireRole("admin"), renderRejected);

// pedidos recientes (solo muestra 10)
router.get("/query/filter/orders-date-recently", checkSession, requireRole("admin"), renderRecently);

// pedidos antiguos (solo muestra 10)
router.get("/query/filter/orders-date-Long-Ago", checkSession, requireRole("admin"), renderLongAgo);

//Muestra los detalles de el producto
router.get("/admin/query/filter/datails-order/:id", checkSession, requireRole("admin"), renderDetails);

//pedidos personalizables
router.get("/query/filter/orders-type-customizable", checkSession, requireRole("admin"), renderCustomizable);

//pedidos no personalizables (generales)
router.get("/query/filter/orders-type-non-customizable", checkSession, requireRole("admin"), renderNonCustomizable);




//---------------------NORMAL USER-------------------------- 
// pedidos creados
router.get("/query/filter/orders-all", checkSession, requireRole("manager"), renderAllOrders);

// pedidos pendientes
router.get("/user/query/filter/orders-status-pending", checkSession, requireRole("manager"), renderPendinguser);

// pedidos aceptados
router.get("/user/query/filter/orders-status-validated", checkSession, requireRole("manager"), renderValidateduser);

// pedidos rechazados
router.get("/user/query/filter/orders-status-rejected", checkSession, requireRole("manager"), renderRejecteduser);

// pedidos recientes (solo muestra 10)
router.get("/user/query/filter/orders-date-recently", checkSession, requireRole("manager"), renderRecentlyuser);

// pedidos antiguos (solo muestra 10)
router.get("/user/query/filter/orders-date-Long-Ago", checkSession, requireRole("manager"), renderLongAgouser);

//Muestra los detalles de el producto
router.get("/user/query/filter/datails-order/:id", checkSession, requireRole("manager"), renderDetailsuser);

//pedidos personalizables
router.get("/user/query/filter/orders-type-customizable", checkSession, requireRole("manager"), renderCustomizableuser);

//pedidos no personalizables (generales)
router.get("/user/query/filter/orders-type-non-customizable", checkSession, requireRole("manager"), renderNonCustomizableuser);


//exportamos modulo para acceso global a las rutas
module.exports = router;
