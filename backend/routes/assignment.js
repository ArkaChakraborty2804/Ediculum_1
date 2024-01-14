const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const PDF = require('../models/PDF');
const multer = require('multer')

router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const { filename, path } = req.file;

    // Create a new instance of the PDF schema
    const pdf = new PDF({
      filename,
      filepath: path,
    });

    // Save the PDF file information to the database
    await pdf.save();

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});

router.get('/pdf', async (req, res) => {
    try {
      const pdfFiles = await PDF.find();
      res.status(200).json(pdfFiles);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the PDF files' });
    }
});

module.exports = router;