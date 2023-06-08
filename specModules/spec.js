import { getVideoLink,getDetails } from "./video.js";
import {getMovieCredits} from "./specPeople.js"
import {init} from "./specReview - 치훈.js"
import { typing } from "./typing.js";
import { getSavedNickname } from "./header.js";

getSavedNickname();

init()
window.onload= async function(){

    // // 가로 스크롤을 조작할 요소 선택
    let element = document.getElementsByClassName('cast-card')[0];
    // 스크롤 가능한 요소에 마우스 휠 이벤트 핸들러 등록
    element.addEventListener('wheel', function(event) {
    // 가로 스크롤 동작을 위해 기본 스크롤 동작 막기
    event.preventDefault();
    
    // 마우스 휠의 이동 방향에 따라 가로 스크롤 조작
    element.scrollLeft += event.deltaY*0.3;
    });

    // 세로 스크롤을 막기 위한 이벤트 핸들러 등록
    element.addEventListener('scroll', function(event) {
    // 가로 스크롤 중일 때 세로 스크롤 막기
        if (event.currentTarget.scrollLeft !== 0) {
            element.scrollTop = 0;
        }
    });


    const URLSearch = new URLSearchParams(location.search);
    const movieId = URLSearch.get('id');
    await getMovieCredits(movieId)
    let trailerDiv = document.getElementsByClassName('trailer')[0];
    let iFrameHtml = await getVideoLink(movieId);
    let movieDetails = await getDetails(movieId);
    trailerDiv.appendChild(iFrameHtml)
    typing("movieTitle",movieDetails.title,50,250,0);
    const overview  = document.getElementById("movieOverview")
    overview.textContent = movieDetails.overview
}