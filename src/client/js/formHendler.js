import { localsetter } from './localsaver'
import { localRemover } from './localsaver'
import { localgetter } from './localsaver'


const postData = async ( url , data)=>{
  
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

 
// this function prepares HTML template to insert in a document odj

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
              Departing: from ${array.date_start} to ${array.date_end}
          </p>
      </div>
      <div class="curent_trip_info">
          <p class="typical_weather">
              Forecast for 16 days from ${array.date_req}:<br> AverT:${array.Weather.averT} <br> MaxT:${array.Weather.maxT} <br> MinT:${array.Weather.minT}
          </p><br>
      </div>
   </div>
   <input type="button" elem="${array.id}" value="remove" id="remove_trip"> <br><br>
  
</div>`;

return template

}

// this function make a call to server
  async function getWeatherData(){

    let payload = {};

    payload['place']= document.getElementById('trips').value;

    payload['date_start']= document.getElementById('start_date').value;

    payload['date_end']= document.getElementById('return_date').value;

    payload['country']= document.getElementById('country').value;

    let val = isEmptyValue(payload);

    if (val===false){

      let req = await postData('http://localhost:8080/getdata', payload);

      let test =  isertData(req);

      let parent = document.getElementById('wraper_info');

      parent.insertAdjacentHTML('beforeend', test);
    }

    else{
      alert('Please fill form by apropriate format')
    }
    
  }
// validator of payload
  const isEmptyValue = (payload) => {
    for(let i in payload){
    if (payload[i] === '' || payload[i] === null || payload[i] === undefined) {
        return true
    } else {
        return false
    }
  }
}
  
  //create click listener for calling chain of functions  
  document.getElementById('save').addEventListener('click',  getWeatherData);

  window.addEventListener('load',function(e){

      let localData = localgetter()
      for(let el in localData){

        let test =  isertData(localData[el]);
    
        let parent = document.getElementById('wraper_info');
    
        parent.insertAdjacentHTML('beforeend', test);

      }


  });

  document.addEventListener('click',function(e){
    
    if(e.target && e.target.id == 'remove_trip'){
      
      //here I get id of element to delete it 

      let del = e.target.attributes.elem.value;

        // this function was imported from localsaver file 

        localRemover(del)
          
        document.getElementById(del).remove();

     }
 });
  
  export{postData}