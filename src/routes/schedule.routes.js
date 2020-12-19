const express = require("express");
const router = express.Router();

// importamos los objetos dentro del controlador llamado schedules controller
const {
  renderScheduleForm,
  createNewSchedule,
  renderSchedules,
  renderEditForm,
  updateSchedule,
  deleteSchedule
} = require("../controllers/schedules.controller");

// Helpers
const { checkSession } = require("../helpers/auth");

// ruta para renderizar formulario de pendiente nuevo
router.get("/schedules/add", checkSession, renderScheduleForm);

router.post("/schedules/new-schedule", checkSession, createNewSchedule);

// ruta para renderizar la vista de todos los pendientes creados
router.get("/schedules", checkSession, renderSchedules);

// ruta para renderizar un formulario para editar el formulario pedidos se usa el parametro id para indicar el id del pedido que se va a modificar
router.get("/schedules/edit/:id", checkSession, renderEditForm);
// Usamos metodo put debido a que se usa para hacer referencia paraa actualizar
router.put("/schedules/edit-schedule/:id", checkSession, updateSchedule);

// ruta para eliminar pendientes
// se usa el metodo delete para poder eliminarlo usando el :id
router.delete("/schedules/delete/:id", checkSession, deleteSchedule);


//exportamos modulo para acceso global a las rutas
module.exports = router;
