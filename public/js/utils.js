

export const  serialize= (params) =>{
    if(!params) return "";
    const result=[];
    for(let [key,value] of Object.entries(params)){
      result.push(`${key}=${value}`)
    }
    return result.join("&");
}


export const addUrl=(url,params)=>{
    if(!params) return url;
    let mark=url.includes("?")?"&":"?";
    return `${url}${mark}${params}`
}

export const serializeJson=(body)=>{
       return JSON.stringify(body)
}


