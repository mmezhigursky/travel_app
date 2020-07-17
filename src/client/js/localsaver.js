// this function work with localstorage
// if data is in localstorage by key _flights 
// I add new data 
// if no I initialise new array with date
// 
const localsetter = (data)=>{
    const keyName = '_flights';

    let LocalObjectJSON = localStorage.getItem(keyName);

    let LocalObject;

    if(LocalObjectJSON !== 'undefined' && LocalObjectJSON !== null){

        LocalObject = JSON.parse(LocalObjectJSON);

        LocalObject.push(data);

        localStorage.setItem(keyName, JSON.stringify(LocalObject));

    }

    else{

        LocalObject = data;

        localStorage.setItem(keyName, JSON.stringify([LocalObject]));

    }
}

// this is getter of localstorage object

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

/

const localRemover = (id)=>{
    const keyName = '_flights';

    let LocalObjectJSON = localStorage.getItem(keyName);

    let LocalObject = JSON.parse(LocalObjectJSON);

    let res = RemoveTool(LocalObject,  id);

    localStorage.setItem(keyName, JSON.stringify(res));
                                                
}


// this tool help to remove some data from array
const RemoveTool = (arr, id) =>{

    for (let i in arr){
        if (arr[i].id === parseInt(id)) {
            
            arr.splice(i, 1);

            return arr
        } 
        else {
            
        }
 
    }
}

export{localsetter}
export{RemoveTool}
export{localgetter}
export{localRemover}