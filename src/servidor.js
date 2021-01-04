const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");
const connectMongo = require("connect-mongo");
const mongoose = require("mongoose");
const { createAdminUser } = require("./libs/createUser");



//------------INICIALIZACIONES
const app = express();
require("./config/passport");
//creamos un superusuarioadminsitrador de sistema
createAdminUser();

//------------CONFIGURACIONES
//para que el puerto se asigne automaticamente al subirlo a un host
app.set("port", process.env.PORT || 3001);
app.set("views", path.join(__dirname, "views"));
 
//para el motor de plantillas handlebars
app.set("views", path.join(__dirname, "views"));
app.engine(  
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main",    
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials")
    
  })
);
//para establecer el motor de plantillas creado en la s lineas anteriores
app.set('view engine', '.hbs');


//------------MIDLEWARS (funciones que procesan algo cada vez que llega una peticion)

//usar morgan para ver las peticiones al servidor
app.use(morgan('dev'));
app.use(express.urlencoded( 
    { extendend: true }
));
//para el modulo de metodos override para poder usar metodos delete o update a traves de una consulta con un input name="_method"
app.use(methodOverride("_method"));
const MongoStore = connectMongo(session);
//para las sesiones
app.use(
  session({
    secret: "softtimepass",
    cookie: { maxAge: 2628000 },
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),  
    host: app.get('host'),
    port: app.get('port'),
    expires: new Date(Date.now() + (30 * 84000 * 1000))
  })
);
//iniciando passport
app.use(passport.initialize());
//iniciando las sesiones
app.use(passport.session());
// para los mensajes
app.use(flash());



//------------VARIABLES GLOBALES

app.use((req,res,next)=>{
  //creamos variables global para almacenar los mensajes para poder mostrarlos
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  //mensaje de error de sesiones
  res.locals.error = req.flash("error");
  //variable para saber si el usuario ya está autenticado
  res.locals.user = req.user || null;
  next();
});
  

//------------RUTAS 
//rutas de pagina inicial
app.use(require("./routes/index.routes"));
//rutas de usuarios
app.use(require("./routes/users.routes"));
//rutas de pedidos
app.use(require("./routes/orders.routes"));
//rutas de pendientes en la agenda
app.use(require("./routes/schedule.routes"));
//rutas de consultas
app.use(require("./routes/queries.routes"));

//------------ARCHIVOS ESTATICOS

app.use(express.static(path.join(__dirname, 'public')));
 

app.get('/', (req,res)=>{ 
  res.render('404');
}); 


//exportamos para poder acceder a estas funciones desde cualquier parte
module.exports = app;