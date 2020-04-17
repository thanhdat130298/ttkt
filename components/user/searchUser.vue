<template>
  <div>
    <form>
      <div class="group">
        <input
          type="text"
          placeholder="Tên đăng nhập: "
          v-model="object.login"
        />
      </div>
      <div class="group">
        <input
          type="text"
          placeholder="Tên hiển thị"
          v-model="object.tenHienThi"
        />
      </div>
      <div class="group">
        <select name="chucdanh" v-model="object.chucDanh">
          <option selected value="">--Choose--</option>
          <option
            v-for="cDanh in CD.content"
            v-bind:key="cDanh.id"
            v-bind:value="cDanh.chucDanh"
          >
            {{ cDanh.chucDanh }}
          </option>
        </select>
      </div>
      <div class="group">
        <input
          type="text"
          placeholder="Đơn vị công tác"
          v-model="object.tenNghiepVu"
        />
      </div>
      <div class="group">
        <input
          type="text"
          placeholder="Nhóm quyền ID"
          v-model="object.authorityId"
        />
      </div>
      <button class="search" v-on:click.prevent="search">SEARCH</button>
      <button class="search" v-on:click.prevent="cancel">Cancel search</button>
    </form>
    <div class="err">{{ err }}</div>
    <div class="err">{{resultSearch}}</div>
  </div>
</template>
<script>
export default {
  name: "search",
  data() {
    return {
      err: "",
      showSearch: false,
      resultSearch: "",
      object: {
        dmbhxhId: "",
        login: "",
        tenHienThi: "",
        chucDanh: "",
        tenNghiepVu: "",
        authorityId: "",
      },
    };
  },
  computed: {
    CD() {
      return this.$store.getters.CD;
    },
  },
  methods: {
    async cancel() {
      await this.$store.dispatch("getUserByPage");
      this.$emit("x", this.showSearch);
    },
    async search() {
      this.object.dmbhxhId = this.$store.state.dmbhxhId;
      // console.log(this.object);
      if (
        !this.object.login &&
        !this.object.tenHienThi &&
        !this.object.chucDanh &&
        !this.object.tenNghiepVu &&
        !this.object.authorityId
      ) {
        this.err = "Nothing is searched!";
      } else {
        await this.$store.dispatch("searchUser", this.object);
        this.resultSearch = this.$store.state.searchResult;
        // this.$store.dispatch("getAllUser");
        // console.log(3);
        
        this.err = "";
      }
    },
  },
  created() {
    this.$store.dispatch("getCD");
    this.$store.dispatch("getIddm");
  },
};
</script>
<style scoped>
.err {
  color: red;
}
form {
  border: 2px solid #4caf50;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  padding-bottom: 20px;
  box-sizing: border-box;
}
input[type="text"],
select,
option {
  float: left;
  width: 30%;
  margin: 1%;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.search {
  color: white;
  width: 30%;
  margin-bottom: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}
</style>
