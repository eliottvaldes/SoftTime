const QueriesCrtl = {};

// requerimos el modelo de la base de datos de ../models/schedules
const Data = require("../models/Orders");
const Users = require("../models/Users");

//------------ADMIN QUERIES--------------------
//all orders
QueriesCrtl.renderAllOrdersAdmin = async (req, res) => {
  const ordersAll = await Data.find().sort({ date: "asc" }).lean();  
  res.render("admin/all-orders", { ordersAll }); 
};
//all orders
QueriesCrtl.renderOrdersAdmin = async (req, res) => {
  const orders = await Data.find().sort({ date: "asc" }).lean(); 
  const users = await Users.find({}).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/all-my-orders", { orders, sellers }); 
};
QueriesCrtl.renderSellAdminOrders = async (req, res) => {
  const userSel = await Users.find({ _id: req.params.user}).lean();
  var id = userSel._id;
  const orders = await Data.find({user: id}).lean();
  res.render("admin-queries/sell_admin_orders", { orders }); 
};
QueriesCrtl.renderPending = async (req, res) => {
  const statusOrder = await Data.find({status: "warning"}).sort({ date: "desc" }).lean();
  const users = await Users.find({}).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/status", { statusOrder, sellers});
};
QueriesCrtl.renderValidated = async (req, res) => {
  const statusOrder = await Data.find({status: "success"}).sort({ date: "desc" }).lean();
  const users = await Users.find({}).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/status", { statusOrder, sellers });
};
QueriesCrtl.renderRejected = async (req, res) => {
  const statusOrder = await Data.find({status: "danger"}).sort({ date: "desc" }).lean();
  const users = await Users.find({}).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/status", { statusOrder, sellers });
};
QueriesCrtl.renderRecently = async (req, res) => {
  const dateOrder = await Data.find().sort({ date: "desc" }).limit(10).lean();
  const users = await Users.find({}).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/dates", { dateOrder, sellers });
};
QueriesCrtl.renderLongAgo = async (req, res) => {
  const dateOrder = await Data.find().sort({ date: "asc" }).limit(10).lean();
  const users = await Users.find({}).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/dates", { dateOrder, sellers });
};

QueriesCrtl.renderDetails = async (req, res) => {
  const order = await Data.findById(req.params.id).lean();  
  res.render("admin-queries/details", { order });  
};

QueriesCrtl.renderCustomizable = async (req, res) => {
  const typeOrder = await Data.find({tag: "customizable"}).sort({ date: "desc" }).lean();
  const users = await Users.find({}).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/type", { typeOrder, sellers });
};
QueriesCrtl.renderNonCustomizable = async (req, res) => {
  const typeOrder = await Data.find({tag: "noncustomizable"}).sort({ date: "desc" }).lean();
  const users = await Users.find({}).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/type", { typeOrder, sellers });
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



//--------USER QUERIES-------------------
//todos los pedidos
QueriesCrtl.renderAllOrders = async (req, res) => {
  const orders = await Data.find({ user: req.user.id }).sort({ date: "desc" }).lean();    
  res.render("user-queries/all", { orders });
};
QueriesCrtl.renderPendinguser = async (req, res) => {
  // guardamos en una variable el arreglo de los pedidos utilizando el .find() de acuerdo al id del usuario activo de la sesion
  const statusOrder = await Data.find({ user: req.user.id, status: "warning"}).sort({ date: "desc" }).lean();
  res.render("user-queries/status", { statusOrder });
};
QueriesCrtl.renderValidateduser = async (req, res) => {
  // guardamos en una variable el arreglo de los pedidos utilizando el .find() de acuerdo al id del usuario activo de la sesion
  const statusOrder = await Data.find({ user: req.user.id, status: "success"}).sort({ date: "desc" }).lean();    
  res.render("user-queries/status", { statusOrder });
};
QueriesCrtl.renderRejecteduser = async (req, res) => {
  const statusOrder = await Data.find({ user: req.user.id, status: "danger"}).sort({ date: "desc" }).lean();    
  res.render("user-queries/status", { statusOrder });
};
QueriesCrtl.renderRecentlyuser = async (req, res) => {
  const dateOrder = await Data.find({ user: req.user.id }).sort({ date: "desc" }).limit(10).lean();
  res.render("user-queries/date", { dateOrder });
};
QueriesCrtl.renderLongAgouser = async (req, res) => {
  const dateOrder = await Data.find({ user: req.user.id }).sort({ date: "asc" }).limit(10).lean();
  res.render("user-queries/date", { dateOrder });
};
QueriesCrtl.renderDetailsuser = async (req, res) => {
  const order = await Data.findById(req.params.id).lean();
  if (order.user != req.user.id) {
    req.flash("error_msg", "Por favor verifica tu inicio de sesión");
    return res.redirect("/user-queries/date");
  }
  res.render("user-queries/details", { order });  
};
QueriesCrtl.renderCustomizableuser = async (req, res) => {
  const typeOrder = await Data.find({ user: req.user.id, tag: "customizable"}).sort({ date: "desc" }).lean();    
  res.render("user-queries/type", { typeOrder });
};
QueriesCrtl.renderNonCustomizableuser = async (req, res) => {
  const typeOrder = await Data.find({ user: req.user.id, tag: "noncustomizable"}).sort({ date: "desc" }).lean();    
  res.render("user-queries/type", { typeOrder });
};


module.exports = QueriesCrtl;
