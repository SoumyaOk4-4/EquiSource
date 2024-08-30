const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const UserRequest = require('../models/UserRequest');
const adminAuth = require('../middlewares/adminAuth');

router.get('/', async (req, res) => {
  try {
    const items = await Item.aggregate([{ $sample: { size: await Item.countDocuments() } }]);
    res.render('index', { items });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/rent-form', (req, res) => {
  const itemName = req.query.itemName;
  res.render('rentForm', { itemName });
});

router.post('/rent', async (req, res) => {
  const { name, phoneNumber, itemName } = req.body;

  const userRequest = new UserRequest({
    name,
    phoneNumber,
    itemName,
  });

  try {
    await userRequest.save();
    res.redirect('/thank-you');
  } catch (err) {
    res.status(500).json({ success: false });
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

router.get('/edit-request/:id', adminAuth, async (req, res) => {
  try {
    const request = await UserRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).send('Request not found');
    }
    res.render('admin/editRequest', { request });
  } catch (error) {
    console.error('Error fetching request for editing:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/update-request/:id', adminAuth, async (req, res) => {
  try {
    const { name, phoneNumber, itemName } = req.body;
    const request = await UserRequest.findByIdAndUpdate(req.params.id, { name, phoneNumber, itemName }, { new: true });

    if (!request) {
      return res.status(404).send('Request not found');
    }

    res.redirect('/admin/user-requests');
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/v1/learn', async (req, res) => {
  res.render('v1/learn');
});

router.get('/v1/price', async (req, res) => {
  res.render('v1/price');
});

//eggs
router.get('/eggs/tic-tac', async (req, res) => {
  res.render('eggs/ticTac');
});

router.get('/eggs/calc', async (req, res) => {
  res.render('eggs/calculator');
});

router.get('/eggs/snake', async (req, res) => {
  res.render('eggs/snake');
});

module.exports = router;
