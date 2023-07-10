require('dotenv').config();
const express = require('express');
const app = express();
const conn = require('./utils/db');

conn.once('open', () => console.log('DB Connected'));
conn.on('error', () => console.log('Error'));

app.use(express.json());
const urlRoutes = require('./routes/url');

app.use('/', urlRoutes);

app.listen(5000, () => {
  console.log(`listening at port 5000`);
});
