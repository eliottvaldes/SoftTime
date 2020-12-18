// Iniciamos la importacion del modulo passport que es para poder guardar la autentificación del usuario a partir de la autentificación local
const passport = require('passport');
//estrategia local. Tambien se puede hacer por fb, twitter, google, etc
const LocalStrategy = require('passport-local').Strategy;

//Importamos nuestro modelo de base de datos
const User = require('../models/Users'); 

//definimos nuestra estrategia
passport.use(new LocalStrategy({
  usernameField: 'username'
}, async (username, password, done) => {
  //conprobar si existe el username en la base de datos
  const user = await User.findOne({username: username});
  if (!user) {
      //si no encuentra al usuario
    return done(null, false, { message: 'No existe registro del usuario dentro del sistema' });
  } else {
    //hacemos la comparación
    const match = await user.decpass(password);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Contraseña incorrecta' });
    }
  }
}));

//metodo con funcion callback que recibe el id del usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//para la navegación. Comprueba en la base de datos de acuerdo al id
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
