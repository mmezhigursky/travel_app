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
        document.getElementById("img_api").src=`${newData.pic}`;
  
        return newData;
  
      }catch(error) {
  
      console.log("error", error);
  
      }

  }
  
  async function getWeatherData(){

    let a = postData('http://localhost:8080/getdata', {foto:'paris'});
    
  }
  
  //create click listener for calling chain of functions  
  document.getElementById('save').addEventListener('click',  getWeatherData);
  
  export{postData}