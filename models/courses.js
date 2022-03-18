const mongoose = require('mongoose')
const { Schema } = mongoose


const CourseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ['Advanced', 'Intermediate', 'Beginner'],
        default: 'Beginner'
    },
    duration: {
        type: Number,
        required: true
    },
    class: {
            type:String,
            enum: ['Recorded'],
            default: 'Recorded'
    }
})

module.exports = mongoose.model('Course', CourseSchema)