const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    rates: [
        {
            type: Number,
            required: true
        }
    ],
    volume: {
        type: Number,   
    },
    cap: {
        type: Number,
    },
}, { timestamps: true });

module.exports = mongoose.model('Stock', stockSchema);