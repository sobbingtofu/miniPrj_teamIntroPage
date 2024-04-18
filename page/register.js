import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyC55DiwDHYqn-UDSByfTGIlXOX0wxmKg9w",
  authDomain: "teamproject-bea46.firebaseapp.com",
  projectId: "teamproject-bea46",
  storageBucket: "teamproject-bea46.appspot.com",
  messagingSenderId: "144679276817",
  appId: "1:144679276817:web:6b776b3e6fdffa90eabcb0",
  measurementId: "G-Q4B1JB11YB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 회원가입 및 로그인 기능
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const logInButton = document.getElementById("logInButton"); // 로그인bt
const signUpButton = document.getElementById("signUpButton"); // 회원가입bt

const userId = document.getElementById("userId"); // 유저ID 출력 자리

const testLogInBox = document.querySelector(".testLogInBox"); // 테스트 로그인 div
const logOutBox = document.querySelector(".logOutBox"); // 로그아웃 div

const signUpEmaildAlert = document.querySelector(".signUpEmaildAlert"); // 회원가입 이메일 경고
const signUpPasswordAlert = document.querySelector(".signUpPasswordAlert"); // 회원가입 비번 경고
const signUpEmailEmptyAlert = document.querySelector(".signUpEmailEmptyAlert"); // 회원 이메일 빈값 확인
const loginIdPasswordAlert = document.querySelector(".loginIdPasswordAlert"); // 로그인 id, pw 경고

const logInPage = document.querySelector(".logInPage"); // 로그인 페이지창
const signUpPage = document.querySelector(".signUpPage"); // 회원가입 페이지창

const auth = getAuth(); // getAuth함수 실행

// 회원가입 버튼 클릭 시
signUpButton.addEventListener("click", (e) => {
  // e.preventDefault(); // 새로고침 현상을 막음. (form태그는 새로고침 현상이 발생됨)
  let signUpEmail = document.getElementById("signUpEmail");
  let signUpPassword = document.getElementById("signUpPassword");
  let signUpConfirmPassword = document.getElementById("signUpConfirmPassword");

  // 이메일 확인
  if (signUpEmail.value === "") {
    signUpEmailEmptyAlert.classList.add("active");
    return;
  }
  // 비밀번호 확인
  if (signUpPassword.value !== signUpConfirmPassword.value) {
    signUpPasswordAlert.classList.add("active");
    signUpEmailEmptyAlert.classList.remove("active");
    return;
  }
  if (signUpPassword.value === signUpConfirmPassword.value) {
    signUpPasswordAlert.classList.remove("active");
  }

  // 회원 생성
  createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value) // auth를 전달해주고 이메일, 패스워드로 유저를 만들어줌
    .then((userCredential) => {
      // 회원가입이 제대로 진행되면 유저정보 FB에 저장됨
      const user = userCredential.user;
      signUpEmail.value = "";
      signUpPassword.value = "";
      signUpConfirmPassword.value = "";
      signUpEmaildAlert.classList.remove("active");
      signUpPage.classList.remove("active");
      testLogInBox.classList.remove("active");
      alert(`${user.email}님, 회원가입을 축하드립니다!`);
    })
    .catch((err) => {
      // 이메일 중복 경고 메세지
      signUpEmaildAlert.classList.add("active");
      signUpEmailEmptyAlert.classList.remove("active");
      // const errCode = err.code;
      // const errMessage = err.message;
      // console.log(errCode);
      // console.log(errMessage);
    });
});

// 로그인 버튼 클릭시
logInButton.addEventListener("click", (e) => {
  e.preventDefault();
  let logInEmail = document.getElementById("logInEmail");
  let logInPassword = document.getElementById("logInPassword");

  // 로그인 정보가 FB에 있는지 확인
  signInWithEmailAndPassword(auth, logInEmail.value, logInPassword.value)
    .then((userCredential) => {
      // 로그인 성공
      const user = userCredential.user;
      logInEmail.value = "";
      logInPassword.value = "";
      logInPage.classList.remove("active");
      logOutBox.classList.add("active");
      loginIdPasswordAlert.classList.remove("active");
      userId.innerText = `${user.email}`;
    })
    .catch((err) => {
      // 로그인 실패
      // 이메일, 비번 확인 경고 메세지
      loginIdPasswordAlert.classList.add("active");
    });
});

// 로그인 유무
// 사용자의 로그인 상태 변경사항을 관찰 // 로그인이 안돼있으면 null값을 반환함
onAuthStateChanged(auth, (user) => {
  // 로그인이 돼있을 때
  if (user) {
    testLogInBox.classList.remove("active");
    logOutBox.classList.add("active");
    userId.innerText = `${user.email}`;
  } else {
    // 로그인 안돼있을 때
    testLogInBox.classList.add("active");
    userId.innerText = ``;
    logOutBox.classList.remove("active"); // 로그아웃 박스 제거
  }
});

// 로그아웃 처리
const signOutButton = document.getElementById("signOutButton");
signOutButton.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
  logOutBox.classList.remove("active"); // 로그아웃 박스 제거
  alert("정상적으로 로그아웃 되었습니다.");
});