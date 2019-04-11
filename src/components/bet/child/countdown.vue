<template>

	<span class="clock-count" :style="fontColor?{color:fontColor}:''">
		     {{timeTxt}}
		</span>

</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	import gameConfig from '../gameConfig.js'
	export default {
		data() {
			return {
				intervalId: null,
				time: 0,
				timeTxt: '00:00',
			}
		},
		mounted() {
			document.addEventListener('visibilitychange', this.addListener, false);
		},
		props: ['format', 'fontColor', 'classId', 'kindId', 'historyData'],
		computed: {
			...mapState("bet", ["currentAwarPeriod"])
		},
		created() {
			if(this.format == "chinese") {
				this.timeTxt = '00分00秒'
			}
			if(this.historyData) {
				this.time = moment(this.historyData.data.nextTime).valueOf() - moment(this.historyData.data.currentTime).valueOf();
				if(this.time <= 0) {
					clearInterval(this.intervalId)
					this.time = 0;
					this.timeTxt = '00:00';
				} else {
					this.startTime()
				}
				setTimeout(() => {
					//清除开奖数据缓存
					sessionStorage.setItem("gameInfo", null)
				}, 100)
			} else {
				//请求开奖长龙时间
				this.getWinsDragon('/' + this.kindId).then(res => {
					if(res.code == 0) {
						this.time = moment(res.data.nextTime).valueOf() - moment(res.data.currentTime).valueOf();
						if(this.time <= 0) {
							clearInterval(this.intervalId)
							this.time = 0;
							this.timeTxt = '00:00';
						} else {
							this.startTime()
						}
					}
				})
			}
		},
		destroyed() {
			document.removeEventListener('visibilitychange', this.addListener, false)
		},
		methods: {
			...mapActions('bet', [
				"getWinsDragon",
				"getTimes"
			]),
			addListener() {
				if(document.hidden) {} else {
					//请求开奖长龙时间
					this.getWinsDragon('/' + this.kindId).then(res => {
						if(res.code == 0) {
							this.time = moment(res.data.nextTime).valueOf() - moment(res.data.currentTime).valueOf();
							if(this.time <= 0) {
								clearInterval(this.intervalId)
								this.time = 0;
								this.timeTxt = '00:00';
							} else {
								this.startTime()
							}
						}
					})
				}

			},
			startTime() {
				var awarPeriod;
				if(this.intervalId != null) {
					clearInterval(this.intervalId)
				}
				this.timeTxt = this.timeFormat(this.time);
				this.intervalId = setInterval(() => {

					//					if(this.kindId == 'cqssc') {
					//						console.log(this.currentAwarPeriod)
					//					}
					this.time -= 1000
					if(this.time <= 0) {
						if(this.kindId == 'cqssc') {
							var currentAwarPeriod = this.currentAwarPeriod.slice(8);
							if(currentAwarPeriod * 1 == gameConfig[this.kindId].periodNoAll) {
								this.$emit('stop')
								this.time = gameConfig[this.kindId].midleTime * 1000 * 2
							} else {
								this.$emit('stop')
								this.time = gameConfig[this.kindId].midleTime * 1000
							}
						} else {
							this.$emit('stop')
							this.time = gameConfig[this.kindId].midleTime * 1000
						}

					}
					this.timeTxt = this.timeFormat(this.time);
				}, 1000)
			},
			// 时间戳转换成时间格式
			timeFormat(time) {
				var dates = moment.duration(time).days(),
					hours = moment.duration(time).hours(),
					minutes = moment.duration(time).minutes(),
					seconds = moment.duration(time).seconds()
				dates.toString().length < 2 ? dates = 0 + "" + dates : dates = dates;
				hours.toString().length < 2 ? hours = 0 + "" + hours : hours = hours;
				minutes.toString().length < 2 ? minutes = 0 + "" + minutes : minutes = minutes;
				seconds.toString().length < 2 ? seconds = 0 + "" + seconds : seconds = seconds;
				if(this.format == ':') {
					if(time > 86400000) {
						return dates + ':' + hours + ':' + minutes + ':' + seconds
					} else if(time > 3600000) {
						return hours + ':' + minutes + ':' + seconds
					} else {
						return minutes + ':' + seconds
					}
				} else if(this.format == 'chinese') {
					if(time > 86400000) {
						return dates + '天' + hours + '时' + minutes + '分' + seconds + '秒'
					} else if(time > 3600000) {
						return hours + '时' + minutes + '分' + seconds + '秒'
					} else {
						return minutes + '分' + seconds + '秒'
					}
				}
			},
		},
		watch: {
			kindId() {
				if(this.historyData) {
					this.time = moment(this.historyData.data.nextTime).valueOf() - moment(this.historyData.data.currentTime).valueOf();
					if(this.time <= 0) {
						clearInterval(this.intervalId)
						this.time = 0;
						this.timeTxt = '00:00';
					} else {
						this.startTime()
					}
					setTimeout(() => {
					//清除开奖数据缓存
					sessionStorage.setItem("gameInfo", null)
				}, 100)
				} else {
					//请求开奖长龙时间
					this.getWinsDragon('/' + this.kindId).then(res => {
						if(res.code == 0) {
							this.time = moment(res.data.nextTime).valueOf() - moment(res.data.currentTime).valueOf();
							if(this.time <= 0) {
								clearInterval(this.intervalId)
								this.time = 0;
								this.timeTxt = '00:00';
							} else {
								this.startTime()
							}
						}
					})

				}
			}

		}
	}
</script>

<style>
	@font-face {
		font-family: clock-number;
		src: url(../../../../fonts/LED.eot?) format("eot");
		src: url(../../../../fonts/LED.woff) format("woff"), url(../../../../fonts/LED.ttf) format("truetype")
	}
	
	.clock-count {
		/*width: 100%;*/
		display: flex;
		align-items: center;
		white-space: nowrap !important;
		font-size: 26px;
		/*line-height: 35px !important;*/
		border-radius: 4px !important;
		text-align: center !important;
		font-family: clock-number, "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
	}
	
	.clock-count {
		font-size: 14px;
		color: rgb(228, 58, 69);
	}
</style>