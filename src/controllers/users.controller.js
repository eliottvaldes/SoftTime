// QUEDA PENDIENTE CAMBIAR LAS RUTAS PARA CREAR UN NUEVO USUARIO YA QUE ESA FUNCIONALIDAD SOLO LA TIENE EL ADMONISTRADOR

const usersCtrl = {};

// Creamos la constante de el modelo de la base de datos
const User = require('../models/Users');

// requerimos el modulo passport para las sesiones
const passport = require("passport");

//mostrando bienvenida normal user
usersCtrl.welcome = (req, res) => {
  res.render('users/welcome', {
    admin: false
  });
};

//mostrando bienvenida admin user
usersCtrl.welcomeAd = (req, res) => {
  res.render('admin/welcome', {
    admin: true
  });
};

//mostrando el formulario de registro
usersCtrl.renderSignUpForm = (req, res) => {
  //formulario de registro
  res.render('admin/signup', { admin: true });
};

//funcion encargada de guardar los datos de registro
usersCtrl.singup = async (req, res) => {
  //arreglo de errores de validación
  let errors = [];
  const { name, lastname, username, phone, email, password, confirm_password } = req.body;

  // -------VALIDACIIÓN POR PARTE DE SERVIDOR------
  //valdando nombre
  if (name.length < 4) {
    errors.push({ text: "Ingresa un nombre con longitud mayor a 4 caracteres" });
  }
  //validando apelllido
  if (lastname.length < 6) {
    errors.push({ text: "Ingresa un apellido válido. La longitud mimina es de 5 caracteres" });
  }
  //validando username
  if (password.length < 8) {
    errors.push({ text: "La longitud minima de la contraseña es de 8 caracteres" });
  }
  var valphone = (/([a-zA-Z])/ig);
  //validar numero telefonico
  if (phone.match(valphone)) {
    errors.push({ text: "Numero telefonico inválido" });
  }
  //validar coincidencia de contraseña y su confirmación
  if (password != confirm_password) {
    errors.push({ text: "Las contraseña no coinciden, verificalas" });
  }
  //validar longitud de la contraseña
  if (password.length < 8) {
    errors.push({ text: "La longitud minima de la contraseña es de 8 caracteres" });
  }

  //en caso de que SI existan errores
  if (errors.length > 0) {
    //renderizamos la misma pagina pero mostrarndo los errores y los datos previamente ingresados
    res.render("admin/signup", {
      admin: true,
      errors,
      name,
      lastname,
      username,
      phone,
      email,
      password,
      confirm_password
    });
  }
  //en caso de que NO haya errores hacemos una ultima validación para consultar si ya está en uso el nombre de usuario ingresado
  else {
    //validoamos la existencia del username
    const usernameUser = await User.findOne({ username: username });
    //si existe mostramos el mensaje de error
    if (usernameUser) {
      req.flash("error_msg", "El nombre de usuario que ingresaste ya está en uso. Prueba con uno diferente");
      res.redirect("/admin/signup");
    }
    //si no existe coincidencia
    else {
      let privilege = "manager";
      // usando el Schema User le pasamos los datos
      const newUser = new User({ name, lastname, username, phone, email, password, privilege });
      //encriptamos la contraseña
      newUser.password = await newUser.encpass(password);
      //guardamos los datos
      await newUser.save();
      //mostramos un mensaje de satisfacción
      req.flash("success_msg", "Has registrado a un nuevo Administrador de Ventas satisfactoriamente");
      //redirigimos
      res.redirect("/query/my-team");
    }
  }
};

//renderiza formulario de inicio de sesion
usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin");
};

//funcion para iniciar sesion
usersCtrl.signin = (req, res) => {
  if (req.user.privilege.trim() == "admin") {
    res.redirect("/admin/welcome");
  } else if (req.user.privilege.trim() == "manager") {
    res.redirect("/users/welcome");
  }
};

//-------------------ADMINISTRADOR -----------------
//formulario inicio de sesion admin
usersCtrl.renderSigninadForm = (req, res) => {
  res.render("admin/signinad");
};

//iniciar sesion admin
usersCtrl.signinad = passport.authenticate("local", {
  //en caso de que sea un usuario existente lo redirige a las ordenes
  successRedirect: "/admin/welcome",
  //en caso erroneo, recarga la pagina mostrando los mensajes de error
  failureRedirect: "/admin/signinad",
  failureFlash: true
});
//---------------------------------------------------

// funcion para cerrar sesion
usersCtrl.logout = (req, res) => {
  //simplemente se borra la sesion del servidor
  req.logout();
  //mensaje flash
  req.flash("success_msg", "Has cerrado sesión satisfactoriamente!");
  //redireccionamos a inicio de sesion
  res.redirect("/users/signin");
};


module.exports = usersCtrl;