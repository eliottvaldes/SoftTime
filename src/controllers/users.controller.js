const usersCtrl = {};

// Models
const User = require('../models/Users');

// Modules
const passport = require("passport");


//mostrando el formulario de registro
usersCtrl.renderSignUpForm = (req, res) => {
  //formulario de registro
  res.render('users/signup');
};


//funcion encargada de guardar los datos de registro
usersCtrl.singup = async (req, res) => {
  //arreglo de errores de validación
  let errors = [];
  const { name, lastname, username, phone, email, password, confirm_password } = req.body;

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
  if(phone.match(valphone)){
    errors.push({ text: "Numero telefonico inválido" });  
  }
  //validar contraseña y su confirmación
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
    res.render("users/signup", {
      errors,
      name,
      lastname,
      username,
      phone,
      email,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const usernameUser = await User.findOne({ username: username });
    if (usernameUser) {
      req.flash("error_msg", "El nombre de usuario que ingresaste ya está en uso. Prueba con uno diferente");
      res.redirect("/users/signup");
    } else {
      // Saving a New User
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Has registrado a un nuevo Administrador de Ventas satisfactoriamente");
      res.redirect("/users/signin");
    }
  }
};


//solo renderiza formulario de inicio de sesion
usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin");
};

//funcion para iniciar sesion
usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/orders",
    failureRedirect: "/users/signin",
    failureFlash: true
  });

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/users/signin");
};

module.exports = usersCtrl;