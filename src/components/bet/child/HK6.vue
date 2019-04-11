<template>
	<div class="hk6_view">
		<div class="clockView hk6">
			<div class="left" style="position: relative;">
				<div style="position:absolute;width: 100%;height: 100%;z-index: 1000;" @touchend="open" ref="open1"></div>
				<div style="display: flex;justify-content: center;align-items: center;height: .6rem;">
					<img src="../../../../static/img/lingdang.png" style="width: 0.3rem;margin-right:0.1rem;" />
					<span style="color: #FFFFFF;font-size: 12px;">第{{prevAwarPeriod2}}开奖</span>
				</div>
				<div>
					<ul style="display: flex;justify-content: space-around;">
						<li v-for="item in awardNum">
							<div :class="'num_ball '+num_color[item*1]">{{item=='grey'?'?':item}}</div>
							<div style="font-size: 14px;color: #6ccae3;text-align: center;">{{num_type[item]?num_type[item]:'-'}}</div>
						</li>
					</ul>

				</div>

			</div>
			<div class="lines" style="height: 100%;width: 1px;background: #FFFFFF;opacity: .6;"></div>
			<div class="right" style="padding: 0;">
				<p style="height: .6rem;display: flex;justify-content: center;align-items: center;">
					<img src="../../../../static/img/naozhong.png" style="width: 0.3rem;margin-right:0.1rem;" />第{{currentAwarPeriod2}}期</p>
				<p>截止</p>
				<CountDown class="clock-count" :format="':'" :kindId="kindId" :classId="classId" :historyData="historyData" v-if="historyData" style="font-size: 14px;color:#e43a45;" @stop="countDown"></CountDown>
			</div>
		</div>
		<div style="position: relative;background:#FFFFFF;z-index: 1000;" v-clickoutside3="closeModal">
			<transition name="fade">
				<div :style="listInfo_style" class="listInfo" ref="wrapper3">
					<div class="tab-title">
						<div class="left" style="border-right:1px solid #d7d7d7;">期数</div>
						<div class="right">
							<a href="javascript:;" @touchend="tableType=1" :class="tableType==1?'active':''">号码</a>
							<a href="javascript:;" @touchend="tableType=2" :class="tableType==2?'active':''">总和</a>
							<a href="javascript:;" @touchend="tableType=3" :class="tableType==3?'active':''">特码</a>
						</div>
					</div>
					<div class="tab-content">
						<div class="tab-item" v-for="(item,index) in winList" v-if="item.awardNum!=null">
							<div class="left">{{item.awardPeriod}}</div>
							<div class="right">
								<div class="nums-wrap" v-if="tableType==1">
									<div class="item">
										<span :class="'num_ball '+num_color[item.awardNum.split(',')[0]*1]">{{item.awardNum.split(',')[0]}}</span>
										<span style="font-size: 12px;">{{num_type[item.awardNum.split(',')[0]]?num_type[item.awardNum.split(',')[0]]:'-'}}</span>
									</div>
									<div class="item">
										<span :class="'num_ball '+num_color[item.awardNum.split(',')[1]*1]">{{item.awardNum.split(',')[1]}}</span>
										<span style="font-size: 12px;">{{num_type[item.awardNum.split(',')[1]]?num_type[item.awardNum.split(',')[1]]:'-'}}</span>
									</div>
									<div class="item">
										<span :class="'num_ball '+num_color[item.awardNum.split(',')[2]*1]">{{item.awardNum.split(',')[2]}}</span>
										<span style="font-size: 12px;">{{num_type[item.awardNum.split(',')[2]]?num_type[item.awardNum.split(',')[2]]:'-'}}</span>
									</div>
									<div class="item">
										<span :class="'num_ball '+num_color[item.awardNum.split(',')[3]*1]">{{item.awardNum.split(',')[3]}}</span>
										<span style="font-size: 12px;">{{num_type[item.awardNum.split(',')[3]]?num_type[item.awardNum.split(',')[3]]:'-'}}</span>
									</div>
									<div class="item">
										<span :class="'num_ball '+num_color[item.awardNum.split(',')[4]*1]">{{item.awardNum.split(',')[4]}}</span>
										<span style="font-size: 12px;">{{num_type[item.awardNum.split(',')[4]]?num_type[item.awardNum.split(',')[4]]:'-'}}</span>
									</div>
									<div class="item">
										<span :class="'num_ball '+num_color[item.awardNum.split(',')[5]*1]">{{item.awardNum.split(',')[5]}}</span>
										<span style="font-size: 12px;">{{num_type[item.awardNum.split(',')[5]]?num_type[item.awardNum.split(',')[5]]:'-'}}</span>
									</div>
									<div class="item" style="width: 0.5rem;">
										<span style="color: #000000;font-size: 20px;">+</span>
									</div>
									<div class="item">
										<span :class="'num_ball '+num_color[item.awardNum.split(',')[6]*1]">{{item.awardNum.split(',')[6]}}</span>
										<span style="font-size: 12px;">{{num_type[item.awardNum.split(',')[6]]?num_type[item.awardNum.split(',')[6]]:'-'}}</span>
									</div>
								</div>
								<div class="nums-wrap" v-if="tableType==2">
									<span style="display: inline-block;width: 0.4rem;color: red;font-size: 14px;">{{sumsList[index][0]}}</span>
									<span :class="sumsList[index][1]=='总和双'?'num-round orange':'num-round blue'">{{sumsList[index][1]}}</span>
									<span :class="sumsList[index][2]=='总和小'?'num-round orange':'num-round blue'">{{sumsList[index][2]}}</span>
								</div>
								<div class="nums-wrap" v-if="tableType==3">
									<span :class="'num_ball '+num_color[item.awardNum.split(',')[6]*1]">{{item.awardNum.split(',')[6]}}</span>
									<span style="width: 0.4rem;color: red;font-size: 14px;">{{num_type[item.awardNum.split(',')[6]]?num_type[item.awardNum.split(',')[6]]:'-'}}</span>
									<span :class="tmList[index][0]=='双'?'num-round orange':'num-round blue'">{{tmList[index][0]}}</span>
									<span :class="tmList[index][1]=='小'?'num-round orange':'num-round blue'">{{tmList[index][1]}}</span>
									<span :class="tmList[index][2]=='合双'?'num-round orange':'num-round blue'">{{tmList[index][2]}}</span>
									<span :class="tmList[index][3]=='合小'?'num-round orange':'num-round blue'">{{tmList[index][3]}}</span>
									<span :class="tmList[index][4]=='尾小'?'num-round orange':'num-round blue'">{{tmList[index][4]}}</span>
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
		<div class="hk6_betPanel" style="overflow: hidden;flex: 1;padding-bottom: 1rem;display:flex;flex-direction:column;background: #FFFFFF;">
			<div class="content" style="height: 100%;display: flex;flex-direction: column;">
				<!--<div class="rough_lines"></div>-->
				<div class="info" style="height: 0.5rem;border-bottom: 1px solid #ccc;">
					<!--<div style="display: flex;width: 100%;flex-direction: column;height: 100%;">
						<div class="top">
							<div style="display: flex;align-items: center;">
								<img src="../../../../static/img/img_gold_pig.png" />
								<span>{{userDetails.accountBalance}}</span>
							</div>
							<div v-if="showHotColdOrOmit.indexOf(subGameId)!=-1">
								<yd-radio-group v-model="showType" color="#000000" size="15">
									<yd-radio val="hotCold">冷热</yd-radio>
									<yd-radio val="omit">遗漏</yd-radio>
								</yd-radio-group>
							</div>
						</div>
					</div>-->
				</div>
				<div class="bet_list_hk6">
					<div class="left">
						<ul class="conent">
							<li v-for="(item,index) in standGameList" :class="hk6Index==index?'active':''" @touchend="selHk6Index(index)">{{item.gameName}}</li>
						</ul>
					</div>

					<!--特两面-->
					<div class="right">
						<!--<yd-tab horizontal-scroll active-color="#1378bd" :callback='selectSubGameId' ref="ydtab">
							<yd-tab-panel :label="key" :tabkey="index" :key="key" v-for="(val, key,index) of standGameList[hk6Index].gameSons[0]"></yd-tab-panel>
						</yd-tab>-->
						<ul class="subTab">
							<li class="subItem" v-for="(val, key,index) of standGameList[hk6Index].gameSons[0]" @touchend="selectSubGameId(key,index)" :class="subGameIdx==index?'sub_active':''">{{key}}</li>
						</ul>
						<div class="btn_box" ref="hk6_scorll_right">
							<div class="conent" v-if="templateType.other[subGameId]">
								<ul>
									<li class="btn_item" @touchend="selected_num({row:0,col:index})" v-for="(item,index) in betDataList.numbers[0].cols" :style="item.data_selected?{background: 'rgba(244, 234, 42, .5)',
    textShadow: '0 0 0 rgba(255, 255, 255, .23)',
    boxShadow: 'inset 0 1px 5px rgba(0, 0, 0, .3)'}:''">

										<div :class="'btn_label '+item.btnColor">{{item.label}}</div>
										<span style="font-size: 14px;color:#ff4d4d;width: 1rem;text-align: center;">{{gamePlayList[0].gameSons[0].odd}}</span>
									</li>
								</ul>
							</div>

							<!--特两面-->
							<div class="conent" v-else-if="templateType.telm[subGameId]">
								<ul v-for="(item1,index1) in betDataList.numbers">
									<li class="btn_item tlm" @touchend="selected_num({row:index1,col:index2})" v-for="(item2,index2) in item1.cols" :style="item2.data_selected?{background: 'rgba(244, 234, 42, .5)',
    textShadow: '0 0 0 rgba(255, 255, 255, .23)',
    boxShadow: 'inset 0 1px 5px rgba(0, 0, 0, .3)'}:''">

										<div class="btn_label" style="font-size: 20px;font-weight: 900;color: #666;">{{item2.label}}</div>
										<span style="font-size: 14px;color:#ff4d4d;width: 1rem;text-align: center;">{{gamePlayList[0].gameSons[0].odd}}</span>
									</li>
								</ul>
							</div>
							<!--总和-->
							<div class="conent" v-else-if="templateType.zonghe[subGameId]">
								<ul v-for="(item1,index1) in betDataList.numbers">
									<li class="btn_item tlm" @touchend="selected_num({row:index1,col:index2})" v-for="(item2,index2) in item1.cols" :style="item2.data_selected?{background: 'rgba(244, 234, 42, .5)',
    textShadow: '0 0 0 rgba(255, 255, 255, .23)',
    boxShadow: 'inset 0 1px 5px rgba(0, 0, 0, .3)'}:''">

										<div class="btn_label" style="font-size: 20px;font-weight: 900;color: #666;">{{item2.label}}</div>
										<span style="font-size: 14px;color:#ff4d4d;width: 1rem;text-align: center;">{{gamePlayList[0].gameSons[0].odd}}</span>
									</li>
								</ul>
								<p style="color: #FFFFFF;font-size: 14px;margin:0.1rem 0;padding: 0 0.1rem;">※ 所有七个开奖号码的分数总和大于等于175为总分大；分数总和小于或等于174为总分小。</p>
							</div>
							<!--半波-->
							<div class="conent" v-else-if="templateType.banbo[subGameId]">
								<ul style="height: auto;display: flex;flex-direction: column;align-items:center;font-size: 14px;flex-wrap: wrap;color: #666;">
									<li class="btn_item texiao" v-for="(item1,index1) in betDataList.numbers" style="height: auto;display: flex;flex-wrap: wrap;align-items: center;padding:0.1rem;" @touchend="onSelectHk6(index1)" :class="item1.data_selected?'sebo_item':''">
										<div style="flex: 2;font-weight: 900;font-size: 20px;">{{item1.rowName}}</div>
										<div style="flex: 1;color:#ff4d4d;">{{gamePlayList[0].gameSons[index1].odd}}</div>
										<div style="height: auto;display: flex;flex-wrap: wrap;flex: 8;">
											<div :class="'sebo '+item2.btnColor" v-for="(item2,index2) in item1.cols" :key="index2">{{item2.label}}
											</div>
										</div>
									</li>

								</ul>
							</div>
							<!--色波-->
							<div class="conent" v-else-if="templateType.sebo[subGameId]">
								<ul style="height: auto;display: flex;flex-direction: column;align-items:center;font-size: 14px;flex-wrap: wrap;color: #666;">
									<li class="btn_item texiao" v-for="(item1,index1) in betDataList.numbers" style="height: auto;display: flex;flex-wrap: wrap;align-items: center;padding:0.1rem;" @touchend="onSelectHk6(index1)" :class="item1.data_selected?'sebo_item':''">
										<div style="flex: 1;font-weight: 900;font-size: 20px;">{{item1.rowName}}</div>
										<div style="flex: 1;color:#ff4d4d;">{{gamePlayList[0].gameSons[index1].odd}}</div>
										<div style="height: auto;display: flex;flex-wrap: wrap;flex: 8;">
											<div :class="'sebo '+item2.btnColor" v-for="(item2,index2) in item1.cols" :key="index2">{{item2.label}}
											</div>
										</div>
									</li>

								</ul>
							</div>
							<!--特肖-->
							<div class="conent" v-else-if="templateType.texiao[subGameId]">
								<ul style="height: auto;display: flex;flex-direction: column;align-items:center;font-size: 14px;flex-wrap: wrap;color: #666;">
									<li class="btn_item texiao" v-for="(item1,index1) in betDataList.numbers" style="height: auto;display: flex;flex-wrap: wrap;align-items: center;padding:0.1rem;" @touchend="onSelectHk6(index1)" :class="item1.data_selected?'texiao_item':''">
										<div style="flex: 1;font-weight: 900;font-size: 20px;">{{item1.rowName}}</div>
										<!--<div style="flex: 1;" v-if="">{{}}</div>-->
										<div style="flex: 1;color:#ff4d4d;">{{item1.cols.length==5?gamePlayList[0].gameSons[0].odd.split(',')[1]:gamePlayList[0].gameSons[0].odd.split(',')[0]}}</div>
										<div style="height: auto;display: flex;flex-wrap: wrap;flex: 8;">
											<div :class="'texiao '+item2.btnColor" v-for="(item2,index2) in item1.cols" :key="index2">{{item2.label}}
											</div>
										</div>
									</li>
								</ul>
							</div>
							<!--合肖-->
							<div class="conent" v-else-if="templateType.hexiao[subGameId]">
								<ul style="height: auto;display: flex;flex-direction: column;align-items:center;font-size: 14px;flex-wrap: wrap;color: #666;">
									<li class="btn_item texiao" v-for="(item1,index1) in betDataList.numbers" style="height: auto;display: flex;flex-wrap: wrap;align-items: center;padding:0.1rem;" @touchend="onSelectHk6(index1)" :class="item1.data_selected?'texiao_item':''">
										<div style="flex: 1;font-weight: 900;font-size: 20px;">{{item1.rowName}}</div>
										<!--<div style="flex: 1;" v-if="">{{}}</div>-->
										<div style="flex: 1;color:#ff4d4d;">{{gamePlayList[0].gameSons[subGameIdx].odd.split(',')[0]}}</div>
										<div style="height: auto;display: flex;flex-wrap: wrap;flex: 8;">
											<div :class="'texiao '+item2.btnColor" v-for="(item2,index2) in item1.cols" :key="index2">{{item2.label}}
											</div>
										</div>
									</li>
								</ul>
							</div>

						</div>

					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//  import Bscroll from 'better-scroll';
	import CountDown from "./countdown.vue";
	import clickoutside3 from '../../../directives/clickoutside3';
	import {
		templateType
	} from './templateType.js';
	import {
		bus
	} from "../bus.js";
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex";
	import {
		calcChooseBetCount,
		calcInputBetCount
	} from "../renderPalette.js";
	import {
		onSelectBtn,
		quickBtnSelect
	} from "../bet.js";
	import {
		renderingData
	} from "../bet.js";
	import gameConfig from '../gameConfig.js';
	import routerID from "../routerId.js";
	export default {
		directives: {
			clickoutside3
		},
		components: {
			CountDown
		},
		props: ["classId", 'kindId', 'subGameList', 'standGameList', 'betDataList', "newNumbers"],
		data() {
			return {
				num_color: num_color,
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
				awardNum: ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'],
				hotCold: {},
				omit: {},
				listInfo_style: {
					width: '100%',
					height: '0',
					transition: 'all .3s',
				},
				winList: [],
				num_type: {},
				hk6Index: 0,
				sumsList: [],
				tmList: [],
				subGameIdx: 0,
				routerID: routerID,
				historyData: null,
			}
		},
		destroyed() {
			document.removeEventListener('visibilitychange', this.addListener, false)
		},
		created() {
			// console.log(this.kindId)
			this.kindId = this.routerID[this.$route.params.kindId];
			var res = JSON.parse(sessionStorage.getItem("gameInfo"))
			if(res) {
				this.historyData = res;
				this.hotCold = res.data.hotCold
				this.omit = res.data.omit
				//				this.winList = res.data.winList
				this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
				this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
				this.simplifyAwarPeriod()
				this.updateAwarPeriod({
					currentAwarPeriod: this.currentAwarPeriod2,
					prevAwarPeriod: this.prevAwarPeriod2
				})
				if(res.data.winList[1].awardNum == null) {
					this.awardNum = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
					this.active = false;

				} else {
					this.active = true;
					this.awardNum = res.data.winList[1].awardNum.split(",")
				}
			} else {
				this.getWinsDragon("/" + this.kindId).then((res) => {
					if(res.code === 0) {
						this.historyData = res;
						this.hotCold = res.data.hotCold
						this.omit = res.data.omit
						//					this.winList = res.data.winList
						this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
						this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
						this.simplifyAwarPeriod()
						this.updateAwarPeriod({
							currentAwarPeriod: this.currentAwarPeriod2,
							prevAwarPeriod: this.prevAwarPeriod2
						})
						if(res.data.winList[1].awardNum == null) {
							this.awardNum = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
							this.active = false;
						} else {
							this.active = true;
							this.awardNum = res.data.winList[1].awardNum.split(",")
						}
					}
				})
			}
			bus.$on("initTxt", () => {
				this.inputTxt = "";
				this.errPrompt = "";
			})
			this.recentOpenCode("/" + this.kindId).then((res) => {
				this.getSumOfballList(res.data)
			})
			this.judgeAnimal()
		},
		mounted() {
			document.addEventListener('visibilitychange', this.addListener, false);
			this.cacheHistoryData(null)
		},
		computed: {
			...mapState("bet", ["subGameId", "leftName", "rightName", "gameId", "gamePlayList", "kindList"]),
			...mapState("login", ["userDetails"]),
			...mapState(["msg"]),
			...mapState("home", ["kindList", "lotteryName", "lotteryId"]),
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
			addListener() {
				if(document.hidden) {} else {
					this.getWinsDragon("/" + this.kindId).then((res) => {
						this.hotCold = res.data.hotCold
						this.omit = res.data.omit
						//						this.winList = res.data.winList
						this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
						this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
						this.simplifyAwarPeriod()
						this.updateAwarPeriod({
							currentAwarPeriod: this.currentAwarPeriod2,
							prevAwarPeriod: this.prevAwarPeriod2
						})
						if(res.data.winList[1].awardNum == null) {
							this.awardNum = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
							this.active = false;
						} else {
							this.active = true;
							this.awardNum = res.data.winList[1].awardNum.split(",")
						}
					})
				}

			},
			getSumOfballList(winList) {
				this.sumsList = [];
				this.winList = winList;
				winList.forEach((item) => {
					var ary = [],
						ary2 = [];
					if(item.awardNum) {
						var awardNum = item.awardNum.split(",");
						var tmNum = awardNum[6] * 1;
						if(tmNum % 2 == 0) {
							ary2[0] = "双"
						} else {
							ary2[0] = "单"
						}
						if(tmNum >= 25) {
							ary2[1] = "大"
						} else if(tmNum <= 24) {
							ary2[1] = "小"
						} else if(tmNum == 49) {
							ary2[1] = "和"
						}
						if((awardNum[6][0] * 1 + awardNum[6][1] * 1) % 2 == 0) {
							ary2[2] = "合双"
						} else {
							ary2[2] = "合单"
						}
						if((awardNum[6][0] * 1 + awardNum[6][1] * 1) >= 7) {
							ary2[3] = "合大"
						} else if((awardNum[6][0] * 1 + awardNum[6][1] * 1) <= 6) {
							ary2[3] = "合小"
						} else if(tmNum == 49) {
							ary2[3] = "和局"
						}
						if(awardNum[6][1] * 1 >= 5) {
							ary2[4] = "尾大"
						} else if(awardNum[6][1] * 1 <= 4) {
							ary2[4] = "尾小"
						} else if(tmNum == 49) {
							ary2[4] = "和局"
						}
						ary[0] = awardNum.reduce(function(prev, curr, idx, arr) {
							return prev * 1 + curr * 1;
						});
						if(ary[0] % 2 == 0) {
							ary[1] = "总和双"
						} else {
							ary[1] = "总和单"
						}
						if(ary[0] >= 175) {
							ary[2] = "总和大"
						} else {
							ary[2] = "总和小"
						}
					}
					this.tmList.push(ary2)
					this.sumsList.push(ary)
				})
			},
			simplifyAwarPeriod() {
				var lg = String(gameConfig[this.kindId].periodNoAll).length;
				this.showCurrentAwarPeriod = this.currentAwarPeriod2.slice(this.currentAwarPeriod2.length - lg, this.currentAwarPeriod2
					.length)
				this.showPrevAwarPeriod = this.prevAwarPeriod2.slice(this.prevAwarPeriod2.length - lg, this.prevAwarPeriod2
					.length)
			},
			countDown() {
				this.active = false;
				this.awardNum = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
				this.$dialog.toast({
					mes: '第' + this.currentAwarPeriod2 + '期已停止销售',
					timeout: 1500
				});
				this.prevAwarPeriod2 = this.currentAwarPeriod2;
				this.currentAwarPeriod2 = this.createChasePeriod(this.currentAwarPeriod2, 1, gameConfig[this.kindId].periodNoAll,
					this.kindId)
				this.simplifyAwarPeriod()

				this.updateAwarPeriod({
					currentAwarPeriod: this.currentAwarPeriod2,
					prevAwarPeriod: this.prevAwarPeriod2
				})
			},
			onSelectHk6(index) {
				if(!this.isclick) {
					return
				}
				var data = {};
				if(templateType.hexiao[this.subGameId]) {
					var numbersLg = this.subGameId.slice(4, 6) * 1;

					if(this.newNumbers.length >= numbersLg && !this.betDataList.numbers[index].data_selected) {
						this.$dialog.toast({
							mes: '最多只能选取' + numbersLg + '个号码',
							timeout: 1000
						});
						return false
					}
				}
				this.betDataList.numbers[index].data_selected = !this.betDataList.numbers[index].data_selected;

				var result = calcChooseBetCount(this.betDataList, []);
				data.ticketCount = result.ticketCount;
				data.newNumbers = result.newNumbers;
				this.$emit("resultData", data)

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
			selectSubGameId(name, index) {
				this.subGameIdx = index;
				this.$emit("selectSubGameId", {
					name: name,
					index: this.hk6Index
				})
			},
			selHk6Index(index) {
				this.hk6Index = index;
				this.$emit("selHk6Index", index);
				this.subGameIdx = 0;
				//				this.$refs.ydtab.activeIndex = 0;
			},
			judgeAnimal() {
				var names = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]
				var obj = {};
				var labels = Array(12);
				var year = (new Date()).getFullYear();
				var animal = year % 12 + 8;
				var number_arr = new Array(12);
				for(var i = 0; i < 12; i++) {
					if(i == animal) {
						var first_number = 1;
						var item = [String(first_number), String(first_number + 12), String(first_number + 24), String(
							first_number + 36), String(first_number + 48)];

						labels.fill(item, i, i + 1);
					} else {
						var first_number = i < animal ? (animal - i) + 1 : 13 - (i - animal);

						var item = [String(first_number), String(first_number + 12), String(first_number + 24), String(
							first_number + 36)];
						labels.fill(item, i, i + 1);
					}
				}
				labels.forEach((item1, index1) => {
					item1.forEach((item2) => {
						obj[item2] = names[index1]
					})
				})
				for(var key in obj) {
					if(key * 1 < 10) {
						obj['0' + key] = obj[key];
					}
				}
				this.num_type = obj;
			},

		},
		watch: {
			msg(newMsg) {
				var awardNews = JSON.parse(newMsg.data);
				if(awardNews.messageType == "3") {
					if(awardNews.lotteryId == this.kindId) {
						this.getWinsDragon("/" + this.kindId).then((res) => {
							this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
							this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
							//							this.winList = res.data.winList;
							this.simplifyAwarPeriod()
							if(res.data.winList[1].awardNum == null) {
								this.awardNum = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
								this.active = false;
							} else {
								this.active = true;
								this.awardNum = res.data.winList[1].awardNum.split(",")
							}
							// 切换彩种时变更开奖历史
							this.recentOpenCode("/" + this.kindId).then((res) => {
								this.getSumOfballList(res.data)
							})
						})

					}

				}
			},
			show1() {
				if(this.show1) {
					this.listInfo_style = {
						height: '6rem',
					}
					//                  setTimeout(() => {
					//                      var scroll = new Bscroll(this.$refs.wrapper3, {
					//                          scrollbars: true,
					//                      })
					//                  }, 200)
				} else {
					this.listInfo_style = {
						height: '0',
					}
				}
			},
			kindId() {
				this.historyData = null;
				// console.log(this.betDataList)
				this.hk6Index = 0;
				// this.$refs.ydtab.activeIndex = 0
				var res = JSON.parse(sessionStorage.getItem("gameInfo"))
				if(res) {
					this.historyData = res;
					this.hotCold = res.data.hotCold
					this.omit = res.data.omit
					//				this.winList = res.data.winList
					this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
					this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
					this.simplifyAwarPeriod()
					this.updateAwarPeriod({
						currentAwarPeriod: this.currentAwarPeriod2,
						prevAwarPeriod: this.prevAwarPeriod2
					})
					if(res.data.winList[1].awardNum == null) {
						this.awardNum = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
						this.active = false;

					} else {
						this.active = true;
						this.awardNum = res.data.winList[1].awardNum.split(",")
					}
				} else {
					this.getWinsDragon("/" + this.kindId).then((res) => {
						if(res.code === 0) {
							this.historyData = res;
							this.hotCold = res.data.hotCold
							this.omit = res.data.omit
							//					this.winList = res.data.winList
							this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
							this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
							this.simplifyAwarPeriod()
							this.updateAwarPeriod({
								currentAwarPeriod: this.currentAwarPeriod2,
								prevAwarPeriod: this.prevAwarPeriod2
							})
							if(res.data.winList[1].awardNum == null) {
								this.awardNum = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
								this.active = false;
							} else {
								this.active = true;
								this.awardNum = res.data.winList[1].awardNum.split(",")
							}
						}
					})
				}
				// 切换彩种时变更开奖历史
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
	
	.hk6_view {
		overflow: hidden;
		flex: 1;
		width: 100%;
		display: flex;
		flex-direction: column;
		.sebo,
		.texiao {
			width: 0.6rem;
			height: 0.6rem;
			text-align: center;
			line-height: 0.6rem;
			font-size: 12px;
			font-weight: 700;
			/*color: #000000;*/
		}
		
		.sebo.red,
		.texiao.red {
			background: url(../../../../static/img/bo_red_bg.png);
			background-size: 100% 100%;
		}
		.sebo.blue,
		.texiao.blue {
			background: url(../../../../static/img/bo_blue_bg.png);
			background-size: 100% 100%;
		}
		.sebo.green,
		.texiao.green {
			background: url(../../../../static/img/bo_green_bg.png);
			background-size: 100% 100%;
		}
		.sebo_item,
		.texiao_item {
			background: rgba(244, 234, 42, 0.5);
			text-shadow: rgba(255, 255, 255, 0.23) 0px 0px 0px;
			box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 5px inset;
		}
		.clockView {
			width: 100%;
			height: 1.8rem;
			display: flex;
			background: linear-gradient(135deg, #132e7b 0, #00c9ca 100%);
			.left {
				flex: 5;
				p {
					text-align: center;
					font-size: 12px;
					color: #F0F0F0;
					padding: 0.1rem 0;
				}
				ul {
					display: flex;
					justify-content: space-around;
					li {
						.num_ball {
							width: .5rem;
							height: .5rem;
							text-align: center;
							line-height: .6rem;
							font-size: 14px;
						}
						.num_ball.red {
							background: url(../../../../static/img/bo_red_bg.png);
							background-size: 100% 100%;
						}
						.num_ball.green {
							background: url(../../../../static/img/bo_green_bg.png);
							background-size: 100% 100%;
						}
						.num_ball.blue {
							background: url(../../../../static/img/bo_blue_bg.png);
							background-size: 100% 100%;
						}
						.num_ball.grey {
							background: url(../../../../static/img/bo_grey_bg.png);
							background-size: 100% 100%;
						}
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
					height: auto;
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
							.item {
								width: 0.66rem;
								height: auto;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
							}
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
								padding: 0.05rem 0.05rem;
								border-radius: 3px;
								color: #fff;
								text-align: center;
								font-size: 14px;
								border: 1px solid #d7d7d7;
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
			.num_ball {
				display: block;
				width: .66rem;
				height: .66rem;
				text-align: center;
				line-height: .66rem;
				font-size: 14px;
				font-weight: 700;
			}
			.num_ball.red {
				background: url(../../../../static/img/bo_red_bg.png);
				background-size: 100% 100%;
			}
			.num_ball.green {
				background: url(../../../../static/img/bo_green_bg.png);
				background-size: 100% 100%;
			}
			.num_ball.blue {
				background: url(../../../../static/img/bo_blue_bg.png);
				background-size: 100% 100%;
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
		.info {
			/*height: 1rem;*/
			/*display: flex;*/
			flex-direction: column;
			/*margin-top: 2.8rem;*/
			position: relative;
			padding: 0.1rem 0.2rem;
			background: #FFFFFF;
			/*box-sizing: border-box;
		border-bottom: 1px solid #CCCCCC;*/
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #666;
				font-size: 12px;
				img {
					width: .8rem;
					height: 0.73rem;
					margin-right: 0.2rem;
				}
			}
			.bottom {}
		}
		/*六合彩*/
		.bet_list_hk6 {
			overflow: hidden;
			flex: 1;
			display: flex;
			.left {
				background: linear-gradient(to bottom, rgba(0, 99, 184, 1) 1%, rgba(0, 173, 189, 1) 72%);
				overflow: scroll;
				-webkit-overflow-scrolling: touch;
				/*height: 100%;*/
				ul {
					display: flex;
					flex-direction: column;
					border-right: 1px solid rgba(255, 255, 255, .4);
					width: 1.4rem;
					/*background: #011935;*/
					li.active {
						color: #fff;
						box-shadow: inset -1px 3px 7px rgba(0, 0, 0, .34);
						background-color: rgba(0, 0, 0, .23);
						border: 0;
					}
					li {
						box-shadow: inset 0 1px 0 rgba(255, 255, 255, .2), 0 -1px 0 rgba(0, 0, 0, .23);
						background: rgba(250, 250, 250, .11);
						text-align: center;
						position: relative;
						border: 0;
						display: block;
						color: #fff;
						border-bottom: 1px solid rgba(255, 255, 255, .4);
						width: 100%;
						color: #FFFFFF;
						line-height: .8rem;
						text-align: center;
						font-size: 14px;
					}
				}
			}
			.right {
				display: flex;
				flex-direction: column;
				flex: 1;
				background: #fff;
				.subTab {
					display: -webkit-box;
					overflow: scroll;
					-webkit-overflow-scrolling: touch;
					width: 5.8rem;
					.subItem {
						font-size: 14px;
						padding: 0 0.3rem;
					}
					.sub_active {
						color: rgb(19, 120, 189);
					}
				}
				.btn_box {
					padding-top: 0.1rem;
					overflow: scroll;
					-webkit-overflow-scrolling: touch;
					flex: 1;
					ul {
						display: flex;
						justify-content: space-around;
						border-top: 1px solid rgba(255, 255, 255, .6);
						flex-wrap: wrap;
						.btn_item {
							position: relative;
							width: 28%;
							display: flex;
							border: 1px solid #ccc;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							border-radius: 5px;
							margin-bottom: 0.2rem;
							height: 1.4rem;
							.btn_label {
								width: 0.8rem;
								height: 0.8rem;
								line-height: 0.8rem;
								font-size: 14px;
								text-align: center;
							}
							.btn_label.red {
								background: url(../../../../static/img/bo_red_bg.png);
								background-size: 100% 100%;
							}
							.btn_label.blue {
								background: url(../../../../static/img/bo_blue_bg.png);
								background-size: 100% 100%;
							}
							.btn_label.green {
								background: url(../../../../static/img/bo_green_bg.png);
								background-size: 100% 100%;
							}
						}
						.btn_item.tlm {
							width: 43% !important;
							.btn_label {
								width: auto;
								height: 0.8rem;
								line-height: 0.8rem;
								font-size: 14px;
								text-align: center;
							}
						}
						.btn_item.texiao {
							width: 88% !important;
							flex-direction: initial;
							.btn_label {
								width: auto;
								height: 0.8rem;
								line-height: 0.8rem;
								font-size: 14px;
								text-align: center;
							}
						}
					}
				}
			}
		}
	}
</style>