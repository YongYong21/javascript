import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
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
const db = getFirestore(app);
const storage = getStorage();

// 데이터 추가
$("form").on("submit", async (event) => {
  if ($(event.currentTarget)[0] === $(".edit-form")[0]) {
    event.preventDefault();
    let targetValue = $("#user-name").text();

    // 모든 로컬 스토리지의 키를 순회
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i); // 특정 인덱스의 키 가져오기
      let value = JSON.parse(localStorage.getItem(key)); // 해당 키에 해당하는 값 가져오기

      if (value.name === targetValue) {
        console.log("찾은 키:", key);
        let file = $("#img")[0].files[0];
        value.name = $("#name").val();
        value.email = $("#email").val();
        value.phone = $("#phone").val();
        value.classification = $("#classification").val();
        let userImage = $("#img")[0].files[0] ? true : false;
        value.hasImage = userImage;

        const desertRef = ref(storage, `image/${value.key}`);
        deleteObject(desertRef)
          .then(() => {
            const newImageRef = ref(storage, "image/" + value.key);

            uploadBytes(newImageRef, file).then((snapshot) => {
              localStorage.setItem(key, JSON.stringify(value));
              window.location.href = "index.html";
            });
          })
          .catch((error) => {});
      } else {
        console.log("없음");
      }
    }
  } else {
    event.preventDefault();

    let file = $("#img")[0].files[0];
    let userName = $("#name").val();
    let userEmail = $("#email").val();
    let userPhone = $("#phone").val();
    let userClassification = $("#classification").val();
    let uniqueKey = Date.now().toString();
    let userImage = $("#img")[0].files[0] ? true : false;

    const storageRef = ref(storage, "image/" + uniqueKey);

    uploadBytes(storageRef, file).then((snapshot) => {
      let userInfo = {
        box: false,
        name: userName,
        email: userEmail,
        phone: userPhone,
        classification: userClassification,
        hasImage: userImage,
        key: uniqueKey,
      };
      localStorage.setItem(uniqueKey, JSON.stringify(userInfo));
      $(".black-bg").removeClass("show");
      window.location.href = "index.html";
    });
  }
});

// 적용되는것
//   try {
//     const docRef = await addDoc(collection(db, "employee"), {
//       name: userName,
//       email: userEmail,
//       phone: userPhone,
//       classification: userClassification,
//     });
//     console.log("Document written with ID: ", docRef.id);
//     blackContainer.removeClass('show')
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// });

// 데이터 읽기
//   const querySnapshot = await getDocs(collection(db, "product"));
//   querySnapshot.forEach((doc) => {
//     const data = doc.data();
//     const productId = doc.id;
//     const productName = data.제목; // "제목" 필드의 값을 가져옴
//     const productPrice = data.가격; // "가격" 필드의 값을 가져옴
//     console.log(`상품 ID: ${productId}`);
//     console.log(`상품 이름: ${productName}`);
//     console.log(`상품 가격: ${productPrice}`);
//   });
