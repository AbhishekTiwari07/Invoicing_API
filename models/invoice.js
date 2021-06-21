const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    address:{
        type: String,
        max:50,
        required: true
    },
    city:{
        type:String,
        max:50,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    pincode:{
        type: String,
        max:6,
        min:6,
        required:true
    },
    note:{
        type:String,
        default:''
    },
    listItems: [
        {
            name: String,
            qty: Number,
            amount: Number,
            total: Number
        }
    ],
    dueDate : {
        type: Date
    },
    status: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('invoice',invoiceSchema)