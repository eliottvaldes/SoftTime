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
    var privilege = req.user.privilege.trim() == role ? true : false;
    var admin = req.user.privilege.trim() == "admin" ? true : false;
    var manager = admin == true ? false : true;
    if (privilege) {
      next();
    } else {
      res.render("error", {
        admin: admin,
        //manager: manager,
        httperr: "Sin autorizacion",
        descripcion: "Usted no tiene acceso a esta pagina."
      });
    }
  }
}

// ruta para renderizar formulario de pedido nuevo
router.get("/orders/add", checkSession, requireRole("manager"), renderOrderForm);

router.post("/orders/new-order", checkSession, requireRole("manager"), upload.single('img'), createNewOrder);

// ruta para renderizar la vista de todos los pedidos creados
router.get("/orders", checkSession, requireRole("manager"), renderOrders);

// ruta para renderizar un formulario para editar el formulario pedidos se usa el parametro id para indicar el id del pedido que se va a modificar
router.get("/orders/edit/:id", checkSession, requireRole("manager"), renderEditForm);
// Usamos metodo put debido a que se usa para hacer referencia paraa actualizar
router.put("/orders/edit-order/:id", checkSession, requireRole("manager"), upload.single('img'), updateOrder);

// se usa el metodo delete para poder eliminarlo usando el :id y el modulo overrride
router.delete("/orders/delete/:id", checkSession, requireRole("manager"), deleteOrder);

// se usa el metodo delete para poder eliminarlo usando el :id y el modulo overrride
router.delete("/admin/orders/delete/:id", checkSession, requireRole("admin"), deleteAdminOrder);

// editar estatus
router.get("/admin/order/update/status/:id", checkSession, requireRole("admin"), renderChangeStatus);
// guardar actualizacion
router.put("/admin/order/updated/status/:id", checkSession, requireRole("admin"), renderUpdatedStatus);


//exportamos modulo para acceso global a las rutas
module.exports = router;
