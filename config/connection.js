const mongoose = require('mongoose');
require('dotenv').config();

const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DB}`;

mongoose.connect(URI);

module.exports = mongoose;