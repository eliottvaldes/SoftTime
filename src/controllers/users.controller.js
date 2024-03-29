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
  if (!name) {
    errors.push({ text: "Agrega un nombre para poder continuar" });
  }
  if(name){
    if (name.length < 4) {
      errors.push({ text: "Ingresa un nombre con longitud mayor a 4 caracteres" });
    }
    for (i = 0; i < name.length; i++) {
      if (name.charAt(i) == ' ' && name.charAt(i + 1) == ' ') {
        errors.push({ text: "Ingresa un nombre válido" });
        break;
      }
    }
  }
  if (!lastname) {
    errors.push({ text: "Agrega un nombre para poder continuar" });
  }
  if(lastname){  
    if (lastname.length < 6) {
      errors.push({ text: "Ingresa un apellido válido. La longitud mimina es de 5 caracteres" });
    }
    for (i = 0; i < lastname.length; i++) {
      if (lastname.charAt(i) == ' ' && lastname.charAt(i + 1) == ' ') {
        errors.push({ text: "Ingresa un apellido válida" });
        break;
      }
    }
  }
  if (!username) {
    errors.push({ text: "Agrega un nombre de usuario para poder continuar" });
  }
  if(username){
    if(username.length<6){
      errors.push({ text: "Ingresa un nombre de usuario válido. La longitud mimina es de 6 caracteres" });
    }
    for (i = 0; i < username.length; i++) {
      if (username.charAt(i) == ' ' && username.charAt(i + 1) == ' ') {
        errors.push({ text: "Ingresa una nombre de usuario válido valida" });
        break;
      }
    }
  }
  if (!phone) {
    errors.push({ text: "Agrega un telefono para poder continuar" });
  }
  if(phone){
    var valphone = (/([a-zA-Z])/ig);
    if (phone.match(valphone)) {
      errors.push({ text: "Numero telefonico inválido. No puedes ingresar letras" });
    }
    for (i = 0; i < phone.length; i++) {
      if (phone.charAt(i) == ' ' && phone.charAt(i + 1) == ' ') {
        errors.push({ text: "Ingresa un numero telefónico válido" });
        break;
      }
    }
  }
  if (!email) {
    errors.push({ text: "Agrega un email para poder continuar" });
  }
  if(email){
    for (i = 0; i < email.length; i++) {
      if (email.charAt(i) == ' ' && email.charAt(i + 1) == ' ') {
        errors.push({ text: "Ingresa un email válido" });
        break;
      }
    }
  }
  if (!password) {
    errors.push({ text: "Agrega una contraseña para poder continuar" });
  }
  if(password){
    if (password.length < 8) {
      errors.push({ text: "La longitud minima de la contraseña es de 8 caracteres" });
    }    
    for (i = 0; i < password.length; i++) {
      if (password.charAt(i) == ' ' && password.charAt(i + 1) == ' ') {
        errors.push({ text: "Ingresa una contraseña válida" });
        break;
      }
    }
  }
  if (!confirm_password) {
    errors.push({ text: "Agrega un la confirmación de la contraseña para poder continuar" });
  }
  if (confirm_password) {
    if (password != confirm_password) {
      errors.push({ text: "Las contraseña no coinciden, verificalas" });
    }
    for (i = 0; i < confirm_password.length; i++) {
      if (confirm_password.charAt(i) == ' ' && confirm_password.charAt(i + 1) == ' ') {
        errors.push({ text: "Ingresa una confirmación de contraseña válida" });
        break;
      }
    }
  }

  //en caso de que SI existan errores
  if (errors.length > 0) {
    //renderizamos la misma pagina pero mostrarndo los errores y los datos previamente ingresados
    res.render("admin/signup", {
      admin: true,
      manager: false,
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