// routes/subjectRoutes.js
const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const Student = require('../models/Student'); 
const verifyToken = require('../verifyToken');

router.post('/add', verifyToken, async (req, res) => {
  try {
    const newSubject = new Subject(req.body);
    const savedSubject = await newSubject.save();
    const desiredSemester = savedSubject.semester;

    const students = await Student.find({ semester: desiredSemester });

    if (!students) {
      return res.status(404).json({ msg: "No students found for the given semester" });
    }

    for (const student of students) {
      student.subjects.push({name: savedSubject.name, maxMarks:savedSubject.maxMarks});
      await student.save();
    }

    res.status(200).json(savedSubject);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;