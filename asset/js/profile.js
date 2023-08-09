import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyBulLEBUR9SUKd6YZgFdcp3zArHVZFyhdU",
  authDomain: "fastcampusjavascript.firebaseapp.com",
  projectId: "fastcampusjavascript",
  storageBucket: "fastcampusjavascript.appspot.com",
  messagingSenderId: "741337754815",
  appId: "1:741337754815:web:c0cd01444983c91fe76a0a",
  measurementId: "G-RRXF3L5HP6",
};


// URL 매개변수 추출 함수
function getParameterByName(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// 페이지 로드 시 실행될 코드
$(document).ready(function () {
  // URL 매개변수에서 정보 추출
  const userName = decodeURIComponent(getParameterByName("name"));
  const userEmail = decodeURIComponent(getParameterByName("email"));
  const userPhone = decodeURIComponent(getParameterByName("phone"));
  const userClassification = decodeURIComponent(
    getParameterByName("classification")
  );

  
  $("#user-name").text(userName);
  $("#user-email").text(userEmail);
  $("#user-phone").text(userPhone);
  $("#user-classification").text(userClassification);

  const app = initializeApp(firebaseConfig);
  const storage = getStorage();
  console.log(userName)
  getDownloadURL(ref(storage, `image/${userName}`))
    .then((url) => {
      const img = $(`#userimg`);
      img.attr("src", url);
    })
    .catch((error) => {
      console.log("이미지 가져오기 실패");
    });
});
