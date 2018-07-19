  /* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

Vue.use(VueFire)
firebase.initializeApp({
  apiKey: "AIzaSyAV-yRcR52f6Glc1RwBJhCwIobOz6vU8Ts",
  authDomain: "konten-915a7.firebaseapp.com",
  databaseURL: "https://konten-915a7.firebaseio.com",
  projectId: "konten-915a7",
  storageBucket: "konten-915a7.appspot.com",
  messagingSenderId: "928889593190"
})

const firestore = firebase.firestore();
const setting = {
  timestampsInSnapshots: true
}

firestore.settings(setting);
export const db = firestore;
export const auth = firebase.auth()
export const storage = firebase.storage();

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
