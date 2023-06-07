import { getVideoLink,getDetails } from "./video.js";
window.onload= async function(){
    let trailerDiv = document.getElementsByClassName('trailer')[0];
    const URLSearch = new URLSearchParams(location.search);
    const movieId = URLSearch.get('id');
    
    let iFrameHtml = await getVideoLink(movieId);
    let movieDetails = await getDetails(movieId);
    trailerDiv.appendChild(iFrameHtml)
    typing("movieTitle",movieDetails.title,150);
    const overview  = document.getElementById("movieOverview")
    overview.textContent = movieDetails.overview
}
let index = 0;
function typing(id,str,time){
    const content = str
    const text = document.getElementById(id);
    if(index < content.length){
        text.textContent += content[index++];
        setTimeout(typing,time,id,str,time);
    }
}
