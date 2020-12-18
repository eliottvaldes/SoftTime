const ordersCtrl = {};

// requerimos el modelo de la base de datos de ../models/Orders para poder pasarle los datos
const Order = require("../models/Orders");

// renderizamos la vista new-order donde se encuentra el formulario para un nuevo pedido
ordersCtrl.renderOrderForm = (req, res) => {
  res.render("orders/new-order");
};

//crando un nuedo pedido
ordersCtrl.createNewOrder = async (req, res) => {
  //obtenemos los datos desde unr request body
  const { product, description } = req.body;
  //inicializamos un arreglo de errores en caso de que se presenten 
  const errors = [];
  //hacemos las validaciones
  if (!product) {
    errors.push({ text: "Selecciona un producto para poder continuar" });
  }
  if (!description) {
    errors.push({ text: "Ingresa una descripción" });
  } 
  //En caso de que la longitud de los errores sea mayor 0 significa que hubo un error y lo muestra renderizando 
  if (errors.length > 0) {
    res.render("orders/new-order", {
      errors,
      product,
      description,
    });
  } else {
    // en caso de que no haya errores, crea la nueva orden en la base de datos
    const newOrder = new Order({ product, description });
    //requerimos el id del usuario activo en la sesion
    newOrder.user = req.user.id;
    //se asigna un await en la funcion async debido a que tarda tiempo en procesar la solicitud a la base de datos
    await newOrder.save();
    //una vez guardado mandamos un mensaje de creación satisfactoria
    req.flash("success_msg", "Pedido Generado Satisfactoriamente");
    //redirigimos a orders donde se guarda
    res.redirect("/orders");
  }
};

//metodo encargado de consulta para la base de datos
ordersCtrl.renderOrders = async (req, res) => {
  // guardamos en una variable el arreglo de los pedidos utilizando el .find() de acuerdo al id del usuario activo de la sesion
  const orders = await Order.find({ user: req.user.id })
    .sort({ date: "desc" }).lean();
    //Ordenamos de acuerdo a la fecha de creacion
    //renderizamos el archivo donde estan todas las notas
  res.render("orders/all-orders", { orders });
};

//formulario mostrando los datos para reemplaxar
ordersCtrl.renderEditForm = async (req, res) => {
  //hacemos la consulta a la base de datos para obtener los datos
  const order = await Order.findById(req.params.id).lean();
  // si la nota cuenta con parametro id diferente el id de la sesion actual le mandamos un mensaje de no validacion
  if (order.user != req.user.id) {
    req.flash("error_msg", "Por favor inicia sesión desde tu cuenta");
    return res.redirect("/orders");
  }
  res.render("orders/edit-order", { order });
};

//obtener los datos para actualizar
ordersCtrl.updateOrder = async (req, res) => {
  //otenemos el arreglo de datos del request body
  const { product, description } = req.body;
  //actualizamos los datos en la base de datos
  await Order.findByIdAndUpdate(req.params.id, { product, description });
  //Mensaje de satisfaccion
  req.flash("success_msg", "Tu pedido se ha actualizado exitosamente");
  //redireccionamos a donde se ven todos los pedidos
  res.redirect("/orders");
};

//para eliminar 
ordersCtrl.deleteOrder = async (req, res) => {
  //consultamos la base de datos para eliminar dependiendo del id
  await Order.findByIdAndDelete(req.params.id);
  //mostramos mensaje de pedido eliminado satisdactoriamente
  req.flash("success_msg", "Pedido eliminado de la base de datos");
  res.redirect("/orders");
};

module.exports = ordersCtrl;
