const ordersCtrl = {};

// requerimos el modelo de la base de datos de ../models/Orders para poder pasarle los datos
const Order = require("../models/Orders");

// renderizamos la vista new-order donde se encuentra el formulario para un nuevo pedido
ordersCtrl.renderOrderForm = (req, res) => {
  res.render("orders/new-order", {admin: false});
};

//crando un nuedo pedido
ordersCtrl.createNewOrder = async (req, res) => {
  //obtenemos los datos desde unr request body
  const { product, description, status, tag } = req.body;
  
  //inicializamos un arreglo de errores en caso de que se presenten 
  const errors = [];
  //hacemos las validaciones

  if (!product) {
    errors.push({ text: "Selecciona un producto para poder continuar" });
  }
  if(product){
    if (product.length<5) {
      errors.push({ text: "No modifique los productos" });
    }
  }
  if(description){
    if (description.length<5) {
      errors.push({ text: "Agrega una descripción con longitud minima de 5 carateres" });
    }
    for (i = 0; i < description.length; i++) {
      if (description.charAt(i) == ' ' && description.charAt(i + 1) == ' ') {        
        errors.push({ text: "Ingresa una descripción valida" });   
        break;   
      }
    }
  }
  if (!status) {
    errors.push({ text: "Por favor no modifique el status" });
  }
  if(status){
    if (status != "warning") {
      errors.push({ text: "Por favor No modifique el status" });
    }
  }
  
  if (!tag) {
    errors.push({ text: "No elimines el tipo de producto" });
  }

  /*
  if(tag){
    console.log(tag);
    if (tag != 'customizable'){
      errors.push({ text: "Por favor NO modifique el tipo de producto" });
    }
    if (tag != 'customizable'){
      errors.push({ text: "Por favor NO modifique el tipo de producto" });
    }
  }    
  */
  
  var base64data = "";
  //revisa si en la peticion hay archivos y los escribe en base64
  if (req.file) {
    base64data = req.file.buffer.toString('base64');
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
    const newOrder = new Order({ product, description, status, tag });
    //requerimos el id del usuario activo en la sesion
    newOrder.user = req.user.id;
    //la variable base64data esta inicializada vacia
    newOrder.image = base64data;
    //se asigna un await en la funcion async debido a que tarda tiempo en procesar la solicitud a la base de datos
    await newOrder.save(
      (err) => {
        if (err) {
          res.status(500).render("error", {
            admin: false,
            httperr: "Problema interno",
            descripcion: "Ha ocurrido un problema en el servidor"
          });
        }
      });
    //una vez guardado mandamos un mensaje de creación satisfactoria
    req.flash("success_msg", "Pedido Generado Satisfactoriamente");
    //redirigimos a orders donde se guarda
    res.redirect("/orders");
  }
};

//metodo encargado de consulta para la base de datos
ordersCtrl.renderOrders = async (req, res) => {
  // guardamos en una variable el arreglo de los pedidos utilizando el .find() de acuerdo al id del usuario activo de la sesion
  const orders = await Order.find({ user: req.user.id },
    (err, pend) => {
      if (err) {
        res.status(500).render("error", {
          admin: false,
          httperr: "Problema interno",
          descripcion: "Ha ocurrido un problema en el servidor"
        });
      } else if (!pend) {
        res.status(404).render("error", {
          admin: false,
          httperr: "Recursos no encontrado",
          descripcion: "La pagina que estas buscando no existe."
        });
      }
    })
    .sort({ date: "desc" }).lean();
  //Ordenamos de acuerdo a la fecha de creacion
  //renderizamos el archivo donde estan todas las notas
  res.render("orders/all-orders", { admin: false, orders });
};

//formulario mostrando los datos para reemplaxar
ordersCtrl.renderEditForm = async (req, res) => {
  //hacemos la consulta a la base de datos para obtener los datos
  const order = await Order.findById(req.params.id,
    (err, pend) => {
      if (err) {
        res.status(500).render("error", {
          admin: false,
          httperr: "Problema interno",
          descripcion: "Ha ocurrido un problema en el servidor"
        });
      } else if (!pend) {
        res.status(404).render("error", {
          admin: false,
          httperr: "Recursos no encontrado",
          descripcion: "La pagina que estas buscando no existe."
        });
      }
    }).lean();
  // si la nota cuenta con parametro id diferente el id de la sesion actual le mandamos un mensaje de no validacion
  if (order.user != req.user.id) {
    req.flash("error_msg", "Por favor inicia sesión desde tu cuenta");
    return res.redirect("/orders");
  }
  res.render("orders/edit-order", { admin: false, order });  
};

//obtener los datos para actualizar
ordersCtrl.updateOrder = async (req, res) => {
  //otenemos el arreglo de datos del request body  
  const product = req.body.product;
  const description = req.body.description;
  const tag = req.body.tag;
  var image = "";
  if (req.file) {
    image = req.file.buffer.toString('base64');
  } else {
    console.log(req.params.id);
    const ord = await Order.findById({ _id: req.params.id },
      (err, pend) => {
        if (err) {
          res.status(500).render("error", {
            admin: false,
            httperr: "Problema interno",
            descripcion: "Ha ocurrido un problema en el servidor"
          });
        } else if (!pend) {
          res.status(404).render("error", {
            admin: false,
            httperr: "Recursos no encontrado",
            descripcion: "La pagina que estas buscando no existe."
          });
        }
      }).lean();
    image = ord.image;
  }
  //actualizamos los datos en la base de datos    
  await Order.findByIdAndUpdate(req.params.id, { product, description, image, tag},
    (err, pend) => {
      if (err) {
        res.status(500).render("error", {
          admin: false,
          httperr: "Problema interno",
          descripcion: "Ha ocurrido un problema en el servidor"
        });
      } else if (!pend) {
        res.status(404).render("error", {
          admin: false,
          httperr: "Recursos no encontrado",
          descripcion: "La pagina que estas buscando no existe."
        });
      }
    });
  //Mensaje de satisfaccion
  req.flash("success_msg", "Tu pedido se ha actualizado exitosamente");
  //redireccionamos a donde se ven todos los pedidos
  res.redirect("/orders");
};

//para eliminar 
ordersCtrl.deleteOrder = async (req, res) => {
  //consultamos la base de datos para eliminar dependiendo del id
  await Order.findByIdAndDelete(req.params.id,
    (err, pend) => {
      if (err) {
        res.status(500).render("error", {
          admin: false,
          httperr: "Problema interno",
          descripcion: "Ha ocurrido un problema en el servidor"
        });
      } else if (!pend) {
        res.status(404).render("error", {
          admin: false,
          httperr: "Recursos no encontrado",
          descripcion: "La pagina que estas buscando no existe."
        });
      }
    });
  //mostramos mensaje de pedido eliminado satisdactoriamente
  req.flash("success_msg", "Pedido eliminado de la base de datos");
  res.redirect("/orders");
};


//----------------------ADMINISTRADOR ---------------------


//para eliminar 
ordersCtrl.deleteAdminOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id,
    (err, pend) => {
      if (err) {
        res.status(500).render("error", {
          admin: true,
          httperr: "Problema interno",
          descripcion: "Ha ocurrido un problema en el servidor"
        });
      } else if (!pend) {
        res.status(404).render("error", {
          admin: true,
          httperr: "Recursos no encontrado",
          descripcion: "La pagina que estas buscando no existe."
        });
      }
    });
  req.flash("success_msg", "Pedido eliminado satisfactoriamente");
  res.redirect("/query/filter/all-orders");
};

//formulario mostrando los datos para reemplaxar
ordersCtrl.renderChangeStatus = async (req, res) => {
  const order = await Order.findById(req.params.id,
    (err, pend) => {
      if (err) {
        res.status(500).render("error", {
          admin: true,
          httperr: "Problema interno",
          descripcion: "Ha ocurrido un problema en el servidor"
        });
      } else if (!pend) {
        res.status(404).render("error", {
          admin: true,
          httperr: "Recursos no encontrado",
          descripcion: "La pagina que estas buscando no existe."
        });
      }
    }).lean();  
  res.render("admin/change-status", { admin: true, order });
};

//obtener los datos para actualizar
ordersCtrl.renderUpdatedStatus = async (req, res) => {
  const status = req.body.status;
  await Order.findByIdAndUpdate(req.params.id, { status },
    (err, pend) => {
      if (err) {
        res.status(500).render("error", {
          admin: true,
          httperr: "Problema interno",
          descripcion: "Ha ocurrido un problema en el servidor"
        });
      } else if (!pend) {
        res.status(404).render("error", {
          admin: true,
          httperr: "Recursos no encontrado",
          descripcion: "La pagina que estas buscando no existe."
        });
      }
    });
  req.flash("success_msg", "Se ha cambiado el status");
  res.redirect("/query/filter/all-orders");
};





module.exports = ordersCtrl;
