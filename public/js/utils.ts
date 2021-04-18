

interface Params{
    [key:string]:any
}
export const  serialize= (params:Params|any):string =>{
    const result=[];
    for(let [key,value] of Object.entries(params)){
      result.push(`${key}=${value}`)
    }
    return result.join("&");
}


export const addUrl=(url:string,params:string):string=>{
    if(!params) return "";
    let mark=url.includes("?")?"&":"?";
    return `${url}${mark}${params}`
}

export const serializeJson=(body:any)=>{
       return JSON.stringify(body)
}


