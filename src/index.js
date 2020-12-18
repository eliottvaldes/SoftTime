
require('dotenv').config();

//importando la configuración del sevidor
const app = require('./servidor');
require('./database');

//iniciamos el servidor
app.listen(app.get('port'), () => {
    console.log("servidor corriendo en puerto:", app.get('port'));
});
