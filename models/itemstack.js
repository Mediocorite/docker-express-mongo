
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ItemSchema = new Schema(
    {
        name: { type: String, required: true },
        date: { type: Date, default: Date.now }
    })
// Creating and Exporting a Model
module.exports = mongoose.model('itemStack', ItemSchema)

