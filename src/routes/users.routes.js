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

//funcion para checar el privilegio del usuario
function requireRole(role) {
  return function (req, res, next) {
    var privilege = req.user.privilege.trim() == role ? true : false;
    var admin = req.user.privilege.trim() == "admin" ? true : false;
    if (privilege) {
      next();
    } else {
      res.render("error", {
        admin: admin,
        httperr: "Sin autorizacion",
        descripcion: "Usted no tiene acceso a esta pagina."
      });
    }
  }
}

//renderizar formulario
router.get("/admin/signup", checkSession, requireRole("admin"), renderSignUpForm);

// guardar los datos del formulario
router.post("/admin/signup", checkSession, requireRole("admin"), singup);

//login usuario
router.get("/users/signin", renderSigninForm);
//revisar los datos del formulario de inicio de sesion
router.post("/users/signin", passport.authenticate("local", {
  //en caso erroneo, recarga la pagina mostrando los mensajes de error
  failureRedirect: "/users/signin",
  failureFlash: true
}), signin);

//login admin
router.get("/admin/signinad", renderSigninadForm);
//revisar los datos del formulario de inicio de sesion admin
router.post("/admin/signinad", signinad);


router.get("/users/logout", checkSession, logout);

//renderizar bienvenida normal usr
router.get("/users/welcome", checkSession, requireRole("manager"), welcome);

//renderizar bienvenida admin
router.get("/admin/welcome", checkSession, requireRole("admin"), welcomeAd);

module.exports = router;
