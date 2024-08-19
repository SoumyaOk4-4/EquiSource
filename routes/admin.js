const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Item = require('../models/Item');
const UserRequest = require('../models/UserRequest');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5 MB limit

const adminAuth = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.redirect('/admin/login');
  }
};

router.get('/login', (req, res) => {
  res.render('admin/login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    res.redirect('/admin/upload');
  } else {
    res.status(401).send('Unauthorized');
  }
});

router.get('/upload', adminAuth, (req, res) => {
  res.render('admin/upload');
});

router.post('/upload', adminAuth, upload.single('image'), async (req, res) => {
  const { name, price, available } = req.body;
  const image = req.file ? req.file.filename : '';

  try {
    await Item.create({
      name,
      price,
      image,
      available: !!available
    });
    res.redirect('/admin/upload');
  } catch (error) {
    console.error('Error uploading product:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/user-requests', adminAuth, async (req, res) => {
  try {
    const requests = await UserRequest.find();
    res.render('admin/userRequests', { requests });
  } catch (error) {
    console.error('Error fetching user requests:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/admin/login');
  });
});

module.exports = router;
