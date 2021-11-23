const express = require('express');
var morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const Contact = require('./models/Contact');

const app = express();
app.use(cors());
app.use(express.static('build'));
morgan.token('body', function (req, res) {
    if (req.method === "POST") {
        return JSON.stringify(req.body)
    } else {
        return '\r'
    }
});

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }


    const newContact = new Contact({
        name: body.name,
        number: body.number,
    });

    newContact.save().then((savedContact) => {
        response.json(savedContact)
    });
});


app.get('/api/persons', (request, response) => {
    Contact.find({}).then((contacts) => {
        response.json(contacts)
    });
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const contact = {
        name: body.name,
        number: body.number,
    };

    Contact.findByIdAndUpdate(request.params.id, contact, {new: true})
        .then(updatedContact => {
            response.json(updatedContact)
        })
        .catch(error => next(error))
});


app.get('/api/persons/:id', (request, response, next) => {
    Contact.findById(request.params.id)
        .then(result => {
            if (result) {
                response.json(result)
            } else {
                response.status(400).send({"detail": "Not found"})
            }
        })
        .catch(error => next(error))
});

app.delete('/api/persons/:id', (request, response, next) => {
    Contact.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        }).catch(error => next(error));
});

app.get('/info', (request, response) => {
    let date = new Date();
    Contact.find({}).then((contacts) => {
        response.send(
            `<div><p>Phonebook has info for ${contacts.length} people</p><p>${date}</p></div>`
        )
    });

});

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }

    next(error)
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
