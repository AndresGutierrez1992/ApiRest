const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });


const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

mongoose.connect(URI);

module.exports = mongoose;