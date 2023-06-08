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
  
      let vote_average = document.createElement("span");
      vote_average.textContent = `⭐${element.vote_average}`;
      vote_average.id = "rating"
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

export function renderCard(arr) {
    const content = document.getElementById("contents_container");
    content.innerHTML = ""; //content 초기화
    const cards = generateCards(arr);
    cards.forEach((card) => {
        //카드 초기화
        content.appendChild(card);
    });   
}

export function searchCards(str, cardArr) {
    const reg = new RegExp(str, "i");
    const newCards = cardArr.filter((card) => {
      return reg.test(card.title);
    });
    renderCard(newCards);
}

export function cardOnClick(id) {
    window.location.href = `/spec.html?id=${id}`;
}