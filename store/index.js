import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router/router";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    name: "",
    token: "",
    users: [],
    CQ: [],
    DV: [],
    NQ: [],
    PB: [],

    CD: []
  },
  getters: {
    users: state => state.users,
    DV: state => state.DV,
    NQ: state => state.NQ,
    PB: state => state.PB,
    CQ: state => state.CQ,

    CD: state => state.CD
  },
  mutations: {
    logout(state) {
      state.token = null;
      router.push("/login");
    },
    SAVE(state, name) {
      state.name = name;
    },
    getToken(state, token) {
      state.token = token;
    },
    users(state, users) {
      state.users = users;
    },

    listDonVi(state, data) {
      state.DV = data;
    },
    listPhongBan(state, data) {
      state.PB = data; //
    },
    listNhomQuyen(state, data) {
      state.NQ = data; //
    },
    listChucDanh(state, data) {
      state.CD = data; //
    },
    listCoQuan(state, data) {
      state.CQ = data;
    }
  },
  actions: {
    fetchToken({ commit }) {
      commit("getToken", localStorage.getItem("token"));
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      commit("logout");
    },

    getAllUser({ commit }) {
      axios.get("http://118.69.55.188:8080/api/users").then(res => {
        commit("users", res.data);
        console.log(res.data);
        
      });
    },
    async login(state, data) {
      
      await axios
        .post("http://118.69.55.188:8080/api/authenticate", {
          maDonVi: data.maDonVi,
          username: data.username,
          password: data.password
        })
        .then(res => {
          this.commit("getToken", res.data.id_token);
          localStorage.setItem("token", res.data.id_token);
          router.push("/home");
        })
        .catch(err => {
          console.log(err);
        });
    },
    
//http://192.168.0.139:8080/
    async getUnit(state, id) {
      await axios
        .get(
          "http://118.69.55.188:8080/api/account/get-info-dmbhxh-by-ma-don-vi?maDonVi=" +
            id
        )
        .then(res => {
          console.log(res.data.dmbhxh.tenDonVi);
          
          this.commit("SAVE", res.data.dmbhxh.tenDonVi);
        });
    },

    /////////////////////

    getNQ() {
      axios
        .get(
          "http://118.69.55.188:8080/api/authorities/get-by-dmbhxh-id?dmbhxhId=1&page=[object%20Object]&size=30"
        )
        .then(res => {
          this.commit("listNhomQuyen", res.data.content);
          console.log(res.data.content);
          console.log(res.data.content);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPB() {
      axios
        .get(
          "http://118.69.55.188:8080/api/d-m-phong-ban?page=0&size=1000&dmBhxhId=1"
        )
        .then(res => {
          this.commit("listPhongBan", res.data.content);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDV() {
      axios
        .get("http://118.69.55.188:8080/api/don-vi-nghiep-vus?page=0&size=1000")
        .then(res => {
          this.commit("listDonVi", res.data.content);
          console.log(res.data.content);
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCQ() {
      axios
        .get("http://118.69.55.188:8080/api/d-mbhxhs/get-by-ma-cha?maCha=000")
        .then(res => {
          this.commit("listCoQuan", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCD() {
      axios
        .get(
          "http://118.69.55.188:8080/api/d-m-chuc-danh-users?page=0&size=1000&dmBHXHId=1"
        )
        .then(res => {
          this.commit("listChucDanh", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },

    submit(state, info) {
      axios
        .post("http://118.69.55.188:8080/api/account/register", info)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  modules: {}
});
