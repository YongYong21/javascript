import { storage, ref, uploadBytes } from "./firebase.js";

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

// 무작위 핸드폰 번호 생성
function getRandomPhoneNumber() {
  const phoneNumber = `010${Math.random().toString().slice(2, 10)}`;
  return phoneNumber;
}

let randomPhoneNumbers = [];

for (let i = 0; i < englishNames.length; i++) {
  let randomPhoneNumber = getRandomPhoneNumber();
  randomPhoneNumbers.push(randomPhoneNumber);
}
// 첫접속이면
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
  await Promise.all(promises);
  localStorage.setItem("hasExecuted", true);
  window.location.href = "index.html";
}
