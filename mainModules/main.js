import { loginBtn } from "./login.js";
import { renderCard, searchCards } from "./card.js";
import { getMovies } from "./movie.js";

loginBtn();

window.onload = async function () {
  const resultJson = await getMovies();

  document.getElementById("searchForm").addEventListener("submit", (e) => {
    //검색
    e.preventDefault();
    const value = document.getElementById("search").value;
    searchCards(value, resultJson.results);
  });

  document.getElementById("sortBy").addEventListener("change", (e) => {
    //정렬
    let sort = e.target.value;
    if (sort === "title") {
      let arr = resultJson.results.map((item) => item);
      let resultArr = arr.sort((a, b) => {
        if (a.title < b.title) return 1;
        else if (a.title > b.title) return -1;
        else return 0;
      });
      renderCard(resultArr);
    }
    if (sort === "vote_average") {
      let arr = resultJson.results.map((item) => item);
      arr.sort((a, b) => {
        return b.vote_average - a.vote_average;
      });
      renderCard(arr);
    }
    if (sort === "release_date") {
      let arr = resultJson.results.map((item) => item);
      arr.sort((a, b) => {
        if (a.release_date < b.release_date) return 1;
        else if (a.release_date > b.release_date) return -1;
        else return 0;
      });
      renderCard(arr);
    }
  });

  renderCard(resultJson.results);
};
