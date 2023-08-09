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


  let userInfo = JSON.parse(storedUserInfo);

  const userList = `
<tr class = ${userInfo.name}>
<td class='check'><input type="checkbox"></td>
<td><img src="" id="userimg"></td>
<td><span>${userInfo.name}</span></td>
<td><span>${userInfo.email}</span></td>
<td><span>${userInfo.phone}</span></td>
<td><span>${userInfo.classification}</span></td>
<td><button class='profile-btn'>수정하기</button></td>
</tr>`;
  $("tbody").append(userList);

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
    })
    .catch((error) => {
      console.log("이미지 가져오기 실패");
    });
});

$(".remove-btn").on("click", (e) => {
  allKeys.forEach((key) => {
    let storedUserInfo = localStorage.getItem(key);

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
        .catch((error) => {});

      localStorage.removeItem(key);
    }
  });
  window.location.href = "index.html";
});


// 프로필 버튼 클릭 이벤트 핸들러
$(".profile-btn").on("click", function (event) {
  const row = $(this).closest("tr");

  const userName = row.find("td:nth-child(3) span").text();
  const userEmail = row.find("td:nth-child(4) span").text();
  const userPhone = row.find("td:nth-child(5) span").text();
  const userClassification = row.find("td:nth-child(6) span").text();

  const profileUrl = `profile.html?name=${encodeURIComponent(
    userName
  )}&email=${encodeURIComponent(userEmail)}&phone=${encodeURIComponent(
    userPhone
  )}&classification=${encodeURIComponent(userClassification)}`;

  window.location.href = profileUrl;
});
