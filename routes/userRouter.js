const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/', async (req, res) => {
	try {
		const user = await User.find();
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//getting one user
router.get('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.json(user);
	} catch (err) {
		res.status(404).json({ message: 'cannot find user' });
	}
});

//creating a user
router.post('/', async (req, res) => {
	const user = new User({
		name: req.body.name,
		password: req.body.password,
	});
	try {
		const newUser = await user.save();
		res.json(newUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

//deleting a user
router.delete('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (user == null) {
			return res.status(404).json({ message: 'Cannot find user' });
		}
		res.user = user;
		res.user.remove();
		res.json({ message: 'Deleted user' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//updating a user
router.patch('/:id', async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user == null) {
		return res.status(404).json({ message: 'Cannot find user' });
	}
	res.user = user;

	if (req.body.name != null) {
		res.user.name = req.body.name;
	}
	if (req.body.password != null) {
		res.user.password = req.body.password;
	}
	try {
		const updatedUser = await res.user.save();
		res.json(updatedUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});
module.exports = router;
