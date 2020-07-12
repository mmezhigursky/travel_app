import { localsetter } from './localsaver'
import { localRemover } from './localsaver'
import { localgetter } from './localsaver'


const postData = async ( url , data)=>{

    console.log(data);
  
      const response = await fetch(url, {
  
      method: 'POST', 
  
      credentials: 'same-origin',
  
      headers: {
  
          'Content-Type': 'application/json',
      },
  
     // Body data type must match "Content-Type" header       
  
      body: JSON.stringify(data), 
  
    });
    try {

        let newData = await response.json();

        window.gig =newData;
        
        console.log(newData);

        if (Object.keys(newData).length>0){

            localsetter(newData);
        
        }
        else{
          console.log("no data")
        }
  
        return newData;
  
      }catch(error) {
  
      console.log("error", error);
  
      }

  }

 

function isertData(array){

  let template = `<div id=${array.id} class='container_info'>
  <div class="img_wraper">
      <img id='img_api'src=${array.pic} alt="">
   </div>
   <div class="curent_trip">
       <div class="curent_trip_header">
          <H3>
              My trip to: ${array.Weather.place}
          </H3>
          <p>
              Departing:
          </p>
      </div>
      <div class="curent_trip_info">
          <div class="flight_info">
              <H4>
                  Flight info:
              </H4>
              <p>
                  ORD 3:00PM
                  Flight 22 UDCITY AIR
              </p>

          </div>
          <p class="day_left">
              Paris, France is 220 days away
          </p><br>
          <p class="typical_weather">
              Forecast for 16 days from ${array.date_req}: AverT:${array.Weather.averT}, MaxT:${array.Weather.maxT}, MinT:${array.Weather.minT}
          </p><br>
      </div>
   </div>
   <input type="button" elem="${array.id}" value="remove" id="remove_trip"> <br><br>
  
</div>`;

return template

}
  
  async function getWeatherData(){

    let payload = {};

    payload['place']= document.getElementById('trips').value;

    payload['date']= document.getElementById('departing').value

    payload['country']= document.getElementById('country').value

    let req = await postData('http://localhost:8080/getdata', payload);

    let test =  isertData(req);

    console.log(test)

    let parent = document.getElementById('wraper_info');

    parent.insertAdjacentHTML('beforeend', test);

    // for (let elem = 0; elem < req.length; elem++){

    //   console.log('dfwefwe', req[elem])

    //   let test =  isertData(req[elem]);

    //   console.log(test)

    //   let parent = document.getElementById('wraper_info');

    //   parent.insertAdjacentHTML('beforeend', test);


    // }

  
    
  }


  
  //create click listener for calling chain of functions  
  document.getElementById('save').addEventListener('click',  getWeatherData);

  window.addEventListener('load',function(e){

    console.log(e)

      let localData = localgetter()
      for(let el in localData){

        console.log(localData[el])

        let test =  isertData(localData[el]);

        console.log(el)
    
        let parent = document.getElementById('wraper_info');
    
        parent.insertAdjacentHTML('beforeend', test);

      }


  });

  document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'remove_trip'){
        let del = e.target.attributes.elem.value;
          // console.log(e.target.attributes.elem.value);
          localRemover(del)
          document.getElementById(del).remove();

     }
 });
  
  export{postData}