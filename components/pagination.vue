<template>
  <div>
    <div class="pagins">
      <div class="pagin span">Pages:</div> 
      <button class="pagin" @first="first"  v-on:click="getValue(first)">
        {{ first }}
      </button>
      <div v-for="page in pages" class="pagin" v-bind:key="page.name">
        <button v-on:click="getValue(page.name)">
          {{ page.name }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "pagination",
  props: ["length"],
  data() {
    return {
      pages: [],
      a: this.length / 20,
      sizePage: "",
      page: { name: null },
      first: 1,
    };
  },
  methods: {
    getValue(page) {
      this.$store.dispatch("getUserByPage", page);
    },
  },
  mounted() {
    this.$store.dispatch("getUserByPage", this.first);
  },
  created() {
    this.sizePage = parseInt(this.a);
    for (let i = 2; i <= this.sizePage; i++) {
      let object = { name: i };
      this.page = object;
      this.pages.push(this.page);
    }
  },
};
</script>
<style scoped>
.span {
  line-height: 30px;
}
.pagin {
  float: left;
  margin-right: 2px;
}
.pagins {
  width: 400px;
  position: relative;
  float: right;
}
button {
  padding: 8px;
}
</style>
