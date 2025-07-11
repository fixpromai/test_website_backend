const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken');


exports.googleLogin = async (req, res) => {
  try {
    const { email, name, googleId, photo } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, name, googleId, photo });
    } else {
      
      let updated = false;

      if (!user.googleId && googleId) {
        user.googleId = googleId;
        updated = true;
      }

      if (!user.photo && photo) {
        user.photo = photo;
        updated = true;
      }

      if (updated) await user.save();
    }

    const token = generateToken(user._id, user.email);

    res.cookie('fixpromToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      domain: process.env.COOKIE_DOMAIN || 'localhost',
      path: '/'
    });

    res.json({ token, user });
  } catch (error) {
    console.error("Google Login Error:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.logout = (req, res) => {
  res.clearCookie('fixpromToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    domain: process.env.COOKIE_DOMAIN || 'localhost',
  });

  res.status(200).json({ message: 'Logged out successfully' });
};

exports.checkLoginFromCookie = (req, res) => {
  const token = req.cookies.fixpromToken;

  if (!token) {
    return res.json({ loggedIn: false });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ loggedIn: true, token }); 
  } catch (err) {
    return res.json({ loggedIn: false });
  }
};
