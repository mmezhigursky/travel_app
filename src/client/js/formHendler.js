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

      console.log(test)

      let parent = document.getElementById('wraper_info');

      parent.insertAdjacentHTML('beforeend', test);
    }

    else{
      alert('Please fill form by apropriate format')
    }

    // for (let elem = 0; elem < req.length; elem++){

    //   console.log('dfwefwe', req[elem])

    //   let test =  isertData(req[elem]);

    //   console.log(test)

    //   let parent = document.getElementById('wraper_info');

    //   parent.insertAdjacentHTML('beforeend', test);


    // }

  
    
  }

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