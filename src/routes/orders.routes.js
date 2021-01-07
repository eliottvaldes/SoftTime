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
  renderOrdersAdmin,
  renderEditForm,
  updateOrder,
  deleteOrder,
  deleteAdminOrder
} = require("../controllers/orders.controller");

// requerimos la funcion para mostrar si está autenticado y cuenta con sesión activa
const { checkSession } = require("../helpers/auth");

// ruta para renderizar formulario de pedido nuevo
router.get("/orders/add", checkSession, renderOrderForm);

router.post("/orders/new-order", checkSession, upload.single('img'), createNewOrder);

// ruta para renderizar la vista de todos los pedidos creados
router.get("/orders", checkSession, renderOrders);

// ruta para renderizar la vista de todos los pedidos creados
router.get("/ordersAdmin", checkSession, renderOrdersAdmin);

// ruta para renderizar un formulario para editar el formulario pedidos se usa el parametro id para indicar el id del pedido que se va a modificar
router.get("/orders/edit/:id", checkSession, renderEditForm);
// Usamos metodo put debido a que se usa para hacer referencia paraa actualizar
router.put("/orders/edit-order/:id", checkSession, upload.single('img'), updateOrder);

// se usa el metodo delete para poder eliminarlo usando el :id y el modulo overrride
router.delete("/orders/delete/:id", checkSession, deleteOrder);

// se usa el metodo delete para poder eliminarlo usando el :id y el modulo overrride
router.delete("/admin/orders/delete/:id", checkSession, deleteAdminOrder);


//exportamos modulo para acceso global a las rutas
module.exports = router;
