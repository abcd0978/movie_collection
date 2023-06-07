window.onload = async function () {
    const resultJson = await getMovies();

    document.getElementById('searchForm').addEventListener('submit', (e) => {//검색
        e.preventDefault()
        const value = document.getElementById('search').value
        searchCards(value, resultJson.results)
    })

    document.getElementById('sortBy').addEventListener('change', (e) => {//정렬
        let sort = e.target.value;
        if (sort === 'title') {
            let arr = resultJson.results.map((item) => item)
            let resultArr = arr.sort((a, b) => {
                if (a.title < b.title)
                    return 1;
                else if (a.title > b.title)
                    return -1;
                else
                    return 0;
            })
            renderCard(resultArr);
        } if (sort === 'vote_average') {
            let arr = resultJson.results.map((item) => item)
            arr.sort((a, b) => {
                if (a.vote_average < b.vote_average)
                    return 1;
                else if (a.vote_average > b.vote_average)
                    return -1;
                else
                    return 0;
            })
            renderCard(arr);
        }
        if (sort === 'release_date') {
            let arr = resultJson.results.map((item) => item)
            arr.sort((a, b) => {
                if (a.release_date < b.release_date)
                    return 1;
                else if (a.release_date > b.release_date)
                    return -1;
                else
                    return 0;
            })
            renderCard(arr);
        }
    })

    renderCard(resultJson.results)
}

function renderCard(arr) {
    const content = document.getElementById('contents_container');
    content.innerHTML = ""//content 초기화
    const cards = generateCards(arr);
    cards.forEach(card => {//카드 초기화
        content.appendChild(card);
    })
}

function searchCards(str, cardArr) {
    const reg = new RegExp(str, 'i')
    const newCards = cardArr.filter((card) => {
        return reg.test(card.title)
    })
    renderCard(newCards);
}

async function getMovies() {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjJkZWEwNTQwOWI4OGY2ZWM1NTNhMGZhMjFiMjU2NSIsInN1YiI6IjY0NzJmNTY2YmUyZDQ5MDBmOTkzZmNjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZRi3uX2RfmhoriDFnnN0YTzUqNPQ4HJQbS_JiM_r2js'
        }
    };

    const response = await fetch(url, options)
    const resJson = await response.json()
    return resJson
}

function cardOnClick(id) {
    // alert(`영화 id:${id}`);
    window.location.href = `http://localhost:5500/spec.html?id=${id}`;
}
// 민규님의 설명으로 추가된 .. 영화 id 값에 맞는 상세페이지 열기

function strToHtml(str) {
    const parser = new DOMParser();
    const result = parser.parseFromString(str, 'text/html');
    return result;
}

function generateCards(arr) {
    let cards = [];
    console.log(arr)
    arr.forEach(element => {
        let cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.addEventListener('click', () => {
            cardOnClick(element.id)
        });

        let cardContainer = document.createElement('div');
        cardContainer.id = 'cardContainer';

        let imgElement = document.createElement('img');
        imgElement.src = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${element.poster_path}`
        imgElement.id = 'posterImg'

        let descElement = document.createElement('p');
        descElement.textContent = element.overview;
        descElement.id = 'desc';

        let titleElement = document.createElement('p');
        titleElement.textContent = element.title;
        titleElement.id = 'title';

        let starContainer = document.createElement('div');
        starContainer.className = 'starContainer';

        let greyStar = document.createElement('span');
        greyStar.className = "star-rating";
        let blueStar = document.createElement('span');
        greyStar.appendChild(blueStar);
        cardContainer.appendChild(imgElement);
        cardContainer.appendChild(titleElement);
        cardContainer.appendChild(descElement);

        cardElement.appendChild(cardContainer);
        cardElement.appendChild(starContainer)

        cards.push(cardElement)
    });
    return cards;
}



