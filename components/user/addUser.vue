<template>
  <div>
    <form>
      <div class="group1">
        <div class="left">Tên đăng nhập:</div>
        <input type="text" v-model="infor.login" class="right" />
      </div>
      <div class="group2">
        <div class="left">Họ và Tên:</div>
        <input type="text" v-model="infor.tenHienThi" />
      </div>
      <div class="group">
        <div class="left">Mật khẩu:</div>
        <input type="password" v-model="infor.password" />
      </div>
      <div class="group">
        <div class="left">Nhập lại mật khẩu:</div>
        <input type="password" v-model="repassword" />
      </div>
      <div class="group">
        <div class="left space">Giới tính:</div>
        <div>
          <input type="radio" v-model="infor.gioiTinh" checked value=true />Nam

          <input
            type="radio"
            v-model="infor.gioiTinh"
            name="gender"
            value=false
          />Nữ
        </div>
      </div>
      <div class="group">
        <div class="left">Email:</div>
        <input type="email" v-model="infor.email" />
      </div>
      <div class="group">
        <div class="left">Điện thoại di động:</div>
        <input type="number" v-model="infor.phoneNumber" />
      </div>
      <div class="group">

        <div class="left">Ảnh:</div>
        <input type="text" v-model="infor.imageUrl" />
      </div>
      <div class="group">
        
        <div class="left">Nhóm quyền:</div>
        <select name="chucdanh" v-model="infor.groupUserId">
          <option value="null">--Choose--</option>
          <option
            v-for="nQuyen in NQ"
            v-bind:key="nQuyen.id"
            v-bind:value="nQuyen.id"
          >
            {{ nQuyen.name }}{{nQuyen.id}}
          </option>
        </select>
      </div>
      <div class="group">


        <div class="left">Phòng Ban:</div>
        <select name="phongban" v-model="infor.dmPhongBanId">
          <option value="null">--Choose--</option>
          <option
            v-for="pBan in PB"
            v-bind:key="pBan.id"
            v-bind:value="pBan.id"
          >
            {{ pBan.tenPhongBan }} {{pBan.id}}
          </option>
        </select>
      </div>
      <div class="group">

        <div class="left">Cơ quan tổ chức:</div>
        <select name="coquantochuc" v-model="infor.donViId">
          <option value="null">--Choose--</option>
          <option
            v-for="cQuan in CQ"
            v-bind:key="cQuan.id"
            v-bind:value="cQuan.id"
          >
            {{ cQuan.tenDonVi }}{{cQuan.id}}
          </option>
        </select>
      </div>
      <div class="group">

        <div class="left">Đơn vị nghiệp vụ:</div>
        <select name="donvi" v-model="infor.dviNghiepVuId">
          <option value="null">--Choose--</option>
          <option v-for="dvi in DV" v-bind:key="dvi.id" v-bind:value="dvi.id">
            {{ dvi.tenNghiepVu }} {{dvi.id}}
          </option>
        </select>
      </div>
      <div class="group">

        <div class="left">Chức danh:</div>
        <select name="chucdanh" v-model="infor.chucDanhId">
          <option value="null">--Choose--</option>
          <option
            v-for="cDanh in CD.content"
            v-bind:key="cDanh.id"
            v-bind:value="cDanh.id"
          >
            {{ cDanh.chucDanh }}{{cDanh.id}}
          </option>
        </select>
      </div>
      <div class="group">

        <div class="left space">Trạng thái hoạt động:</div>
        <div>
          <input type="radio" v-model="infor.activated" checked value="true" />Thường
          xuyên

          <input type="radio" v-model="infor.activated" value="false" />Không
          hoạt động
        </div>
      </div>

      <button v-on:click.prevent="submit">THÊM NGƯỜI DÙNG</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "addUser",
  data() {
    return {
      infor: {
        login: null,
        password: null,
        email: null,
        activated: true,
        chucDanhId: null,
        dmPhongBanId: null,
        dviNghiepVuId: null,
        gioiTinh: true,
        dmTinhHuyenId: null,
        donViId: "123123",
        imageUrl: null,
        phoneNumber: null,
        tenHienThi: null,
        authoryties: [],
        groupUserId: null,
        newPermission: []
      },
      repassword: null
    };
  },
  methods: {
    submit() {
      let arrCQ = this.$store.getters.CQ;
       arrCQ.find(res => {
        if (this.infor.donViId == res.id)
        console.log(res.tinhHuyen.id);
        
          return (this.infor.dmTinhHuyenId = res.tinhHuyen.id);
      });
      let arrNQ = this.$store.getters.NQ;
       arrNQ.find(res => {
        if (this.infor.groupUserId == res.id)
          this.infor.authoryties.push(res.name);
      });

  console.log(this.infor);
  
      this.$store.dispatch("submit", this.infor);
    }
  },
  computed: {
    NQ() {
      return this.$store.getters.NQ;
    },
    PB() {
      return this.$store.getters.PB;
    },
    DV() {
      return this.$store.getters.DV;
    },
    CD() {
      return this.$store.getters.CD;
    },
    CQ() {
      return this.$store.getters.CQ;
    }
  },
  async created() {
    await this.$store.dispatch("getNQ");
    await this.$store.dispatch("getPB");
    await this.$store.dispatch("getDV");

    await this.$store.dispatch("getCQ");
    await this.$store.dispatch("getCD");
  }
};
</script>
<style scoped>


form {
  background-color: #fff;
  width: 80%;
  border: 1px solid #4caf50;
  border-radius: 5px;
  padding: 50px;
  margin: 0 auto;
}
.group {
  float: left;
  width: 70%;
}
input[type="text"],
input[type="number"],
input[type="password"],
input[type="email"],
select {
  width: 70%;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
option {
  padding: 12px 20px;
}

button {
  width: 70%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.left{ 
  float: left;
  width: 20%;
}

button:hover {
  background-color: #45a049;
}
</style>
