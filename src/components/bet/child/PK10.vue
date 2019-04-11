<template>
	<div class="pk10">
		<div class="clockView" v-stopSlide>
			<div class="left" style="position: relative;">
				<div style="position:absolute;width: 100%;height: 100%;z-index: 1000;" @touchend="open" ref="open1"></div>
				<p style="display: flex;align-items: center;text-align: center;justify-content: center;"><img src="../../../../static/img/lingdang.png" style="width: 0.3rem;margin-right:0.1rem;" />第{{prevAwarPeriod2}}期</p>
				<ul style="margin: 0.2rem 0;">
					<li :class="'open-num '+'num_'+numColor[item]" v-for="item in awardNum"></li>
				</ul>
				<ul style="color: #FFFFFF;font-size: 12px;height: 0.3rem;line-height: 0.3rem;">
					<li v-for="item in showPk10">{{item}}</li>
				</ul>
			</div>
			<div class="lines" style="height: 100%; width: 1px; background: rgb(255, 255, 255); opacity: 0.6;"></div>
			<div class="right">
				<p style="display: flex;align-items: center;text-align: center;justify-content: center;"><img src="../../../../static/img/naozhong.png" style="width: 0.3rem;margin-right:0.1rem;" />第{{currentAwarPeriod2}}期</p>
				<p style="margin: 0.1rem 0;">截止</p>
				<CountDown class="clock-count" :classId="classId" :format="':'" :kindId="kindId" :historyData="historyData" v-if="historyData" style="font-size: 14px;color:#e43a45;" @stop="countDown"></CountDown>
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
							<a href="javascript:;" @touchend="tableType=4" :class="tableType==4?'active':''">冠亚龙虎</a>
						</div>
					</div>
					<div class="tab-content">
						<div class="tab-item" v-for="(item,index) in winList" v-if="item.awardNum!=null">
							<div class="left">{{item.awardPeriod}}</div>
							<div class="right">
								<div class="nums-wrap" v-if="tableType==1">
									<span :class="'round num_'+item.awardNum.split(',')[0]"></span>
									<span :class="'round num_'+item.awardNum.split(',')[1]"></span>
									<span :class="'round num_'+item.awardNum.split(',')[2]"></span>
									<span :class="'round num_'+item.awardNum.split(',')[3]"></span>
									<span :class="'round num_'+item.awardNum.split(',')[4]"></span>
									<span :class="'round num_'+item.awardNum.split(',')[5]"></span>
									<span :class="'round num_'+item.awardNum.split(',')[6]"></span>
									<span :class="'round num_'+item.awardNum.split(',')[7]"></span>
									<span :class="'round num_'+item.awardNum.split(',')[8]"></span>
									<span :class="'round num_'+item.awardNum.split(',')[9]"></span>
								</div>
								<div class="nums-wrap" v-if="tableType==2">
									<span :class="item.awardNum.split(',')[0]<6?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[0]>=6?'大':'小'}}</span>
									<span :class="item.awardNum.split(',')[1]<6?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[1]>=6?'大':'小'}}</span>
									<span :class="item.awardNum.split(',')[2]<6?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[2]>=6?'大':'小'}}</span>
									<span :class="item.awardNum.split(',')[3]<6?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[3]>=6?'大':'小'}}</span>
									<span :class="item.awardNum.split(',')[4]<6?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[4]>=6?'大':'小'}}</span>
									<span :class="item.awardNum.split(',')[5]<6?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[3]>=6?'大':'小'}}</span>
									<span :class="item.awardNum.split(',')[6]<6?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[4]>=6?'大':'小'}}</span>
									<span :class="item.awardNum.split(',')[7]<6?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[3]>=6?'大':'小'}}</span>
									<span :class="item.awardNum.split(',')[8]<6?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[4]>=6?'大':'小'}}</span>
									<span :class="item.awardNum.split(',')[9]<6?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[3]>=6?'大':'小'}}</span>
								</div>
								<div class="nums-wrap" v-if="tableType==3">
									<span :class="item.awardNum.split(',')[0]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[0]%2==0?'双':'单'}}</span>
									<span :class="item.awardNum.split(',')[1]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[1]%2==0?'双':'单'}}</span>
									<span :class="item.awardNum.split(',')[2]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[2]%2==0?'双':'单'}}</span>
									<span :class="item.awardNum.split(',')[3]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[3]%2==0?'双':'单'}}</span>
									<span :class="item.awardNum.split(',')[4]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[4]%2==0?'双':'单'}}</span>
									<span :class="item.awardNum.split(',')[5]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[5]%2==0?'双':'单'}}</span>
									<span :class="item.awardNum.split(',')[6]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[6]%2==0?'双':'单'}}</span>
									<span :class="item.awardNum.split(',')[7]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[7]%2==0?'双':'单'}}</span>
									<span :class="item.awardNum.split(',')[8]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[8]%2==0?'双':'单'}}</span>
									<span :class="item.awardNum.split(',')[9]%2==0?'num-round orange':'num-round blue'">{{item.awardNum.split(',')[9]%2==0?'双':'单'}}</span>
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
		<div class="betPanel" v-show="selectModel=='1'" ref="wrapper" style="overflow: scroll;-webkit-overflow-scrolling: touch;">
			<div class="content">
				<div class="info">
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
				<div>
					<!--单式面板-->
					<div class="bet_list_ds" v-if="templateType.inputFormat[subGameId]">
						<div style="min-height: .4rem;text-align: center;font-size: 12px;color: #ca0500;">{{errPrompt}}</div>
						<textarea @input="judgeFromat" v-model="inputTxt"></textarea>
					</div>
					<!--pk10特殊面板-->
					<div class="bet_list_pk10" v-else-if="templateType.pk10Special[subGameId]">
						<div class="top">
							<yd-badge shape="square" bgcolor="#ca0500" color="#ffffff">冠亚和值
								<div class="inner"></div>
							</yd-badge>
						</div>
						<div class="bet_box">
							<div v-for="(item,index) in betDataList.numbers" :key="index" style="display: flex;flex-direction: column;">
								<div :class="item.cols[0].data_selected?'bet_selected':'bet_unchecked'" @touchend="selected_num({row:index,col:0})">
									<p style="">{{item.cols[0].label}}</p>
									<p v-if="leftName=='冠亚合值'" style="color: #000000;font-size: 12px;">{{gamePlayList[0].gameSons[index+2].odd}}</p>
									<p v-if="leftName=='冠亚组合合值'" style="color: #000000;font-size: 12px;">{{gamePlayList[0].gameSons[index+6].odd}}</p>
								</div>
							</div>
						</div>
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
									<div v-if="showType=='hotCold'" style="text-align: center;">{{hotCold[index1+1+''][index3+1].count}}</div>
									<div v-else style="text-align: center;">{{omit[index1+1+''][index3+1].count}}</div>
								</div>
								<div v-else style="height: 0.2rem;">

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
						<ul class="set_model">
								<li @click="selectModelType('1')" :class="selectModel=='1'?'active':''">官</li>
								<li @click="selectModelType('2')" :class="selectModel=='2'?'active':''">传</li>
							</ul>
						<!--<div style="display: flex;align-items: center;">
							<img src="../../../../static/img/img_gold_pig.png" /><span>{{userDetails.accountBalance}}</span>
						</div>-->
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
				<div class="right" style="flex: 3;overflow: scroll;-webkit-overflow-scrolling: touch;" ref="wrapper2">
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
	import gameConfig from '../gameConfig.js';
	import { menu_list } from "../../../../static/js/lmp_menulist.js";
	import routerID from "../routerId.js";
	export default {
		directives: {
			clickoutside3
		},
		components: {
			CountDown
		},
		props: ["classId", 'kindId', 'betDataList'],
		data() {
			return {
				numColor: {
					'01': '1',
					'02': '2',
					'03': '3',
					'04': '4',
					'05': '5',
					'06': '6',
					'07': '7',
					'08': '8',
					'09': '9',
					'10': '10',
				},
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
				awardNum: ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'],
				hotCold: {},
				omit: {},
				listInfo_style: {
					width: '100%',
					height: '0',
					transition: 'all .3s',
				},
				tableType: 1,
				showPk10: ['-', '-', '-', '-', '-', '-', '-', '-'],
				sumOfballList: [],
				winList: [],
				routerID: routerID,
				historyData: null,
			}
		},
		created() {
			// console.log(this.classId, this.kindId, this.betDataList,'000');

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
					this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
					clearInterval(this.active_pk10)
					this.active_pk10 = setInterval(() => {
						this.shuffle()
					}, 80)
					this.showPk10 = ['-', '-', '-', '-', '-', '-', '-', '-'];

				} else {
					clearInterval(this.active_pk10)
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
							this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
							clearInterval(this.active_pk10)
							this.active_pk10 = setInterval(() => {
								this.shuffle()
							}, 80)
							this.showPk10 = ['-', '-', '-', '-', '-', '-', '-', '-'];
						} else {
							clearInterval(this.active_pk10)
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
			document.addEventListener('visibilitychange', this.addListener, false);
			this.getTwoGameOdd("/" + this.kindId)
			this.cacheHistoryData(null)
		},

		computed: {
			...mapState("bet", ["subGameId", "leftName", "rightName", "gameId", "gamePlayList", "subGameList", "kindList", "selectModel", "betDataList_lmp", "twoGameOddList"]),
			...mapState("login", ["userDetails"]),
			...mapState(["msg"]),
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
				bus.$emit("selectModelType",type)
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
							this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
							clearInterval(this.active_pk10)
							this.active_pk10 = setInterval(() => {
								this.shuffle()
							}, 80)
							this.showPk10 = ['-', '-', '-', '-', '-', '-', '-', '-'];

						} else {
							clearInterval(this.active_pk10)
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
			simplifyAwarPeriod() {
				var lg = String(gameConfig[this.kindId].periodNoAll).length;
				this.showCurrentAwarPeriod = this.currentAwarPeriod2.slice(this.currentAwarPeriod2.length - lg, this.currentAwarPeriod2.length)
				this.showPrevAwarPeriod = this.prevAwarPeriod2.slice(this.prevAwarPeriod2.length - lg, this.prevAwarPeriod2.length)
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
			countDown() {
				this.active = false;
				this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
				this.showPk10 = ['-', '-', '-', '-', '-', '-', '-', '-'];
				clearInterval(this.active_pk10)
				this.active_pk10 = setInterval(() => {
					this.shuffle()
				}, 80)
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
			shuffle() {
				this.awardNum = _.shuffle(this.awardNum)
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
			sumOfballs() {
				this.showPk10[0] = this.awardNum[0] * 1 + this.awardNum[1] * 1;
				if(this.showPk10[0] < 12) {
					this.showPk10[1] = '小'
				} else {
					this.showPk10[1] = '大'
				}
				if(this.showPk10[0] % 2 == 0) {
					this.showPk10[2] = '双'
				} else {
					this.showPk10[2] = '单'
				}
				this.awardNum[0] * 1 > this.awardNum[9] * 1 ? this.showPk10[3] = "龙" : this.showPk10[3] = "虎";
				this.awardNum[1] * 1 > this.awardNum[8] * 1 ? this.showPk10[4] = "龙" : this.showPk10[4] = "虎";
				this.awardNum[2] * 1 > this.awardNum[7] * 1 ? this.showPk10[5] = "龙" : this.showPk10[5] = "虎";
				this.awardNum[3] * 1 > this.awardNum[6] * 1 ? this.showPk10[6] = "龙" : this.showPk10[6] = "虎";
				this.awardNum[4] * 1 > this.awardNum[5] * 1 ? this.showPk10[7] = "龙" : this.showPk10[7] = "虎";
			},
			closeModal(e) {
				if(e.target !== this.$refs.open&&e.target !== this.$refs.open1) {
					this.show1 = false;
				}
			},
			getSumOfballList(winList) {
				this.sumOfballList = [];
				this.winList = winList;
				var max = 10,
					min = 1,
					numbers = 5;
				winList.forEach((item) => {
					var ary = []
					var awardNum;
					var item1 = {},
						item2 = {},
						item3 = {},
						item4 = {},
						item5 = {},
						item6 = {},
						item7 = {},
						item8 = {};
					if(item.awardNum) {
						awardNum = item.awardNum.split(",")
						item1.value = awardNum[0] * 1 + awardNum[1] * 1;
						item1.className = "num-round wauto";
						if(item1.value < 12) {
							item2.value = '小';
							item2.className = 'num-round blue';
						} else {
							item2.value = '大';
							item2.className = 'num-round orange';
						}
						if(item1.value % 2 == 0) {
							item3.value = '双'
							item3.className = 'num-round orange';
						} else {
							item3.value = '单'
							item3.className = 'num-round blue';
						}
						if(awardNum[0] * 1 > awardNum[9] * 1) {
							item4.value = "龙";
							item4.className = 'num-round blue';
						} else {
							item4.value = "虎";
							item4.className = 'num-round orange';
						}
						if(awardNum[1] * 1 > awardNum[8] * 1) {
							item5.value = "龙";
							item5.className = 'num-round blue';
						} else {
							item5.value = "虎";
							item5.className = 'num-round orange';
						}
						if(awardNum[2] * 1 > awardNum[7] * 1) {
							item6.value = "龙";
							item6.className = 'num-round blue';
						} else {
							item6.value = "虎";
							item6.className = 'num-round orange';
						}
						if(awardNum[3] * 1 > awardNum[6] * 1) {
							item7.value = "龙";
							item7.className = 'num-round blue';
						} else {
							item7.value = "虎";
							item7.className = 'num-round orange';
						}
						if(awardNum[4] * 1 > awardNum[5] * 1) {
							item8.value = "龙";
							item8.className = 'num-round blue';
						} else {
							item8.value = "虎";
							item8.className = 'num-round orange';
						}
						ary.push(item1)
						ary.push(item2)
						ary.push(item3)
						ary.push(item4)
						ary.push(item5)
						ary.push(item6)
						ary.push(item7)
						ary.push(item8)
						this.sumOfballList.push(ary)
					} else {
						this.sumOfballList.push(ary)
					}
				})
			}

		},
		watch: {
			selectModel() {
				console.log(this.selectModel)
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
								this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
								clearInterval(this.active_pk10)
								this.active_pk10 = setInterval(() => {
									this.shuffle()
								}, 80)
								this.showPk10 = ['-', '-', '-', '-', '-', '-', '-', '-'];
							} else {
								clearInterval(this.active_pk10)
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
						this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
						clearInterval(this.active_pk10)
						this.active_pk10 = setInterval(() => {
							this.shuffle()
						}, 80)
						this.showPk10 = ['-', '-', '-', '-', '-', '-', '-', '-'];

					} else {
						clearInterval(this.active_pk10)
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
								this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
								clearInterval(this.active_pk10)
								this.active_pk10 = setInterval(() => {
									this.shuffle()
								}, 80)
								this.showPk10 = ['-', '-', '-', '-', '-', '-', '-', '-'];
							} else {
								clearInterval(this.active_pk10)
								this.awardNum = res.data.winList[1].awardNum.split(",")
								this.sumOfballs()
							}
						}
					})
				}
				this.recentOpenCode("/" + this.kindId).then((res) => {
					this.getSumOfballList(res.data)
				})
				this.getTwoGameOdd("/" + this.kindId)
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
	
	.pk10 {
		width: 100%;
		height: 100%;
		.lm {
			display: flex;
			height: 100%;
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
					/*padding: 0 0.2rem;*/
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
						.round-1 .play-name {
							box-shadow: inset 1px -6px 10px #fff;
							background: #ededed;
							border: 1px solid #d7d7d7;
							color: #000!important;
							width: 0.66rem;
							height: 0.66rem;
							border-radius: 50%;
							font-size: 18px;
							line-height: 0.66rem;
							font-weight: bolder;
							text-align: center;
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
						.pk10_num .play-name {
							width: 0.6rem;
							height: 0.6rem;
							font-size: 18px;
							text-shadow: none;
							color: transparent !important;
							line-height: 0.6rem;
							text-align: center;
							background-size: 100% 100%;
						}
						.pk10_num.num1 .play-name {
							background-image: url(../../../../static/img/1.png);
						}
						.pk10_num.num2 .play-name {
							background-image: url(../../../../static/img/2.png);
						}
						.pk10_num.num3 .play-name {
							background-image: url(../../../../static/img/3.png);
						}
						.pk10_num.num4 .play-name {
							background-image: url(../../../../static/img/4.png);
						}
						.pk10_num.num5 .play-name {
							background-image: url(../../../../static/img/5.png);
						}
						.pk10_num.num6 .play-name {
							background-image: url(../../../../static/img/6.png);
						}
						.pk10_num.num7 .play-name {
							background-image: url(../../../../static/img/7.png);
						}
						.pk10_num.num8 .play-name {
							background-image: url(../../../../static/img/8.png);
						}
						.pk10_num.num9 .play-name {
							background-image: url(../../../../static/img/9.png);
						}
						.pk10_num.num10 .play-name {
							background-image: url(../../../../static/img/10.png);
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
				width: 0.4rem;
				height: 0.4rem;
				color: #FFFFFF;
				margin: 0.03rem;
				line-height: 0.32rem;
				text-align: center;
				font-size: 12px;
			}
			.open-num.num_10 {
				background: url(../../../../static/img/10.png);
				background-size: 100% 100%;
			}
			.open-num.num_9 {
				background: url(../../../../static/img/9.png);
				background-size: 100% 100%;
			}
			.open-num.num_8 {
				background: url(../../../../static/img/8.png);
				background-size: 100% 100%;
			}
			.open-num.num_7 {
				background: url(../../../../static/img/7.png);
				background-size: 100% 100%;
			}
			.open-num.num_6 {
				background: url(../../../../static/img/6.png);
				background-size: 100% 100%;
			}
			.open-num.num_5 {
				background: url(../../../../static/img/5.png);
				background-size: 100% 100%;
			}
			.open-num.num_4 {
				background: url(../../../../static/img/4.png);
				background-size: 100% 100%;
			}
			.open-num.num_3 {
				background: url(../../../../static/img/3.png);
				background-size: 100% 100%;
			}
			.open-num.num_2 {
				background: url(../../../../static/img/2.png);
				background-size: 100% 100%;
			}
			.open-num.num_1 {
				background: url(../../../../static/img/1.png);
				background-size: 100% 100%;
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
								width: 0.4rem;
								height: 0.4rem;
								border-radius: 3px;
								color: #FFFFFF;
								font-weight: 700;
								line-height: 0.4rem;
								text-align: center;
								font-size: 14px;
								font-style: italic;
								border: 1px solid #d7d7d7;
								margin: 0 0.05rem;
							}
							.round.num_10 {
								background: url(../../../../static/img/10.png);
								background-size: 100% 100%;
							}
							.round.num_09 {
								background: url(../../../../static/img/9.png);
								background-size: 100% 100%;
							}
							.round.num_08 {
								background: url(../../../../static/img/8.png);
								background-size: 100% 100%;
							}
							.round.num_07 {
								background: url(../../../../static/img/7.png);
								background-size: 100% 100%;
							}
							.round.num_06 {
								background: url(../../../../static/img/6.png);
								background-size: 100% 100%;
							}
							.round.num_05 {
								background: url(../../../../static/img/5.png);
								background-size: 100% 100%;
							}
							.round.num_04 {
								background: url(../../../../static/img/4.png);
								background-size: 100% 100%;
							}
							.round.num_03 {
								background: url(../../../../static/img/3.png);
								background-size: 100% 100%;
							}
							.round.num_02 {
								background: url(../../../../static/img/2.png);
								background-size: 100% 100%;
							}
							.round.num_01 {
								background: url(../../../../static/img/1.png);
								background-size: 100% 100%;
							}
							.num-round {
								display: inline-block;
								width: 0.4rem;
								height: 0.4rem;
								/*border-radius: 3px;*/
								color: #fff;
								line-height: 0.4rem;
								text-align: center;
								font-size: 14px;
								/*border: 1px solid #d7d7d7;*/
								margin: 0 0.05rem;
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