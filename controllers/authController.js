const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const cloudinary = require('../config/cloudinaryConfig');
const upload = require('../config/multerConfig');

exports.register = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err });
    }

    const { name, email, password } = req.body;

    try {
      let profilePictureUrl = '';

      if (req.file) {
        const uploadedResponse = await cloudinary.uploader.upload(req.file.path, {
          upload_preset: 'voter_card_profile_pictures'
        });
        profilePictureUrl = uploadedResponse.secure_url;
      }

      const user = await User.create({ name, email, password, profilePicture: profilePictureUrl });
      const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1d' });
      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1d' });
      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
