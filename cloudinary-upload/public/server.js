const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dtyxqjl2y',
  api_key: '314396634431864',
  api_secret: 'G1xUjddqbEc4KQGoRJXe3IibpfI',
});

// Create Cloudinary storage instance
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Optional: Define the folder where images will be stored in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Optional: Allowed formats
  },
});

const upload = multer({ storage: storage });

const app = express();

// Serve the HTML file
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle file uploads
app.post('/upload', upload.single('photo'), (req, res) => {
  const file = req.file;
  if (file) {
    res.json({ url: file.path });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
