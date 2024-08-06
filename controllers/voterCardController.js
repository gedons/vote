const VoterCard = require('../models/voterCardModel');

exports.createVoterCard = async (req, res) => {
  const { address, dob, voterId } = req.body;
  const userId = req.user.id;  

  try {
    // Check if a voter card already exists for this user
    const existingCard = await VoterCard.findOne({ user: userId });

    if (existingCard) {
      return res.status(400).json({
        success: false,
        message: 'A voter card has already been registered for this user.'
      });
    }

    // Create new voter card
    const voterCard = await VoterCard.create({
      user: userId,
      address,
      dob,
      voterId
    });

    res.status(201).json({
      success: true,
      message: 'Voter card registered successfully',
      voterCard
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};



exports.getVoterCard = async (req, res) => {
  try {
    const voterCard = await VoterCard.findOne({ user: req.user.id }).populate('user', 'name email profilePicture');
    
    if (!voterCard) {
      return res.status(404).json({
        success: false,
        message: 'Voter card not found'
      });
    }

    res.status(200).json({
      success: true,
      data: voterCard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

