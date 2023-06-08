export let loginBtn = () => {
  const wrapper = document.querySelector(".wrapper");
  const btnPopup = document.querySelector("#loginBtn");
  const iconClose = document.querySelector(".icon-close");

  btnPopup.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
  });

  iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
  });

  const greeting = document.querySelector("#greeting");
  const loginForm = document.querySelector("#login-Form");
  const nicknameInput = document.querySelector("#nicknameInput");
  const loginBtn = document.querySelector("#login-btn");

  // string을 반복해서 사용하게 될 경우, 에러를 줄이기 위해 대문자 변수로 고정시켜준다.
  const HIDDEN_CLASSNAME = "hidden";
  const NICKNAME_KEY = "nickname";
  const PASSWORD_KEY = "password";

  let onLoginClick = (event) => {
    event.preventDefault();
    const nickname = nicknameInput.value;
    // 로컬스토리지에 nickname값을 입력하면 저장한다.
    localStorage.setItem(NICKNAME_KEY, nickname);
    // input창에 유저정보를 입력한 값을 인자로 받게 되고 paintGreetings함수를 호출한다.
    paintGreetings(nickname);
    // 로그인 후 팝업창을 숨김 처리한다.
    wrapper.classList.remove("active-popup");
  };

  // 이 함수는 로그인된 상태를 그리는 역할을 한다.
  let paintGreetings = (nickname) => {
    // 로컬스토리지에 저장된 유저정보를 텍스트로 보여준다.
    greeting.innerHTML = `${nickname}님 <box-icon name='down-arrow' type='solid' color='#ffffff' size="15px" ></box-icon>`;
    // 로그인 버튼 숨기기
    btnPopup.classList.add(HIDDEN_CLASSNAME);
    // hidden 클래스명을 지워서 p인 nickname id를 보여준다.
    greeting.classList.remove(HIDDEN_CLASSNAME);
  };

  // 새로고침을 하더라도 유저정보 저장유무에 따라 화면이 다르게 나타나는 로직
  // getItem으로 로컬스토리지에서 유저정보 유무를 확인할 수 있다.
  const savedNickname = localStorage.getItem(NICKNAME_KEY);

  if (savedNickname === null) {
    //로그인 버튼을 누르면 onLoginSubmit이벤트가 작동한다.
    loginBtn.addEventListener("click", onLoginClick);
  } else {
    // 로컬스토리지에 저장된 값을 인자로 받게 되고 paintGreetings함수를 호출한다.
    paintGreetings(savedNickname);
  }
}

