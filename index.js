// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    res.sendFile(__dirname + '/index.html')
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.send(pets)
});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    const petOwner = req.query.owner

    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner === petOwner);

    // send the pet as a response
    res.send(`${petOwner} is the owner of ${pet.name}.`)
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const petName = req.params.name

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === petName);

    // send the pet as a response
    res.send(`${petName} is the name of ${pet.name}`)
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;

/* Pseudocode for each prompt: 

1. GET - all pets - '/api/v1/pets' 
    Send the array of pets as the response 

2. GET - pet by id - '/api/v1/pets/:name'
    Send a request to get the owner from the pet array
    And then send the owner as the response

3. GET - pet by owner name - '/api/v1/pets/owner'
    Send a request to get the pet name from the pet array
    And then send the pet as the response

*/
