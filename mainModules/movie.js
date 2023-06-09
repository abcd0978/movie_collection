/**
 * tmdb에서 상위 20개 영화를 받아 리턴하는 함수
 * @returns {json} api요청 결과
 */
export async function getMovies() {
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
