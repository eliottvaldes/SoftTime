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
const { isAuthenticated } = require("../helpers/auth");

// ruta para renderizar formulario de pendiente nuevo
router.get("/schedules/add", renderScheduleForm);

router.post("/schedules/new-schedule", createNewSchedule);

// ruta para renderizar la vista de todos los pendientes creados
router.get("/schedules", isAuthenticated, renderSchedules);

// ruta para renderizar un formulario para editar el formulario pedidos se usa el parametro id para indicar el id del pedido que se va a modificar
router.get("/schedules/edit/:id", isAuthenticated, renderEditForm);
// Usamos metodo put debido a que se usa para hacer referencia paraa actualizar
router.put("/schedules/edit-schedule/:id", isAuthenticated, updateSchedule);

// ruta para eliminar pendientes
// se usa el metodo delete para poder eliminarlo usando el :id
router.delete("/schedules/delete/:id", isAuthenticated, deleteSchedule);


//exportamos modulo para acceso global a las rutas
module.exports = router;