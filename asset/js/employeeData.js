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
let file = $("#img")[0].files[0];
const hasExecuted = localStorage.getItem("hasExecuted");

let englishNames = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Emily",
  "Frank",
  "Grace",
  "Henry",
  "Isabella",
  "Jack",
  "Katherine",
  "Liam",
  "Mia",
  "Noah",
  "Olivia",
  "Penelope",
  "Quinn",
  "Ryan",
  "Sophia",
  "Thomas",
  "Ursula",
  "Victoria",
  "William",
  "Xavier",
  "Yvonne",
  "Zoe",
];


// 수정된 getRandomPhoneNumber 함수
function getRandomPhoneNumber() {
  var phoneNumber = "010"; // 핸드폰 번호는 일반적으로 010으로 시작
  for (var i = 0; i < 8; i++) {
    phoneNumber += Math.floor(Math.random() * 10); // 0부터 9 사이의 숫자 추가
  }
  return phoneNumber;
}

var randomPhoneNumbers = [];

for (var i = 0; i < englishNames.length; i++) {
  var randomPhoneNumber = getRandomPhoneNumber();
  randomPhoneNumbers.push(randomPhoneNumber);
}
if (!hasExecuted) {
    const promises = [];
  
    for (let i = 0; i < englishNames.length; i++) {
      let uniqueKey = Date.now().toString();
      const storageRef = ref(storage, "image/" + uniqueKey);
      const uploadPromise = uploadBytes(storageRef, file).then((snapshot) => {
        let userInfo = {
          box: false,
          name: englishNames[i],
          email: englishNames[i] + "@gmail.com",
          phone: randomPhoneNumbers[i],
          classification: "Developer",
          hasImage: false,
          key: uniqueKey,
        };
        localStorage.setItem(uniqueKey, JSON.stringify(userInfo));
      });
  
      promises.push(uploadPromise);
    }
  
    // 모든 업로드가 완료된 후에 실행되도록 코드 추가
    Promise.all(promises).then(() => {
      localStorage.setItem("hasExecuted", true);
      window.location.href = "index.html";
    });
  }
  