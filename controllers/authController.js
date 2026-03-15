const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user)
            return res.status(401).json({ error: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, User.password);
        if (!isMatch)
            return res.status(401).json({ error: 'Invalid email or password' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });
        console.log(`User ${newUser._id} in successfully`);
        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({
            email,
            password,
            name,
        });
        await newUser.save();
        console.log('User registered successfully');
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    login: login,
    register: register
};