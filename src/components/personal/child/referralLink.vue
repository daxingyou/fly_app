<template>
  <div id="referralLink">
    <yd-navbar title="推广链接">
      <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
       <div slot="right" @click="assisShow()" >
				小助手
			</div>
    </yd-navbar>
   
    <div class="container">
      <section class="url">
        <div class="_left">
          <span>推广链接：</span>
          <input id="promptURl" type="text" :value="url">
        </div>

        <button data-clipboard-target="#promptURl" class="btn">
          复制
        </button>
      </section>
       <section class="url">
         <div class="_left">
          <span>邀请码：</span>
          <input id="promptCode" type="text" readonly :value="zx_code">
        </div>
         <button class="btn" data-clipboard-target="#promptCode">复制</button>
      </section> 
      <section>
        <span>是否有代理功能：</span>
        <yd-radio-group v-model="radio1">
          <yd-radio val="1">是</yd-radio>
          <yd-radio val="0">否</yd-radio>
        </yd-radio-group>
      </section>
      <section>
        <span>设置赔率模式：</span>
        <yd-radio-group v-model="radio2">
          <yd-radio val="A">A</yd-radio>
          <yd-radio val="B">B</yd-radio>
          <yd-radio val="C">C</yd-radio>
          <yd-radio val="D">D</yd-radio>
        </yd-radio-group>
      </section>
      <section>
        <span>已成功推荐人数：{{promoteUrl.successNumber}} 人</span>
      </section>
    </div>
    <footer>
      <Box @click.native="submit" width="3.5rem" height=".8rem" backgroundColor="#d91d36" colorEffect="#a52c3c">
        <span>保存</span>
      </Box>
    </footer>
    	<!-- 小助手 -->
    <div class="Assis_tant" v-show="assis_tant">
     <Assistant :assis_tant="assis_tant" @close="assis_tant=false"></Assistant> 
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Box from "../../common/box.vue";
// 复制到剪切板插件
import Clipboard from "clipboard/dist/clipboard.js";
import Assistant from '../../home/dome/assistant.vue';
var clipboard = new Clipboard(".btn");
export default {
  data() {
    return {
      radio1: "",
      radio2:'A',
      promoteUrl: "",
      url: "",
      rebate: "",
      childRebateList: [],
      zx_code:"",
      assis_tant:false,
    };
  },
  created() {
    this.queryPromoteUrl().then(res => {
      if (res.code === 0) {
        this.promoteUrl = res.data;
        this.url = res.data.promoteUrl;
        if(res.data.invitationCode == null || res.data.invitationCode == undefined){
          this.zx_code = '';
        }else{
          this.zx_code = res.data.invitationCode;
        }
        this.radio1 = res.data.childHierarchy;
        this.radio2=res.data.childModel;
        this.childRebateList = res.data.childRebateList;
      } else if (res.code === 1) {
        this.$dialog.toast({
          mes: res.msg,
          timeout: 1500,
          callback:()=>{
            this.$router.go(-1)
          }
        });
      }
    });
  },
  mounted() {
    this.copy();
  },
  methods: {
    ...mapActions('personal',["queryPromoteUrl", "savePromoteUrl"]),
    submit() {
      this.savePromoteUrl({
        childHierarchy: this.radio1,
        childModel: this.radio2
      }).then(res => {
        if (res.code === 0) {
          this.$dialog.toast({
            mes: "保存成功！",
            timeout: 1500
          });
        } else if (res.code === 1) {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
        }
      });
    },
    copy() {
      clipboard.on("success", e => {
        if (!Clipboard.isSupported()) {
          this.$dialog.toast({ mes: "暂不支持复制", timeout: 1000 });
        }
        this.$dialog.toast({ mes: "复制成功！", timeout: 1000 });
      });
      clipboard.on("error", e => {
        this.$dialog.toast({
          mes: "复制失败",
          timeout: 1000,
          icon: "error"
        });
      });
    },
    	 // 小助手
      assisShow(){
        if(this.assis_tant == false){
          this.assis_tant = true;
        }else if(this.assis_tant == true){
          this.assis_tant = false;
        }
      }
  },
  components: {
    Box,
    Assistant
  },
  computed: {},
  watch: {}
};
</script>
<style lang="less">
@import url("../../../../static/css/common.less");
#referralLink {
  .init;
  .container {
    overflow: auto;
    color: #666;
    .my-container;
    height: 100%;
    section {
      margin-bottom: 0.3rem;
      display: flex;
      align-items: center;
    }
    .url {
      justify-content: space-between;
      ._left {
        display: flex;
        align-items: center;
        flex-basis: 80%;
        input[type="text"] {
          font-size: 12px;
          border: 1px solid #ccc;
          padding: 0.1rem;
          width: 65%;
          height: 0.6rem;
          border-radius: 4px;
        }
      }
    }
    button {
      display: block;
      border-radius: 4px;
      border: 0;
      background: #d91d36;
      width: 1rem;
      height: 0.6rem;
      color: #fff;
      &:active {
        background: #a52c3c;
      }
    }
    ._types {
      li {
        margin-bottom: 0.5rem;
        input[type="number"] {
          border: 1px solid #ccc;
          width: 2rem;
          padding: 0.1rem;
          border-radius: 4px;
        }
        .lotteryType {
          display: inline-block;
          width: 1.4rem;
        }
      }
    }
  }
  footer {
    background: #b7b7b7;
    height: 1rem;
    .my-display(center,center);
    #_Box {
      .my-display(center,center);
      border-radius: 4px;
      span {
        color: #fff;
      }
    }
  }
  #promptCode{
    border: 1px solid #ccc;
          width: 2rem;
          padding: 0.1rem;
          border-radius: 4px;
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
