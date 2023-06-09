// 영화의 출연진 정보를 TMDB API를 통해 가져와서 페이지에 표시할 수 있게 된다.

/**
 * 영화의 id를 이용해, 영화에 출연한 배우들의 정보를 받아서 className = "cast-card"인 div안에 append해주는 함수
 * @param {string} movieid - 영화의 id
 */
export async function getMovieCredits(movieId) {
  try {
    const creditsOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTkzOTA2OTU1NjgxZjU3MzJkYWUzNTEyOWVjM2I0NSIsInN1YiI6IjY0NzU1YmNkYzI4MjNhMDBjNDIxNjNiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.am5-a5gHvtmSmmI5qZ1zuRz_-SXNtmgzh8R7f2FGHuY",
      },
    };

    const creditsResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
      creditsOptions
    );
    const creditsData = await creditsResponse.json();
    let casts = creditsData.cast.slice(0, 12);

    casts.forEach((cast) => {
      let name = cast.name;
      let character = "";
      let castImg = cast.profile_path;
      if (cast.character.length > 20) {
        let temp = cast.character.slice(0, 18);
        temp = temp + "...";
        character = temp;
      } else {
        character = cast.character;
      }
      // profile_path 값이 null이 아닌 경우에만 배우 정보를 추가한다.
      if (castImg !== null) {
        let temp_html = `<div class="actor">
                          <img src="https://image.tmdb.org/t/p/w500${castImg}" alt="" />
                          <h3>${name}</h3>
                          <p>${character}</p>
                        </div>`;
        document.querySelector(".cast-card").innerHTML += temp_html;
      }
    });
  } catch (error) {
    console.error(error);
  }
}
