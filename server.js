const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Upload dir: use env for Railway volume, or ./uploads
const UPLOAD_BASE = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');
const MEMORIES_DIR = path.join(UPLOAD_BASE, 'memories');
const GALLERY_DIR = path.join(UPLOAD_BASE, 'gallery');

[MEMORIES_DIR, GALLERY_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Multer: memories (images)
const memoryStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, MEMORIES_DIR),
  filename: (req, file, cb) => {
    const ext = (file.mimetype.match(/\/(.+)$/) || ['', 'jpg'])[1].replace('jpeg', 'jpg');
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`);
  },
});
const uploadMemory = multer({ storage: memoryStorage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

// Multer: gallery (videos)
const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, GALLERY_DIR),
  filename: (req, file, cb) => {
    const ext = (file.mimetype.match(/\/(.+)$/) || ['', 'mp4'])[1];
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`);
  },
});
const uploadGallery = multer({ storage: galleryStorage, limits: { fileSize: 100 * 1024 * 1024 } }); // 100MB

// API: Memories (photos)
app.get('/api/memories', (req, res) => {
  try {
    const files = fs.readdirSync(MEMORIES_DIR).filter((f) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
    const list = files.map((f) => ({ id: f, url: `/uploads/memories/${f}` }));
    res.json(list);
  } catch (e) {
    res.json([]);
  }
});

app.post('/api/memories', uploadMemory.array('photos', 20), (req, res) => {
  if (!req.files || !req.files.length) return res.status(400).json({ error: 'No files' });
  const list = req.files.map((f) => ({ id: f.filename, url: `/uploads/memories/${f.filename}` }));
  res.json(list);
});

app.delete('/api/memories/:id', (req, res) => {
  const file = path.join(MEMORIES_DIR, req.params.id);
  if (!fs.existsSync(file) || path.relative(MEMORIES_DIR, path.resolve(MEMORIES_DIR, req.params.id)).startsWith('..')) {
    return res.status(404).json({ error: 'Not found' });
  }
  fs.unlinkSync(file);
  res.json({ ok: true });
});

// API: Gallery (videos)
app.get('/api/gallery', (req, res) => {
  try {
    const files = fs.readdirSync(GALLERY_DIR).filter((f) => /\.(mp4|webm|ogg|mov)$/i.test(f));
    const list = files.map((f) => ({ id: f, url: `/uploads/gallery/${f}` }));
    res.json(list);
  } catch (e) {
    res.json([]);
  }
});

app.post('/api/gallery', uploadGallery.single('video'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  res.json({ id: req.file.filename, url: `/uploads/gallery/${req.file.filename}` });
});

app.delete('/api/gallery/:id', (req, res) => {
  const file = path.join(GALLERY_DIR, req.params.id);
  if (!fs.existsSync(file) || path.relative(GALLERY_DIR, path.resolve(GALLERY_DIR, req.params.id)).startsWith('..')) {
    return res.status(404).json({ error: 'Not found' });
  }
  fs.unlinkSync(file);
  res.json({ ok: true });
});

// Serve uploaded files
app.use('/uploads', express.static(UPLOAD_BASE));

// Serve static site (HTML, CSS, JS, assets)
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
