const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Person = require('./models/User');

mongoose.connect('mongodb://localhost/test',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once('open', () => {
    console.log('Connection made!!');
}).on('error', (err) => {
    console.log('Connection error:', err);
});

/* 
    To start/stop MongoDB through brew
brew services start mongodb-community@4.4
brew services stop mongodb-community@4.4 
*/

const port = process.env.PROT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port} 🚀`);
})
