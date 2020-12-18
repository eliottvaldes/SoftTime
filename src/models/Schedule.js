const {Schema, model}= require('mongoose');

//describimoos la estructura de la base de datos de la AGENDA de cada usuario
const ScheduleSchema = new Schema({          
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
    }
},{
    timestamp: true
})

module.exports = model('Schedule', ScheduleSchema);