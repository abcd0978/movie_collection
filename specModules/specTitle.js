export let specTitle = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTJjNWMxYjA2MGQzMzIyMzBmZmJjMGFlYWI0ZjkzMiIsInN1YiI6IjY0NzU1YzMyYzI4MjNhMDBjNDIxNjQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PDvxWjDfzLUY2-2pWzhfcgQ5ut8n4d3Bonr2Ue8xlPw",
    },
  };
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    // map 함수를 사용하여 각 영화 정보를 movies 배열로 변환한다.
    .then((response) => response.json())
    .then((data) => {
      let rows = data.results;
      let movies = rows.map((row) => ({
        title: row.title,
        vote: row.vote_average,
        overview: row.overview,
        id: row.id,
      }));

      // 영화 카드를 생성하는 함수
      // createMovieCard --> 주어진 영화 정보를 바탕으로 영화 카드를 생성하는 역할
      const createMovieCard = (movie) => {
        return `<div class="movie-card">
												<div class="movie-info">
													<h3 class="heading">${movie.title}</h3>
													<div class="rating">
                            <span class="star"></span>
                            <span class="star"></span>
                            <span class="star"></span>
                            <span class="star"></span>
                            <span class="star"></span>
                            <span class="vote">${movie.vote}</span>
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

      // 첫 번째 영화 카드 생성
      const firstMovie = movies[0];
      const movieCardHTML = createMovieCard(firstMovie);
      bannerContent.innerHTML += movieCardHTML;

      // 해석
      // 1. 'movies[0]'은 'movies' 배열에서 첫 번째 영화를 가져온다.
      // 2. 'creatMovieCard' 함수에 첫 번째 영화를 인자로 전달하여 영화 카드의 HTML을 생성한다.
      // 3. 생성된 영화 카드 HTML을 'movieCardHTML' 변수에 저장한다.
      // 4. 'bannerContent.innerHTML += movieCardHTML;' 코드는 'bannerContent' 요소의 내부 HTML에 'movieCardHTML'을 추가한다.

      // => 결과적으로, 첫 번째 영화의 정보를 바탕으로 생성된 영화 카드 HTML이 배너 영역에 추가되어 첫 번째 영화의 제목, 평점 등이 표시된다.
      //    이러한 방식으로 상세 페이지에서 다양한 영화 정보를 동적으로 표시할 수 있다.

      // ---------------------------------------------------------------

      // 평점 별 모양
      const createMovieRate = (movie) => {
        const ratingValue = Math.round(movie.vote);

        let starClass = "";

        if (ratingValue >= 1 && ratingValue < 2) {
          starClass = "half-filled";
        } else if (ratingValue >= 2 && ratingValue < 3) {
          starClass = "filled";
        } else if (ratingValue >= 3 && ratingValue < 4) {
          starClass = "half-filled";
        } else if (ratingValue >= 4 && ratingValue < 5) {
          starClass = "filled";
        } else if (ratingValue >= 5 && ratingValue < 6) {
          starClass = "half-filled";
        } else if (ratingValue >= 6 && ratingValue < 7) {
          starClass = "filled";
        } else if (ratingValue >= 7 && ratingValue < 8) {
          starClass = "half-filled";
        } else if (ratingValue >= 8 && ratingValue < 9) {
          starClass = "filled";
        } else if (ratingValue >= 9 && ratingValue < 10) {
          starClass = "half-filled";
        } else if (ratingValue === 10) {
          starClass = "filled";
        }

        return `<div class="movie-card">
                  <div class="movie-info">
                    <h3 class="heading">${movie.title}</h3>
                    <div class="rating">
                      <span class="star ${starClass}"></span>
                      <span class="star ${starClass}"></span>
                      <span class="star ${starClass}"></span>
                      <span class="star ${starClass}"></span>
                      <span class="star ${starClass}"></span>
                    </div>
                  </div>`;

        // 'createMovieRate' 함수를 사용하여
        // 영화의 평점에 따라 별 모양을 표시하는 HTML 문자열을 생성

        // 해석
        // 1. 'createMovieRate' 함수는 'movie'라는 매개변수를 받는다.
        //     이 'movie' 매개변수는 영화 정보를 나타내는 객체이다.
        // 2. 'ratingValue' 변수는 'movie.vote' 값을 반올림한 값으로 초기화한다.
        //     이 값은 영화의 평점을 나타낸다.
        // 3. 'starClass' 변수는 빈 문자열로 초기화된다.
        //     이 변수는 별 모양에 적용할 CSS 클래스를 저장할 용도롤 사용된다.
        // 4. 'if'문과 'else if'문을 사용하여 'ratingValue' 값에 따라 'starClass' 변수에 적절한 값을 할당한다.
        //     이를 통해 영화의 평점에 따라 별 모양이 채워지거나 반 채워지도록 설정한다.
        // 5. 별 모양을 표시하는 HTML 문자열을 반환한다.
        //    반환 된 문자열은 'movie-card'라는 클래스를 가진 'div' 요소로 시작하며, 그 안에 영화 제목과 별 평점이 포함된 요소들이 있다.
        // 6. 'rating' 클래스를 가진 'div' 요소 내부에는 별 모양을 표시하는 'span'요소들이 있다.
        //     'star'클래스와 'starClass' 변수의 값이 함께 사용되어 별의 채움 여부를 나타낸다.
        //     'starClass'값이 "filled"이면 별이 채워져 있고, "half-filled"이면 별이 반 채워져 있다.
      };
    });
};
