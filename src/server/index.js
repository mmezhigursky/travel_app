
const  path = require('path');

let projectData = [];
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
    getGeoname(req)
    .then((geo) => getWeather(geo))
        .then((pic) => getpicture(pic))
            .then((final) =>projectData.push(final))
                .then(res.send(projectData));
    
   // let test = apiMachine(req, res);
    // res.send(projectData)

})



const getGeoname = async (data) => {

    let geoName = `http://api.geonames.org/postalCodeSearchJSON?placename_startsWith=${data.body.place}&countryCode=${data.body.country}&maxRows=1&username=${process.env.geoName}`;
    
    console.log('reqest geoName',  geoName);

    let geoChecker = await fetch(geoName);

    try{       
        let palceAtr = await geoChecker.json();
        
        if (palceAtr.postalCodes[0] == undefined) {
            
            console.log("error", 'No data'); 
            
        } 
        else {
            
            return palceAtr 
        }
            
    } 
    catch (error) {
        
        console.log("error", error);

        return error
     }

}

const getWeather = async (data) => {

    console.log(data)

    let weather =  `https://api.weatherbit.io/v2.0/forecast/daily?lat=${data.postalCodes[0].lat}&lon=${data.postalCodes[0].lng}&key=${process.env.weatherbit_key}`;
    
    let weatherChecker = await fetch(weather);

    let resWeather = {};

    try{

        let weatherData = await weatherChecker.json();
        
        if (weatherData['data'][0] !== undefined){

            let averageTemp = 0;

            for(let tempreture of weatherData['data']){

                averageTemp = averageTemp+tempreture.temp;
            }

            averageTemp = averageTemp / weatherData['data'].length;
            let maxTemp = Math.max.apply(Math, weatherData['data'].map(function(o) { return o.max_temp; }));
            let minTemp = Math.min.apply(Math, weatherData['data'].map(function(o) { return o.min_temp; }));
            resWeather = {maxT:maxTemp, minT:minTemp, averT:averageTemp, place:data.postalCodes[0].placeName};
            console.log(resWeather);
            return resWeather
            }
           
        else {
            
            return 'No data' }

        }
          
    catch (error) {

        console.log("error", error);
        }
}

const getpicture  = async (data) => {

    let pixabay = `https://pixabay.com/api/?key=${process.env.pixabay_key}&q=${data.place}&image_type=photo`;
    console.log('reqest pixbay',pixabay);
    let pixabay_req = await fetch(pixabay);

    try{
        
        let foto_url = await pixabay_req.json();

        data['pic'] = foto_url.hits[0].webformatURL;

        return data

    }
    
    catch (error) {

        console.log("error", error);
        
        return error
    }

}