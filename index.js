require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;

// * Code for Route 1 goes here
app.get('/', async (req, res) => {
    const petsUrl = 'https://api.hubspot.com/crm/v3/objects/pets';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(petsUrl, { headers, params: {properties: 'pet_name,pet_type,age,weight'}});
        const data = resp.data.results;
        res.render('homepage', { title: 'Pets | HubSpot APIs', data });
    } catch (error) {
        console.error(error);
    }
});

// * Code for Route 2 goes here
app.get('/update-cobj', async (req, res) => {
    res.render('updates', {title: 'Update Custom Object Form | Integrating With HubSpot I Practicum'});
});

// * Code for Route 3 goes here
app.post('/update-cobj', async (req, res) => {
    const update = {
        properties: {
            "pet_name": req.body.pet_name,
            "pet_type": req.body.pet_type,
            "age": req.body.age,
            "weight": req.body.weight,
        }
    }

    const updatePet = `https://api.hubspot.com/crm/v3/objects/pets`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.post(updatePet, update, { headers } );
        res.redirect('/');
    } catch(err) {
        console.error(err);
    }
});


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));