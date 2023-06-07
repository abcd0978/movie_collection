export let specTitle = (id) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTJjNWMxYjA2MGQzMzIyMzBmZmJjMGFlYWI0ZjkzMiIsInN1YiI6IjY0NzU1YzMyYzI4MjNhMDBjNDIxNjQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PDvxWjDfzLUY2-2pWzhfcgQ5ut8n4d3Bonr2Ue8xlPw",
    },
  };
  fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
    // map 함수를 사용하여 각 영화 정보를 movies 배열로 변환한다.
    .then((response) => response.json())
    .then((data) => {
      const resultJson = {
        title: data.title,
        vote: data.vote_average.toFixed(1), // 소수점 1번째자리만 남기고 나머지 자르기
        overview: data.overview,
        id: data.id,
      };
      // createMovieRate(resultJson);
      const movieCardHTML = createMovieCard(resultJson);
      bannerContent.innerHTML += movieCardHTML;
    });

  // 영화 카드를 생성하는 함수
  // createMovieCard --> 주어진 영화 정보를 바탕으로 영화 카드를 생성하는 역할
  const createMovieCard = (movie) => {
    return `<div class="movie-card">
												<div class="movie-info">
													<h3 class="heading">${movie.title}</h3>
													<div class="rating">
                            <span class="vote">
                            <box-icon name='star' type='solid' color='#fffc1f' class="star"></box-icon>
                            ${movie.vote}</span>
                          </div>
												</div>
										
												<div class="overview">
													<p>${movie.overview}</p>
												</div>
                        <a href="" class="btn">
                        <span class="span"
                          ><box-icon name='caret-right-circle' color='#ffffff' class="arrow"></box-icon>
                          &nbspWatch Now</span
                        >
                      </a>
										</div>`;
  };

  // 상세 페이지의 필요한 요소 선택
  const bannerContent = document.querySelector(".banner-content");
};
