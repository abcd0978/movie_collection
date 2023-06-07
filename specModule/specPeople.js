// 아래의 코드는 영화의 출연진 정보를 가져와서 HTML에 동적으로 추가하는 과정을 수행한다.
// 따라서 영화의 출연진 정보를 TMDB API를 통해 가져와서 페이지에 표시할 수 있게 된다.



// URLSearchParams는 현재 페이지 URL의 매개변수를 쉽게 처리하기 위한 JavaScript 내장 객체이다. 
// 이 코드에서는 현재 페이지 URL의 매개변수에서 'id' 값을 가져와 movieId 변수에 저장한다.


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
// getMovieCredits라는 비동기 함수를 선언합니다. 이 함수는 movieId라는 매개변수를 받는다. 
// 이 함수는 영화의 출연진 정보를 가져오기 위해 The Movie Database (TMDB) API를 호출한다. 
// creditsOptions는 API 호출에 필요한 옵션을 설정하는 객체이다.


    const creditsResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
      creditsOptions
    );
    const creditsData = await creditsResponse.json();
    let casts = creditsData.cast.slice(0, 8);
// fetch 함수를 사용하여 TMDB API로 영화의 출연진 정보를 요청한다. 
// creditsResponse 변수에 응답 객체가 저장된다. 
// 그리고 creditsData 변수에는 응답 데이터를 JSON 형식으로 변환한 결과가 저장된다. 
// cast 배열은 creditsData에서 가져온 출연진 정보를 담고 있다. 
// slice(0, 8)을 사용하여 배열에서 처음부터 8개의 출연진 정보만 선택한다.


    console.log("Cast:");
    casts.forEach((cast) => {
      let name = cast.name;
      let character = cast.character;
      let castImg = cast.profile_path;

      // profile_path 값이 null이 아닌 경우에만 배우 정보를 추가한다.
      if (castImg !== null) {
        let temp_html = `<div class="actor">
                          <img src="https://image.tmdb.org/t/p/w500${castImg}" alt="" />
                          <h3>${name}</h3>
                          <p>${character}</p>
                        </div>`;
        // console.log(name, character, profile_path);
        document.querySelector(".cast-card").innerHTML += temp_html;
      }
    });
// casts 배열의 각 출연진 정보에 대해 반복문을 실행한다.
// 각 출연진의 이름, 역할, 프로필 이미지 경로를 변수에 할당한다. 
// 그리고 if 문을 사용하여 castImg 값이 null이 아닌 경우에만 
// 해당 배우의 정보를 HTML로 생성하여 .cast-card 클래스를 가진 요소에 추가한다.


    console.log("--------------------------------------");
  } catch (error) {
    console.error(error);
  }
}

//getMovieCredits(movieId).catch((err) => console.error(err));
// getMovieCredits 함수를 호출하여 영화의 출연진 정보를 가져온다. 
// movieId를 인수로 전달하고, 오류가 발생한 경우에는 catch 절에서 오류를 처리한다.
