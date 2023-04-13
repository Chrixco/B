const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' });
const fileType = require('file-type');
const fs = require('fs');

app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  const fileBuffer = fs.readFileSync(req.file.path);
  const type = await fileType.fromBuffer(fileBuffer);
  if (type.ext !== 'pdf' && type.ext !== 'txt') {
    return res.status(400).json({ error: 'Invalid file type. Only PDF and text files are allowed.' });
  }

  // Process the uploaded file
  res.send('File uploaded successfully.');
});

app.use(express.static('public'));

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
