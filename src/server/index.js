
const  path = require('path');

let datadump = {};

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


app.post('/getdata', async function (req, res) {
   const geo =  await getGeoname(req);

   const Weather =  await getWeather(geo);

   const pic =  await getpicture(req);

   datadump['geo'] = geo;

   datadump['Weather'] = Weather;

   datadump['pic'] = pic;

   datadump['date_req'] = date();

   datadump['id'] = getRandomInt(1000000000000000);

   datadump['date_start'] = req.body.date_start;

   datadump['date_end'] = req.body.date_end;
   

   res.send(datadump);

   datadump={}
   // let test = apiMachine(req, res);
    // res.send(projectData)
})



const getGeoname = async (data) => {

    let geoName = `http://api.geonames.org/postalCodeSearchJSON?placename_startsWith=${data.body.place}&countryCode=${data.body.country}&maxRows=1&username=${process.env.geoName}`;
    
    console.log('reqest geoName',  geoName);

    let geoChecker = await fetch(geoName);

    try{       
        let palceAtr = await geoChecker.json();
        console.log(palceAtr)
        if (palceAtr.postalCodes[0] === undefined) {
            
            palceAtr.postalCodes[0] = 'No date';

            return palceAtr
            
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

    if(data.postalCodes[0] !== 'No date'){

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

                resWeather = {maxT:maxTemp, minT:minTemp, averT:averageTemp.toFixed(1), place:data.postalCodes[0].placeName};

                console.log(resWeather);

                return resWeather
            }
            
            else {
                
                return 'No data' 
            }

        }
            
        catch (error) {

            console.log("error", error);
        }
    }
    else{

        return 'undefined'
    }
}

const getpicture  = async (data) => {

    let pixabay = `https://pixabay.com/api/?key=${process.env.pixabay_key}&q=${data.body.place}&category=places&image_type=photo`;

    console.log('reqest pixbay',pixabay);

    let pixabay_req = await fetch(pixabay);

    try{
        
        let foto_url = await pixabay_req.json();

        console.log(foto_url)


        return foto_url.hits[0].webformatURL;

    }
    
    catch (error) {

        console.log("error", error);
        
        return 'undefined'
    }

}


app.post('/fackeAPI', function (req, res) {

 
    datadump['geo'] = '1247323.6233';
 
    datadump['Weather'] = {MaxTemp:32, MinTemp:21, averT:23};
 
    datadump['pic'] = 'https://www.dating.com/';
 
    res.send(datadump);
 
    datadump={}
    // let test = apiMachine(req, res);
     // res.send(projectData)
 });

 const date = () =>{

    let today = new Date();
    
    let dd = String(today.getDate()).padStart(2, '0');
    
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    
    let yyyy = today.getFullYear();

    return today = mm + '-' + dd + '-' + yyyy;
};

const getRandomInt = (max) =>{
    
    return Math.floor(Math.random() * Math.floor(max));
  
}
