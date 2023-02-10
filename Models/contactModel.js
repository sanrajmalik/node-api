const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name:{
        type: String,
        require: [true,"Please add name"],
    },
    email:{
        type: String,
        require: [true,"Please add email"],
    },
    phone:{
        type: String,
        require: [true,"Please add phone"],
    }
},
    {
        timestamps:true,
    }
)

module.exports = mongoose.model('Contact',contactSchema)