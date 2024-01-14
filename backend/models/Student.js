const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    default: null
  },
  maxMarks: {
    type: Number,
    required: true
  }
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  batch: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  subjects:{
    type:[subjectSchema],
    default:[]
  }
});

const Student = mongoose.model('Student', studentSchema)

module.exports = Student;
