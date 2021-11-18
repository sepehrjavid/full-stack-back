const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1)
}

const password = process.argv[2];

const url = `mongodb+srv://sep:${password}@phonebook.wivpm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);

const contactScheme = new mongoose.Schema({
    name: String,
    number: String
});

const Contact = mongoose.model('Contact', contactScheme);

if (process.argv.length === 5) {
    const newContact = new Contact({
        name: process.argv[3],
        number: process.argv[4]
    });

    newContact.save().then(result => {
        console.log(`added ${newContact.name} number ${newContact.number} to phonebook`);
        mongoose.connection.close()
    });

} else {
    console.log("Phonebook:");
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`);
        });
        mongoose.connection.close()
    })

}

