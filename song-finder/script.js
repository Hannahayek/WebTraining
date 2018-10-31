const url="https://itunes.apple.com/search?term=Beyonce";
fetch(url)
.then((response)=>response.json()) //we pass the data to Json. then to data
.then((data)=>{

   const artists=data.results;      //results from the api
return artists.map(result =>{
   const songCotainer=document.getElementById('songs'),
          article=document.createElement('article'),  //all are constants we can seperate by ,
          artist=document.createElement('p'),
          song=document.createElement('p'),
          img=document.createElement('img'),
          audio=document.createElement('audio'),
          audioSource=document.createElement('source')
         

          artist.innerHTML=result.artistName      ///artistName and other names can be found in result
          song.innerHTML=result.trackName
          img.src=result.artworkUrl100
          audioSource.src=result.previewUrl
          audio.setAttribute('controls','')

          // we set childs for article
          article.appendChild(artist)
          article.appendChild(song)
          article.appendChild(img)
          article.appendChild(audio)
          //append child audio source for audio
          audio.appendChild(audioSource)
          //append article to the main
          songCotainer.appendChild(article)

})

})
.catch(error=> console.log("request failed",error))


