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
    if (req.user.privilege.trim() == role) {
      next();
    } else {
      res.send(403);
    }
  }
}

// ruta para renderizar formulario de pendiente nuevo
router.get("/schedules/add", checkSession, requireRole("sell"),renderScheduleForm);

router.post("/schedules/new-schedule", checkSession, requireRole("sell"), createNewSchedule);

// ruta para renderizar la vista de todos los pendientes creados
router.get("/schedules", checkSession, requireRole("sell"), renderSchedules);

// ruta para renderizar la vista de un pedido especifico
router.get("/schedule/:id", checkSession, requireRole("sell"), renderSchedule);

// ruta para renderizar un formulario para editar el formulario pedidos se usa el parametro id para indicar el id del pedido que se va a modificar
router.get("/schedules/edit/:id", checkSession, requireRole("sell"), renderEditForm);
// Usamos metodo put debido a que se usa para hacer referencia paraa actualizar
router.put("/schedules/edit-schedule/:id", checkSession, requireRole("sell"), updateSchedule);

// ruta para eliminar pendientes
// se usa el metodo delete para poder eliminarlo usando el :id
router.delete("/schedules/delete/:id", checkSession, requireRole("sell"), deleteSchedule);


//exportamos modulo para acceso global a las rutas
module.exports = router;
