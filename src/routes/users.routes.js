const router = require("express").Router();

//importamos todas las funciones del controlador de usuarios
const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  welcome,
  logout
} = require("../controllers/users.controller");

//renderizar formulario
router.get("/users/signup", renderSignUpForm);
// guardar los datos del formulario
router.post("/users/signup", singup);

//renderizar formulario de inicio de sesion
router.get("/users/signin", renderSigninForm);
//revisar los datos del formulario de inicio de sesion
router.post("/users/signin", signin);

router.get("/users/logout", logout);

//renderizar bienvenida
router.get("/users/welcome", welcome);

module.exports = router;
