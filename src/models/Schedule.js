const {Schema, model}= require('mongoose');

//describimoos la estructura de la base de datos de la AGENDA de cada usuario
const ScheduleSchema = new Schema({          
    product: { 
        type: Array,
        required: true
    },
    date: { 
        type: String,
        required: true
    },
    time: { 
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: false
    },
    line:{
        type: String,
        required: true
    },
    station:{
        type: String,
        required: true
    },
    comments:{
        type: String,
        required: false
    },
    user: {
        type: String,
        required: true
    }
},{
    timestamp: true
})

module.exports = model('Schedules', ScheduleSchema);