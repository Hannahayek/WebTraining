const url="https://itunes.apple.com/search?term=Beyonce";
fetch(url)
.then((response)=>response.json()) //we pass the data to Json. then to data
.then((data)=>{

    console.log(data);
})
.catch(error=> console.log("request failed",error))


