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

  </div>
</template>

<script>
import { db, auth } from "./main";
export default {
  name: "app",
  data() {
    return {
      email: "yogi2@gmail.com",
      password: "1234567890",
      todo: "",
      color: "",
      todos: [{ todo: "xx", color: "red" }]
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
    }
  }
};
</script>
