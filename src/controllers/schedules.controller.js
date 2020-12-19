const schedulesCtrl = {};

// requerimos el modelo de la base de datos de ../models/schedules
const Schedule = require("../models/Schedule");

// renderizamos la vista new-Schedule donde se encuentra el formulario para un nuevo pendiente
schedulesCtrl.renderScheduleForm = (req, res) => {
  res.render("schedules/new-schedule");
};

schedulesCtrl.createNewSchedule = async (req, res) => {
  //obtenemos los datos del formulario
  const { date, time, amount, line, station, comments } = req.body;
  //creamos una lista de errores
  const errors = [];
  //iniicamos las validadciones por parte del servidor
  if (!date) {
    errors.push({ text: "Selecciona una fecha de entrega" });
  }
  if (!time) {
    errors.push({ text: "Selecciona un horario de entrega" });
  }
  if (!amount) {
    errors.push({ text: "Ingresa un monto pendiente válido" });
  }
  if (!line) {
    errors.push({ text: "Selecciona una línea del metro válida para la entrega" });
  }
  if (!station) {
    errors.push({ text: "Selecciona una estación del metro válida para la entrega" });
  }
  if (!comments) {
    errors.push({ text: "Ingresa un comentario" });
  }
  if (errors.length > 0) {
    res.render("schedules/new-schedule", {
      errors,
      date,
      time,
      amount,
      line,
      station,
      comments,
    });
  } else {

    const newSchedule = new Schedule({ date, time, amount, line, station, comments });
    newSchedule.user = req.user.id;
    await newSchedule.save();
    req.flash("success_msg", "Entrega programada satisfactoriamente. Se ha agregado a tu agenda");
    res.redirect("/schedules");
  }
};

schedulesCtrl.renderSchedules = async (req, res) => {
  const pendientes = await Schedule.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("schedules/all-schedules", { pendientes });
};

schedulesCtrl.renderEditForm = async (req, res) => {
  const schedules = await Schedule.findById(req.params.id).lean();
  if (schedules.user != req.user.id) {
    req.flash("error_msg", "Por favor autentificate para poder continuar");
    return res.redirect("/schedules");
  }
  res.render("schedules/edit-schedule", { schedules });
};

schedulesCtrl.updateSchedule = async (req, res) => {
  const { date, time, amount, line, station, comments } = req.body;
  await Schedule.findByIdAndUpdate(req.params.id, { date, time, amount, line, station, comments });
  req.flash("success_msg", "Pendiente modificado satisfactoriamente");
  res.redirect("/schedules");
};

schedulesCtrl.deleteSchedule = async (req, res) => {
  await Schedule.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "El pendiente ha sido eliminado");
  res.redirect("/schedules");
};

module.exports = schedulesCtrl;
