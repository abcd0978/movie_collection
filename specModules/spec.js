import { specTitle } from "./specTitle.js";

// 'window.onload' 이벤트에 대한 핸들러 함수를 정의
// 그 안에서 'specTitle()' 함수를 호출
window.onload = function () {
  const URLSearch = new URLSearchParams(location.search);
  const movieId = URLSearch.get("id");
  specTitle(movieId);
};
