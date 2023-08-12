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
const app = initializeApp(firebaseConfig);
const storage = getStorage();

let allKeys = Object.keys(localStorage);

const visibleEmployees = 10; // 초기에 보이는 직원 수
const additionalEmployees = 3; // 스크롤링할 때 추가로 보여지는 직원 수
let lastVisibleEmployeeIndex = visibleEmployees - 1; // 마지막으로 보이는 직원 인덱스
let allEmployeesLoaded = false;
// 초기에 보이는 직원 목록 리스팅
listEmployees(0, lastVisibleEmployeeIndex);

// 스크롤 이벤트 리스너 추가
window.addEventListener("scroll", () => {
  if (allEmployeesLoaded) {
    return;
  }

  // 뷰포트의 맨 아래와 현재 스크롤 위치의 합이 문서 전체 높이와 거의 같을 때 추가 데이터 불러오기
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    // 추가 데이터를 가져오는 함수 호출
    loadMoreEmployees();
  }
});

// 초기 직원 목록 리스팅 함수
function listEmployees(startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    const key = allKeys[i];
    if (key === "hasExecuted") {
      continue;
    }
    const storedUserInfo = localStorage.getItem(key);

    if (storedUserInfo !== null){
      const userInfo = JSON.parse(storedUserInfo);

    const userList = `
    <tr data-name="${userInfo.name}">
    <td class='check'><input type="checkbox" ></td>
    <td><img src="" id="${userInfo.key}"></td>
    <td><span>${userInfo.name}</span></td>
    <td><span>${userInfo.email}</span></td>
    <td><span>${userInfo.phone}</span></td>
    <td><span>${userInfo.classification}</span></td>
    <td><button class='profile-btn'>프로필 보기</button></td>
    </tr>`;
    $("tbody").append(userList);

    if (userInfo.hasImage) {
      getDownloadURL(ref(storage, `image/${userInfo.key}`))
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
          const img = $(`#${userInfo.key}`);

          img.attr("src", url);
        })
        .catch((error) => {
          console.log("실패");
        });
    } else {
      getDownloadURL(ref(storage, `image/default.png`))
        .then((url) => {
          const img = $(`#${userInfo.key}`);
          img.attr("src", url);
        })
        .catch((error) => {
          console.log("실패");
        });
    }
    }
    
  }
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
}

// 추가 데이터를 가져오는 함수
function loadMoreEmployees() {
  // 마지막으로 보이는 직원 인덱스 업데이트
  lastVisibleEmployeeIndex += additionalEmployees;
  if (lastVisibleEmployeeIndex >= allKeys.length - 1) {
    allEmployeesLoaded = true;
    return;
  }
  // 추가 데이터를 가져와서 리스팅
  listEmployees(
    lastVisibleEmployeeIndex - additionalEmployees + 1,
    lastVisibleEmployeeIndex
  );
}

// allKeys.forEach((key) => {
//   if (key === 'hasExecuted') {
//     return;
//   }
//   let storedUserInfo = localStorage.getItem(key);
//   let userInfo = JSON.parse(storedUserInfo);

//   const userList = `
// <tr class = ${userInfo.name}>
// <td class='check'><input type="checkbox"></td>
// <td><img src="" id="userimg"></td>
// <td><span>${userInfo.name}</span></td>
// <td><span>${userInfo.email}</span></td>
// <td><span>${userInfo.phone}</span></td>
// <td><span>${userInfo.classification}</span></td>
// <td><button class='profile-btn'>프로필 보기</button></td>
// </tr>`;
//   $("tbody").append(userList);

//   if(userInfo.hasImage){
//     getDownloadURL(ref(storage, `image/${userInfo.key}`))
//     .then((url) => {
//       // `url` is the download URL for 'images/stars.jpg'

//       // This can be downloaded directly:
//       // const xhr = new XMLHttpRequest();
//       // xhr.responseType = "blob";
//       // xhr.onload = (event) => {
//       //   const blob = xhr.response;
//       // };
//       // xhr.open("GET", url);
//       // xhr.send();
//       // Or inserted into an <img> element
//       const img = $(`.${userInfo.name} #userimg`);
//       img.attr("src", url);
//     })
//     .catch((error) => {
//       console.log('실패')
//     });
//   }
//   else {
//     getDownloadURL(ref(storage, `image/default.png`))
//     .then((url) => {
//       const img = $(`.${userInfo.name} #userimg`);
//       img.attr("src", url);

//     })
//     .catch((error) => {
//       console.log('실패')
//     });
//   }

// });

$(".remove-btn").on("click", () => {
  const promises = [];

  allKeys.forEach((key) => {
    let storedUserInfo = localStorage.getItem(key);
    let userInfo = JSON.parse(storedUserInfo);

    if ($(`tr[data-name="${userInfo.name}"] input`).prop("checked")) {
      const storage = getStorage();
      const desertRef = ref(storage, `image/${userInfo.key}`);

      
      const removePromise = deleteObject(desertRef)
        .then(() => {
          console.log('파일 삭제 성공');
        })
        .catch((error) => {
          console.log('데이터 삭제 오류', error);
        });

      localStorage.removeItem(key);

      promises.push(removePromise);
    }
  });

  
  Promise.all(promises)
    .then(() => {
      console.log('삭제 완료');
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.log('삭제 실패', error);
    });
});

// // 프로필 버튼 클릭 이벤트 핸들러
// $(".profile-btn").on("click", function (event) {
//   const row = $(this).closest("tr");

//   const userName = row.find("td:nth-child(3) span").text();
//   const userEmail = row.find("td:nth-child(4) span").text();
//   const userPhone = row.find("td:nth-child(5) span").text();
//   const userClassification = row.find("td:nth-child(6) span").text();

//   const profileUrl = `profile.html?name=${encodeURIComponent(
//     userName
//   )}&email=${encodeURIComponent(userEmail)}&phone=${encodeURIComponent(
//     userPhone
//   )}&classification=${encodeURIComponent(userClassification)}`;

//   window.location.href = profileUrl;
// });
