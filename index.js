const express = require('express');
const cors = require('cors');
const rootrouter = require('./routes/index.js');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Database connection error:', err));
  

app.use("/api", rootrouter);

app.listen(3000,'0.0.0.0', () => {    
    console.log('Server is running on port 3000');
});