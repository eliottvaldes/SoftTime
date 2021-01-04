//para poder crear la base de datos
const { Schema, model } = require('mongoose');
//para poder hacer el cifrado y descifrado de las contraseña
const bcrypt = require('bcryptjs');

//describimoos la estructura de la base de datos de los usuarios de la app
const UsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    privilege:
    {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    },    
});

//metodo para cifrar contraseña de usuario a partir de bcryptjs

UsersSchema.methods.encpass = async password => {
    //como es un metodo asincrono se usa async para aevitar problemas en el servidor
    const salto = await bcrypt.genSalt(15);
    //para devolver la contraseña cifrada
    return await bcrypt.hash(password, salto);
};

UsersSchema.methods.decpass = async function (password) {
    //obtiene el password del usuario en formato hash y la compara usando un metodo de bcript
    //devuelve true si la contraseña es igual a la guardada en la base de datos
    return await bcrypt.compare(password, this.password);

};


module.exports = model('Users', UsersSchema);