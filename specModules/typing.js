/**
 * html태그의 id와 string을 받아서 해당 태그에 타이핑효과로 text를 추가하는 함수
 * @param {string} id - HTML엘레멘트의 id값
 * @param {string} str - 넣을 스트링
 * @param {number} timeMin - 타이핑되는 간격의 최소시간
 * @param {number} timeMax - 타이핑되는 간격의 최대시간
 * @param {number} index - 재귀를 위한 인덱스, 0 ~ str.length까지 재귀한다.
 */
export function typing(id, str, timeMin, timeMax, index) {
  const rand = Math.floor(Math.random() * (timeMax - timeMin + 1)) + timeMin;
  const content = str;
  const text = document.getElementById(id);
  console.log(index);
  if (index < content.length) {
    text.textContent += content[index];
    setTimeout(typing, rand, id, str, timeMin, timeMax, ++index);
  }
}
