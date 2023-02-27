const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    pwd: {
        type: String, 
        required: true
    }
}, { collection: "administators" });


const Admin = mongoose.model("Admin", AdminSchema );

module.exports = Admin;