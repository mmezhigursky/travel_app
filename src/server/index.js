
const  path = require('path');

const express = require('express');

// const mockAPIResponse = require('./mockAPI.js');

const cors = require("cors");

const dotenv = require('dotenv');

dotenv.config();

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cors());

app.use(express.static('dist'))



console.log(__dirname)


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
})

// app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
// })


const apiMachine = async (data) =>{
    const pixabay = `https://pixabay.com/api/?key=${process.env.pixabay_key}&q=${data.distanation}&image_type=photo`;

    const pixabay_req = await fetch(pixabay, function(error, response, body){


    });
}