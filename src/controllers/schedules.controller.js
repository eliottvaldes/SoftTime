const schedulesCtrl = {};

// requerimos el modelo de la base de datos de ../models/schedules
const Schedule = require("../models/Schedule");

const Order = require("../models/Orders");

//metodo encargado de consulta para la base de datos
schedulesCtrl.renderScheduleForm = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ date: "asc" }).lean();  
  res.render("schedules/new-schedule", { orders });
};

schedulesCtrl.createNewSchedule = async (req, res) => {
  //obtenemos los datos del formulario
  const {product, date, time, amount, line, station, comments } = req.body;
  //creamos una lista de errores
  const errors = [];
  //iniicamos las validadciones por parte del servidor
  if (!product) {
    errors.push({ text: "Selecciona un producto a entregar" });
  }
  if (!date) {
    errors.push({ text: "Selecciona una fecha de entrega" });
  }
  if(date){
    var non = (/([a-zA-Z])/ig);
    if(date.match(non)){
      errors.push({ text: "No debes ingresar letras al campo para la fecha" });
    }
  }
  if (!time) {
    errors.push({ text: "Selecciona un horario de entrega" });
  }
  if(time){
    var non = (/([a-zA-Z])/ig);
    if(time.match(non)){
      errors.push({ text: "No debes ingresar letras al campo para el horario" });
    }
  }
  if (!amount) {
    errors.push({ text: "Agrega un monto pendiente válido" });
  }
  if(amount){
    var non = (/([a-zA-Z])/ig);
    if(amount.match(non)){
      errors.push({ text: "No debes ingresar letras al campo del monto" });
    }
    if(amount<5){
      errors.push({ text: "Agrega un monto pendiente válido, debe ser mayor a 5" });
    }
  }  
  if (!line) {
    errors.push({ text: "Selecciona una línea del metro válida para la entrega" });
  }
  if (!station) {
    errors.push({ text: "Selecciona una estación del metro válida para la entrega" });
  }
  if(station){
    var non = (/([0-9])/ig);
    if(station.match(non)){
      errors.push({ text: "No debes cambiar las estaciones" });
    }
  }

  if (!comments) {
    errors.push({ text: "Agrega un comentario" });
  }  
  if(comments){
    if (comments.length<5) {
      errors.push({ text: "Agrega un comentario con longitud minima de 5 carateres" });
    }
    for (i = 0; i < comments.length; i++) {
      if (comments.charAt(i) == ' ' && comments.charAt(i + 1) == ' ') {        
        errors.push({ text: "Ingresa un comentario válido" });   
        break;   
      }
    }
  }

  if (errors.length > 0) {
    res.render("schedules/new-schedule", {
      errors,
      product,
      date,
      time,
      amount,
      line,
      station,
      comments,
    });
  } else {

    const newSchedule = new Schedule({product, date, time, amount, line, station, comments });
    newSchedule.user = req.user.id;
    await newSchedule.save();
    req.flash("success_msg", "Entrega programada satisfactoriamente.");
    res.redirect("/schedules");
  }
};

schedulesCtrl.renderSchedules = async (req, res) => {
  const pendientes = await Schedule.find({ user: req.user.id }).sort({ date: "desc" }).lean();
  var eventos = [];
  for (let i = 0; i < pendientes.length; i++) {
    var evento = {};
    evento.titulo = String(pendientes[i].product);
    var date = new Date(pendientes[i].date);
    evento.year = date.getFullYear();
    var mes = date.getMonth() + 1, 
        dia = date.getDate() + 1;
    
    if (date.getMonth() + 1 < 10) {
      mes = "0" + String(date.getMonth() + 1);
    }
    evento.month = mes;
    evento.day = dia;
    evento.time = pendientes[i].time;
    evento.url = String("/schedule/" + pendientes[i]._id);
    eventos.push(evento);
  }
  
  res.render("schedules/all-schedules", { eventos });
};

schedulesCtrl.renderSchedule = async (req, res) => {
  const pendiente = await Schedule.findById(req.params.id);
  var id = pendiente._id;
  var product = pendiente.product;
  var date = pendiente.date;
  var time = pendiente.time;
  var amount = pendiente.amount;
  var line = pendiente.line;
  var station = pendiente.station;
  var comments = pendiente.comments;
  res.render("schedules/schedule", { id, product, date, time, amount, line, station, comments });
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
