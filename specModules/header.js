export let getSavedNickname = () => {
  const greeting = document.querySelector("#greeting");
  // 로컬스토리지에서 닉네임을 가져온다.
  const savedNickname = localStorage.getItem("nickname");
  // 화면에 닉네임을 표시한다.
  greeting.innerText = `${savedNickname}님`;
};
