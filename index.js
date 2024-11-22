const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.static('public'));

// Configure Multer
const upload = multer({ dest: 'uploads/' });

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// File upload endpoint
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
