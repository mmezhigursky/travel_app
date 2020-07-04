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

        // window.gig =newData;
        
        console.log(newData);
        if (Object.keys(newData).length>0){
          for (const property in newData) {
            // document.getElementById("img_api").src=`${newData[`${Object.keys(newData).length-1}`].pic}`;
            console.log(property)
            
          }
        

        }
        else{
          console.log("no data")
        }
  
        return newData;
  
      }catch(error) {
  
      console.log("error", error);
  
      }

  }
  
  async function getWeatherData(){

    let payload = {};

    payload['place']= document.getElementById('trips').value;

    payload['date']= document.getElementById('departing').value

    payload['country']= document.getElementById('country').value

    let req = await postData('http://localhost:8080/getdata', payload);

  
    
  }
  
  //create click listener for calling chain of functions  
  document.getElementById('save').addEventListener('click',  getWeatherData);
  
  export{postData}