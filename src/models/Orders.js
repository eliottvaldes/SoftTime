const { Schema, model } = require('mongoose');

//describimoos la estructura de la base de datos de los pedidos
const OrdersSchema = new Schema(
    {
        product: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status:{
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true
        },
        date: { 
            type: Date, 
            default: Date.now 
        }
    },
    {
        timestamp: true
    })


module.exports = model('Orders', OrdersSchema);