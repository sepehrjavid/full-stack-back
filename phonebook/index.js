const express = require('express');
var morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
morgan.token('body', function (req, res) {
    if (req.method === "POST") {
        return JSON.stringify(req.body)
    } else {
        return '\r'
    }
});

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


let numbers = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

function generateId() {
    return Math.floor(Math.random() * 1000);
}

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

    if (numbers.find(number => number.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const newContact = {
        name: body.name,
        number: body.number,
        id: generateId()
    };

    numbers = numbers.concat(newContact);
    response.json(newContact)
});


app.get('/api/persons', (request, response) => {
    response.json(numbers)
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const contact = numbers.find(number => number.id === id);
    if (contact) {
        response.json(contact);
    } else {
        response.status(404).end()
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    numbers = numbers.filter(contact => contact.id !== id);
    response.status(204).end()
});

app.get('/info', (request, response) => {
    let date = new Date();
    response.send(
        `<div><p>Phonebook has info for ${numbers.length} people</p><p>${date}</p></div>`
    )
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
