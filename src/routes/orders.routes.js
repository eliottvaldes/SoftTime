const express = require("express");
const router = express.Router();
const multer = require("multer");
const getStream = require('get-stream')
const upload = multer()

// importamos los objetos dentro del controlador llamado orders controller
const {
  renderOrderForm,
  createNewOrder,
  renderOrders,
  renderEditForm,
  updateOrder,
  deleteOrder,
  deleteAdminOrder,
  renderChangeStatus,
  renderUpdatedStatus
} = require("../controllers/orders.controller");

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

// ruta para renderizar formulario de pedido nuevo
router.get("/orders/add", checkSession, requireRole("sell"), renderOrderForm);

router.post("/orders/new-order", checkSession, requireRole("sell"), upload.single('img'), createNewOrder);

// ruta para renderizar la vista de todos los pedidos creados
router.get("/orders", checkSession, requireRole("sell"), renderOrders);

// ruta para renderizar un formulario para editar el formulario pedidos se usa el parametro id para indicar el id del pedido que se va a modificar
router.get("/orders/edit/:id", checkSession, requireRole("sell"), renderEditForm);
// Usamos metodo put debido a que se usa para hacer referencia paraa actualizar
router.put("/orders/edit-order/:id", checkSession, requireRole("sell"), upload.single('img'), updateOrder);

// se usa el metodo delete para poder eliminarlo usando el :id y el modulo overrride
router.delete("/orders/delete/:id", checkSession, requireRole("sell"), deleteOrder);

// se usa el metodo delete para poder eliminarlo usando el :id y el modulo overrride
router.delete("/admin/orders/delete/:id", checkSession, requireRole("admin"), deleteAdminOrder);

// editar estatus
router.get("/admin/order/update/status/:id", checkSession, requireRole("admin"), renderChangeStatus);
// guardar actualizacion
router.put("/admin/order/updated/status/:id", checkSession, requireRole("admin"), renderUpdatedStatus);


//exportamos modulo para acceso global a las rutas
module.exports = router;
