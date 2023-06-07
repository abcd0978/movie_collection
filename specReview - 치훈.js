// HTML 요소 선택
const commentForm = document.querySelector('.comment-form');
const commentInput = commentForm.querySelector('textarea');
const authorInput = commentForm.querySelector('.author-input');
const passwordInput = commentForm.querySelector('.password-input');
const ratingInput = commentForm.querySelector('.rating-input');
const commentButton = commentForm.querySelector('button');
const commentsSection = document.querySelector('.comments');

// 별점 이모티콘 매핑
const starEmojis = {
  '1': '⭐️',
  '2': '⭐️⭐️',
  '3': '⭐️⭐️⭐️',
  '4': '⭐️⭐️⭐️⭐️',
  '5': '⭐️⭐️⭐️⭐️⭐️'
};

// 댓글 작성 이벤트 핸들러
function addComment(event) {
  event.preventDefault(); // 폼 제출 기본 동작 막기

  const commentText = commentInput.value; // 입력된 댓글 내용 가져오기
  const authorName = authorInput.value; // 입력된 작성자 이름 가져오기
  const password = passwordInput.value; // 입력된 비밀번호 가져오기
  const rating = ratingInput.value; // 별점 가져오기

  if (commentText && authorName && password && rating) {
    // 현재 날짜 및 시간 정보 가져오기
    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString();

    // 고유 식별자 생성
    const commentId = generateCommentId();

    // 새 댓글 요소 생성
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.dataset.id = commentId;
    newComment.innerHTML = `
      <p class="username">${authorName}</p>
      <p class="timestamp">${timestamp}</p>
      <p>${commentText}</p>
      <p class="rating">${getStarRating(rating)}</p>
      <button class="edit-button">수정</button>
      <button class="delete-button">삭제</button>
    `;

    // 댓글 섹션에 새 댓글 추가
    commentsSection.appendChild(newComment);

    // 입력 필드 초기화 (댓글을 작성하고 초기화해서 다시 새로운 댓글을 작성할수있게)
    commentInput.value = '';
    authorInput.value = '';
    passwordInput.value = '';
    ratingInput.value = '';

    // 댓글 데이터를 로컬 스토리지에 저장
    saveComment(commentId, commentText, authorName, timestamp, password, rating);

    // 새로 작성된 댓글에 수정 버튼 이벤트 리스너 추가
    newComment.querySelector('.edit-button').addEventListener('click', editComment);
    // 새로 작성된 댓글에 삭제 버튼 이벤트 리스너 추가
    newComment.querySelector('.delete-button').addEventListener('click', deleteComment);

    // 댓글 작성 알림 띄우기
    alert('평점과 리뷰가 작성되었다롱.');

    location.reload(); // 페이지 새로고침
  } else {
    alert('입력 칸이 비어있다롱.');
  }
}

// 댓글 수정 이벤트 핸들러
function editComment(event) {
  const commentElement = event.target.parentElement;
  const commentId = commentElement.dataset.id; // 댓글의 고유 식별자 가져오기
  const password = prompt('댓글 수정을 위한 비밀번호를 입력해주길 바란다롱.'); // 비밀번호 입력 받기

  let comments = JSON.parse(localStorage.getItem('comments'));
  const commentData = comments.find(commentData => commentData.id === commentId); // 수정할 댓글 데이터 찾기

  if (commentData && password === commentData.password) {
    const updatedText = prompt('수정된 댓글 내용을 입력해주길 바란다롱.'); // 수정된 댓글 내용 입력 받기

    if (updatedText) {
      commentData.text = updatedText; // 댓글 내용 업데이트
      commentElement.querySelector('p').textContent = updatedText; // 댓글 요소 업데이트

      localStorage.setItem('comments', JSON.stringify(comments));
      alert('댓글이 수정되었다롱.');

      location.reload(); // 페이지 새로고침
    } else {
      alert('수정된 댓글 내용이 비어있다롱.');
    }
  } else {
    alert('비밀번호가 일치하지 않는다롱.');
  }
}
// 댓글 삭제 이벤트 핸들러
function deleteComment(event) {
  const commentElement = event.target.parentElement;
  const commentId = commentElement.dataset.id; // 댓글의 고유 식별자 가져오기
  const password = prompt('댓글 삭제를 위한 비밀번호를 입력하세요.'); // 비밀번호 입력 받기

  let comments = JSON.parse(localStorage.getItem('comments'));
  const commentData = comments.find(commentData => commentData.id === commentId); // 삭제할 댓글 데이터 찾기

  if (commentData && password === commentData.password) {
    commentElement.remove();
    comments = comments.filter(commentData => commentData.id !== commentId); // 고유 식별자를 기준으로 댓글 삭제
    localStorage.setItem('comments', JSON.stringify(comments));
    alert('댓글이 삭제되었다롱.');
  } else {
    alert('비밀번호가 일치하지 않는다롱.');
  }
}

// 댓글 저장 함수
function saveComment(commentId, commentText, authorName, timestamp, password, rating) {
  const commentData = {
    id: commentId,
    text: commentText,
    author: authorName,
    time: timestamp,
    password: password,
    rating: rating
  };

  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  // 수정된 댓글 데이터 업데이트
  const existingComment = comments.find(commentData => commentData.id === commentId);
  if (existingComment) {
    existingComment.text = commentText;
  } else {
    comments.push(commentData);
  }
  localStorage.setItem('comments', JSON.stringify(comments));
}

// 고유 식별자 생성 함수
function generateCommentId() {
  return Math.random().toString(36).substr(2, 9);
}

// 별점 이모티콘 반환 함수
function getStarRating(rating) {
  return starEmojis[rating];
}

// 초기화 함수
function init() {
  commentForm.addEventListener('submit', addComment); // 댓글 작성 이벤트 리스너 등록

  // 저장된 댓글 로드
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.forEach(commentData => {
    const commentId = commentData.id;
    const commentText = commentData.text;
    const authorName = commentData.author;
    const timestamp = commentData.time;
    const password = commentData.password;
    const rating = commentData.rating;

    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.dataset.id = commentId;
    commentElement.innerHTML = `
      <p class="username">${authorName}</p>
      <p class="timestamp">${timestamp}</p>
      <p>${commentText}</p>
      <p class="rating">${getStarRating(rating)}</p>
      <button class="edit-button">수정</button>
      <button class="delete-button">삭제</button>
    `;

    commentsSection.appendChild(commentElement);

    commentElement.querySelector('.edit-button').addEventListener('click', editComment);
    commentElement.querySelector('.delete-button').addEventListener('click', deleteComment);
  });
}

init(); // 초기화 함수 호출

// 댓글 작성 버튼에 이벤트 리스너 추가
commentButton.addEventListener('click', addComment);

// 페이지 로드 시 저장된 댓글 데이터 불러오기
loadComments();
