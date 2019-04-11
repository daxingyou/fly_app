<template>
  <div class="personal-wrap">
    <div style="height: 45px;width: 100%;">
      <yd-navbar title="个人中心">
        <div slot="right" @click="$router.push({path:'/myTasks'})" v-show="false">我的任务</div>
      </yd-navbar>
    </div>

    <div class="content" ref="content">
      <div class="wrap">
        <div class="personal-info">
          <div class="avatar-box">
            <img class="avatar" src="../../../static/img/avatar.jpg">
          </div>
          <div class="base-info">
          	<p class="hello" v-if="!isLogin">未登录！</p>
            <p class="hello" v-else>您好！{{userDetails.type=='1'?"游客":userDetails.account}}</p>
            <p class="balance">
              余额：{{isShow?userDetails.accountBalance:'******'}}
              <img
                @click="isShow=!isShow"
                class="eyes"
                :src="isShow?'static/img/display.png':'static/img/Hide.png'"
              >
            </p>
          </div>
          <div class="base-right" v-if="userDetails.hierarchy != '0' && isLogin == true">
            <yd-button type="danger"  @click.native="toAgent">代理中心</yd-button>
          </div>
        </div>
      </div>
      <div class="fund">
        <div class="recharge" @click="recharge(1)">
          <img src="../../../static/img/top-ups.png">
          <p>充值</p>
        </div>
        <div class="withdraw" @click="withdraw">
          <img src="../../../static/img/Withdrawals.png">
          <p>提现</p>
        </div>
      </div>
      <div class="nav">
        <ul>
          <li class="nav-item">
            <div class="nav-item-a" style="width:100%;height:100%;" @click="toAgentTutorial" >
              <img class="nav-item-a-logo" src="../../../static/img/Personal_link.png" alt="">
              <span style="color:red">代理教程</span>
              <img class="nav-arrow" src="../../../static/img/return.png">
            </div>
          </li>
          <li class="nav-item" v-for="(item, index) in nav" :key="index">
            <div class="nav-item-a" style="width:100%;height:100%;" @click="enterNav(item)">
              <img :src="item.img">
              <span class="nav-text">{{item.text}}</span>
              <span class="badge" v-show="item.type=='1'&&(noticeNum+applyRecord.length)!==0">{{(noticeNum+applyRecord.length)>99?'99+':(noticeNum+applyRecord.length)}}</span>
              <span class="badge" v-if="item.badge&&points.length>0">{{points.length}}</span>
              <span class="badge" v-if="item.msgBadge&&isReadNum.length>0">{{isReadNum.length}}</span>
              <img class="nav-arrow" src="../../../static/img/return.png">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Footer></Footer>
    <com-alert v-show="isLogout">
      <div class="content logout" slot="alert-content">
        <p>是否退出登录？</p>
        <div class="logout-btn">
          <button class="cancle" @click="cancle">取消</button>
          <button class="confirm" @click="confirm_logout">确定</button>
        </div>
      </div>
    </com-alert>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations,mapGetters } from "vuex";
import Footer from "../home/dome/home_foot.vue";
import comAlert from "./dome/alert.vue";
export default {
  data() {
    return {
      balance: "",
      isShow: true,
      nav: [
        {
          img: require("../../../static/img/Personal_information.png"),
          text: "个人信息",
          to: "/memberModify"
        },
        {
          img: require("../../../static/img/redpacket.png"),
          text: "我的红包",
          to: "/myRedEnvelope",
          isMember: true
        },
        {
          img: require("../../../static/img/Personal_report.png"),
          text: "个人报表",
          to: "/personalReport",
          isMember: true
        },
        {
          img: require("../../../static/img/Account_Change_Inquiry.png"),
          text: "存取记录",
          to: "/accountBill"
        },
       
        {
          img: require("../../../static/img/access_record.png"),
          text: "帐变记录",
          to: "/cashflow"
        },
        {
          img: require("../../../static/img/Bank_account.png"),
          text: "银行账号",
          to: "/bankCard"
        },
       
        {
          img: require("../../../static/img/Chat_room.png"),
          text: "聊天室",
          to: "/chartroom",
          type: "1"
        },
        {
          img: require("../../../static/img/My_news.png"),
          text: "我的消息",
          to: "/announcement"
        },
        {
          img: require("../../../static/img/Suggested_feedback.png"),
          text: "建议反馈",
          to: "/helpFeedback"
        }
      ],
      isReadNum: [],
      isLogout: false,
      isFly:false,
    };
  },
  created() {

    this.queryApplyPoint();
    this.noReadNum();
    console.log(this.userDetails)
    this.userDetails.hierarchy=='0'?this.nav.splice(1,1):this.nav;
    
  },
  mounted() {
    
  },
  components: {
    Footer,
    comAlert,
  
  },
  computed: {
    ...mapState("login", ["userDetails"]),
    ...mapState(["isLogin",'queryAccout']),
    ...mapState("home", ["points", "alertList"]),
    ...mapGetters("chart", ["noticeNum"]),
    ...mapState("chart", ["applyRecord"])
  },
  methods: {
    ...mapActions("chart", ["chartLogin"]),
    ...mapActions("home", [
      "queryApplyPoint",
      "queryNoticeAlertList",
      "kind",
      "signOut",
      "memberIfBind"
    ]),
    ...mapActions("login", ["getUserDetails"]),
    ...mapMutations(["setIsLogin"]),
    cancle() {
      this.isLogout = false;
    },
    confirm_logout() {
      this.signOut().then(res => {
        if (res.code == 0) {
          sessionStorage.setItem("chartLogin", "2");
          this.setIsLogin(false);
          this.$dialog.toast({
            mes: "退出成功！",
            timeout: 1500
          });
          this.getUserDetails();
          this.isLogout = false;
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
        }
      });
    },
    logout() {
      this.isLogout = true;
    },
    enterNav(item) {
      //登录聊天室
      var type = item.type;
      if(this.isLogin == false){
        this.$dialog.toast({
                    mes: '未登录！',
                    timeout: 1500
                });
      }else if(this.isLogin == true){
        if (!item.isMember && this.userDetails.type == "1") {
        this.$dialog.toast({
          mes: "请联系上级开通代理账号！",
          timeout: 1500
        });
      } else if (item.isAuth && this.userDetails.hierarchy == "0") {
        this.$dialog.toast({
          mes: "请联系上级开通代理账号！",
          timeout: 1500
        });
      } else {
        this.$router.push(item.to);
      }
      if (type === "1") {
        if (this.userDetails.type == 1) {
          this.$dialog.toast({
            mes: "请联系上级开通代理账号！",
            timeout: 1000
          });
        } else if (this.userDetails.type != 1) {
          if (sessionStorage.getItem("chartLogin") !== "1") {
            console.log(sessionStorage.getItem("password"));
            this.chartLogin({
              account: this.userDetails.account,
              password: sessionStorage.getItem("password"),
              loginFrom: "3",
              businessNo:this.queryAccout
            }).then(res => {
              if (res.code === 0) {
                sessionStorage.setItem("chartLogin", "1");
                this.$router.push("/chartroom");
                this.getUserDetails();
              } else if (res.code === 111) {
                this.chartLogin({
                  account: this.userDetails.account,
                  password: sessionStorage.getItem("password"),
                  loginFrom: "3",
                  businessNo:this.queryAccout
                }).then(tel => {
                  if (tel.code === 0) {
                    sessionStorage.setItem("chartLogin", "1");
                    this.$router.push("/chartroom");
                    // 这里需要注册用户聊天的用户名
                  } else if (tel.code === 111) {
                    this.$dialog.toast({
                      mes: "请重新登录!",
                      timeout: 1000
                      // callback:()=>{
                      //   this.$router.push("/login");
                      // }
                    });
                  }
                });
              }
            });
          } else {
            this.$router.push("/chartroom");
          }
        }
      } else {
        return;
      }
      }
      
    },
    // 未读消息数量
    noReadNum() {
      this.queryNoticeAlertList(
        `?is_read=0&memberid=${this.userDetails.account}`
      ).then(res => {
        this.isReadNum = res.data;
      });
    },
    recharge(type) {
      if(this.isLogin == false){
        this.$dialog.toast({
                    mes: '未登录！',
                    timeout: 1500
                });
      }else if (this.userDetails.hierarchy == "1") {
        this.$dialog.toast({
          mes: "请返回原网址进行额度转换！",
          timeout: 1500
        });
      } else if (this.userDetails.type == "1") {
        this.$dialog.toast({
          mes: "请联系上级开通代理账号！",
          timeout: 1500
        });
      } else {
        this.$router.push({ path: `recharge/${type}` });
      }
    },
    // _memberIfBind(){
    // 	this.memberIfBind().then( res=> {
    // 		console.log(res);
    // 		if(res.code != 0 && this.userDetails.type == 0 ){
    // 			this.$dialog.alert({mes:'请先绑定银行卡进行其他操作！'});
    // 		}
    // 	})
    // }
    withdraw() {
       if(this.isLogin == false){
        this.$dialog.toast({
                    mes: '未登录！',
                    timeout: 1500
                });
      }else if (this.userDetails.hierarchy == "1") {
        this.$dialog.toast({
          mes: "请返回原网址进行额度转换！",
          timeout: 1500
        });
      } else if (this.userDetails.type == "1") {
        this.$dialog.toast({
          mes: "请联系上级开通代理账号！",
          timeout: 1500
        });
      } else {
        this.$router.push({ path: "/withdraw" });
      }
    },
    toAgent(){
      this.$router.push({ path: "/agent" });
    },
    toAgentTutorial(){
      this.$router.push({ path: "/agentTutorial" });
    },
    childByValue(values){
      this.isFly = values;
    }
  }
};
</script>
<style lang="less" scoped>
.home .content {
  text-align: left;
  padding: 0.2rem 0.3rem;
  button {
    display: block;
    margin: 0.2rem auto;
    padding: 0.1rem 0.5rem;
    border: none;
    background-color: #1c86ff;
    color: #fff;
    border-radius: 3px;
  }
  .logout-btn {
    display: flex;
    button {
      width: 45%;
    }
    .cancle {
      background-color: #f8f8f8;
      border: 1px solid #cccccc;
      color: #606060;
    }
  }
}
.personal-wrap /deep/ .yd-navbar-center-box {
  height: 45px !important;
}
.personal-wrap {
  font-size: 14px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .yd-navbar {
    // background: #011935 !important;
    color: #ffffff;
    z-index: 100;
  }
  .content {
    flex: 1;
    width: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 1rem;
  }
  .yd-navbar span {
    color: #ffffff !important;
  }
}

.per-title {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
/*.my-task {
    position: absolute;
    right: 30px;
    font-size: 24px;
    z-index: 100;
  }*/

.wrap {
  width: 100%;
  height: 2.4312rem;
  background: url("../../../static/img/background.png") no-repeat;
  background-size: cover;
  overflow: hidden;
  .personal-info {
    margin-top: 0.4rem;
    margin-left: 0.52rem;
    display: flex;
    align-items: center;
    .avatar-box {
      width: 0.98rem;
      height: 0.98rem;
      border-radius: 0.49rem;
      overflow: hidden;
      border: 1px solid rgb(255, 255, 255);
      .avatar {
        width: 100%;
        height: 100%;
      }
    }
    .base-info {
      margin-left: 0.19rem;
      color: rgb(255, 255, 255);
      .hello {
        font-size: 14px;
      }
      .balance {
        margin-top: 0.25rem;
        font-size: 12px;
        display: flex;
        align-items: center;
        .eyes {
          margin-left: 0.31rem;
        }
      }
    }
    .base-right{
      width: 1.5rem;
      margin-left: 1.2rem;
    }
  }
}

.fund {
  width: 6.9rem;
  height: 1.48rem;
  background-color: #fff;
  margin: 0 auto;
  box-shadow: rgba(51, 51, 51, 0.1) 0 0 0.1rem;
  border-radius: 0.08rem;
  display: flex;
  align-items: center;
  margin-top: -0.6rem;
  .recharge,
  .withdraw {
    width: 50%;
    text-align: center;
  }
  .recharge {
    border-right: 1px solid rgb(204, 204, 204);
  }
}

.nav {
  padding: 0.24rem 0.6rem 0.5rem;
  color: rgb(51, 51, 51);
  .nav-item {
    padding: 0.26rem 0;
    position: relative;
    .nav-item-a {
      display: flex;
      align-items: center;
      .nav-item-a-logo {
        width: 0.26rem;
        height:.3rem;
        margin-right: 0.2rem;
      }
    }
    .nav-text {
      margin-left: 0.2rem;
      color: rgb(51, 51, 51);
    }
    .badge {
      position: absolute;
      right: 0.4rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: #e6442b;
      color: #fff;
      text-align: center;
      line-height: 0.5rem;
    }
    .nav-arrow {
      position: absolute;
      right: 0;
    }
  }
  
}
</style>