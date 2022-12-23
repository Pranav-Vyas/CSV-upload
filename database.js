const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const url = process.env.DATABASE_URL;

// Connecting to database
mongoose.connect(url, {useNewUrlParser: true}).then( () => {
    console.log('Database connected');
} ).catch( (err) => {
    console.log(err);
} )