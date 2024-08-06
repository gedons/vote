const mongoose = require('mongoose');

const voterCardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true , unique: true},
  address: { type: String, required: true },
  dob: { type: Date, required: true },
  voterId: { type: String, required: true, unique: true }
});

const VoterCard = mongoose.model('VoterCard', voterCardSchema);
module.exports = VoterCard;
