import { getVideoLink, getDetails } from "./video.js";
import { getMovieCredits } from "./specPeople.js";
import { init } from "./specReview - 치훈.js";
import { typing } from "./typing.js";
import { getSavedNickname } from "./header.js";

getSavedNickname();

init();
window.onload = async function () {
  let element = document.getElementsByClassName("cast-card")[0];
  element.addEventListener("wheel", function (event) {
    event.preventDefault();
    element.scrollLeft += event.deltaY * 0.3;
  });

  element.addEventListener("scroll", function (event) {
    if (event.currentTarget.scrollLeft !== 0) {
      element.scrollTop = 0;
    }
  });

  const URLSearch = new URLSearchParams(location.search);
  const movieId = URLSearch.get("id");
  await getMovieCredits(movieId);
  let trailerDiv = document.getElementsByClassName("trailer")[0];
  let iFrameHtml = await getVideoLink(movieId);
  let movieDetails = await getDetails(movieId);
  trailerDiv.appendChild(iFrameHtml);
  typing("movieTitle", movieDetails.title, 50, 250, 0);
  const overview = document.getElementById("movieOverview");
  overview.textContent = movieDetails.overview;
};
