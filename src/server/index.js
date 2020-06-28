
const  path = require('path');

let projectData = [];
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
    let test = apiMachine(req, res);
    console.log("это картинка  ", req.body);
    // res.send(projectData)
})

  const apiMachine =async (data, res) => {
    
    let geoName = `http://api.geonames.org/postalCodeSearchJSON?placename_startsWith=${data.body.place}&countryCode=${data.body.country}&maxRows=1&username=${process.env.geoName}`;

    let geoChecker = await fetch(geoName);

    try{
        if(geoChecker.status==200){
       
            let palceAtr = await geoChecker.json();
        
        if (palceAtr.postalCodes[0] == undefined) {
            
            dataDump['lon'] =  "None";
           
            dataDump['lat'] =  "None";
        } else {
            console.log(palceAtr);
            
            let weather =  `https://api.weatherbit.io/v2.0/forecast/daily?lat=${palceAtr.postalCodes[0].lat}&lon=${palceAtr.postalCodes[0].lng}&key=${process.env.weatherbit_key}`
            
            let weatherChecker = await fetch(weather);
            try{

                let weatherData = await weatherChecker.json();


                    let averageTemp = 0;

                    for(let tempreture of weatherData['data']){

                        averageTemp = averageTemp+tempreture.temp;
                    }

                    averageTemp = averageTemp / weatherData['data'].length;

                    dataDump['averageTemp'] =  averageTemp;

                }
          
            catch (error) {
        
                console.log("error", error);
              }

              let pixabay = `https://pixabay.com/api/?key=${process.env.pixabay_key}&q=${palceAtr.postalCodes[0].placeName}&image_type=photo`;

              let pixabay_req = await fetch(pixabay);
          
              try{
          
                  if(pixabay_req.status==200){
          
                  let foto_url = await pixabay_req.json();
          
                  if (typeof foto_url.hits[0] == 'undefined') {
          
                      dataDump['pic'] =  "No Image found";
          
                  } else {
          
                      dataDump['pic'] = foto_url.hits[0].webformatURL;
          
                  }
            
              }
              }
              catch (error) {
          
                  console.log("error", error);
                }

        }
  
    }
    }
    catch (error) {
        console.log("error", error);
      }

    
      projectData.push(dataDump);
      console.log(projectData);
      res.send(projectData)
      
}