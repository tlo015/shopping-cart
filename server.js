if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();;
};

//creditials set up for USAePay
const apiKey = process.env.MY_KEY;
const apiPassword = process.env.MY_PASSWORD;
console.log(apiKey, apiPassword);

const express = require('express');
const sha256 = require('sha256');
const app = express();
const fs = require ('fs');

//RESTfulAPI
var seed = "randomvalue";
var apikey = apikey;
var apipin = apiPassword;
var prehash = apikey + seed + apipin;
var apihash = 's2/' + seed + '/' + sha256(prehash);
var authKey = new Buffer(apikey + ':' + apihash).toString('base64');
console.log ('Authorization: basic '+ authKey);

const queryURL = 'https://sandbox.usaepay.com/api/v2/' + authKey;

app.set('view engine', 'ejs');
//parse the body as if it is a JSON object 
app.use(express.json());
app.use(express.static('public'));

//route for the store - get request  
app.get('/', function(req, res) {
   fs.readFile('items.json', function(err, data) {
       if (err) {
           res.status(500).end();
       } else {
           res.render ('index.ejs', {
            //send the key to the index file
                authKey: authKey,
                items: JSON.parse(data)
           });
       }
   }) 
});

//submitting the form 
//send the information to the API
//return an unique ID 
//use ID to get information needed to charge the card 
app.post('/charge', function(req, res) {
    console.log('button')
    fs.readFile('items.json', function(err, data) {
        if (err) {
            res.status(500).end()
        } else {
            console.log('purchase')
            //data from JSON file
            const itemsJson = JSON.parse(data);
            const itemsArray = itemsJson.merch;
            let total = 0;
            //access JSON from the body
            req.body.items.forEach(function(item) {
                const itemJSON = itemsArray.find(function(i) {
                    return i.id == item.id
                })
                total = total + itemJson.price * item.quantity
            })
        }
    })
});

app.listen(3000);