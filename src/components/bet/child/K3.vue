<template>
	<div class="ks">
		<div class="clockView">
			<div class="left" style="position: relative;">
				<div style="position:absolute;width: 100%;height: 100%;z-index: 1000;" @touchend="open" ref="open1"></div>
				<p style="display: flex;align-items: center;text-align: center;justify-content: center;"><img src="../../../../static/img/lingdang.png" style="width: 0.3rem;margin-right:0.1rem;" />第{{showPrevAwarPeriod}}期</p>
				<ul style="padding: 0 .5rem;" v-if="active">
					<li :class="'circle_ks fast' + item" v-for="(item,index) in awardNum" :key="item+index">

					</li>
				</ul>
				<ul style="padding: 0 .5rem;" v-else>
					<li class="circle_ks dice_gif" v-for="(item,index) in awardNum" :key="item+index">

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
				<p style="display: flex;align-items: center;text-align: center;justify-content: center;"><img src="../../../../static/img/naozhong.png" style="width: 0.3rem;margin-right:0.1rem;" />第{{showCurrentAwarPeriod}}期</p>
				<p style="margin: 0.1rem 0;">截止</p>
				<CountDown  class="clock-count"  :classId="classId" :kindId="kindId" :format="':'" :historyData="historyData" v-if="historyData" style="font-size: 14px;color:#e43a45;" @stop="countDown"></CountDown>
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
									<span :class="'round sz'+ item.awardNum.split(',')[0]"></span>
									<span :class="'round sz'+ item.awardNum.split(',')[1]"></span>
									<span :class="'round sz'+ item.awardNum.split(',')[2]"></span>
								</div>
								<div class="nums-wrap" v-if="tableType==2">
									<span :class="item.awardNum.split(',')[0]>=4?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[0]>=5?'大':'小'}}</span>
									<span :class="item.awardNum.split(',')[1]>=4?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[1]>=5?'大':'小'}}</span>
									<span :class="item.awardNum.split(',')[2]>=4?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[2]>=5?'大':'小'}}</span>
								</div>
								<div class="nums-wrap" v-if="tableType==3">
									<span :class="item.awardNum.split(',')[0]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[0]%2==0?'双':'单'}}</span>
									<span :class="item.awardNum.split(',')[1]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[1]%2==0?'双':'单'}}</span>
									<span :class="item.awardNum.split(',')[2]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[2]%2==0?'双':'单'}}</span>
								</div>

								<div class="nums-wrap" v-if="tableType==4">
									<span :class="item2.className" v-for="(item2,index2) in sumOfballList[index]">{{item2.value}}</span>
								</div>
							</div>
						</div>

					</div>
				</div>
			</transition>
			<div class="xiala" style="z-index: 1000;" @touchend="open" ref="open">
				<img src="../../../../static/img/xiangxia.png" :class="show1?'top':'bottom'" />
			</div>
		</div>
		<div class="betPanel" ref="wrapper" style="overflow: scroll;-webkit-overflow-scrolling: touch;">
			<div class="content">
				<!--<div class="info">
					<div style="display: flex;width: 100%;flex-direction: column;height: 100%;">
						<div class="top">
							<div style="display: flex;align-items: center;">
								<img src="../../../../static/img/img_gold_pig.png" /><span>{{userDetails.accountBalance}}</span>
							</div>
							<div v-if="showHotColdOrOmit.indexOf(subGameId)!=-1">
								<yd-radio-group v-model="showType" color="#000000" size="15">
									<yd-radio val="hotCold">冷热</yd-radio>
									<yd-radio val="omit">遗漏</yd-radio>
								</yd-radio-group>
							</div>
						</div>
					</div>
				</div>-->
				<!--快三和值面板-->
				<div class="bet_list_ksSum" v-if="templateType.ksSumVal[subGameId]">
					<div class="top">
						<yd-badge shape="square" bgcolor="#ca0500" color="#ffffff">和值
							<div class="inner"></div>
						</yd-badge>
					</div>
					<div class="bet_box" v-if="betDataList.numbers">
						<div v-for="(item,index) in betDataList.numbers[0].cols" :key="index" style="display: flex;flex-direction: column;" v-if="index>=16">
							<div :class="item.data_selected?'bet_ks_selected':'bet_ks_unchecked'" @touchend="selected_num({row:0,col:index})">
								<p style="">{{item.label}}</p>
								<p style="" v-if="gamePlayList.length!=0">{{gamePlayList[0].gameSons[index].odd}}</p>
							</div>
							<!--<div class="odds" style="text-align: center;">11.3</div>-->
						</div>
						<div v-for="(item,index) in betDataList.numbers[0].cols" :key="index" style="display: flex;flex-direction: column;" v-if="index<16">
							<div :class="item.data_selected?'bet_ks_selected':'bet_ks_unchecked'" @touchend="selected_num({row:0,col:index})">
								<p style="">{{item.label}}</p>
								<p style="" v-if="gamePlayList.length!=0">{{gamePlayList[0].gameSons[index].odd}}</p>
							</div>
							<!--<div class="odds" style="text-align: center;">11.3</div>-->
						</div>
					</div>
					<div class="fast_select">
						<p>快速选号</p>
						<ul class="quick_box">
							<li @touchend="quickBtnSelect({row:0,value:'small'})">小（3-10）</li>
							<li @touchend="quickBtnSelect({row:0,value:'odd'})">单（所有奇数）</li>
							<li @touchend="quickBtnSelect({row:0,value:'even'})">双（所有偶数）</li>
							<li @touchend="quickBtnSelect({row:0,value:'big'})">大（11-18）</li>
						</ul>
					</div>
				</div>
				<!--快三其他面板-->
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
							<div v-if="['400201','400501'].indexOf(subGameId)!=-1" :class="item3.data_selected?'bet_selected_square':'bet_unchecked_square'" @touchend="selected_num({row:index1,col:index3})">
								{{item3.label}}
							</div>
							<div v-else :class="item3.data_selected?'bet_selected_square':'bet_unchecked_square'" @touchend="selected_num({row:index1,col:index3})">
								<div class="btn_box_1" v-if="item3.label.length==1">
									<img :src="'static/img/fast'+item3.label+'.png'" />
									<div style="height: 0.4rem;line-height: .4rem;opacity: .6;font-size: 12px;">{{gamePlayList[0].gameSons[0].odd}}</div>
								</div>
								<div class="btn_box_2" v-else-if="item3.label.length==2">
									<div style="display: flex;">
										<img :src="'static/img/fast'+item3.label[0]+'.png'" />
										<img :src="'static/img/fast'+item3.label[1]+'.png'" />
									</div>
									<div style="height: 0.4rem;line-height: .4rem;opacity: .6;font-size: 12px;">{{gamePlayList[0].gameSons[0].odd}}</div>
								</div>
								<div class="btn_box_3" v-else-if="item3.label.length==3">
									<div style="display: flex;flex-direction: column;justify-content: center;">
										<div style="height: .4rem;">
											<img :src="'static/img/fast'+item3.label[0]+'.png'" />
										</div>
										<div style="height: .4rem;margin-bottom: 0.22rem;">
											<img :src="'static/img/fast'+item3.label[1]+'.png'" />
											<img :src="'static/img/fast'+item3.label[2]+'.png'" />
										</div>
									</div>
									<div style="height: 0.4rem;line-height: .4rem;opacity: .6;font-size: 12px;">{{gamePlayList[0].gameSons[0].odd}}</div>
								</div>
							</div>
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
	import gameConfig from '../gameConfig.js';
	import routerID from "../routerId.js";
	export default {
		directives: {
			clickoutside3
		},
		components: {
			CountDown
		},
		props: ["classId", 'kindId', 'betDataList', 'subGameList', 'standGameList2'],
		data() {
			return {
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
				awardNum: ['?', '?', '?'],
				hotCold: {},
				omit: {},
				listInfo_style: {
					width: '100%',
					height: '0',
					transition: 'all .3s',
				},
				tableType: 1,
				ballSum: '-',
				ballSumText: '-',
				ballBS: "-",
				ballOE: "-",
				ballTD: "-",
				sumOfballList: [],
				winList: [],
				routerID:routerID,
				historyData:null,
			}
		},
		created() {
			// this.stopTouchendPropagationAfterScroll()
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
					this.ballSum = '-';
					this.ballSumText = '-';
					this.ballBS = "-";
					this.ballOE = "-";
					this.ballTD = "-";
					this.awardNum = ['?', '?', '?'];
					this.active = false;

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
						this.ballSum = '-';
						this.ballSumText = '-';
						this.ballBS = "-";
						this.ballOE = "-";
						this.ballTD = "-";
						this.awardNum = ['?', '?', '?'];
						this.active = false;
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
			bus.$on("initTxt", () => {
				this.inputTxt = "";
				this.errPrompt = "";
			})
		},
		destroyed() {
			document.removeEventListener('visibilitychange', this.addListener, false)
		},
		mounted() {
			document.addEventListener('visibilitychange', this.addListener, false);
			this.cacheHistoryData(null)
			console.log("111111111111113333")
			
		},
		computed: {
			...mapState("bet", ["subGameId", "leftName", "rightName", "gameId", "gamePlayList", "kindList"]),
			...mapState("login", ["userDetails"]),
			...mapState(["msg"]),
		},
		methods: {
			...mapActions('bet', [
				"getSubGames",
				"getWinsDragon",
				"recentOpenCode"

			]),
			...mapMutations('bet', [
				"setBetOrder",
				"saveDataOrSubGameList",
				"cacheHistoryData",
				"updateAwarPeriod"
			]),
			// stopTouchendPropagationAfterScroll() {
			// 	var locked = false;
			// 	window.addEventListener('touchmove', function(ev) {
			// 		locked || (locked = true, window.addEventListener('touchend', stopTouchendPropagation, true));
			// 	}, true);

			// 	function stopTouchendPropagation(ev) {
			// 		ev.stopPropagation();
			// 		window.removeEventListener('touchend', stopTouchendPropagation, true);
			// 		locked = false;
			// 	}
			// },
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
							this.ballSum = '-';
							this.ballSumText = '-';
							this.ballBS = "-";
							this.ballOE = "-";
							this.ballTD = "-";
							this.awardNum = ['?', '?', '?'];
							this.active = false;
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
			simplifyAwarPeriod() {
				var lg = String(gameConfig[this.kindId].periodNoAll).length;
				this.showCurrentAwarPeriod = this.currentAwarPeriod2.slice(this.currentAwarPeriod2.length - lg, this.currentAwarPeriod2.length)
				this.showPrevAwarPeriod = this.prevAwarPeriod2.slice(this.prevAwarPeriod2.length - lg, this.prevAwarPeriod2.length)
			},
			countDown() {
				this.active = false;
				this.awardNum = ['?', '?', '?'];
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
			sumOfballs() {
				var resultArray = [],
					showNumbers = [],
					animationList = [],
					max = 6,
					min = 1,
					numbers = 3;
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
			getSumOfballList(winList) {
				this.winList = winList;
				this.sumOfballList = [];
				var max = 6,
					min = 1,
					numbers = 3;
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
			msg(newMsg) {
				var awardNews = JSON.parse(newMsg.data)
				if(awardNews.messageType == "3") {
					if(awardNews.lotteryId == this.kindId) {
						this.getWinsDragon("/" + this.kindId).then((res) => {
							this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
							this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
							this.simplifyAwarPeriod()
							if(res.data.winList[1].awardNum == null) {
								this.ballSum = '-';
								this.ballSumText = '-';
								this.ballBS = "-";
								this.ballOE = "-";
								this.ballTD = "-";
								this.awardNum = ['?', '?', '?'];
								this.active = false;
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
					this.ballSum = '-';
					this.ballSumText = '-';
					this.ballBS = "-";
					this.ballOE = "-";
					this.ballTD = "-";
					this.awardNum = ['?', '?', '?'];
					this.active = false;

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
						this.ballSum = '-';
						this.ballSumText = '-';
						this.ballBS = "-";
						this.ballOE = "-";
						this.ballTD = "-";
						this.awardNum = ['?', '?', '?'];
						this.active = false;
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
			subGameId() {
				if(this.scroll1) {
					//					this.scroll1.refresh()
				} else {
					//					this.$nextTick(() => {
					//						this.scroll1 = new Bscroll(this.$refs.wrapper, {
					//							scrollbars: true,
					//							listenX: true,
					//							click: true,
					//						})
					//						this.scroll1.on('scrollEnd', this.scrollEnd);
					//						this.scroll1.on('scrollStart', this.scrollStart);
					//					})
				}

			}
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
	
	.ks {
		width: 100%;
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
					padding: 0.1rem 0;
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
						width: .8rem;
						height: .8rem;
						transform: rotate(0deg);
						margin: 0.1rem .1rem;
						/*background-image: url(../../../../static/img/img_recordball.png);*/
						/*background-image: url(../../../../static/img/ball_light.png);*/
						background-size: 100% 100%;
						/*background: radial-gradient(circle at 50% 100%, #750000, red 100%, #ca0500 100%);*/
						/*border: 0.06rem solid #B8860B;*/
						.num {
							width: 100%;
							height: 100%;
							text-align: center;
							line-height: .8rem;
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
						width: 0.9rem;
						height: 0.9rem;
						/*background-image: url(../../../../static/img/img_recordball.png);*/
						/*background-image: url(../../../../static/img/ball_light.png);*/
						background-size: 100% 100%;
						/*background: radial-gradient(circle at 50% 100%, #750000, red 100%, #ca0500 100%);*/
						/*border: 0.06rem solid #B8860B;*/
					}
					.fast1{
						 background-image: url(../../../../static/img/fast1.png);
					}
					.fast2{
						 background-image: url(../../../../static/img/fast2.png);
					}
					.fast3{
						 background-image: url(../../../../static/img/fast3.png);
					}
					.fast4{
						 background-image: url(../../../../static/img/fast4.png);
					}
					.fast5{
						 background-image: url(../../../../static/img/fast5.png);
					}
					.fast6{
						 background-image: url(../../../../static/img/fast6.png);
					}
					.dice_gif{
						 background-image: url(../../../../static/img/dice_gif_01.gif);
						 height: 0.9rem;
						 width:  0.9rem;
					}
				}
			}
			.right {
				flex: 3;
				font-size: 14px;
				color: #F0F0F0;
				padding-top: 0.1rem;
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
							.sz1 {
								background:url(../../../../static/img/sz1.png);
							}
							.sz2 {
								background:url(../../../../static/img/sz2.png);
							}
							.sz3 {
								background:url(../../../../static/img/sz3.png);
							}
							.sz4 {
								background:url(../../../../static/img/sz4.png);
							}
							.sz5 {
								background:url(../../../../static/img/sz5.png);
							}
							.sz6 {
								background:url(../../../../static/img/sz6.png);
							}
							.round{
								display: inline-block;
								background-size:100% 100% ;
								width: 0.5rem;
								height: 0.5rem;
								text-align: center;
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
	}
</style>