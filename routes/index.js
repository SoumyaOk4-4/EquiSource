const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const UserRequest = require('../models/UserRequest');

router.get('/', async (req, res) => {
  try {
    const items = await Item.find({});
    res.render('index', { items });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/rent', async (req, res) => {
  const { name, phoneNumber, productName } = req.body;

  try {
    const newRequest = new UserRequest({
      name,
      phoneNumber,
      productName
    });

    await newRequest.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving user request:', error);
    res.json({ success: false });
  }
});

router.get('/thank-you', (req, res) => {
  res.render('thankYou');
});

router.get('/policy', (req, res) => {
  res.render('policy');
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/guidelines', (req, res) => {
  res.render('guidelines');
});

module.exports = router;
