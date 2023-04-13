const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  res.send('File uploaded successfully.');
});

app.use(express.static('public'));

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
