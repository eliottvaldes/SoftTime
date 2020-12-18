const express = require("express");
const router = express.Router();

// importamos los objetos dentro del controlador llamado orders controller
const {
  renderOrderForm,
  createNewOrder,
  renderOrders,
  renderEditForm,
  updateOrder,
  deleteOrder
} = require("../controllers/orders.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// ruta para renderizar formulario de pedido nuevo
router.get("/orders/add", renderOrderForm);

router.post("/orders/new-order", createNewOrder);

// ruta para renderizar la vista de todos los pedidos creados
router.get("/orders", renderOrders);

// ruta para renderizar un formulario para editar el formulario pedidos se usa el parametro id para indicar el id del pedido que se va a modificar
router.get("/orders/edit/:id", isAuthenticated, renderEditForm);
// Usamos metodo put debido a que se usa para hacer referencia paraa actualizar
router.put("/orders/edit-order/:id", isAuthenticated, updateOrder);

// ruta para eliminar pedidos
// se usa el metodo delete para poder eliminarlo usando el :id y el modulo overrride
router.delete("/orders/delete/:id", isAuthenticated, deleteOrder);


//exportamos modulo para acceso global a las rutas
module.exports = router;
