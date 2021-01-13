const express = require("express");
const router = express.Router();

// importamos los objetos dentro del controlador llamado schedules controller
const {
  renderScheduleForm,
  createNewSchedule,
  renderSchedules,
  renderSchedule,
  renderEditForm,
  updateSchedule,
  deleteSchedule
} = require("../controllers/schedules.controller");

// Helpers
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

// ruta para renderizar formulario de pendiente nuevo
router.get("/schedules/add", checkSession, requireRole("manager"), renderScheduleForm);

router.post("/schedules/new-schedule", checkSession, requireRole("manager"), createNewSchedule);

// ruta para renderizar la vista de todos los pendientes creados
router.get("/schedules", checkSession, requireRole("manager"), renderSchedules);

// ruta para renderizar la vista de un pedido especifico
router.get("/schedule/:id", checkSession, requireRole("manager"), renderSchedule);

// ruta para renderizar un formulario para editar el formulario pedidos se usa el parametro id para indicar el id del pedido que se va a modificar
router.get("/schedules/edit/:id", checkSession, requireRole("manager"), renderEditForm);
// Usamos metodo put debido a que se usa para hacer referencia paraa actualizar
router.put("/schedules/edit-schedule/:id", checkSession, requireRole("manager"), updateSchedule);

// ruta para eliminar pendientes
// se usa el metodo delete para poder eliminarlo usando el :id
router.delete("/schedules/delete/:id", checkSession, requireRole("manager"), deleteSchedule);


//exportamos modulo para acceso global a las rutas
module.exports = router;
