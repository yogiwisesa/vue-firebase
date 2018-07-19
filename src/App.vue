<template>
  <div id="app">

    <div id="auth">
      <a @click="register">Register</a>
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
      <a @click="addTodo">Submit</a>
    </div>

    <div>
      <input type="file" multiple accept="image/jpeg" @change="detectFiles($event.target.files)">
      <div class="progress-bar" :style="{ width: progressUpload + '%'}">{{ progressUpload }}%</div>
    </div>
  </div>
</template>

<script>
import { db, auth, storage } from "./main";
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
