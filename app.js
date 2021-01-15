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

app.use(express.json());

// For deprication warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

/* 
    To start/stop MongoDB through brew
brew services start mongodb-community@4.4
brew services stop mongodb-community@4.4 

MVC => Model(Schenma) View(UI) Controller(Routers)

CRUD OPERATIONS

get all



*/

app.get('/', async (req, res) => {
    //console.log(Person.find())
    const collection = await Person.find();
    try {
        res.json(collection);
    } catch (error) {
        res.send('Error: ' + error);
    }
});

app.get('/:id', async (req, res) => {
    const id = req.params.id;

    const human = await Person.find({ _id: id }); // same as findById(id)

    try {
        res.json(human);
    } catch (err) {
        res.send('Error: ' + err);
    }

});

// Post stuff
app.post('/', async (req, res) => {
    const user = new Person({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        skill: req.body.skill
    });

    try {
        const saved = await user.save();
        res.json(saved);
    } catch (err) {
        res.status(404).send('Error: ' + err);
    }

});

app.put('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const search = await Person.find({ _id: id }); // same as findById(id)
        if (search.length > 0) {
            const update = {
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                skill: req.body.skill
            };
            const filter = { _id: id };

            try {
                const human = await Person.findOneAndUpdate(filter, update);
                res.json(human);
            } catch (err) {
                res.status(404).send('Error: ' + err);
            }
        } else {
            res.send('Invalid id');
        }
    } catch (err) {
        res.status(404).send('Invalid id, <br>Error: ' + err);
    }

    /* This also works
    Person.update({_id: id}, { 

    $set: {"name": req.body.name, 

    "password": req.body.amount,

    "email": req.body.done, 

    "skill": req.body.description,

    }}) */

});

app.delete('/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const search = await Person.find({ _id: _id }); // same as findById(id)
        if (search.length > 0) {
            try {
                const del = await Person.deleteOne({ _id: _id });
                res.send('Deleted!');
            } catch (err) {
                res.status(404).send('Error: ' + err);
            }
        } else {
            res.send('Invalid id');
        }
    } catch (err) {
        res.status(404).send('Invalid id, <br>Error: ' + err);
    }

});

const port = process.env.PROT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port} 🚀`);
})
