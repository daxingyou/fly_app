<template>
  <div id="lotteryReport">
    <yd-navbar title="代理报表">
      <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left" style="color: #FFFFFF;"></yd-navbar-back-icon>
      <!-- <router-link to="/home" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link> -->
       <div slot="right" @click="assisShow()" >
				小助手
			</div>
    </yd-navbar>
    <div class="container">
      <div>
        <p><span>下级账号：</span>
         <input type="text" placeholder="为空时查询自己" v-model="account">
        </p>
        <DateTime></DateTime>
        <button class="search" @click="submit(account)">查询</button>
        <section>
            <p>温馨提示：当前查询账号为{{account_name===''?userDetails.account:account_name}} 上次更新时间：{{global.timeFormate(new Date())}} {{global._time(new Date())}} 代理报表仅能查询当前07:00之前的数据</p>           
        </section>      
      </div>
      <article>
        <section v-for="(item,index) of $store.state.personal.lotteryReport" :key="index">
          <ul>
            <li>
              <p>账号：<span>{{item.member_account}}</span></p>
              <p>总充值：<span>{{item.p_deposit.toFixed(2)}}</span></p>
            </li>
            <li>
              <p>总提现：<span>{{item.p_draw}}</span></p>
              <p>总下注额：<span @click="toPersonal(item.member_account,item.total_pay)" :style="{color:item.total_pay!==0?'rgb(16, 142, 233)':'black'}">{{item.total_pay.toFixed(2)}}</span></p>
            </li>
            <li>
              <p>总投注笔数：<span>{{item.cnt}}</span></p>
              <p>销售返点：<span>{{item.rebate.toFixed(2)}}</span></p>
            </li>
            <li>
              <p>派彩金额：<span>{{item.win_amount.toFixed(2)}}</span></p>
              <p>团队赚水：<span>{{item.quit_amount.toFixed(2)}}</span></p>
            </li>
            <li>
              <p>实际盈亏：<span>{{item.real_amount.toFixed(2)}}</span></p>
              <p>活动：<span @click="toAccountBill(item.member_account,item.p_preferential)" :style="{color:item.p_preferential!==0?'rgb(16, 142, 233)':'black'}">{{item.p_preferential.toFixed(2)}}</span></p>
            </li>
            <!-- <li>
              <p>总转点：<span>{{item.s_amount.toFixed(2)}}</span></p>
            </li> -->
          </ul>
        </section>
      </article> 
    </div>
    <!-- <footer>
      <Pagination align="right"></Pagination>
    </footer> -->
    <div class="Assis_tant" v-show="assis_tant" >
     <Assistant :assis_tant="assis_tant" @close="assis_tant=false"></Assistant> 
    </div>
    
  </div>
</template>
<script>
import DateTime from "../common/dateTime.vue";
import Pagination from "../common/pagination.vue";
import { mapActions, mapState } from "vuex";
import Assistant from '../home/dome/assistant.vue';
export default {
  data() {
    return {
      account: "",
      dataList: [],
      account_name:"",
      assis_tant:false,
      subordinate_account:"",
    }
  },
  created() {
    this.submit(this.userDetails.account);
  },
  methods: {
    ...mapActions('personal',["queryLotteryReport"]),
    submit: _.debounce(function(accounts) {
      console.log(accounts)
      this.queryLotteryReport({
        memberAccount: accounts,
        endTime: this.global.time.timeEnd,
        startTime: this.global.time.timeStart
      }).then(res => {
        if (res.code === 0) {
          this.account_name=this.account;
        }else if(res.code === 1){
           this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
        }
      });
      this.subordinate_account = accounts;
    }, 200),
    //跳转到个人报表
    toPersonal(account, total_pay) {
      if(account == this.userDetails.account){
        if (total_pay !== 0) {
          this.$router.push({ name: "personalReport", query: { account } });
        }
      }else if(account != this.userDetails.account){
        if(account == this.subordinate_account){
          if (total_pay !== 0) {
            this.$router.push({ name: "personalReport", query: { account } });
          }
        }else{
          this.submit(account);
        }
        
      }
      
      return;
    },
    //跳转到帐变记录
    toAccountBill(account, p_preferential) {
      if(account == this.userDetails.account){
        if (p_preferential !== 0) {
          this.global.type='4';
          this.$router.push({ name: "accountBill", query: { account } });
        }
      }else if(account != this.userDetails.account){
        if(account == this.subordinate_account){
          if (p_preferential !== 0) {
            this.global.type='4';
            this.$router.push({ name: "accountBill", query: { account } });
          }
        }else{
          this.submit(account);
        }
      }

      
      return;
    },
     // 小助手
      assisShow(){
        if(this.assis_tant == false){
          this.assis_tant = true;
        }else{
          this.assis_tant = false;
        }
        
        // console.log(this.assis_tant)
      }
  },
  components: {
    DateTime,
    Assistant
  },
  watch: {},
   computed: {
    ...mapState("login", ["userDetails"]),
  }
};
</script>
<style lang="less">
@import url("../../../static/css/common.less");
#lotteryReport {
  .init;
  padding-bottom: 0;
  .container {
    .my-container;
    height: 100%;
    div {
      p {
        margin-bottom: 0.25rem;
        height: 0.7rem;
        display: flex;
        align-items: center;
        input {
          border: 1px solid #eeeeee;
          height: 100%;
          text-indent: 7px;
          border-radius: 4px;
          flex: 1;
        }
      }
      .search {
        .my-button(100%;
            1rem;
            #d91d36);
      }
      section {
        padding: 0.1rem 0.1rem 0;
        p {
          font-size: 12px;
          margin: 0;
          height: auto;
          color: #a0a0a0;
        }
      }
    }
    article {
      .my-article;
       -webkit-overflow-scrolling: touch;
      section {
        margin-bottom: 0.3rem;
        ul {
          li {
            display: flex;
            margin-bottom: 0.05rem;
            p {
              flex-basis: 50%;
            }
          }
        }
      }
    }
  }
  footer {
    .my-footer;
  }
   .Assis_tant{
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    height: calc(100% - 1rem - 0px);
    /* background: #2dabf3; */

  }
}
</style>
