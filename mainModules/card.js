/**
 * 영화정보 배열을 받아 가공해 HTML엘리먼트배열로 리턴하는 함수
 * @param {Array} arr - 영화정보 배열, 원소의 타입은 json임
 * @returns {HTMLElement[]} HTML엘레먼트배열
 */
function generateCards(arr) {
  let cards = [];
  arr.forEach((element) => {
    let cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.addEventListener("click", () => {
      cardOnClick(element.id);
    });

    let cardContainer = document.createElement("div");
    cardContainer.id = "cardContainer";

    let imgElement = document.createElement("img");
    imgElement.src = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${element.poster_path}`;
    imgElement.id = "posterImg";

    let descElement = document.createElement("p");
    descElement.textContent = element.overview;
    descElement.id = "desc";

    let titleElement = document.createElement("p");
    titleElement.textContent = element.title;
    titleElement.id = "title";

    let starContainer = document.createElement("div");
    starContainer.className = "starContainer";

    let vote_average = document.createElement("span");
    vote_average.textContent = `⭐${element.vote_average}`;
    vote_average.id = "rating";
    let greyStar = document.createElement("span");
    greyStar.className = "star-rating";
    let blueStar = document.createElement("span");
    greyStar.appendChild(blueStar);

    cardContainer.appendChild(imgElement);
    cardContainer.appendChild(titleElement);
    cardContainer.appendChild(vote_average);
    //cardContainer.appendChild(descElement);

    cardElement.appendChild(cardContainer);
    cardElement.appendChild(starContainer);

    cards.push(cardElement);
  });
  return cards;
}
/**
 * 영화정보를 영화카드로 만들어, id="contents_container"인 태그에 append하는 함수
 * @param {Array} arr - 영화정보 배열, 원소의 타입은 json임
 */
export function renderCard(arr) {
  const content = document.getElementById("contents_container");
  content.innerHTML = ""; //content 초기화
  const cards = generateCards(arr);
  cards.forEach((card) => {
    //카드 초기화
    content.appendChild(card);
  });
}
/**
 * 영화제목 검색함수, 검색조건에 맞는 영화들을 render해준다.
 * @param {string} str - 검색할 문자열
 * @param {Array} cardArr - 영화정보 배열, 원소의 타입은 json임
 */
export function searchCards(str, cardArr) {
  const reg = new RegExp(str, "i");
  const newCards = cardArr.filter((card) => {
    return reg.test(card.title);
  });
  renderCard(newCards);
}
/**
 * 영화의 id를 쿼리스트링으로 붙여, 상세페이지로 리다이렉트 시키는 함수
 * @param {string} event - 영화의 id
 */
export function cardOnClick(id) {
  window.location.href = `/spec.html?id=${id}`;
}
