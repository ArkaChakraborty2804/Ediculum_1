const express = require('express')
const router = express.Router()
const Student = require('../models/Student')
const Subject = require('../models/Subject')
const verifyToken = require('../verifyToken')

router.post('/create',verifyToken, async (req, res) => {
    try {
      const newStudent = new Student(req.body);
      const savedStudent = await newStudent.save();

      const subjects = await Subject.find({ semester: newStudent.semester });
  
      if (subjects.length > 0) {
        savedStudent.subjects = subjects.map(subject => ({
          name: subject.name,
          maxMarks: subject.maxMarks
        }));
        await savedStudent.save();
      }
  
      res.status(200).json(savedStudent);
    } catch (err) {
      res.status(500).json(err);
    }
});

// router.get('/semester', async (req, res) => {
//     try {
//       const { semester } = req.query;
  
//       if (!semester) {
//         return res.status(400).json({ message: 'Semester parameter is missing' });
//       }
  
//       const students = await Student.find({ semester: semester });
//       res.status(200).json(students);
//     } catch (err) {
//       res.status(500).json(err);
//     }
// })

router.get('/semester/:id', async (req, res) => {
    try {
      console.log(req.params.id)
      const students = await Student.find({semester:req.params.id});
      console.log(students)
      res.status(200).json(students);
    } catch (err) {
      res.status(500).json(err);
    }
})

router.get('/semester', async (req, res) => {
    try {
    //   console.log(req.params.id)
      const students = await Student.find();
      console.log(students)
      res.status(200).json(students);
    } catch (err) {
      res.status(500).json(err);
    }
})

router.post('/marks', verifyToken, async (req, res) => {
    const { name, registrationNumber, marks, semester } = req.body;
    console.log(name)
    try {
      const student = await Student.findOne({ registrationNumber: registrationNumber });
      console.log(student)
  
      if (!student) {
        return res.status(404).json('Student not found'); // Handle student not found
      }
  
      // Assuming `marks` is an array of objects with `name` and `marks` properties
      student.subjects.forEach((subject) => {
        if(subject.name==name){
            subject.marks = marks
        }
      });
  
      await student.save();
  
      res.json('Marks updated successfully');
    } catch (err) {
      console.error(err);
      res.status(500).json('Error updating marks');
    }
  });

module.exports = router