<template>
	<div class="buyColorBasket">
		<yd-navbar :title="gameConfig[kindId].gameName">
			<router-link :to="classId!='2'?'/bet/'+classId+'/'+callbackKindId:'/hk6bet/'+classId+'/'+callbackKindId" slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
		</yd-navbar>
		<div class="countdown">
			<span class="title">第{{currentAwarPeriod2}}期  截止倒数:</span>
			<CountDown :classId="classId" class="clock-count" :format="'chinese'" :kindId="kindId" style="font-size: 14px;color:#e43a45;" @stop="countDown"></CountDown>
			<!--<yd-countdown v-if="!stopCountDown" :time="time2" timetype="second" style="font-size: 14px;color:#e43a45;" :callback="countDown2" done-text="00:00:00">
				<em>{%h}时{%m}分{%s}秒</em>
			</yd-countdown>-->
		</div>
		<div class="gold">
			<yd-button @click.native="clearList">清空列表</yd-button>
			<!--<yd-button>随机一注</yd-button>-->
			<div class="gold_icon">
				<img src="../../../static/img/img_gold_pig.png" /><span>{{(Math.round(userDetails.accountBalance*100)/100).toFixed(2)}}</span>
			</div>
		</div>
		<div class="list" ref="wrapper">
			<div class="content" v-if="lotteryData[selectModel].length>0">
				<div class="list-item" v-for="(item,index) in lotteryDatas">
					<div class="left" @click="delete_single(index)"><img src="../../../static/img/shanchu.png" /></div>
					<div class="center">
						<div style="color: #d91d36;">{{item.selecteNum}}</div>
						<p><span style="margin-right: 1px;">{{item.subGames}}</span>
							<span>{{item.ticketCount}}注</span></p>
						<p><span>{{item.price}}倍</span> <span>{{Math.round(item.price*item.ticketCount*item.unite*1000)/1000}}元</span></p>
					</div>
					<div class="right">
						<div class="item" style="display: flex;align-items: center;justify-content: center;" v-if="classId!='1'&&classId!='2'&&selectModel!='2'">追
							<!--<Spinner :class="'numInput_a'+index"  v-model="item.chaseNum" :isfocus="curIdx==index&&curType=='a'?true:false" @focusInput="focusInput(index,'a')"></Spinner>-->
							<numberInput :class="'numInput_a'+index" v-model="item.chaseNum" :isfocus="curIdx==index&&curType=='a'&&showKey?true:false" @focusInput="focusInput(index,'a')"></numberInput>期</div>
						<div class="item" style="display: flex;align-items: center;justify-content: center;">投
							<!--<Spinner :class="'numInput_b'+index" v-model="item.price" :isfocus="curIdx==index&&curType=='b'?true:false" @focusInput="focusInput(index,'b')"></Spinner>-->
							<numberInput :class="'numInput_b'+index" v-model="item.price" :isfocus="curIdx==index&&curType=='b'&&showKey?true:false" @focusInput="focusInput(index,'b')"></numberInput>倍</div>
						<div class="item" style="display: flex;align-items: center;justify-content: center;" v-if="classId!='1'&&classId!='2'&&selectModel!='2'">
							<yd-button @click.native="chase(item,index)">追号</yd-button>
						</div>
					</div>
				</div>
			</div>
			<div v-else style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;flex-direction: column;">
				<img src="../../../static/img/node_recore/no_record_03.png" style="width: 4rem;" />
				<div class="no_text">
					<p>{{teils}} ～</p> <button type="button" style="width: auto;" class="yd-btn yd-btn-hollow" @click="toPath">查看下注详情 &gt;</button></div>
			</div>
			<div :style="scrollCss"></div>
		</div>
		<div class="order">
			<p v-if="lotteryData[selectModel].length>0">共<span style="color: rgb(217, 29, 54);">{{total_notes}}</span>注，共<span style="color: rgb(217, 29, 54);">{{ Math.round(total_amount*1000)/1000}}</span>元</p>
			<p v-else><span style="color: rgb(217, 29, 54);">您尚未选择投注</span></p>
		</div>
		<div class="footer">
			<yd-button :style="lotteryData[selectModel].length<1?{backgroundColor:'#cccccc'}:''" :disabled="lotteryData[selectModel].length<1?true:false" @click.native="bet">确认投注</yd-button>
		</div>

		<keyboard :option="option" @keyVal="getInputValue" @keyValQk="qkInputValue"></keyboard>
	</div>
</template>

<script>
	import CountDown from "./child/countdown.vue"
	import { quickBets } from "./bet.js";
	import Bscroll from 'better-scroll';
	import gameConfig from './gameConfig.js'
	import { mapState, mapMutations, mapActions } from "vuex";
	import routerID from "./routerId.js";
	export default {
		components: {
			CountDown
		},
		data() {
			return {
				times: '1',
				periods: '1',
				currentAwarPeriod2: '',
				total_notes: 0,
				total_amount: 0,
				stopCountDown: false,
				lotteryDatas: [],
				gameConfig: gameConfig,
				noClick: false,
				classId: '',
				kindId: '',
				callbackKindId:"",
				curIdx: '',
				curType: '',
				option: {
					show: false,
					sourceDom: '',
					type: 'a',
				},
				inputValue: '',
				bodyHeight: 0,
				scrollCss: {
					width: '100%',
					height: '0',
				},
				maxChase:0,
				showKey:true,
				teils:"暂无注单 ~",
				routerID:routerID,

			}
		},
		created() {
			// console.log(this.kindId)
			this.kindId = this.routerID[this.$route.params.kindId];
			// this.kindId = this.$route.params.kindId; 
			// console.log(this.kindId)
			this.callbackKindId = this.$route.params.kindId;
			this.classId = this.$route.params.classId;
			
			if(this.classId == '2') {
				if(this.lotteryData[this.selectModel].length == 0) {
					this.$router.push({
						path: "/hk6bet/" + this.classId + '/' + this.callbackKindId,
					})
				}
			} else {
				if(this.lotteryData[this.selectModel].length == 0) {
					this.$router.push({
						path: "/bet/" + this.classId + '/' + this.callbackKindId,
					})
				}
			}

			this.lotteryDatas = this.lotteryData[this.selectModel];
			this.getWinsDragon("/" + this.kindId).then(() => {
				this.currentAwarPeriod2 = this.currentAwarPeriod
			})
			this.getNoteOrAmount()
		},
		mounted() {
			this.bodyHeight = document.body.clientHeight;
			this.maxChase = gameConfig[this.kindId].periodNoAll;
			//			this.$nextTick(() => {
			//				var scroll = new Bscroll(this.$refs.wrapper, {
			//					click: true,
			//					scrollbars: true,
			//					listenX: true,
			//				})
			//			})
		},
		computed: {
			...mapState('bet', [
				'lotteryData',
				'currentAwarPeriod',
				'selectModel'
			]),
			...mapState("login", ["userDetails"]),
			...mapState("home", ["kindList","lotteryList","lotteryName","lotteryId"]),
		},
		destroyed() {
			this.stopCountDown = true;
		},
		methods: {
			...mapActions('login', [
				"getUserDetails"
			]),
			...mapActions('bet', [
				"getWinsDragon",
				"quickBet",
				"lmpbet"
			]),
			...mapMutations('bet', [
				"saveLotteryData",
				"deleteLotteryData",
				"updateAwarPeriod"
			]),
			getInputValue(val) {
				if(val === 'delete') {
					this.inputValue = this.inputValue.slice(0, this.inputValue.length - 1)
				} else if(val === 'close') {
					this.showKey = false;
					this.inputValue == '' || this.inputValue * 1 < 1 ? this.inputValue = '1' : null;
					this.option.show = false;
				} else if(val === 'clear') {
					this.inputValue = '';
				} else {
					if(this.inputValue.length > 6) {
						this.$dialog.toast({
							mes: '最多只能输入7位数',
							timeout: 1500
						});
						return false
					}

					this.inputValue += val;
				}
				if(this.curType!=''||this.curIdx!=''){
					if(this.curType == 'a'){
						if(this.inputValue*1>this.maxChase){
                       this.inputValue = this.maxChase+'';
                    }
					this.lotteryDatas[this.curIdx].chaseNum = this.inputValue
				} else {
					this.lotteryDatas[this.curIdx].price = this.inputValue
				}
				}
				
				
				this.getNoteOrAmount()
			},
			qkInputValue(val) {
				this.inputValue = val;
				if(this.curType == 'a') {
					if(this.inputValue*1>this.maxChase){
                       this.inputValue = this.maxChase+'';
                    }
					this.lotteryDatas[this.curIdx].chaseNum = this.inputValue
				} else {
					this.lotteryDatas[this.curIdx].price = this.inputValue
				}
				this.getNoteOrAmount()
			},
			focusInput(index, type) {
				this.curIdx = index;
				this.curType = type;
				this.showKey = true;
				this.option.show = true;
				this.option.type = type;
				this.$set(this.option, 'show', true)
				var el = document.getElementsByClassName("numInput_" + type + index)[0];
				var el2 = document.getElementsByClassName("content")[0];
				var el3 = document.getElementsByClassName("list")[0];
				if(type == 'a') {
					if(this.lotteryDatas[index].chaseNum>this.maxChase){
                       this.lotteryDatas[index].chaseNum = this.maxChase
                    }
					this.inputValue = this.lotteryDatas[index].chaseNum + '';
                    
				} else {
					this.inputValue = this.lotteryDatas[index].price + '';
				}
				setTimeout(() => {
					document.getElementsByClassName("list")[0].scrollTop = el.offsetTop - el2.offsetTop;
				}, 100)
				this.lotteryDatas.forEach((item, index) => {
					if(item.price == ''||item.price<=0){
						item.price = 1
					}
					if(item.chaseNum == ''||item.chaseNum<=0){
						item.chaseNum = 1
					}
				})
			},

			onchange() {
				this.getNoteOrAmount()
			},
			toPath() {
				this.$router.push({
					path: '/noterecord?status=4'
				})
			},
			chase(item, index) {
				this.getInputValue('close');
				this.$router.push({
					name: "chase",
					query: {
						id: index,
						data: item,
						classId: this.classId,
						kindId: this.callbackKindId
					}
				})
			},
			bet() {
				this.getInputValue('close');
				if(this.noClick) {
					return false;
				}
				
				this.noClick = true;
				if(this.selectModel == '1') {
					var params = quickBets({
						lotteryData: this.lotteryData[this.selectModel],
						kindId: this.kindId,
						orderFrom: "3",
						orderType: "0",
						periodNo: this.currentAwarPeriod,
						noState: true
					})
					this.quickBet(params).then((res) => {
						this.noClick = false;
						if(res.code == 0) {
							this.$dialog.toast({
								mes: '下注成功',
								timeout: 1500,
								icon: 'success'
							})
							this.teils = "投注已完成 ~"
							this.getUserDetails()
							this.saveLotteryData([])
							setTimeout(()=>{
								this.toPath()
							},1500)
						} else if(res.code == 1001) {

							this.show = false;
							this.$dialog.toast({
								mes: '扣款失败！请确认余额充足',
								timeout: 1500,
								icon: 'error',

							});

						} else {
							this.$dialog.toast({
								mes: '下注失败！请刷新后再试',
								timeout: 1500,
								icon: 'error',

							});
						}
					})
				} else {
					var params = {};
					params.lotteryId = this.kindId;
					params.orderFrom = "3";
					params.periodNo = this.currentAwarPeriod;
					params.bets = [];
					this.lotteryData[this.selectModel].forEach((item) => {
						var obj = {};
						obj.amount = Math.round(item.price * item.unite * 1000) / 1000;
						obj.content = item.selecteNum;
						obj.gameId = item.key;
						params.bets.push(obj)
					})
					this.lmpbet(params).then((res) => {
						this.noClick = false;
						if(res.code == 0) {
							this.getUserDetails();
							this.$dialog.toast({
								mes: '下注成功',
								timeout: 1500,
								icon: 'success'
							})
							this.saveLotteryData([])
							setTimeout(()=>{
								this.toPath()
							},1500)
						} else if(res.code == 1001) {
							this.show = false;
							this.$dialog.toast({
								mes: '扣款失败！请确认余额充足',
								timeout: 1500,
								icon: 'error',

							});

						} else {
							this.$dialog.toast({
								mes: '下注失败！请刷新后再试',
								timeout: 1500,
								icon: 'error',

							});
						}
					})
				}

			},
			clearList() {
				this.getInputValue('close');
				this.saveLotteryData([])
			},
			delete_single(index) {
				this.deleteLotteryData(index)
			},
			countDown() {
				this.$dialog.toast({
					mes: '第' + this.currentAwarPeriod2 + '期已停止销售',
					timeout: 1500
				});
				this.currentAwarPeriod2 = this.createChasePeriod(this.currentAwarPeriod2, 1, gameConfig[this.kindId].periodNoAll, this.kindId)
				this.updateAwarPeriod({
					currentAwarPeriod: this.currentAwarPeriod2
				})

			},
			getNoteOrAmount() {
				this.total_notes = 0;
				this.total_amount = 0;
				this.lotteryDatas.forEach((item, index) => {
					var totalPrice = item.price * item.ticketCount * item.unite
					this.total_notes += item.ticketCount;
					this.total_amount += totalPrice;
				})
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

		},
		watch: {
			lotteryData(newdata) {
			
				
				this.getNoteOrAmount()
				this.lotteryDatas = this.lotteryData[this.selectModel];
				if(newdata[this.selectModel].length==0){
                    this.option.show = false;
				}
			},
			lotteryDatas() {
				this.saveLotteryData(this.lotteryDatas)
			}
		}
	}
</script>

<style lang="less">
	.buyColorBasket {
		width: 100%;
		height: 100%;
		background: #f9f9f9;
		display: flex;
		flex-direction: column;
		.yd-spinner {
			margin: 0 0.1rem;
		}
		.yd-navbar {
			position: relative !important;
			width: 100%;
			z-index: 1000;
			background: #011935 !important;
			color: #FFFFFF;
			.yd-navbar-center-title {
				color: #FFFFFF !important;
			}
			.yd-back-icon:before,
			.yd-next-icon:before {
				color: #FFFFFF;
			}
		}
		.countdown {
			/*position: fixed;*/
			/*left: 0;*/
			background: #FFFFFF;
			width: 100%;
			top: 1rem;
			height: 1rem;
			display: flex;
			justify-content: center;
			align-items: center;
			line-height: 1rem;
			text-align: center;
			z-index: 1000;
			.title {
				display: flex;
				margin-right: 0.1rem;
				align-items: center;
				font-size: 14px;
			}
		}
		.gold {
			display: flex;
			justify-content: space-between;
			align-items: center;
			/*position: fixed;*/
			z-index: 1000;
			/*left: 0;*/
			width: 100%;
			/*top: 2rem;*/
			height: 1rem;
			background: #fff6e7;
			.yd-btn {
				background-color: #d91d36;
				margin: 0 0.2rem;
			}
			.gold_icon {
				margin-right: 0.1rem;
				font-size: 12px;
				color: #e43a45;
				display: flex;
				align-items: center;
				img {
					width: .8rem;
					height: 0.73rem;
					margin-right: 0.2rem;
				}
			}
		}
		.list {
			flex: 1;
			overflow: scroll;
			-webkit-overflow-scrolling: touch;
			/*position: absolute;*/
			width: 100%;
			/*bottom: 1.8rem;*/
			/*top: 3.2rem;*/
			.list-item {
				font-size: 14px;
				height: auto;
				min-height: 2.4rem;
				background: #FFFFFF;
				box-shadow: 1px 1px 7px 2px #aaa;
				border-bottom: 1px dotted #e6e6e6;
				display: flex;
				align-items: center;
				padding: 0 0.1rem;
				.left {
					flex: 1;
				}
				.center {
					flex: 4;
					white-space: normal;
					word-break: break-all;
					word-wrap: break-word;
				}
				.right {
					flex: 2;
					.item {
						margin-top: 0.1rem;
					}
					.yd-btn {
						margin-top: .1rem;
						width: .8rem;
						height: .5rem;
						background: #d91d36;
					}
				}
			}
		}
		.footer {
			/*position: fixed;*/
			/*bottom: 0;*/
			width: 100%;
			padding: 0 0.2rem;
			height: 1rem;
			display: flex;
			background: #011935 !important;
			justify-content: center;
			align-items: center;
			.yd-btn {
				width: 3rem;
				background: #d91d36;
			}
		}
		.order {
			z-index: 10;
			/*position: fixed;*/
			/*bottom: 1rem;*/
			width: 100%;
			display: flex;
			font-size: 12px;
			overflow: hidden;
			background: #f7f3e7;
			height: .8rem;
			opacity: .8;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.no_text {
			height: 45%;
		}
		.no_text p {
			height: 0.6rem;
			font-size: 0.3rem;
			font-weight: 700;
			color: #a8a8a8;
		}
		.no_text p:nth-child(1) {
			color: #303030;
		}
		.no_text .yd-btn {
			width: 30%;
			height: 0.6rem;
			color: #da1c36;
			font-size: 0.35rem;
			/*font-family:Gabriola;*/
		}
	}
</style>