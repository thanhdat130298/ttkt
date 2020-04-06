<template>
  <div class="login">
    <form>
      <h2>LOGIN</h2>

      <p class="id">
        <label><div class="label">ID of unit</div></label>
        <input
          type="text"
          name="id"
          class="inputid"
          @change="onInputChange"
          placeholder="ID..."
          v-model="id"
        />
      </p>
      <p class="unit">
        <label for="unit"><div class="label">Unit</div></label>
        <input
          type="text"
          name="id"
          placeholder="Unit..."
          v-model="unit"
          disabled
        />
      </p>
      <p class="username">
        <label for="user"><div class="user">Username:</div> </label>
        <input
          type="text"
          name="user"
          v-model="username"
          class="input"
          placeholder="Username..."
        />
      </p>
      <p class="password">
        <label for="pass"><div class="label">Password:</div> </label>
        <input
          type="password"
          name="pass"
          id="pass"
          v-model="password"
          class="input"
          placeholder="Password..."
        />
      </p>
      <div class="err">{{err}} {{error}}</div>
      <button v-on:click.prevent="login">LOGIN</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      err: "",
      id: "",
      unit: "",
      password: "",
      username: "",
      error: ""
    };
  },
  methods: {
    async onInputChange() {
      await this.$store.dispatch("getUnit", this.id);
      this.unit = this.$store.state.name;
    },
    login() {
      let object = {
        username: this.username,
        password: this.password,
        maDonVi: this.id
      };
      if (!this.username || !this.password || !this.id) {
        this.err = "Login false!";
      } else this.$store.dispatch("login", object);
     
    }
  }
};
</script>
<style scoped>
button:active {
  background-color: white;
  color: #4caf50;
  transition: 100ms;
}
.err {
  height: 20px;
  color: red;
}
form {
  box-shadow: 1px 1px 5px 5px #42b983 ;
  margin: 0 auto;
  width: 30%;
  margin-top: 50px;
  border: 1px solid #42b983;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  width: 30%;
  background-color: #4caf50;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  color: white;
  border: 1px solid #fff1;
  border-radius: 4px;
  box-sizing: border-box;
}
input {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  margin: 0 auto;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 30%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>
