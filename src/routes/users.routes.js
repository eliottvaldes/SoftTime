const router = require("express").Router();

const passport = require("passport");

//importamos todas las funciones del controlador de usuarios
const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  welcome,
  renderSigninadForm,
  signinad,
  welcomeAd,
  logout
} = require("../controllers/users.controller");


// requerimos la funcion para mostrar si está autenticado y cuenta con sesión activa
const { checkSession } = require("../helpers/auth");

//renderizar formulario
router.get("/admin/signup", checkSession, renderSignUpForm);

// guardar los datos del formulario
router.post("/admin/signup", checkSession, singup);

//login usuario
router.get("/users/signin", renderSigninForm);
//revisar los datos del formulario de inicio de sesion
router.post("/users/signin", /*passport.authenticate("local", {
  //en caso de que sea un usuario existente lo redirige a las ordenes
  successRedirect: (req, res) => {"/users/welcome"},
  //en caso erroneo, recarga la pagina mostrando los mensajes de error
  failureRedirect: "/users/signin",
  failureFlash: true
}),*/ signin);

//login admin
router.get("/admin/signinad", renderSigninadForm);
//revisar los datos del formulario de inicio de sesion admin
router.post("/admin/signinad", signinad);


router.get("/users/logout", logout);

//renderizar bienvenida normal usr
router.get("/users/welcome", welcome);

//renderizar bienvenida admin
router.get("/admin/welcome", welcomeAd);

module.exports = router;
