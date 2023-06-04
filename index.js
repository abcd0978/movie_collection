window.onload = async function(){
    const resultJson = await getMovies();

    document.getElementById('searchForm').addEventListener('submit',(e)=>{//검색
        e.preventDefault()
        const value = document.getElementById('search').value
        searchCards(value,resultJson.results)
    })

    document.getElementById('sortBy').addEventListener('change',(e)=>{//정렬
        let sort = e.target.value;
        if(sort === 'title'){
            let arr = resultJson.results.map((item)=>item)
            let resultArr = arr.sort((a,b)=>{
                if(a.title < b.title)
                    return 1;
                else if(a.title > b.title)
                    return -1;
                else
                    return 0;
            })
            renderCard(resultArr);
        }if(sort === 'vote_average'){
            let arr = resultJson.results.map((item)=>item)
            arr.sort((a,b)=>{
                if(a.vote_average < b.vote_average)
                    return 1;
                else if(a.vote_average > b.vote_average)
                    return -1;
                else
                    return 0;
            })
            renderCard(arr);
        }
        if(sort === 'release_date'){
            let arr = resultJson.results.map((item)=>item)
            arr.sort((a,b)=>{
                if(a.release_date < b.release_date)
                    return 1;
                else if(a.release_date > b.release_date)
                    return -1;
                else
                    return 0;
            })
            renderCard(arr);
        }
    })

    renderCard(resultJson.results)
}

function renderCard(arr){
    const content = document.getElementById('contents_container');
    content.innerHTML=""//content 초기화
    const cards = generateCards(arr);
    cards.forEach(card=>{//카드 초기화
        content.appendChild(card);
    })
}

function searchCards(str,cardArr){
    const reg = new RegExp(str,'i')
    const newCards = cardArr.filter((card)=>{
        return reg.test(card.title)
    })
    renderCard(newCards);
}

async function getMovies(){
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

function cardOnClick(id){
    alert(`영화 id:${id}`);
}
function strToHtml(str){
    const parser = new DOMParser();
    const result = parser.parseFromString(str,'text/html');
    return result;
}

function generateCards(arr){
    let cards = [];
    console.log(arr)
    arr.forEach(element => {
        let cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.addEventListener('click',()=>{
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

        let vote_average = (element.vote_average/2);
        var percentage = 0;
        let i=1;
        for(let i=1; vote_average>0; i++){
            if(vote_average-1<0){
                console.log("hello")
                percentage = vote_average*100;
            }
            console.log(vote_average,i,percentage)
            let star = `<svg id = "star${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <mask id="half">
                <rect x="${percentage}%" y="0" width="600px" height="600px" fill="white" />
            </mask>
            <path mask="url(#half)" fill="orange" d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/>
            </svg>`;
            let starHTML = document.createElement('svg');
            starHTML.innerHTML = star
            starContainer.appendChild(starHTML);
            vote_average = vote_average-1;
        }


        cardContainer.appendChild(imgElement);
        cardContainer.appendChild(titleElement);
        cardContainer.appendChild(descElement);

        cardElement.appendChild(cardContainer);
        cardElement.appendChild(starContainer)

        cards.push(cardElement)
    });
    return cards;
}



