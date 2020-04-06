<template>
  <div>
    <button v-on:click="check = true">ADD USER</button>

    <div class="contain" v-if="check">
      <div>
        <addUser class="addUser" />
      </div>
    </div>

    <table id="customers">
      <thead>
        <tr>
          <th>ID</th>
          <th>TÊN</th>
          <th>CHỨC DANH</th>
          <th>ĐƠN VỊ</th>
          <th>TỈNH HUYỆN</th>
          <th>NHÓM QUYỀN</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" v-bind:key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.tenHienThi }}</td>
          <td>{{ user.chucDanh }}</td>
          <td>{{ user.donVi }}</td>
          <td>{{ user.tenTinhHuyen }}</td>
          <td>{{ user.groupUserName }}</td>
          <!-- <div><button v-on:click="deleteUser(user.id)">DELETE</button></div> -->
          <td>
            <div><button>EDIT</button></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import addUser from "./user/addUser";
export default {
  name: "listAllUser",
  data() {
    return {
      check: false,
    };
  },
  components: {
    addUser,
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
  methods: {
    //   deleteUser(id) {
    //       this.$store.dispatch("deleteUser", id)
    //   }
  },
  created() {
    this.$store.dispatch("getAllUser");
  },
};
</script>
<style scoped>
.contain{ 
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
table {
  width: 100%;
}
td {
  text-align: left;
}
#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}
button {
  width: 100%;
}
#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-bottom: 12px;
  text-align: center;
  background-color: #4caf50;
  color: white;
}
</style>
