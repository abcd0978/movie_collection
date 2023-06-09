/**
 * 영화id를 받아서 유튜브iframe HTMLElement를반환하는 함수
 * @param {string} movieId - 영화의 id
 * @returns {HTMLElement} - HTML엘레먼트
 */
export async function getVideoLink(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTA4MGFiOGE3OWFhMzBhMjJhODY4YzRlNjVmMmVjZiIsInN1YiI6IjY0NzBiY2FjMzM2ZTAxMDBjNzA3YWI3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oHfujqBJrauIoqjnRmpZKBIuBh2DIE_r2ffs4F37NPk",
    },
  };
  const resultRaw = await fetch(url, options);
  const resultJson = await resultRaw.json();
  const resultsZeroKey = resultJson.results[0].key;

  const HTMLString = `<iframe
        src="https://www.youtube.com/embed/${resultsZeroKey}?rel=0&mute=1&autoplay=1&controls=0&disablekb=1&loop=1&playlist=${resultsZeroKey}">
    </iframe>`;
  return stringToHTML(HTMLString);
}
/**
 * string을 받아서 html문서로 리턴하는 함수
 * @param {string} str - 스트링으로 작성된 html문서
 * @returns {HTMLElement}  - HTML엘레먼트
 */
export function stringToHTML(str) {
  let dom = document.createElement("div");
  dom.id = "movieTrailer";
  dom.innerHTML = str;
  return dom;
}
/**
 * 영화id를 이용해, 세부정보를 json으로 리턴하는 함수
 * @param {string} movieId - 영화의 id
 * @returns {json}  - 영화 세부정보
 */
export async function getDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjJkZWEwNTQwOWI4OGY2ZWM1NTNhMGZhMjFiMjU2NSIsInN1YiI6IjY0NzJmNTY2YmUyZDQ5MDBmOTkzZmNjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZRi3uX2RfmhoriDFnnN0YTzUqNPQ4HJQbS_JiM_r2js",
    },
  };

  const resultRaw = await fetch(url, options);
  const resultJson = await resultRaw.json();
  return resultJson;
}
