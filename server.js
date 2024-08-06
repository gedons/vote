const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const voterCardRoutes = require('./routes/voterCardRoutes');
 



const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/voter-cards', voterCardRoutes);
 

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  w:1
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
