<template>
  <div id="personalMaterial">
    <div class="container">
      <div class="personal">
        <div v-if="!UserByAccount.accountProperties||UserByAccount.accountProperties==='1'"  :class="'sprite-icon-'+iconClass"></div>
         <img  v-else  src="../../../../../static/img/chartroom/customService.png" alt="">
        <p>{{UserByAccount.memberAccount}}</p>
      </div>
      <yd-cell-item>
        <!-- <yd-icon name="ucenter-outline" slot="icon" size=".42rem"></yd-icon> -->
        <i  slot="icon" class="fa fa-user-circle" style="font-size:.42rem;color:#525252;"></i>  
        <span slot="right">{{UserByAccount.nickName}}
          <button class="revise" @click="show=true">修改</button>
        </span>
      </yd-cell-item>
      <yd-cell-item>
        <!-- <yd-icon name="footmark" slot="icon" size=".42rem"></yd-icon> -->
        <i slot="icon" class="fa fa-street-view" style="font-size:.42rem;color:#525252;"></i>  
        <span slot="right">在线</span>
      </yd-cell-item>
    </div>
    <yd-popup v-model="show" position="center" width="80%">
      <div class="main">
        <p class="setRemark">昵称</p>
        <yd-input required v-model="nickName" max="20" placeholder="请输入昵称"></yd-input>
        <Box @click.native="reviseNickname(iconClass,nickName)" height="1rem" backgroundColor="#d91d36" colorEffect="#a52c3c" style="color:#fff">提交</Box>
      </div>
    </yd-popup>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import Box from "../../../common/box.vue";
export default {
  data() {
    return {
      show: false,
      icon: "",
      nickName: "",
      iconClass: "1"
    };
  },
  created() {
    this.iconClass = this.userDetails.avatar;
    console.log(this.iconClass)
    this.queryUserByAccount(`/${this.userDetails.account}`).then(res => {
      this.nickName=res.nickName;
      if(this.iconClass!==res.icon){
        this.reviseNickname(this.iconClass,this.nickName);
      }
      
    });
  },
  methods: {
    ...mapActions("chart", ["queryUserByAccount", "updateUser"]),
    //修改昵称
    reviseNickname(icon,nickName) {
      this.updateUser({
        icon: icon,
        nickName: nickName
      }).then(res => {
        if (res.code === 0) {
          this.show = false;
          this.queryUserByAccount(`/${this.userDetails.account}`);
        }
      });
    }
  },
  components: {
    Box
  },
  computed: {
    ...mapState("chart", ["UserByAccount"]),
    ...mapState("login", ["userDetails"])
  },
  watch: {
    userDetails() {
      if (this.userDetails.avatar) {
        this.iconClass = this.userDetails.avatar;
      }
    }
  }
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");

#personalMaterial {
  .init;
  display: flex;
  padding-bottom: 0;
  flex-direction: column;
  .container {
    .my-container;
    flex: 1;
    .personal {
      text-align: center;
      .personal_img;
      img{
         width: 1.5rem;
        height: 1.5rem;
      }
      div {
        width: 1.5rem;
        height: 1.5rem;
        background-size: cover;
        background-repeat: no-repeat;
        margin: auto;
        background-image: url(../../../../../static/img/sprite.png);
        border-radius: 50%;
      }
      p {
        font-weight: 600;
        font-size: 20px;
        margin-top: 0.2rem;
      }
    }
    .yd-cell-right {
      justify-content: flex-start;
      text-align: left;
    }
    .revise {
      border: 1px solid gray;
      margin-left: 0.3rem;
      padding: 0.1rem 0.2rem;
      border-radius: 4px;
    }
  }
  .main {
    background-color: #fff;
    padding: 0.2rem 0.3rem;
    .setRemark {
      margin-bottom: 0.3rem;
    }
    #_Box {
      .my-display(center,center);
      margin-top: 0.3rem;
    }
  }
}
</style>


