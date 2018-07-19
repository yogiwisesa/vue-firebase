<template>
  <div id="app">

    <div id="auth">
      <button @click="register">Register</button>
      <button @click="loginGmail">Gmail Login</button>
      <button @click="loginFacebook">Facebook Login</button>
      <button @click="getUserInfo">User Information</button>
    </div>

    <div>
      <ul>
        <li v-for="(todo, idx) in todos" :key="idx">
          <h3>{{ todo.todo }}</h3>
          <p>{{ todo.color }}</p>
          <p>{{ idx }}</p>
          <button @click="deleteTodo(todo.id)">
            Delete
          </button>
        </li>
      </ul>
      <input type="text" v-model="todo"> <br>
      <input type="text" v-model="color">
      <button @click="addTodo">Submit</button>
    </div>

    <div>
      <input type="file" multiple accept="image/jpeg" @change="detectFiles($event.target.files)">
      <div class="progress-bar" :style="{ width: progressUpload + '%'}">{{ progressUpload }}%</div>
    </div>
  </div>
</template>

<script>
import { db, auth, authGoogle, storage, authFacebook } from "./main";
export default {
  name: "app",
  data() {
    return {
      email: "yogi2@gmail.com",
      password: "1234567890",
      todo: "",
      color: "",
      todos: [],
      progressUpload: 0,
      file: File,
      uploadTask: ""
    };
  },
  firestore() {
    return {
      todos: db.collection("todos")
    };
  },
  methods: {
    /*
      To get user informaions, if there's no user signed in, will return null.
    */
    getUserInfo() {
      console.log(auth.currentUser);
    },
    loginGmail() {
      const provider = authGoogle;
      auth
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          console.log(user);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log("err");
          console.log(`${errorCode} ${errorMessage}`);
        });
    },
    loginFacebook() {
      const provider = authFacebook;
      auth
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          console.log(user);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log("err");
          console.log(`${errorCode} ${errorMessage}`);
        });
    },
    register() {
      console.log("register");
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log("Success");
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    addTodo() {
      db
        .collection("todos")
        .add({
          color: this.color,
          todo: this.todo
        })
        .then(() => {
          console.log("Success");
        });
    },
    deleteTodo(id) {
      db
        .collection("todos")
        .doc(id)
        .delete();
    },
    detectFiles(fileList) {
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x]);
      });
    },
    upload(file) {
      this.uploadTask = storage.ref(file.name).put(file);
    }
  },
  watch: {
    uploadTask: function() {
      this.uploadTask.on(
        "state_changed",
        sp => {
          this.progressUpload = Math.floor(
            sp.bytesTransferred / sp.totalBytes * 100
          );
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.$emit("url", downloadURL);
            console.log(downloadURL);
          });
        }
      );
    }
  }
};
</script>
