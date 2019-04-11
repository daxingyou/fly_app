<template>
  <div class="bet" ref="bet">
    <!-- <transition name="betde"> -->
    <div class="bet_center" :class="showleft===true?'activess':'activessBalk'">
      <yd-popup v-model="showKind" position="center" style="z-index: 9999;" class="selKind">
        <div style="display: flex;background: #FFFFFF;border-radius:3px" v-if="kindList.length>0">
          <ul style="background: #f7f7f7;" class="left">
            <li @click="toPash('/allKinds')">
              <img style="width: 0.5rem;" src="../../../static/img/tag/Coloured_hall_Not_Selected.png">
              <span>游戏大厅</span>
              <img style="width: 0.3rem;">
            </li>
            <li
              v-for="(item,index) in kindList"
              @click="selClassId(item.classId)"
              :class="cache_classId==item.classId?'active':''"
              :key="index"
              v-if="item.kindList.length != 0"
            >
              <img
                style="width: 0.5rem;"
                :src="'static/img/icon/'+item.classId+'.png'"
              >
              <span>{{item.className}}</span>
              <img style="width: 0.3rem;" src="../../../static/img/xiangyou.png">
            </li>
          </ul>
          <ul class="right">
            <li
              v-for="(item,index) in kindList[sel_kind_idx].kindList"
              :key="index"
              @click="selKindId(item.kindId)"
              :class="cache_kindId==item.kindId?'active':''"
            >{{item.kindName}}</li>
          </ul>
        </div>
        <div
          style="display: flex;background: #FFFFFF;border-radius:3px;height:7rem;width: 6.2rem;flex-direction: column;justify-content: center;align-items: center;padding-bottom: .5rem;"
          v-else
        >
          <img src="../../../static/img/wlcw.png"> 网络错误！请稍后刷新重试
        </div>
      </yd-popup>
      <transition name="fade">
        <div class="popover-menu" v-show="rightPopup" ref="rightPopup" v-clickoutside2="closeModal">
          <ul class="rightPopup" style>
            <li class="first_li">
              <img src="../../../static/img/yonghu.png" class="icon">
              <span>{{userDetails.type=='0'?userDetails.account:'游客'}}</span>
            </li>
            <li>
              <img src="../../../static/img/img_pig.png" class="icon">
              <span style="color: #d81d38;">{{userDetails.accountBalance}}</span>
            </li>
            <!-- <li @click="switchKind"><img src="../../../static/img/qiehuan.png" class="icon" /><span>切换彩种</span></li> -->
            <li v-if="userDetails.type=='0'" @click="recharge(1)">
              <img src="../../../static/img/chongzhi.png" class="icon">充值
            </li>
            <li v-if="userDetails.type=='0'" @click="putForward">
              <img src="../../../static/img/tixian.png" class="icon">提现
            </li>
            <li @click="myBet">
              <img src="../../../static/img/img_min_pop.png" class="icon">投注记录
            </li>
            <li @click="award">
              <img src="../../../static/img/img_last_open.png" class="icon">开奖历史
            </li>
            <li @click="home">
              <img src="../../../static/img/guan.png" class="icon">个人中心
            </li>
            <li v-if="userDetails.type=='0'" @click="chartroom">
              <img src="../../../static/img/chart.png" class="icon">聊天室
            </li>
            <li @click="showGameHple">
              <img src="../../../static/img/shuoming.png" class="icon" style="width: 0.5rem;">玩法说明
            </li>
            <li @click="goHelpFeedback">
              <img src="../../../static/img/kefu2.png" class="icon" style="width: 0.5rem;">联系上级
            </li>
          </ul>
        </div>
      </transition>

      <yd-navbar v-stopSlide>
        <!-- <router-link :to=url slot="left"  @click="switchKind">
				<yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>-->
        <div slot="left" @click="switchKind">
          <!-- <yd-navbar-back-icon></yd-navbar-back-icon> -->
          <!-- <span class="left_span">{{gameConfig[kindId].gameName}}</span> -->
          <span class="left_span">{{lottery_Name}}</span>
          <div class="img_you">
            <img style="width: 0.4rem;" src="../../../static/img/personal/recharge/you.png">
          </div>
        </div>
        <div
          v-if="selectModel==1"
          slot="center"
          v-stopPropagation
          style="display: flex;font-size: 12px;"
          v-stopSlide
        >
          <span style="width:0.285rem;display: inline-block;">玩法</span>
          <div class="select_game" style="color: #FFFFFF;" @click="selectSubGame" ref="menu">
            <span v-if="subGameId=='401001'||subGameId=='401101'">{{gameName}}</span>
            <span
              v-else-if="specialGameId.indexOf(gameId)==-1"
            >{{leftName==rightName?leftName:leftName+' '+rightName}}</span>
            <span v-else>{{gameName==leftName?gameName:gameName+' '+leftName}}</span>
            <img src="../../../static/img/xiala.png" :class="show?'top':'bottom'">
          </div>
        </div>
        <div v-else slot="center" v-stopPropagation style="display: flex;font-size: 12px;" v-stopSlide>
				<span style="width:0.285rem;display: inline-block;">玩法</span>
				<div class="select_game" style="color: #FFFFFF;" @click="selectSubGame" ref="menu">
					<span>{{gameName}}</span>
					<img src="../../../static/img/xiala.png" :class="show?'top':'bottom'" />
				</div>
        </div>
        
        <!-- <div slot="center" v-if="isWindow == true">
          <div @click="requestFullScreen" v-if="quanping == true" class="quanping">
            <img src="../../../static/img/quanping.png" alt>
          </div>
          <div @click="exitFullscreen" v-if="quanping == false" class="quanping">
            <img src="../../../static/img/xiaoping.png" alt>
          </div>
        </div> -->

        <div slot="right" @click="showRightPopup" ref="showRightPopup">小助手</div>
      </yd-navbar>
      <Menu
        :show="show"
        v-stopPropagation
        @changeSubGame="changeSubGame"
        @close="closeMenu"
        :standGameList="standGameList"
        @initStyle="initStyle"
        :standGameList2="standGameList2"
        v-if="standGameList2.length!==0"
      ></Menu>

      <!--<keep-alive>
		<ClockView v-stopSlide></ClockView>
      </keep-alive>-->
      <BetPanel
        :kindId="kindId"
        :classId="classId"
        :betDataList="betDataList"
        @resultData="getBetData"
        :subGameList="subGameList"
        :standGameList2="standGameList2"
      ></BetPanel>

      <BetFooter
        :class="showleft===true?'activess':'activessBalk'"
        v-stopSlide
        :kindId="kindId"
        :ticketCount="ticketCount"
        :newNumbers="newNumbers"
        @initStyle="initStyle"
        :classId="classId"
        :subGameList="subGameList"
      ></BetFooter>
    </div>
    <!-- </transition > -->
    <!-- <div class="aside" :class="showleft===false?'displayNone':'displayBlack'">
				<Aside ></Aside>
		</div>



    <div class="asideRight" v-if="showleft===true" @click="showleft = !showleft"></div>-->
    <Help @closeHelp="showLmHelp=false" v-if="showLmHelp"></Help>
  </div>
</template>

<script>
import clickoutside2 from "../../directives/clickoutside2";
import { mapState, mapActions, mapMutations } from "vuex";
import { renderingData } from "./bet.js";
import { bus } from "./bus.js";
import BetPanel from "./child/betPanel";
import ClockView from "./child/clockView";
import BetFooter from "./child/betFooter.vue";
import Menu from "./child/menu.vue";
import Aside from "./child/aside.vue";
import { menu_list } from "../../../static/js/lmp_menulist.js";
import { createNmubers_lmp } from "../../../static/js/createNmubers_lmp.js";
import gameConfig from "./gameConfig.js";
import routerID from "./routerId.js";
import Help from "./child/help.vue";
export default {
  directives: {
    clickoutside2
  },
  data() {
    return {
      btn_style: "bet_selected",
      show: false,
      select_game_css: {},
      specialGameId: [
        "4001",
        "3014",
        "6005",
        "2003",
        "2005",
        "2006",
        "2008",
        "2007"
      ],
      rightPopup: false,
      init_css: {
        opacity: "0"
      },
      menu_list: menu_list,
      showKind: false,
      sel_kind_idx: 0,
      cache_classId: "",
      cache_kindId: "",
      url: "/allKinds",
      el: "",
      newNumbers: [],
      ticketCount: 0,
      classId: "",
      kindId: "",
      betDataList: {},
      standGameList: [],
      standGameList2: [],
      subGameList: [],
      showId: "",
      quanping: true,
      isWindow: true,
      showleft: false,
      gameConfig: gameConfig,
      routerID:routerID,
      kindIdList: [],
      lottery_Name: "",
      showLmHelp:false,
    };
  },
  created() {
    // console.log(this.routerID);
    // console.log(this.$route.params.kindId)
    this.kindId = this.routerID[this.$route.params.kindId];
    // console.log(this.kindId)
    if (this.kindList.length != 0) {
      this.lottery_Name = this.lotteryNames[this.kindId];
    } else {
      this.kind().then(() => {
        this.lottery_Name =this.lotteryNames[this.kindId];
      });
    }
    this.classId = this.$route.params.classId;
    this.cache_classId = this.classId;
    this.cache_kindId = this.kindId;
    this.setClassId(this.cache_classId);
    this.setKindId(this.cache_kindId);
    this.init();
    this.url = sessionStorage.getItem("prevPath");
    this.is_window();
    setTimeout(() => {
      this.kindList.forEach(item => {
        item.kindList.forEach(iv => {
          this.kindIdList.push(iv.kindId);
        });
      });
      // if(this.kindIdList.indexOf(this.kindId) == -1){
      // this.openConfrim()
      // }
      // console.log(this.kindList)
    }, 1000);
  },
  mounted() {
    this.$nextTick(()=>{
      this.stopTouchendPropagationAfterScroll(this.$refs.bet)
    })
  },
  destroyed() {
			//清除开奖数据缓存
    sessionStorage.setItem("gameInfo",null)
		},
  computed: {
    ...mapState("bet", [
      "subGameId",
      "gameName",
      "rightName",
      "leftName",
      "gameId",
      "standGameLists",
      "selectModel",
      
    ]),
    ...mapState("home", ["kindList", "lotteryNames", "lotteryId","lotteryRouetrId","lotteryList"]),
    ...mapState("login", ["userDetails"])
  },
  methods: {
    ...mapActions("chart",["chartLogin"]),
    ...mapActions("home", ["kind"]),
    ...mapActions("bet", ["getGamePlayList", "getSubGames","getWinsDragon"]),
    ...mapMutations("bet", [
      "setClassId",
      "setKindId",
      "saveDataOrSubGameList",
      "saveStandGameList",
      "saveSubGameList",
      "setModelType",
      "cacheHistoryData",
      "saveLmpData"
    ]),
    stopTouchendPropagationAfterScroll(el) {
				var locked = false;
				el.addEventListener('touchmove', function(ev) {
					locked || (locked = true, el.addEventListener('touchend', stopTouchendPropagation, true));
				}, true);

				function stopTouchendPropagation(ev) {
					ev.stopPropagation();
					el.removeEventListener('touchend', stopTouchendPropagation, true);
					locked = false;
				}
			},
    changeSubGame(obj) {
      this.initStyle();
      var str = obj.leftName + "-" + obj.rightName + "-" + obj.subGameId;
      renderingData(str, obj.gamePlayList).then(res1 => {
        this.betDataList = res1.data;
        var data = {
          leftName: obj.leftName,
          rightName: obj.rightName,
          subGameId: obj.subGameId,
          gameName: obj.gameName,
          gameId: obj.gameId,
          gamePlayList: [obj.gamePlayList]
        };
        this.setDataOrSubGameList(res1, data);
        this.getSubGames({
          gameIds: res1.subGameIds
        }).then(res2 => {
          this.subGameList = res2.data;
          this.saveSubGameList(this.subGameList);
        });
      });
    },
    goHelpFeedback() {
      this.$router.push("/helpFeedback");
    },
    showGameHple() {
      this.rightPopup = false;
      if(this.selectModel==='1'){
      	bus.$emit("showHelp", true);
      }else{
      	this.showLmHelp = true;
      }
      
    },
    init() {
      if (this.selectModel == "1") {
        if (JSON.parse(sessionStorage.getItem(this.kindId))) {
          this.standGameList2 = JSON.parse(sessionStorage.getItem(this.kindId));
          this.standGameList = this.dataStructure(
            JSON.parse(sessionStorage.getItem(this.kindId))
          );
          var gameName = this.standGameList[0].gameName;
          var gameId = this.standGameList[0].gameId;
          var leftName = this.standGameList2[0].gameSons[0].leftName;
          var rightName = this.standGameList2[0].gameSons[0].rightName;
          var subGameId = this.standGameList2[0].gameSons[0].subGameId;
          var gamePlayList = this.standGameList2[0];
          var str = leftName + "-" + rightName + "-" + subGameId;
          renderingData(str, gamePlayList).then(res => {
            this.betDataList = res.data;
            var data = {
              leftName: leftName,
              rightName: rightName,
              subGameId: subGameId,
              gameName: gameName,
              gameId: gameId,
              gamePlayList: [gamePlayList]
            };
            this.getSubGames({
              gameIds: res.subGameIds
            }).then(res2 => {
              this.subGameList = res2.data;
              this.saveSubGameList(this.subGameList);
            });
            this.setDataOrSubGameList(res, data);
          });
        } else {
          this.getGamePlayList(`/${this.classId}/${this.kindId}`).then(res => {
            this.standGameList2 = res.data.standGameList;
            this.standGameList = this.dataStructure(res.data.standGameList);
            var gameName = this.standGameList[0].gameName;
            var gameId = this.standGameList[0].gameId;
            var leftName = this.standGameList2[0].gameSons[0].leftName;
            var rightName = this.standGameList2[0].gameSons[0].rightName;
            var subGameId = this.standGameList2[0].gameSons[0].subGameId;
            var gamePlayList = this.standGameList2[0];
            var str = leftName + "-" + rightName + "-" + subGameId;
            renderingData(str, gamePlayList, gameId).then(res => {
            	this.betDataList = res.data;
              var data = {
                leftName: leftName,
                rightName: rightName,
                subGameId: subGameId,
                gameName: gameName,
                gameId: gameId,
                gamePlayList: [gamePlayList]
              };
              this.getSubGames({
                gameIds: res.subGameIds
              }).then(res2 => {
                this.subGameList = res2.data;
                this.saveSubGameList(this.subGameList);
              });
              this.setDataOrSubGameList(res, data);
            });
            this.saveStandGameList({
              standGameList: res.data.standGameList,
              kindId: this.kindId
            });
          });
        }
      } else {
        if (JSON.parse(sessionStorage.getItem(this.kindId))) {
          this.standGameList2 = JSON.parse(sessionStorage.getItem(this.kindId));
          this.standGameList = this.dataStructure(
            JSON.parse(sessionStorage.getItem(this.kindId))
          );
          this.showId = this.menu_list[this.classId][0].showId;
          var gameName = this.menu_list[this.classId][0].title;
          var gameId = this.standGameList[0].gameId;
          var leftName = "";
          var rightName = "";
          var subGameId = this.standGameList2[0].gameSons[0].subGameId;
          var betDataList = createNmubers_lmp(this.classId, this.showId);
          var data = {
            leftName: leftName,
            rightName: rightName,
            subGameId: subGameId,
            gameName: gameName,
            gameId: gameId,
            betDataList: betDataList
          };
          this.saveLmpData(data);
        } else {
          this.getGamePlayList(`/${this.classId}/${this.kindId}`).then(res => {
            this.standGameList2 = res.data.standGameList;
            this.standGameList = this.dataStructure(res.data.standGameList);
            this.showId = this.menu_list[this.classId][0].showId;
            var gameName = this.menu_list[this.classId][0].title;
            var gameId = this.standGameList[0].gameId;
            var leftName = "";
            var rightName = "";
            var subGameId = this.standGameList2[0].gameSons[0].subGameId;
            var betDataList = createNmubers_lmp(this.classId, this.showId);
            var data = {
              leftName: leftName,
              rightName: rightName,
              subGameId: subGameId,
              gameName: gameName,
              gameId: gameId,
              betDataList: betDataList
            };
            this.saveLmpData(data);
          });
        }
      }
    },
    closeModal(e) {
      if (e.target !== this.$refs.showRightPopup) {
        this.rightPopup = false;
      }
    },
    getBetData(data) {
      this.newNumbers = data.newNumbers;
      this.ticketCount = data.ticketCount;
    },
   recharge(type) {
      if (this.userDetails.hierarchy == "1") {
        this.$dialog.toast({
          mes: "请返回原网址进行额度转换！",
          timeout: 1500
        });
      } else if (this.userDetails.type == "1") {
        this.$dialog.toast({
          mes: "会员登录畅玩更多！",
          timeout: 1500
        });
      } else {
        this.$router.push({ path: `/recharge/${type}` });
      }
    },
    //样式重置
    initStyle() {
      if (this.selectModel == "2") {
        this.newNumbers = [];
        this.ticketCount = 0;
      } else {
        if (!this.betDataList.inputFormat) {
          if (this.betDataList.numbers) {
            this.betDataList.numbers.forEach(item1 => {
              item1.cols.forEach(item2 => {
                item2.data_selected = false;
              });
            });
          }
        } else {
          bus.$emit("initTxt");
        }
        this.newNumbers = [];
        this.ticketCount = 0;
      }
    },
    //格式化玩法导航
    dataStructure(data) {
      var newData = new Array();
      data.forEach((item1, index) => {
        var obj = {},
          b = [],
          c = {};
        obj.gameName = item1.gameName;
        obj.gameId = item1.gameId;
        item1.gameSons.forEach(obj => {
          var array = c[obj["leftName"]] || [];
          array.push(obj);
          c[obj["leftName"]] = array;
        });
        b.push(c);
        obj.gameSons = b;
        if (this.specialGameId.indexOf(obj.gameId) != -1) {
          for (var key in obj.gameSons[0]) {
            var leftName = "";
            var ary = [];
            obj.gameSons[0][key].forEach((item2, index2) => {
              if (item2.leftName != leftName) {
                ary.push(item2);
                leftName = item2.leftName;
              }
            });
            obj.gameSons[0][key] = ary;
          }
        }
        newData.push(obj);
      });
      return newData;
    },
    setDataOrSubGameList(res, res2) {
      var data = {};
      data.betDataList = res.data;
      data.newNumbers = this.newNumbers;
      data.ticketCount = this.ticketCount;
      data.leftName = res.leftName;
      data.rightName = res.rightName;
      data.subGameId = res.subGameId;
      data.gamePlayList = res2.gamePlayList;
      data.gameId = res2.gameId;
      data.gameName = res2.gameName;
      this.saveDataOrSubGameList(data);
    },
    putForward() {
     	if (this.userDetails.hierarchy == '1') {
					this.$dialog.toast({
						mes: '请返回原网址进行额度转换！',
						timeout: 1500
					})
				}else if (this.userDetails.type == '1') {
					this.$dialog.toast({
						mes: '会员登录畅玩更多！',
						timeout: 1500
					})
				}else {
					this.$router.push({path:'/withdraw'})
				}
    },
    selClassId(classId) {
      this.kindList.forEach((item, index) => {
        if (item.classId == classId) {
          this.cache_classId = classId;
          return (this.sel_kind_idx = index);
        }
      });
    },
    selKindId(kindId) {
      var path;
      this.cache_kindId = kindId;
      this.setClassId(this.cache_classId);
      this.setKindId(kindId);
      this.showKind = false;
      if (this.cache_classId != "2") {
        path = "/bet/";
      } else {
        path = "/hk6bet/";
      }
      Promise.all([
					this.getWinsDragon("/" + this.cache_kindId), //获取开奖历史
					this.getGamePlayList(`/${this.cache_classId}/${this.cache_kindId}`), //获取小彩类玩法
				]).then((values) => {
					if(values[0].code === 0){
						//缓存开奖数据
						sessionStorage.setItem("gameInfo", JSON.stringify(values[0]));
					}
					if(values[1].code === 0){
						//缓存玩法数据
						sessionStorage.setItem(this.cache_kindId, JSON.stringify(values[1].data.standGameList));
					}
					this.$router.push({
                path: path + this.cache_classId + "/" + this.routerID[this.cache_kindId]
              });
					
				})
//    this.$http
//      .get(
//        this.global.baseUrl + "/inter/ticket/winsDragon/" + this.cache_kindId,
//        {
//          timeout: 500
//        }
//      )
//      .then(res => {
//        this.cacheHistoryData(res.data);
//        this.$router.push({
//          path: path + this.cache_classId + "/" +this.routerID[this.cache_kindId]
//        });
//      })
//      .catch(error => {
//        if (error.response) {
//        } else if (error.request) {
//          if (error.request.readyState == 4 && error.request.status == 0) {
//            this.cacheHistoryData(null);
//            this.$router.push({
//              path: path + this.cache_classId + "/" + this.routerID[this.cache_kindId]
//            });
//          }
//        } else {
//          console.log("Error", error.message);
//        }
//      });
      if (JSON.parse(sessionStorage.getItem(kindId))) {
        var obj = {};
        var kindList = JSON.parse(sessionStorage.getItem(kindId));
        kindList.forEach(item => {
          item.gameSons.forEach(item2 => {
            obj[item2.subGameId] = item2.odd;
          });
        });
      }

      sessionStorage.setItem("classId", JSON.stringify(this.cache_classId));
      sessionStorage.setItem("kindId", JSON.stringify(this.cache_kindId));
    },
    select() {
      this.btn_style = "bet_unchecked";
    },
    myBet() {
      this.$router.push({
        name: "noterecord"
      });
    },
    award() {
      this.$router.push({
        path: `/awardII?kid=${this.kindId}&lName=${this.lottery_Name}&cId=${this.classId}`
      });
    },
    home(){
       this.$router.push({
        name: "home"
      });
    },
    chartroom(){
      if(sessionStorage.getItem("chartLogin") !== "1") {
							this.chartLogin({
								account: this.userDetails.account,
								password: sessionStorage.getItem("password"),
								loginFrom: "3"
							}).then(res => {
								if(res.code === 0) {
									sessionStorage.setItem("chartLogin", "1");
									this.$router.push("/chartroom");
									this.getUserDetails();
								} else if(res.code === 111) {
									this.chartLogin({
										account: this.userDetails.account,
										password: sessionStorage.getItem("password"),
										loginFrom: "3"
									}).then(tel => {
										if(tel.code === 0) {
											sessionStorage.setItem("chartLogin", "1");
											this.$router.push("/chartroom");
											// 这里需要注册用户聊天的用户名

											
										} else if(tel.code === 111) {
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
    },
    selectSubGame() {
      this.show = !this.show;
      if (this.show) {
        this.select_game_css = {
          background:
            "url(../../../static/img/shangla.png) no-repeat scroll right center transparent"
        };
      } else {
        this.select_game_css = {
          background:
            "url(../../../static/img/xiala.png) no-repeat scroll right center transparent"
        };
      }
    },
    closeMenu() {
      this.show = false;
      this.select_game_css = {
        background:
          "url(../../../static/img/xiala.png) no-repeat scroll right center transparent"
      };
    },
    showRightPopup() {
      this.init_css = {
        opacity: "1"
      };
      this.rightPopup = true;
    },
    switchKind() {
      this.selClassId(this.classId);
      this.showKind = true;
      this.rightPopup = false;
    },
    //进入全屏
    requestFullScreen() {
      this.quanping = false;
      var de = document.documentElement;
      if (de.requestFullscreen) {
        de.requestFullscreen();
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
      }
    },
    //退出全屏
    exitFullscreen() {
      this.quanping = true;
      var de = document;
      if (de.exitFullscreen) {
        de.exitFullscreen();
      } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
      } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
      }
    },
    // 判断安卓系统还是ios系统
    is_window() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.isWindow = true;
      } else {
        this.isWindow = false;
      }
      // console.log(this.isWindow)
    },
    toPash(name) {
      this.$router.push({
        path: name
      });
    }
    // 判断彩种是否关闭
    //  openConfrim() {
    // 	this.$dialog.confirm({
    //         title: '温馨提示',
    //         mes: '该彩种维护中，请稍后操作！',
    //         opts: [
    //             {
    //                 txt: '确定',
    //                 color: true,
    //                 callback: () => {
    //                     this.$router.go(-1)
    //                 }
    //             }
    //         ]
    //     });
    // },
  },
  components: {
    BetPanel,
    ClockView,
    BetFooter,
    Menu,
    Aside,
    Help
  },
  watch: {
    kindId() {
      this.initStyle();
      this.setModelType('1');
    },
    $route() {
      this.kindId = this.routerID[this.$route.params.kindId];
      this.lottery_Name = this.lotteryNames[this.kindId];
      // console.log(this.lottery_Name)
      this.classId = this.$route.params.classId;
      this.cache_classId = this.classId;
      this.cache_kindId = this.kindId;
      this.setClassId(this.cache_classId);
      this.setKindId(this.cache_kindId);
      this.init();
      this.showleft = false;
    },
    selectModel() {
      this.init();
    },
    subGameId() {
      // console.log(this.subGameId)
      this.initStyle();
    },
  }
};
</script>

<style lang="less">
.bet {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  /*position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;*/
  background: #ffffff;
  .yd-navbar {
    position: relative !important;
    width: 100% !important;
    .yd-navbar-center-box {
      width: 60% !important;
      margin-left: 20% !important;
      height: 45px !important;
      // margin-right: 23% !important;
    }
    .yd-navbar-item:last-child {
      flex: 0 0 20% !important;
    }
    .yd-navbar-item:nth-child(1) {
      width: 20% !important;
      flex: 0 0 29% !important;
      padding: 0 0.1rem !important;
      .left_span {
        float: left;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.25rem;
      }
      .img_you {
        float: left;
        width: 0.4rem;
        height: 1rem;
        box-sizing: border-box;
        padding-top: 0.3rem;
        margin-left: 0.1rem;
      }
    }
  }
  .popover-menu {
    position: absolute;
    z-index: 9998;
    background: #ffffff;
    top: 45px;
    right: 0;
    width: 3rem;
    height: auto;
    box-shadow: 1px 1px 7px 2px #aaa;
    .first_li {
      font-size: 12px;
      padding: 0.2rem 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #acacac;
      .icon {
        margin-right: 0.1rem;
      }
    }
    li {
      font-size: 12px;
      padding: 0.1rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #acacac;
      .icon {
        width: 0.5rem;
        margin-right: 0.1rem;
      }
    }
  }
  .yd-navbar {
    z-index: 1000;
    background: #011935 !important;
    color: #ffffff;
    .yd-back-icon:before,
    .yd-next-icon:before {
      color: #ffffff;
    }
  }
  .select_game {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 1px solid #ccc;
    line-height: 0.5rem;
    padding-right: 0.1rem;
    padding-left: 0.1rem;
    color: #fff;
    img {
      width: 0.4rem;
    }
    .top {
      -moz-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
      filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
    }
    /*background: url(../../../static/img/xiala.png) no-repeat scroll right center transparent;*/
    /*background-size: 0.4rem 0.4rem !important;*/
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
		.fade-leave-to/* .fade-leave-activess below version 2.1.8 */
		 {
    opacity: 0;
  }
  .selKind {
    .yd-popup-center {
      width: 6.2rem !important;
      height: 7rem !important;
      color: #5c5c5c;
      font-size: 14px;
      .yd-popup-content {
        height: 100%;
        .left {
          padding: 0.2rem;
          border-radius: 3px 0 0 3px;
          width: 50%;
          height: 6.2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          li {
            padding: 0.1rem;
            flex: 1;
            display: flex;
            align-items: center;
            border-bottom: 1px dotted #c5cad0;
            justify-content: space-between;
          }
          .active {
            color: #ff5151;
          }
        }
        .right {
          padding: 0.2rem;
          border-radius: 0px 3px 3px 0px;
          width: 50%;
          height: 6.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: auto;
          li {
            width: 2rem;
            height: 0.7rem;
            border-radius: 4px;
            border: 1px solid #e6e6e6;
            line-height: 0.7rem;
            text-align: center;
            margin: 0.1rem;
          }
          .active {
            color: #ff5151;
            border-color: rgba(255, 0, 0, 0.1);
          }
        }
      }
    }
  }
  .quanping {
    width: 0.6rem;
    height: 0.6rem;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .aside {
    position: fixed;
    top: 0;
    width: 35%;
    height: 100%;
  }
  .bet_center {
    width: 100%;
    position: relative;
    height: 100%;
    z-index: 9999;
  }
  .activessBalk,
  .activess {
    transition: 0.2s all;
  }
  .activess {
    margin-left: 35%;
  }
  .activessBalk {
    margin-left: 0%;
    z-index: 10;
  }
  .displayNone {
    transition: 0.5s all;
    // margin-left: -100%;
  }
  .displayBlack {
    // transition: 0.15s all;
    margin-left: 0%;
  }

  .asideRight {
    position: fixed;
    // background-color: #5c5c5c;
    left: 35%;
    top: 0;
    width: 65%;
    height: 100%;
    opacity: 0;
    z-index: 9999;
  }
}
</style>