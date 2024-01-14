const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    maxMarks: {
      type: Number,
      required: true
    },
    semester: {
      type: Number,
      required: true
    }
});

module.exports = mongoose.model('Subjects',subjectSchema)