const express = require('express');
const app = express();

const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const PORT_NUMBER = process.env.PORT;
const mongoURI = process.env.mongoURI;

app.use(express.urlencoded({ extended: true }));

/* ---------------------------------- Endpoints ----------------------------------- */

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

/* ----------------------------------- Connect ------------------------------------ */

const connect = async (url) => {
  await mongoose.connect(url).then(() => {
    console.log('Connection to MongoDB established');
  });
};

connect(mongoURI);

app.listen(PORT_NUMBER, () => {
  console.log(`Server running on http://localhost:${PORT_NUMBER}`);
});
