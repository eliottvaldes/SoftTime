const QueriesCrtl = {};

// requerimos el modelo de la base de datos de ../models/schedules
const Data = require("../models/Orders");

QueriesCrtl.renderOrdersAdmin = async (req, res) => {
  const orders = await Data.find().sort({ date: "asc" }).lean();
  res.render("admin/all-my-orders", { orders }); 
};

QueriesCrtl.renderPending = async (req, res) => {
  const statusOrder = await Data.find({status: "warning"}).sort({ date: "desc" }).lean();
  res.render("admin/status", { statusOrder });
//  console.log(statusOrder[0].status);
};

QueriesCrtl.renderValidated = async (req, res) => {
  const statusOrder = await Data.find({status: "success"}).sort({ date: "desc" }).lean();
  res.render("admin/status", { statusOrder });
};

QueriesCrtl.renderRejected = async (req, res) => {
  const statusOrder = await Data.find({status: "danger"}).sort({ date: "desc" }).lean();
  res.render("admin/status", { statusOrder });
};

QueriesCrtl.renderRecently = async (req, res) => {
  const dateOrder = await Data.find().sort({ date: "desc" }).limit(10).lean();
  res.render("admin/dates", { dateOrder });
};

QueriesCrtl.renderLongAgo = async (req, res) => {
  const dateOrder = await Data.find().sort({ date: "asc" }).limit(10).lean();
  res.render("admin/dates", { dateOrder });
};


QueriesCrtl.renderEditStatus = async (req, res) => {
  const status = await Data.findById(req.params.id).lean();
  if (schedules.user != req.user.id) {
    req.flash("error_msg", "Por favor autentificate para poder continuar");
    return res.redirect("/schedules");
  }
  res.render("schedules/edit-schedule", { status });
};

QueriesCrtl.updateStatus = async (req, res) => {
  const { date, time, amount, line, station, comments } = req.body;
  await Data.findByIdAndUpdate(req.params.id, { date, time, amount, line, station, comments });
  req.flash("success_msg", "Pendiente modificado satisfactoriamente");
  res.redirect("/ordersAdmin");
};

QueriesCrtl.deleteSchedule = async (req, res) => {
  await Schedule.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "El pendiente ha sido eliminado");
  res.redirect("/schedules");
};

module.exports = QueriesCrtl;
