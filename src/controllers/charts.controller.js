const chartsCtrl = {};

// requerimos el modelo de la base de datos de ../models/Orders para poder pasarle los datos
const Order = require("../models/Orders");
// requerimos el modelo de la base de datos de ../models/Schedule para poder pasarle los datos
const Schedule = require("../models/Schedule");

// renderizamos la vista new-order donde se encuentra el formulario para un nuevo pedido
chartsCtrl.renderCharts = async (req, res) => {
    const orders = await Order.find({}).sort({ date: "asc" }).lean();
    const schedules = await Schedule.find({})
    .sort({ date: "desc" })
    .lean();
    res.render("orders/all-orders", { orders });
    res.render("admin/charts");
};