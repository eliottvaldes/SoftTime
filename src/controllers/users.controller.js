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
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The Email is already in use.");
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