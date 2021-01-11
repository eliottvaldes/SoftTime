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
        status: {
            type: String,
            required: true
        },
        tag: {
            type: String
        },
        user: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        },
        privilege: {
            type: String,
            default: "sell" 
        }
    },
    {
        timestamp: true
    })


module.exports = model('Orders', OrdersSchema);