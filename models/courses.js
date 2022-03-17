const mongoose = require('mongoose')
const { Schema } = mongoose


const CourseSchema = new Schema({
title: {
    type: String,
    required: true,
},
desc: {
    type: String
}
})

module.exports = mongoose.model('Course', CourseSchema)