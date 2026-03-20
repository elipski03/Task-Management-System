const express = require('express');
const app = express();

const mongoose = require('mongoose');
const path = require('path');
const cron = require('node-cron');

require('dotenv').config();
require('./auth/passport');

const authRouter = require('./routes/authRoute');
const authApiRouter = require('./routes/authApiRoute');
const runReminders = require('./jobs/reminderJob');

const PORT_B = process.env.PORT_B;
const PORT_F = process.env.PORT_F;
const mongoURI = process.env.mongoURI;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ---------------------------------- Endpoints ----------------------------------- */

app.use('/auth/api', authApiRouter);

app.use('/auth', authRouter);

/* ----------------------------------- Connect ------------------------------------ */

const connect = async (url) => {
  await mongoose.connect(url).then(() => {
    console.log('Connection to MongoDB established');
  });
};

connect(mongoURI);

app.listen(PORT_B, () => {
  console.log(`Server running on http://localhost:${PORT_B}`);
});

/* ---------------------------------- Background ---------------------------------- */

cron.schedule('* * * * *', runReminders);
s