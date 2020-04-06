<template>
  <div>
    <div class="menu_top"></div>
    <div class="content">
      <div class="menu_left">
        <div class="vertical-menu">
          <button v-for="tab in tabs" v-bind:key="tab" v-on:click="curentTab=tab">
            {{ tab }}
          </button>
          
          <!-- <button v-on:click="logout">LOGOUT</button> -->
        </div>
      </div>
        <keep-alive><component class="right" v-bind:is="selected"></component></keep-alive>
    </div>
  </div>
</template>
<script>
import listAllUser from "./listAllUser";
import homepage from "./homepage";
export default {
  name: "home",
  components: {
    listAllUser,
    homepage
  },
  data() {
    return {
      show: false,
      curentTab: "homepage",
      tabs: ["homepage", "listAllUser"]
    };
  },
  computed: {
    selected() {
      return this.curentTab;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
<style scoped>
.menu_top {
  width: 100%;
  height: 75px;
  background-color: #4caf50;
}
.menu_left {
  float: left;
  width: 20%;
  height: 1000px;
  margin: 1%;
  margin-top: 1.5%;
  background-color: #4caf50;
}
.right {
  margin: 1.5%;
  float: left;
  width: 75%;
}
.vertical-menu {
  position: fixed;
  width: 20%;
  margin: 0 auto;
  padding-bottom: 2%;
}
button,
.button {
  font-size: 17px;
  border: 1px solid white;
  width: 99%;
  margin: 0 auto;
}
.button {
  margin-top: 2px;
  width: 98%;
}
button,
.button {
  background-color: #eee;
  color: black;
  display: block;
  padding-top: 12px;
  padding-bottom: 12px;
  text-decoration: none;
}

button:hover,
.button:hover {
  background-color: #ccc;
}
button:active,
.button:active {
  background-color: #4caf50;
  color: white;
}
</style>
