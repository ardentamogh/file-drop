const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/pdf-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const pdfSchema = new mongoose.Schema({
  filename: String,
  path: String,
  originalname: String
});

const Pdf = mongoose.model('Pdf', pdfSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.get('/status_check', (req, res) => {
  const randomValue = Math.sin(Math.random() * Math.PI * 2);
  const result = randomValue >= 0;
  res.json({ result });
});

app.post('/upload', upload.single('pdf'), async (req, res) => {
  const newPdf = new Pdf({
    filename: req.file.filename,
    path: req.file.path,
    originalname: req.file.originalname
  });

  try {
    await newPdf.save();
    res.status(200).json(newPdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/pdfs', async (req, res) => {
  try {
    const pdfs = await Pdf.find();
    res.status(200).json(pdfs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/pdf/:id', async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }
    res.download(pdf.path, pdf.originalname);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
