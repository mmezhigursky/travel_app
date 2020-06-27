
const  path = require('path');

let projectData = {};
let dataDump = {};
const fetch = require("node-fetch");
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


app.post('/getdata', function (req, res) {
    console.log(req)
    let test = apiMachine(req.body.foto, res);
    // res.send(projectData)
})

const apiMachine = async (data, res) =>{
    const pixabay = `https://pixabay.com/api/?key=${process.env.pixabay_key}&q=${data}&image_type=photo`;

    let pixabay_req = await fetch(pixabay);
    try{
        if(pixabay_req.status==200){
        console.log(pixabay_req);
        let foto_url = await pixabay_req.json();
        console.log(foto_url);
        projectData['pic'] = foto_url.hits[0].webformatURL;
        console.log("это projectData  ", projectData);
        res.send(projectData)
    }
    }
    catch (error) {

        console.log("error", error);
      }
}
    