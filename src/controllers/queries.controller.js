const QueriesCrtl = {};
const Data = require("../models/Orders");
const Users = require("../models/Users");



//------------ADMIN QUERIES--------------------

//all users
QueriesCrtl.renderAllUsers = async (req, res) => {
  const users = await Users.find(
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
    }).skip(1).lean();
  const first = await Users.find({username: "administrador"}).lean(); 
  res.render("admin/team", {admin: true, users, first}); 
};
QueriesCrtl.renderUserDetails = async (req, res) => {
  const users = await Users.find(
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
    }).skip(1).lean(); 
  const user = await Users.findById(req.params.id).lean();  
  res.render("admin/team-detail", { admin: true, users, user });  
};


//all orders
QueriesCrtl.renderAllOrdersAdmin = async (req, res) => {
  const ordersAll = await Data.find(
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
    }).sort({ date: "asc" }).lean();  
  res.render("admin/all-orders", { admin: true, ordersAll }); 
};
//all orders
QueriesCrtl.renderOrdersAdmin = async (req, res) => {
  const orders = await Data.find(
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
    }).sort({ date: "asc" }).lean(); 
  const users = await Users.find(
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
    }).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/all-my-orders", { admin: true, orders, sellers }); 
};
QueriesCrtl.renderSellAdminOrders = async (req, res) => {
  const userSel = await Users.find({ username: req.params.user},
    (err, usrs) => {
      if (err) {
        res.status(500).render("error", {
          admin: true,
          httperr: "Problema interno",
          descripcion: "Ha ocurrido un problema en el servidor"
        });
      } else if (usrs == []) {
        res.status(404).render("error", {
          admin: true,
          httperr: "Recursos no encontrado",
          descripcion: "La pagina que estas buscando no existe."
        });
      }
    }).lean();
    
  var id = userSel[0]._id;
  const orders = await Data.find({user: id},
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
  const users = await Users.find(
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
    }).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/sell_admin_orders", { admin: true, orders, sellers }); 
};
QueriesCrtl.renderPending = async (req, res) => {
  const statusOrder = await Data.find({status: "warning"},
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
  }).sort({ date: "desc" }).lean();
  const users = await Users.find(
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
    }).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/status", { admin: true, statusOrder, sellers});
};
QueriesCrtl.renderValidated = async (req, res) => {
  const statusOrder = await Data.find({status: "success"},
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
  }).sort({ date: "desc" }).lean();
  const users = await Users.find(
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
    }).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/status", { admin: true, statusOrder, sellers });
};
QueriesCrtl.renderRejected = async (req, res) => {
  const statusOrder = await Data.find({status: "danger"},
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
  }).sort({ date: "desc" }).lean();
  const users = await Users.find(
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
    }).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/status", { admin: true, statusOrder, sellers });
};
QueriesCrtl.renderRecently = async (req, res) => {
  const dateOrder = await Data.find(
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
    }).sort({ date: "desc" }).limit(10).lean();
  const users = await Users.find(
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
    }).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/dates", { admin: true, dateOrder, sellers });
};
QueriesCrtl.renderLongAgo = async (req, res) => {
  const dateOrder = await Data.find(
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
    }).sort({ date: "asc" }).limit(10).lean();
  const users = await Users.find(
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
    }).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/dates", { admin: true, dateOrder, sellers });
};

QueriesCrtl.renderDetails = async (req, res) => {
  const order = await Data.findById(req.params.id,
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
  res.render("admin-queries/details", { admin: true, order });  
};

QueriesCrtl.renderCustomizable = async (req, res) => {
  const typeOrder = await Data.find({tag: "customizable"},
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
  }).sort({ date: "desc" }).lean();
  const users = await Users.find(
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
    }).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/type", { admin: true, typeOrder, sellers });
};
QueriesCrtl.renderNonCustomizable = async (req, res) => {
  const typeOrder = await Data.find({tag: "noncustomizable"},
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
  }).sort({ date: "desc" }).lean();
  const users = await Users.find(
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
    }).sort({username : "asc"});
  var sellers = [];
  for (let i = 0; i < users.length; i++) {
    sellers.push(users[i].username);
  }
  res.render("admin-queries/type", { admin: true, typeOrder, sellers });
};

QueriesCrtl.renderEditStatus = async (req, res) => {
  const status = await Data.findById(req.params.id,
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
  if (schedules.user != req.user.id) {
    req.flash("error_msg", "Por favor autentificate para poder continuar");
    return res.redirect("/schedules");
  }
  res.render("schedules/edit-schedule", { admin: true, status });
};
QueriesCrtl.updateStatus = async (req, res) => {
  const { date, time, amount, line, station, comments } = req.body;
  await Data.findByIdAndUpdate(req.params.id, { date, time, amount, line, station, comments },
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
  req.flash("success_msg", "Pendiente modificado satisfactoriamente");
  res.redirect("/ordersAdmin");
};



//--------USER QUERIES-------------------
//todos los pedidos
QueriesCrtl.renderAllOrders = async (req, res) => {
  const orders = await Data.find({ user: req.user.id },
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
    }).sort({ date: "desc" }).lean();    
  res.render("user-queries/all", { admin: false, orders });
};
QueriesCrtl.renderPendinguser = async (req, res) => {
  // guardamos en una variable el arreglo de los pedidos utilizando el .find() de acuerdo al id del usuario activo de la sesion
  const statusOrder = await Data.find({ user: req.user.id, status: "warning"},
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
  }).sort({ date: "desc" }).lean();
  res.render("user-queries/status", { admin: false, statusOrder });
};
QueriesCrtl.renderValidateduser = async (req, res) => {
  // guardamos en una variable el arreglo de los pedidos utilizando el .find() de acuerdo al id del usuario activo de la sesion
  const statusOrder = await Data.find({ user: req.user.id, status: "success"},
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
  }).sort({ date: "desc" }).lean();    
  res.render("user-queries/status", { admin: false, statusOrder });
};
QueriesCrtl.renderRejecteduser = async (req, res) => {
  const statusOrder = await Data.find({ user: req.user.id, status: "danger"},
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
  }).sort({ date: "desc" }).lean();    
  res.render("user-queries/status", { admin: false, statusOrder });
};
QueriesCrtl.renderRecentlyuser = async (req, res) => {
  const dateOrder = await Data.find({ user: req.user.id },
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
    }).sort({ date: "desc" }).limit(10).lean();
  res.render("user-queries/date", { admin: false, dateOrder });
};
QueriesCrtl.renderLongAgouser = async (req, res) => {
  const dateOrder = await Data.find({ user: req.user.id },
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
    }).sort({ date: "asc" }).limit(10).lean();
  res.render("user-queries/date", { admin: false, dateOrder });
};
QueriesCrtl.renderDetailsuser = async (req, res) => {
  const order = await Data.findById(req.params.id,
    (err, pend) => {
      if (err) {
        res.render("error", {
          admin: false,
          httperr: "Problema interno",
          descripcion: "Ha ocurrido un problema en el servidor"
        });
      } else if (!pend) {
        res.render("error", {
          admin: false,
          httperr: "Recursos no encontrado",
          descripcion: "La pagina que estas buscando no existe."
        });
      }
    }).lean();
  
  if (order.user != req.user.id) {
    req.flash("error_msg", "Por favor verifica tu inicio de sesión");
    return res.redirect("/user-queries/date");
  }
  res.render("user-queries/details", { admin: false, order });  
};
QueriesCrtl.renderCustomizableuser = async (req, res) => {
  const typeOrder = await Data.find({ user: req.user.id, tag: "customizable"},
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
  }).sort({ date: "desc" }).lean();    
  res.render("user-queries/type", { admin: false, typeOrder });
};
QueriesCrtl.renderNonCustomizableuser = async (req, res) => {
  const typeOrder = await Data.find({ user: req.user.id, tag: "noncustomizable"},
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
  }).sort({ date: "desc" }).lean();    
  res.render("user-queries/type", { admin: false, typeOrder });
};


module.exports = QueriesCrtl;
