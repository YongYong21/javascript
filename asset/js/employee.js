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

let allKeys = Object.keys(localStorage);

allKeys.forEach((key) => {
  let storedUserInfo = localStorage.getItem(key);

  // JSON 형식의 사용자 정보를 객체로 변환
  let userInfo = JSON.parse(storedUserInfo);

  // userInfo 객체를 활용하여 필요한 작업 수행
  // 예: 출력, 특정 속성에 접근 등
  const userList = `
<tr class = ${userInfo.name}>
<td><input type="checkbox"></td>
<td><img src="" id="userimg"></td>
<td>${userInfo.name}</td>
<td>${userInfo.email}</td>
<td>${userInfo.phone}</td>
<td>${userInfo.classification}</td>
</tr>`;
  $("tbody").append(userList);
  console.log(userInfo.name); // 사용자 이름 출력

  // 여기에 필요한 작업을 추가

  const app = initializeApp(firebaseConfig);
  const storage = getStorage();
  getDownloadURL(ref(storage, `image/${userInfo.name}`))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      // const xhr = new XMLHttpRequest();
      // xhr.responseType = "blob";
      // xhr.onload = (event) => {
      //   const blob = xhr.response;
      // };
      // xhr.open("GET", url);
      // xhr.send();

      // Or inserted into an <img> element
      const img = $(`.${userInfo.name} #userimg`);
      img.attr("src", url);
      console.log(img);
    })
    .catch((error) => {
      console.log("이미지 가져오기 실패");
    });
});

$(".remove-btn").on("click", (e) => {
  console.log("click");
  allKeys.forEach((key) => {
    let storedUserInfo = localStorage.getItem(key);

    // JSON 형식의 사용자 정보를 객체로 변환
    let userInfo = JSON.parse(storedUserInfo);

    if ($(`.${userInfo.name} input`).prop("checked")) {
      const storage = getStorage();

      // Create a reference to the file to delete
      const desertRef = ref(storage, `image/${userInfo.name}`);

      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          // File deleted successfully
        })
        .catch((error) => {
        });

      localStorage.removeItem(key);
    }
  });
  window.location.href = "index.html";
});


