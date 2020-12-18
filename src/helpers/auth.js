const helpers = {};

helpers.checkSession = (req, res, next) => {
  //funcion de passport para verificar si existe la sesion del usuario
  if (req.isAuthenticated()) {
    //continua con la siguiente funcion del código donde se use esta funcion
    return next();
  }
  req.flash('error_msg', 'Ha ocurrido un error con tu sesión');
  //renderizamos el login
  res.redirect('/users/signin');
};

//exportamos el módulo
module.exports = helpers;
