const mongoose = require("mongoose");
const config = require("./config");

//se utiliza para tener más seguridad a la hora de usar la conexion a la base de datos ya que .env almacena variables de entorno
const MONGODB_URL = process.env.MONGODB_URL;
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => console.log("Base de datos está conectada a: ", db.connection.host))
  .catch((err) => console.error(err));
