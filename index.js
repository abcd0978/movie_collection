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
        if (a.vote_average < b.vote_average) return 1;
        else if (a.vote_average > b.vote_average) return -1;
        else return 0;
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

function renderCard(arr) {
  const content = document.getElementById("contents_container");
  content.innerHTML = ""; //content 초기화
  const cards = generateCards(arr);
  cards.forEach((card) => {
    //카드 초기화
    content.appendChild(card);
  });
}

function searchCards(str, cardArr) {
  const reg = new RegExp(str, "i");
  const newCards = cardArr.filter((card) => {
    return reg.test(card.title);
  });
  renderCard(newCards);
}

async function getMovies() {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjJkZWEwNTQwOWI4OGY2ZWM1NTNhMGZhMjFiMjU2NSIsInN1YiI6IjY0NzJmNTY2YmUyZDQ5MDBmOTkzZmNjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZRi3uX2RfmhoriDFnnN0YTzUqNPQ4HJQbS_JiM_r2js",
    },
  };

  const response = await fetch(url, options);
  const resJson = await response.json();
  return resJson;
}

function cardOnClick(id) {
  // alert(`영화 id:${id}`);
  window.location.href = `http://localhost:5500/spec.html?id=${id}`;
}
function strToHtml(str) {
  const parser = new DOMParser();
  const result = parser.parseFromString(str, "text/html");
  return result;
}

function generateCards(arr) {
  let cards = [];
  console.log(arr);
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

    let greyStar = document.createElement("span");
    greyStar.className = "star-rating";
    let blueStar = document.createElement("span");
    greyStar.appendChild(blueStar);
    cardContainer.appendChild(imgElement);
    cardContainer.appendChild(titleElement);
    cardContainer.appendChild(descElement);

    cardElement.appendChild(cardContainer);
    cardElement.appendChild(starContainer);

    cards.push(cardElement);
  });
  return cards;
}

// Login Popup
const wrapper = document.querySelector(".wrapper");
const btnPopup = document.querySelector("#loginBtn");
const iconClose = document.querySelector(".icon-close");

btnPopup.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});

iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});

// Login status
const greeting = document.querySelector("#greeting");
const loginForm = document.querySelector("#login-Form");
const nicknameInput = document.querySelector("#nicknameInput");
const loginBtn = document.querySelector("#login-btn");

// string을 반복해서 사용하게 될 경우, 에러를 줄이기 위해 대문자 변수로 고정시켜준다.
const HIDDEN_CLASSNAME = "hidden";
const NICKNAME_KEY = "nickname";
const PASSWORD_KEY = "password";

let onLoginClick = (event) => {
  event.preventDefault();
  const nickname = nicknameInput.value;
  // 로컬스토리지에 nickname값을 입력하면 저장한다.
  localStorage.setItem(NICKNAME_KEY, nickname);
  // input창에 유저정보를 입력한 값을 인자로 받게 되고 paintGreetings함수를 호출한다.
  paintGreetings(nickname);
  // 로그인 후 팝업창을 숨김 처리한다.
  wrapper.classList.remove("active-popup");
};

// 이 함수는 로그인된 상태를 그리는 역할을 한다.
let paintGreetings = (nickname) => {
  // 로컬스토리지에 저장된 유저정보를 텍스트로 보여준다.
  greeting.innerHTML = `${nickname}님 <box-icon name='down-arrow' type='solid' color='#ffffff' size="15px" ></box-icon>`;
  // 로그인 버튼 숨기기
  btnPopup.classList.add(HIDDEN_CLASSNAME);
  // hidden 클래스명을 지워서 p인 nickname id를 보여준다.
  greeting.classList.remove(HIDDEN_CLASSNAME);
};

// 새로고침을 하더라도 유저정보 저장유무에 따라 화면이 다르게 나타나는 로직
// getItem으로 로컬스토리지에서 유저정보 유무를 확인할 수 있다.
const savedNickname = localStorage.getItem(NICKNAME_KEY);

if (savedNickname === null) {
  //로그인 버튼을 누르면 onLoginSubmit이벤트가 작동한다.
  loginBtn.addEventListener("click", onLoginClick);
} else {
  // 로컬스토리지에 저장된 값을 인자로 받게 되고 paintGreetings함수를 호출한다.
  paintGreetings(savedNickname);
}
