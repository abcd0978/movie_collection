/**
 * 영화id를 받아서 유튜브iframe의 HTMLElement를반환하는 함수
 * @param {string} id
 */
export async function getVideoLink(id){
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjJkZWEwNTQwOWI4OGY2ZWM1NTNhMGZhMjFiMjU2NSIsInN1YiI6IjY0NzJmNTY2YmUyZDQ5MDBmOTkzZmNjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZRi3uX2RfmhoriDFnnN0YTzUqNPQ4HJQbS_JiM_r2js'
      }
    };
    const resultRaw = await fetch(url, options);
    const resultJson = await resultRaw.json();
    const resultsZeroKey = resultJson.results[0].key;

    const HTMLString = `<iframe
        src="https://www.youtube.com/embed/${resultsZeroKey}?rel=0&mute=1&autoplay=1&controls=0&disablekb=1&loop=1&playlist=${resultsZeroKey}">
    </iframe>`
    return stringToHTML(HTMLString);
}
/**
 * string을 받아서 html문서로 리턴하는 함수
 * @param {string} str
 */
export function stringToHTML(str) {
	let dom = document.createElement('div');
  dom.id = "movieTrailer"
	dom.innerHTML = str;
	return dom;
};


export async function getDetails(id){
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjJkZWEwNTQwOWI4OGY2ZWM1NTNhMGZhMjFiMjU2NSIsInN1YiI6IjY0NzJmNTY2YmUyZDQ5MDBmOTkzZmNjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZRi3uX2RfmhoriDFnnN0YTzUqNPQ4HJQbS_JiM_r2js'
    }
  };

  const resultRaw = await fetch(url, options);
  const resultJson = await resultRaw.json();
  return resultJson;
}