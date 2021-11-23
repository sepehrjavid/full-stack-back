const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    });

const contactScheme = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});
contactScheme.plugin(uniqueValidator);


contactScheme.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v
    }
});


module.exports = mongoose.model('Contact', contactScheme);
