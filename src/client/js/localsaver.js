
const localsetter = (data)=>{
    const keyName = '_flights';

    let LocalObjectJSON = localStorage.getItem(keyName);

    let LocalObject = {};

        if(LocalObjectJSON){

            LocalObject = JSON.parse(LocalObjectJSON);

            LocalObject[Object.keys(LocalObject).length.toString()] = data;

            localStorage.setItem(keyName, JSON.stringify(LocalObject));
        }
        
    else{

        localStorage.setItem(keyName, JSON.stringify({}));

        LocalObject = JSON.parse(LocalObjectJSON);

        LocalObject[Object.keys(LocalObject).length.toString()] = data;

    }
}



const localgetter = ()=>{
    const keyName = '_flights';

    try{
         let LocalObjectJSON = localStorage.getItem(keyName);

         let LocalObject = JSON.parse(LocalObjectJSON);

         return LocalObject
    }

    catch (error){

        return error
        
    }
                                                
}