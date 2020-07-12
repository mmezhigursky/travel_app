const localsetter = (data)=>{
    const keyName = '_flights';

    let LocalObjectJSON = localStorage.getItem(keyName);

    // localStorage.setItem(keyName, JSON.stringify([]));

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


const localRemover = (id)=>{
    const keyName = '_flights';

    let LocalObjectJSON = localStorage.getItem(keyName);

    let LocalObject = JSON.parse(LocalObjectJSON);

    let res = RemoveTool(LocalObject,  id);

    console.log('вот что осталось после удаления', res);

    console.log('вот что отправляем в локалку', JSON.stringify(res));

    localStorage.setItem(keyName, JSON.stringify(res));
                                                
}



const RemoveTool = (arr, id) =>{
    console.log(arr);
    for (let i in arr){
        if (arr[i].id === parseInt(id)) {
            
            console.log('вот что наши и удалилил',arr[i].id);

            arr.splice(i, 1);

            return arr
        } 
        else {
            
        }
 
    }
}

export{localsetter}
export{localgetter}
export{localRemover}