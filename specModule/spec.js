import {getMovieCredits} from "./specPeople.js"
window.onload = async function(){
    const URLSearch = new URLSearchParams(location.search);
    const movieId = URLSearch.get('id');
    await getMovieCredits(movieId)
}