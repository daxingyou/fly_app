<template>
	<div class="ssc">
		<div class="clockView" v-stopSlide >
			<div class="left" style="position: relative;">
				<div style="position:absolute;width: 100%;height: 100%;z-index: 1000;" @touchend="open" ref="open1"></div>
				<p style="display: flex;align-items: center;text-align: center;justify-content: center;"><img src="../../../../static/img/lingdang.png" style="width: 0.3rem;margin-right:0.1rem;" />第{{prevAwarPeriod2}}期</p>
				<ul>
					<li class="circle" v-for="(item,index) in awardNum" style="overflow: hidden;" :key="index">
						<div class="num">{{item}}</div>
					</li>
				</ul>
				<ul style="color: #FFFFFF;font-size: 12px;height: 0.3rem;line-height: 0.3rem;">
					<li>{{ballSumText}}</li>
					<li>{{ballBS}}</li>
					<li>{{ballOE}}</li>
					<li>{{ballTD}}</li>
				</ul>
			</div>
			<div class="lines" style="height: 100%; width: 1px; background: rgb(255, 255, 255); opacity: 0.6;"></div>
			<div class="right">
				<p style="display: flex;align-items: center;text-align: center;justify-content: center;"><img src="../../../../static/img/naozhong.png" style="width: 0.3rem;margin-right:0.1rem;" />第{{currentAwarPeriod2}}期</p>
				<p style="margin: 0.1rem 0;">截止</p>
				<CountDown class="clock-count" :format="':'" :classId="classId" :kindId="kindId" style="font-size: 14px;color:#e43a45;" @stop="countDown" :historyData="historyData" v-if="historyData"></CountDown>
			</div>
		</div>
		<div style="position: relative;background:#FFFFFF;z-index: 1000;" v-clickoutside3="closeModal">
			<transition name="fade">
				<div :style="listInfo_style" class="listInfo" ref="wrapper3">
					<div class="tab-title">
						<div class="left" style="border-right:1px solid #d7d7d7;">期数</div>
						<div class="right">
							<a href="javascript:;" @touchend="tableType=1" :class="tableType==1?'active':''">号码</a>
							<a href="javascript:;" @touchend="tableType=2" :class="tableType==2?'active':''">大小</a>
							<a href="javascript:;" @touchend="tableType=3" :class="tableType==3?'active':''">单双</a>
							<a href="javascript:;" @touchend="tableType=4" :class="tableType==4?'active':''">总和</a>
						</div>
					</div>
					<div class="tab-content">
						<div class="tab-item" v-for="(item,index) in winList" v-if="item.awardNum!=null">
							<div class="left">{{item.awardPeriod}}</div>
							<div class="right">
								<div class="nums-wrap" v-if="tableType==1">
									<span class="round">{{item.awardNum.split(',')[0]}}</span>
									<span class="round">{{item.awardNum.split(',')[1]}}</span>
									<span class="round">{{item.awardNum.split(',')[2]}}</span>
									<span class="round">{{item.awardNum.split(',')[3]}}</span>
									<span class="round">{{item.awardNum.split(',')[4]}}</span>
								</div>
								<div class="nums-wrap" v-if="tableType==2">
									<span :class="item.awardNum.split(',')[0]>=5?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[0]>=5?'大':'小'}}</span>
									<span :class="item.awardNum.split(',')[1]>=5?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[1]>=5?'大':'小'}}</span>
									<span :class="item.awardNum.split(',')[2]>=5?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[2]>=5?'大':'小'}}</span>
									<span :class="item.awardNum.split(',')[3]>=5?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[3]>=5?'大':'小'}}</span>
									<span :class="item.awardNum.split(',')[4]>=5?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[4]>=5?'大':'小'}}</span>
								</div>
								<div class="nums-wrap" v-if="tableType==3">
									<span :class="item.awardNum.split(',')[0]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[0]%2==0?'双':'单'}}</span>
									<span :class="item.awardNum.split(',')[1]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[1]%2==0?'双':'单'}}</span>
									<span :class="item.awardNum.split(',')[2]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[2]%2==0?'双':'单'}}</span>
									<span :class="item.awardNum.split(',')[3]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[3]%2==0?'双':'单'}}</span>
									<span :class="item.awardNum.split(',')[4]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[4]%2==0?'双':'单'}}</span>
								</div>

								<div class="nums-wrap" v-if="tableType==4">
									<span :class="item2.className" v-for="(item2,index2) in sumOfballList[index]">{{item2.value}}</span>
								</div>
							</div>
						</div>

					</div>

				</div>
			</transition>
			<div class="xiala" style="z-index: 1000;" @touchend="open" ref="open" v-stopSlide>
				<img src="../../../../static/img/xiangxia.png" :class="show1?'top':'bottom'" />
			</div>
		</div>
		<div class="betPanel touchMove" ref="wrapper" v-show="selectModel=='1'" style="overflow: scroll;-webkit-overflow-scrolling:touch;">
			<div class="content">
				<div class="info" v-stopSlide>
					<div style="display: flex;width: 100%;flex-direction: column;height: 100%;">
						<div class="top">
							<ul class="set_model">
								<li @click="selectModelType('1')" :class="selectModel=='1'?'active':''">官</li>
								<li @click="selectModelType('2')" :class="selectModel=='2'?'active':''">传</li>
							</ul>
							<!--<div style="display: flex;align-items: center;">
								<img src="../../../../static/img/img_gold_pig.png" /><span>{{userDetails.accountBalance}}</span>
							</div>-->
							<div v-if="showHotColdOrOmit.indexOf(subGameId)!=-1">
								<yd-radio-group v-model="showType" color="#000000" size="15">
									<yd-radio val="hotCold">冷热</yd-radio>
									<yd-radio val="omit">遗漏</yd-radio>
								</yd-radio-group>
							</div>
						</div>
					</div>
				</div>
				<!--普通玩法-->
				<div>
					<!--单式面板-->
					<div class="bet_list_ds" v-if="templateType.inputFormat[subGameId]">
						<div style="min-height: .4rem;text-align: center;font-size: 12px;color: #ca0500;">{{errPrompt}}</div>
						<textarea @input="judgeFromat" v-model="inputTxt"></textarea>
					</div>
					<!--常规面板-->
					<div class="bet_list_routine" v-else>
						<div class="bet_list_item" v-for="(item1,index1) in betDataList.numbers" :key="index1">
							<div class="top">
								<div v-if="!item1.rowName"></div>
								<yd-badge shape="square" bgcolor="#ca0500" color="#ffffff" v-if="item1.rowName">{{item1.rowName}}
									<div class="inner"></div>
								</yd-badge>
								<ul class="box">
									<li v-for="(item2,index2) in betDataList.quickBtnOption" :key="index2" @touchend="quickBtnSelect({row:index1,value:item2.value})">{{item2.label}}</li>
								</ul>
							</div>
							<div v-for="(item3,index3) in item1.cols" :key="index3">
								<div :class="item3.data_selected?'bet_selected':'bet_unchecked'" @touchend="selected_num({row:index1,col:index3})">{{item3.label}}</div>
								<div v-if="showHotColdOrOmit.indexOf(subGameId)!=-1&&hotCold['1']" style="height: 0.2rem;">
									<div v-if="showType=='hotCold'" style="text-align: center;">{{hotCold[index1+1+''][index3].count}}</div>
									<div v-else style="text-align: center;">{{omit[index1+1+''][index3].count}}</div>
								</div>
								<div v-else style="height: 0.2rem;text-align: center;font-size: 12px;">
									{{rightName=='特殊号码'?gamePlayList[0].gameSons[11].odd.split(',')[index3]:''}}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="betPanel lmp" v-show="selectModel=='2'" style="display: flex;flex-direction: column;">
			<div class="info" v-stopSlide>
				<div style="display: flex;width: 100%;flex-direction: column;height: 100%;">
					<div class="top">
						<!--<div style="display: flex;align-items: center;">
							<img src="../../../../static/img/img_gold_pig.png" /><span>{{userDetails.accountBalance}}</span>
						</div>-->
						<ul class="set_model">
								<li @click="selectModelType('1')" :class="selectModel=='1'?'active':''">官</li>
								<li @click="selectModelType('2')" :class="selectModel=='2'?'active':''">传</li>
							</ul>
					</div>
				</div>
			</div>
			<!--两面盘-->
			<div class="lm">
				<div class="left" style="flex: 1;" v-stopSlide>
					<ul>
						<li :class="showId==item.showId?'item active':'item'" v-for="(item,index) in menu_list[classId]" @touchend="selectSubGames(item.showId,index,item.title)">
							{{item.title}}
							<span class="smallround"></span>
						</li>
					</ul>
				</div>
				<div class="right touchMove" style="flex: 3;overflow: scroll;-webkit-overflow-scrolling: touch;" ref="wrapper2">
					<div class="content" style="padding-bottom: 0.7rem;">
						<div class="lm-selector" v-for="(item1,index1) in betDataList_lmp">
							<div class="title">{{item1.title}}</div>
							<div class="credit-wrap">
								<ul class="credit-con">
									<li :class="[item2.selected?'selected '+item2.className:item2.className,twoGameOddList[item2.key]?'':'disabled']" v-for="(item2,index2) in item1.groups" @touchend="selectBtn(index1,index2,item2.key,item1.title,twoGameOddList[item2.key])" style="touch-action: manipulation; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><span class="play-name">{{item2.name}}</span> <span class="prize">{{twoGameOddList[item2.key]}}</span></li>
								</ul>
							</div>
							<!--<div class="rough_lines"></div>-->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//	import Bscroll from 'better-scroll';
	import CountDown from "./countdown.vue";
	import clickoutside3 from '../../../directives/clickoutside3';
	import { templateType } from './templateType.js';
	import { bus } from "../bus.js";
	import { mapState, mapActions, mapMutations } from "vuex";
	import { calcChooseBetCount, calcInputBetCount } from "../renderPalette.js";
	import { onSelectBtn, quickBtnSelect } from "../bet.js";
	import { renderingData } from "../bet.js";
	import { menu_list } from "../../../../static/js/lmp_menulist.js";
	import gameConfig from '../gameConfig.js';
	import routerID from "../routerId.js";
	export default {
		directives: {
			clickoutside3
		},
		components: {
			CountDown
		},
		props: ["classId", 'kindId', 'betDataList', 'subGameList'],
		data() {
			return {
				showId: '',
				menu_list: menu_list,
				gameConfig: gameConfig,
				showCurrentAwarPeriod: '',
				showPrevAwarPeriod: '',
				currentAwarPeriod2: '',
				prevAwarPeriod2: '',
				active: false,
				bileCodeArr: [],
				show1: false,
				showType: "hotCold",
				isclick: true,
				templateType: templateType,
				inputTxt: '',
				errPrompt: '',
				tableType: 1,
				scroll1: null,
				scroll2: null,
				showHotColdOrOmit: [
					"100101",
					"100301",
					"100201",
					"100202",
					"300101",
					"300201",
					"300205",
					"300301",
					"300305",
					"300401",
					"300405",
					"300501",
					"300505",
					"300601",
					"300701",
					"301001",
					"301101",
					"301201",
					"500401",
					"500201",
					"500206",
					"500101",
					"500106",
					"500111",
					"600401",
					"600202",
					"600301",
				],
				awardNum: ['?', '?', '?', '?', '?'],
				hotCold: {},
				omit: {},
				listInfo_style: {
					width: '100%',
					height: '0',
					transition: 'all .3s',
				},
				winList: [],
				ballSum: '-',
				ballSumText: '-',
				ballBS: "-",
				ballOE: "-",
				ballTD: "-",
				sumOfballList: [],
				routerID: routerID,
				historyData: null
			}
		},
		created() {
			this.kindId = this.routerID[this.$route.params.kindId];
			var res = JSON.parse(sessionStorage.getItem("gameInfo"))
			if(res) {
				this.historyData = res;
				this.hotCold = res.data.hotCold
				this.omit = res.data.omit
				this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
				this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
				this.simplifyAwarPeriod()
				this.updateAwarPeriod({
					currentAwarPeriod: this.currentAwarPeriod2,
					prevAwarPeriod: this.prevAwarPeriod2
				})
				if(res.data.winList[1].awardNum == null) {
					this.awardNum = ['?', '?', '?', '?', '?'];
					this.active = false;
					this.ballSum = '-';
					this.ballSumText = '-';
					this.ballBS = "-";
					this.ballOE = "-";
					this.ballTD = "-";

				} else {
					this.active = true;
					this.awardNum = res.data.winList[1].awardNum.split(",")
					this.sumOfballs()

				}
			} else {
				this.getWinsDragon("/" + this.kindId).then((res) => {
					if(res.code === 0) {
						this.historyData = res
						this.hotCold = res.data.hotCold
						this.omit = res.data.omit
						this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
						this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
						this.simplifyAwarPeriod()
						this.updateAwarPeriod({
							currentAwarPeriod: this.currentAwarPeriod2,
							prevAwarPeriod: this.prevAwarPeriod2
						})
						if(res.data.winList[1].awardNum == null) {
							this.awardNum = ['?', '?', '?', '?', '?'];
							this.active = false;
							this.ballSum = '-';
							this.ballSumText = '-';
							this.ballBS = "-";
							this.ballOE = "-";
							this.ballTD = "-";

						} else {
							this.active = true;
							this.awardNum = res.data.winList[1].awardNum.split(",")
							this.sumOfballs()
						}
					}
				})
			}
			this.showId = this.menu_list[this.classId][0].showId;
			this.recentOpenCode("/" + this.kindId).then((res) => {
				this.getSumOfballList(res.data)
			})
			bus.$on("initTxt", () => {
				this.inputTxt = "";
				this.errPrompt = "";
			})
			bus.$on("showId", (showId) => {
				this.showId = showId
			})
		},
		destroyed() {
			document.removeEventListener('visibilitychange', this.addListener, false)
		},
		mounted() {
			this.getTwoGameOdd("/" + this.kindId)
			document.addEventListener('visibilitychange', this.addListener, false);
			this.cacheHistoryData(null)
		},

		computed: {
			...mapState("bet", ["subGameId", "leftName", "rightName", "gameId", "gamePlayList", "kindList", "selectModel", "betDataList_lmp", "twoGameOddList"]),
			...mapState("login", ["userDetails"]),
			...mapState(["msg"]),
			...mapState("home", ["kindList", "lotteryList", "lotteryName", "lotteryId"]),
		},
		methods: {
			...mapActions('bet', [
				"getSubGames",
				"getWinsDragon",
				"getTwoGameOdd",
				"recentOpenCode"

			]),
			...mapMutations('bet', [
				"setBetDataList",
				"setBetOrder",
				"saveDataOrSubGameList",
				"cacheHistoryData",
				"updateAwarPeriod",
				"setModelType"
			]),
			selectModelType(type){
				this.showId = this.menu_list[this.classId][0].showId;
				bus.$emit("selectModelType",type);
			},
			addListener() {
				if(document.hidden) {} else {
					this.getWinsDragon("/" + this.kindId).then((res) => {
						this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
						this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
						this.simplifyAwarPeriod()
						this.updateAwarPeriod({
							currentAwarPeriod: this.currentAwarPeriod2,
							prevAwarPeriod: this.prevAwarPeriod2
						})
						if(res.data.winList[1].awardNum == null) {
							this.awardNum = ['?', '?', '?', '?', '?'];
							this.active = false;
							this.ballSum = '-';
							this.ballSumText = '-';
							this.ballBS = "-";
							this.ballOE = "-";
							this.ballTD = "-";
						} else {
							this.active = true;
							this.awardNum = res.data.winList[1].awardNum.split(",")
							this.sumOfballs()
						}
					})
					this.recentOpenCode("/" + this.kindId).then((res) => {
						this.getSumOfballList(res.data)
					})
				}

			},
			selectSubGames(showId, index, title) {
				this.showId = showId;
				bus.$emit("changeShowId", {
					showId: showId,
					index: index,
					title: title
				})
			},
			selectBtn(index1, index2, key, title, Boolean) {

				if(!Boolean) {
					return false;
				}
				var data = {};
				this.setBetDataList({
					index1: index1,
					index2: index2
				})
				var result = this.getNewsNumbers(this.betDataList_lmp)
				data.ticketCount = result.ticketCount;
				data.newNumbers = result.newNumbers;
				this.$emit("resultData", data)
			},
			getNewsNumbers() {
				var ticketCount = 0;
				var newNumbers = [];
				this.betDataList_lmp.forEach((item1, index1) => {
					item1.groups.forEach((item2) => {
						if(item2.selected) {
							ticketCount++
							item2.title = item1.title
							newNumbers.push(item2)
						}
					})
				})
				return {
					ticketCount,
					newNumbers
				}
			},
			simplifyAwarPeriod() {
				var lg = String(gameConfig[this.kindId].periodNoAll).length;
				this.showCurrentAwarPeriod = this.currentAwarPeriod2.slice(this.currentAwarPeriod2.length - lg, this.currentAwarPeriod2.length)
				this.showPrevAwarPeriod = this.prevAwarPeriod2.slice(this.prevAwarPeriod2.length - lg, this.prevAwarPeriod2.length)
			},
			countDown() {
				this.active = false;
				this.awardNum = ['?', '?', '?', '?', '?'];
				this.ballSum = '-';
				this.ballSumText = '-';
				this.ballBS = "-";
				this.ballOE = "-";
				this.ballTD = "-";
				this.$dialog.toast({
					mes: '第' + this.currentAwarPeriod2 + '期已停止销售',
					timeout: 1500
				});
				this.prevAwarPeriod2 = this.currentAwarPeriod2;
				this.currentAwarPeriod2 = this.createChasePeriod(this.currentAwarPeriod2, 1, gameConfig[this.kindId].periodNoAll, this.kindId)
				this.simplifyAwarPeriod()

				this.updateAwarPeriod({
					currentAwarPeriod: this.currentAwarPeriod2,
					prevAwarPeriod: this.prevAwarPeriod2
				})
			},
			scrollStart() {
				this.isclick = false
			},
			scrollEnd() {
				this.isclick = true
			},
			open() {
				this.show1 = !this.show1
			},
			selected_num(obj) {
				if(!this.isclick) {
					return
				}
				var data = {};
				onSelectBtn(obj, this.subGameId, this.betDataList, this.bileCodeArr, [])
				var result = calcChooseBetCount(this.betDataList, [])
				data.ticketCount = result.ticketCount;
				data.newNumbers = result.newNumbers;
				this.$emit("resultData", data)
			},
			judgeFromat() {
				var result, data = {};
				result = calcInputBetCount(this.betDataList, this.inputTxt, []);
				this.errPrompt = result.msg;
				data.ticketCount = result.ticketCount;
				data.newNumbers = result.numbers;
				this.$emit("resultData", data)
			},
			quickBtnSelect(obj) {
				if(!this.isclick) {
					return
				}
				var result, data = {};
				result = quickBtnSelect(this.betDataList, obj, []);
				data.ticketCount = result.ticketCount;
				data.newNumbers = result.newNumbers;
				this.$emit("resultData", data)
			},
			sumOfballs() {
				var resultArray = [],
					showNumbers = [],
					animationList = [],
					max = 9,
					min = 0,
					numbers = 5;
				if(this.awardNum) {
					resultArray = this.awardNum;
					this.ballSum = resultArray.reduce((prev, item) => prev += parseInt(item), 0)
					this.ballSumText = this.ballSum + ''
					const firstNumber = parseInt(resultArray[0])
					const lastNumber = parseInt(resultArray[resultArray.length - 1])
					const sumMax = numbers * max,
						sumMin = numbers * min
					const sumMiddle = Math.ceil((sumMax - sumMin) / 2 + sumMin)
					if(firstNumber > lastNumber) {
						this.ballTD = '龙'
					} else if(firstNumber < lastNumber) {
						this.ballTD = '虎'
					} else {
						this.ballTD = '和'
					}

					if(this.ballSum % 2 === 0) {
						this.ballOE = '双'
					} else {
						this.ballOE = '单'
					}

					if(this.ballSum >= sumMiddle) {
						this.ballBS = '大'
					} else {
						this.ballBS = '小'
					}
				}
			},
			createChasePeriod(period, offset, periodNoAll, kindId) {

				var kindIdAry = ['bjpk10', 'azssc', 'xylhc', 'speed', 'azpk10', 'klft']
				if(kindIdAry.indexOf(this.kindId) != -1) {
					return parseInt(period) + offset + '';
				} else {
					if(kindId == "fc3d" || kindId == "pl3" || kindId == 'hk6') {
						var digit = period.length - 4;
						// 当前期号的日期
						var periodTime = period.substr(0, 4);
						// 转化为moment型，方便后面计算
						var momentTime = moment(periodTime, 'YYYY');
						var nowPeriodString = period.substr(4, digit);
						// 当前期号
						var nowPeriod = parseInt(period.substr(4, digit));
						// 目标期号
						var targetPeriod = nowPeriod + offset;
						var targetTime = void 0;
						if(targetPeriod > periodNoAll) {
							targetPeriod -= periodNoAll;
							targetTime = momentTime.add(1, 'y').format('YYYY');
						} else {
							targetTime = periodTime;
						}
						var targetPeriodString = targetPeriod + '';
						return targetTime + targetPeriodString.padStart(digit, '0');
					} else {
						var digit = period.length - 8;
						// 当前期号的日期
						var periodTime = period.substr(0, 8);
						// 转化为moment型，方便后面计算
						var momentTime = moment(periodTime, 'YYYYMMDD');
						var nowPeriodString = period.substr(8, digit);
						// 当前期号
						var nowPeriod = parseInt(period.substr(8, digit));
						// 目标期号
						var targetPeriod = nowPeriod + offset;
						var targetTime = void 0;
						if(targetPeriod > periodNoAll) {
							targetPeriod -= periodNoAll;
							targetTime = momentTime.add(1, 'd').format('YYYYMMDD');
						} else {
							targetTime = periodTime;
						}
						var targetPeriodString = targetPeriod + '';
						return targetTime + targetPeriodString.padStart(digit, '0');
					}
				}

			},
			closeModal(e) {
				if(e.target !== this.$refs.open&&e.target !== this.$refs.open1) {
					this.show1 = false;
				}
			},
			getSumOfballList(winList) {
				this.winList = winList;
				this.sumOfballList = [];
				var max = 9,
					min = 0,
					numbers = 5;
				winList.forEach((item) => {
					var ary = []
					var resultArray, firstNumber, lastNumber, sumMax, sumMin, sumMiddle;
					var ballSum = {};
					var ballTD = {};
					var ballOE = {};
					var ballBS = {};
					if(item.awardNum) {
						resultArray = item.awardNum.split(",");
						ballSum.value = resultArray.reduce((prev, item) => prev += parseInt(item), 0);
						ballSum.className = 'num-round wauto';
						firstNumber = parseInt(resultArray[0]);
						lastNumber = parseInt(resultArray[resultArray.length - 1]);
						sumMax = numbers * max;
						sumMin = numbers * min;
						sumMiddle = Math.ceil((sumMax - sumMin) / 2 + sumMin);
						if(firstNumber > lastNumber) {
							ballTD.value = '龙';
							ballTD.className = 'num-round blue';
						} else if(firstNumber < lastNumber) {
							ballTD.value = '虎'
							ballTD.className = 'num-round orange';
						} else {
							ballTD.value = '和';
							ballTD.className = 'num-round green';
						}

						if(ballSum.value % 2 === 0) {
							ballOE.value = '双';
							ballOE.className = 'num-round orange';
						} else {
							ballOE.value = '单';
							ballOE.className = 'num-round blue';
						}

						if(ballSum.value >= sumMiddle) {
							ballBS.value = '大';
							ballBS.className = 'num-round orange';
						} else {
							ballBS.value = '小';
							ballBS.className = 'num-round blue';
						}
						ary.push(ballSum)
						ary.push(ballBS)
						ary.push(ballOE)
						ary.push(ballTD)
						this.sumOfballList.push(ary)
					} else {
						this.sumOfballList.push(ary)
					}
				})
			}

		},
		watch: {
			selectModel() {
				if(this.selectModel == '1') {
					//					this.scroll2.destroy()
					//					this.$nextTick(() => {
					//						this.scroll1 = new Bscroll(this.$refs.wrapper, {
					//							scrollbars: true,
					//							click: true,
					//							swipeBounceTime: 300,
					//						})
					//						this.scroll1.on('scrollEnd', this.scrollEnd);
					//						this.scroll1.on('scrollStart', this.scrollStart);
					//					})
				} else {
					//					this.scroll1.destroy()
					//					this.$nextTick(() => {
					//						this.scroll2 = new Bscroll(this.$refs.wrapper2, {
					//							scrollbars: true,
					//							click: true,
					//							swipeBounceTime: 300,
					//						})
					//						this.scroll2.on('scrollEnd', this.scrollEnd);
					//						this.scroll2.on('scrollStart', this.scrollStart);
					//					})
				}
			},
			msg(newMsg) {
				var awardNews = JSON.parse(newMsg.data)
				if(awardNews.messageType == "3") {
					if(awardNews.lotteryId == this.kindId) {
						this.getWinsDragon("/" + this.kindId).then((res) => {
							this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
							this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
							this.simplifyAwarPeriod()
							if(res.data.winList[1].awardNum == null) {
								this.awardNum = ['?', '?', '?', '?', '?'];
								this.active = false;
								this.ballSum = '-';
								this.ballSumText = '-';
								this.ballBS = "-";
								this.ballOE = "-";
								this.ballTD = "-";
							} else {
								this.active = true;
								this.awardNum = res.data.winList[1].awardNum.split(",")
								this.sumOfballs()
							}
						})
						this.recentOpenCode("/" + this.kindId).then((res) => {
							this.getSumOfballList(res.data)
						})
					}

				}
			},
			show1() {
				if(this.show1) {
					this.listInfo_style = {
						height: '6rem',
					}
					//					setTimeout(() => {
					//						var scroll = new Bscroll(this.$refs.wrapper3, {
					//							scrollbars: true,
					//						})
					//					}, 200)
				} else {
					this.listInfo_style = {
						height: '0',
					}
				}
			},
			kindId() {
				this.historyData = null;
				this.getTwoGameOdd("/" + this.kindId)
				var res = JSON.parse(sessionStorage.getItem("gameInfo"))
			if(res) {
				this.historyData = res;
				this.hotCold = res.data.hotCold
				this.omit = res.data.omit
				this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
				this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
				this.simplifyAwarPeriod()
				this.updateAwarPeriod({
					currentAwarPeriod: this.currentAwarPeriod2,
					prevAwarPeriod: this.prevAwarPeriod2
				})
				if(res.data.winList[1].awardNum == null) {
					this.awardNum = ['?', '?', '?', '?', '?'];
					this.active = false;
					this.ballSum = '-';
					this.ballSumText = '-';
					this.ballBS = "-";
					this.ballOE = "-";
					this.ballTD = "-";

				} else {
					this.active = true;
					this.awardNum = res.data.winList[1].awardNum.split(",")
					this.sumOfballs()

				}
			} else {
				this.getWinsDragon("/" + this.kindId).then((res) => {
					if(res.code === 0) {
						this.historyData = res
						this.hotCold = res.data.hotCold
						this.omit = res.data.omit
						this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
						this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
						this.simplifyAwarPeriod()
						this.updateAwarPeriod({
							currentAwarPeriod: this.currentAwarPeriod2,
							prevAwarPeriod: this.prevAwarPeriod2
						})
						if(res.data.winList[1].awardNum == null) {
							this.awardNum = ['?', '?', '?', '?', '?'];
							this.active = false;
							this.ballSum = '-';
							this.ballSumText = '-';
							this.ballBS = "-";
							this.ballOE = "-";
							this.ballTD = "-";

						} else {
							this.active = true;
							this.awardNum = res.data.winList[1].awardNum.split(",")
							this.sumOfballs()
						}
					}
				})
			}
				this.recentOpenCode("/" + this.kindId).then((res) => {
					this.getSumOfballList(res.data)
				})
			},
		}

	}
</script>

<style lang="less">
	@font-face {
		font-family: clock-number;
		src: url(../../../../fonts/LED.eot?) format("eot");
		src: url(../../../../fonts/LED.woff) format("woff"), url(../../../../fonts/LED.ttf) format("truetype")
	}
	
	@keyframes numberListActivessc {
		from {
			transform: translateY(1.8rem);
		}
		to {
			transform: translateY(-0.9rem)
		}
	}
	
	.ssc {
		width: 100%;
		.touchMove {
			overflow: scroll;
			-webkit-overflow-scrolling: touch;
		}
		.lm {
			display: flex;
			flex: 1;
			.left {
				box-shadow: 1px 0 0 rgba(255, 255, 255, .48);
				overflow: hidden;
				margin-top: 0;
				padding-top: 1px;
				margin-bottom: -1px;
				height: auto;
				background: #0063b8;
				background: -webkit-linear-gradient(top, rgba(0, 99, 184, 1) 1%, rgba(0, 173, 189, 1) 72%);
				background: -webkit-gradient(linear, left top, left bottom, color-stop(1%, rgba(0, 99, 184, 1)), color-stop(72%, rgba(0, 173, 189, 1)));
				background: -o-linear-gradient(top, rgba(0, 99, 184, 1) 1%, rgba(0, 173, 189, 1) 72%);
				background: linear-gradient(to bottom, rgba(0, 99, 184, 1) 1%, rgba(0, 173, 189, 1) 72%);
				filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0063b8', endColorstr='#00adbd', GradientType=0);
				.item {
					box-shadow: inset 0 1px 0 rgba(255, 255, 255, .2), 0 -1px 0 rgba(0, 0, 0, .23);
					padding: 8px 5px;
					background: rgba(250, 250, 250, .11);
					text-align: center;
					position: relative;
					border: 0;
					display: block;
					font-size: 16px;
					color: #fff;
					text-decoration: none;
					.smallround {
						width: 7px;
						height: 7px;
						border-radius: 50%;
						background-color: rgba(0, 0, 0, .3);
						position: absolute;
						left: 5px;
						top: 50%;
						transform: translate(0, -50%);
					}
				}
				.item.active {
					color: #fff;
					box-shadow: inset -1px 3px 7px rgba(0, 0, 0, .34);
					background-color: rgba(0, 0, 0, .23);
					border: 0;
					.smallround {
						background-color: #eee;
					}
				}
			}
			.right {
				border-top: 1px solid #e6e6e6;
				border-bottom: 1px solid #e6e6e6;
				.title {
					text-align: center;
					padding: .1rem 0;
					font-size: 14px;
					color: #666;
					background: #f8f8f8;
					border-bottom: 1px solid #d8d8d8;
				}
			}
			.lm-selector {
				padding-top: 0;
				box-sizing: border-box;
				.credit-wrap {
					/*padding-bottom: 0.2rem;*/
					border-radius: 0 5px;
					.credit-con {
						display: flex;
						justify-content: space-around;
						flex-wrap: wrap;
						li {
							/*margin: 0.1rem 0.05rem;*/
							display: flex;
							justify-content: center;
							align-items: center;
							overflow: hidden;
						}
						li:after {
							content: " ";
							position: absolute;
							left: 0;
							top: 0;
							z-index: -1;
							width: 200%;
							height: 200%;
							border-right: 2px solid #d8d8d8;
							border-bottom: 2px solid #d8d8d8;
							-webkit-transform-origin: 0 0;
							transform-origin: 0 0;
							-webkit-transform: scale(.5, .5);
							transform: scale(.5, .5);
						}
						.play-name {
							color: #666;
							font-size: 18px;
							font-weight: 900;
							margin-right: 0.1rem;
						}
						.prize {
							color: #FF4D4D;
							font-size: 14px;
							font-weight: 600;
						}
						.ssc_num .play-name {
							width: 0.66rem;
							height: 0.66rem;
							border-radius: 50%;
							font-size: 18px;
							line-height: 0.66rem;
							text-align: center;
							box-shadow: inset 1px -6px 10px #fff;
							background: #ededed;
							border: 1px solid #d7d7d7;
							color: #000!important;
						}
						li.selected {
							.play-name {
								color: #fff;
							}
							.prize {
								color: #b0d2f0 !important;
							}
							background: #4695e6;
							background: linear-gradient(to bottom, rgba(30, 130, 200, .7) 0, rgba(0, 130, 200, .7) 100%);
						}
						li.disabled {
							opacity: .3;
						}
						li.col-num {
							position: relative;
							width: 28%;
							height: 1.2rem;
							margin: 0.1rem 0.1rem;
							background: #f7f7f7;
							border-radius: 5px;
							border: 1px solid #e6e6e6;
							box-sizing: border-box;
						}
						li.col-6 {
							position: relative;
							width: 15%;
							height: 1rem;
							background: #f7f7f7;
							border-radius: 5px;
							border: 1px solid #e6e6e6;
							box-sizing: border-box;
						}
						li.col-3 {
							position: relative;
							width: 33.33%;
							height: 1rem;
							/*background: #f7f7f7;*/
							/*border-radius: 5px;*/
							/*border: 1px solid #e6e6e6;*/
							box-sizing: border-box;
						}
						li.col-4 {
							position: relative;
							width: 23%;
							height: 1rem;
							background: #f7f7f7;
							border-radius: 5px;
							border: 1px solid #e6e6e6;
							box-sizing: border-box;
						}
						li.col-2 {
							position: relative;
							width: 50%;
							height: 1rem;
							/*background: #f7f7f7;*/
							/*border-radius: 5px;*/
							/*box-sizing: border-box;*/
						}
						li.col-1 {
							position: relative;
							width: 100%;
							height: 1rem;
							/*background: #f7f7f7;*/
							/*border-radius: 5px;*/
							/*box-sizing: border-box;*/
						}
					}
				}
			}
		}
		.clockView {
			width: 100%;
			height: 1.8rem;
			display: flex;
			background: linear-gradient(135deg, rgba(19, 46, 123, 1) 0, rgba(0, 201, 202, 1) 100%);
			background-size: 100% 100%;
			.left {
				flex: 5;
				background: none;
				p {
					text-align: center;
					font-size: 12px;
					color: #F0F0F0;
					padding: 0.05rem 0;
				}
				ul {
					display: flex;
					justify-content: space-around;
					.circle {
						display: flex;
						justify-content: center;
						position: relative;
						align-items: center;
						font-size: 24px;
						font-weight: 900;
						color: #FFFFFF;
						background: black;
						border-radius: 100%;
						width: .7rem;
						height: .7rem;
						transform: rotate(0deg);
						margin: 0.1rem .02rem;
						/*background-image: url(../../../../static/img/img_recordball.png);*/
						/*background-image: url(../../../../static/img/ball_light.png);*/
						background-size: 100% 100%;
						/*background: radial-gradient(circle at 50% 100%, #750000, red 100%, #ca0500 100%);*/
						/*border: 0.06rem solid #B8860B;*/
						.num {
							width: 100%;
							height: 100%;
							text-align: center;
							line-height: .7rem;
							/*background: url(../../../../static/img/item0.png) no-repeat ;*/
						}
					}
					.circle_ks {
						display: flex;
						justify-content: center;
						position: relative;
						align-items: center;
						font-size: 24px;
						font-weight: 900;
						color: #FFFFFF;
						width: 1.2rem;
						height: 1.2rem;
						/*background-image: url(../../../../static/img/img_recordball.png);*/
						/*background-image: url(../../../../static/img/ball_light.png);*/
						background-size: 100% 100%;
						/*background: radial-gradient(circle at 50% 100%, #750000, red 100%, #ca0500 100%);*/
						/*border: 0.06rem solid #B8860B;*/
					}
				}
			}
			.right {
				flex: 3;
				font-size: 14px;
				color: #F0F0F0;
				padding-top: 0.05rem;
				p {
					text-align: center;
					font-size: 12px;
					color: #F0F0F0;
				}
				.clock-count {
					width: 100%;
					color: #FFFFFF !important;
					display: inline-block;
					white-space: nowrap !important;
					font-size: 26px !important;
					line-height: 35px !important;
					border-radius: 4px !important;
					text-align: center !important;
					font-family: clock-number, "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
				}
				/*	display: flex;*/
			}
			.open-num {
				border-radius: 2px;
				width: 0.44rem;
				height: 0.32rem;
				color: #FFFFFF;
				margin: 0.03rem;
				line-height: 0.32rem;
				text-align: center;
				font-size: 12px;
			}
			.open-num.yellow {
				background: #e5b800;
			}
			.open-num.darkGrey {
				background: #cfc9c9;
			}
			.open-num.deepBlue {
				background: #0278d7;
			}
			.open-num.gray {
				background: #474c50;
			}
			.open-num.green {
				background: #288c06;
			}
			.open-num.red {
				background: #ea075f;
			}
			.open-num.deepRed {
				background: #7e0209;
			}
			.open-num.orange {
				background: #f17403;
			}
			.open-num.lightGray {
				background: #003e92;
			}
			.open-num.blue {
				background: #25b5cb;
			}
		}
		/*.active_ul {
			transform: translateY(1.8rem);
			animation: numberListActivessc .25s infinite linear;
		}*/
		.xiala {
			position: absolute;
			background: #FFFFFF;
			bottom: -0.38rem;
			width: 1.2rem;
			height: 0.4rem;
			z-index: 1;
			margin-top: 2.8rem;
			border: 1px solid #C5CAD0;
			border-top: none;
			border-radius: 0 0 4px 4px;
			position: absolute;
			left: 50%;
			margin-left: -0.6rem;
			img {
				margin-left: 0.4rem;
				width: 0.4rem;
				height: 0.4rem;
			}
			img.top {
				-moz-transform: rotate(180deg);
				-webkit-transform: rotate(180deg);
				transform: rotate(180deg);
				filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
			}
		}
		.listInfo {
			width: 100%;
			z-index: 100;
			background: #FFFFFF;
			transition: all .3s;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			border-bottom: 1px solid #CCCCCC;
			.tab-title {
				background: #ededed;
				padding: 0;
				height: 0.6rem;
				display: flex;
				font-size: 14px;
				.left {
					flex: 2;
					line-height: 0.6rem;
					text-align: center;
				}
				.right {
					flex: 5;
					line-height: 0.6rem;
					text-align: center;
					a {
						padding: .05rem .2rem;
						margin: 0 .05rem;
						background: #2061b3;
						color: #fff;
						text-decoration: none;
						border-radius: 2px;
					}
					a.active {
						background: #fff;
						color: #111;
					}
				}
			}
			.tab-content {
				flex: 1;
				overflow: scroll;
				-webkit-overflow-scrolling: touch;
				.tab-item {
					display: flex;
					height: 0.6rem;
					border-bottom: 1px solid #d7d7d7;
					.left {
						flex: 2;
						font-size: 14px;
						line-height: 0.6rem;
						color: #1378bd;
						text-align: center;
					}
					.right {
						flex: 5;
						.nums-wrap {
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							.round {
								display: inline-block;
								box-shadow: inset 1px -6px 10px #fff;
								background: #ededed;
								width: 0.5rem;
								height: 0.5rem;
								border-radius: 50%;
								color: #000;
								line-height: 0.5rem;
								text-align: center;
								font-size: 14px;
								border: 1px solid #d7d7d7;
								margin: 0 0.1rem;
							}
							.num-round {
								display: inline-block;
								width: 0.5rem;
								height: 0.5rem;
								border-radius: 50%;
								color: #fff;
								line-height: 0.5rem;
								text-align: center;
								font-size: 14px;
								border: 1px solid #d7d7d7;
								margin: 0 0.1rem;
							}
							.num-round.blue {
								background-color: #1a68de;
							}
							.num-round.orange {
								background-color: orange;
							}
							.num-round.green {
								background-color: green;
							}
							.num-round.wauto {
								margin-right: 10px;
								color: red;
								background: 0;
								border: none;
							}
						}
					}
				}
			}
		}
		/*过度动画*/
		.fade-enter-active,
		.fade-leave-active {
			transition: all .3s;
		}
		.fade-enter-active {
			background: #D91D36;
			width: 100%;
			height: 3rem;
		}
		.fade-leave-active {
			background: #D91D36;
			width: 100%;
			height: 0;
		}
		.fade-enter {
			background: #D91D36;
			width: 100%;
			height: 0;
		}
		.rough_lines {
			width: 100%;
			height: 10px;
			background-color: #ebebeb;
			-webkit-box-shadow: 0 1px 1px #bbb inset;
			box-shadow: 0 1px 1px #bbb inset;
		}
	}
</style>