async function textAnalysator(url){
  
  const validation = urlChecker(url);

  if (validation===true){
    console.log('work', url);
    return Promise.resolve('preventative medicine');
    

  } 
  else{
    return Promise.resolve('error');
  }

}


const getpicture  = async (data) => {

    let pixabay = `https://pixabay.com/api/?key=${process.env.pixabay_key}&q=${data}&category=places&image_type=photo`;

    let pixabay_req = await fetch(pixabay);

    try{
        
        let foto_url = await pixabay_req.json();

        return foto_url.hits[0].webformatURL;

    }
    
    catch (error) {
        
        return 'undefined'
    }

}

exports.getpicture = getpicture ;