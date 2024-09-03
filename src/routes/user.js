const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post('/user', async (req, res) => {
  try {
    const { name, email, dateOfBirth, address } = req.body;

    if (!name || !email || !dateOfBirth || !address) {
      return res.status(400).json({ error: 'All fields are mandatory' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const user = new User({ name, email, dateOfBirth, address });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

router.get('/user', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error when searching for user' });
  }
});

router.put('/user/:id', async (req, res) => {
  try {
    const { name, email, dateOfBirth, address } = req.body;

    if (!name || !email || !dateOfBirth || !address) {
      return res.status(400).json({ error: 'All fields are mandatory' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, dateOfBirth, address },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

router.delete('/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = router;
