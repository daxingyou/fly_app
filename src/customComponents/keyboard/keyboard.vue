<template>
	<div class="keyboard" v-show="showKeyboard" v-clickoutside="closeModal">
		
		<p class="sel_times_p">
			<i @touchstart="clickKey('10','qk')"  class="sel_times">{{option.type=='a'?'追10期':'投10倍'}}</i>
			<i @touchstart="clickKey('500','qk')"  class="sel_times">{{option.type=='a'?'追500期':'投500倍'}}</i>
			<i @touchstart="clickKey('1000','qk')"  class="sel_times">{{option.type=='a'?'追1000期':'投1000倍'}}</i>
		</p>
		<p v-for="keys in keyList" :key="keys">
			<template v-for="key in keys">
				<i @touchend.prevent="clickKey(key)" :key="key" >{{key}}</i>
			</template>
		</p>
	</div>
</template>

<script>
	import clickoutside from '../../directives/clickoutside'
	export default {
		directives: {
			clickoutside
		},
		data() {
			return {
				keyList: [],
				lowercase: [
					['1', '2', '3'],
					['4', '5', '6'],
					['7', '8', '9'],
					['确定', '0', '删除']
				],
				equip: !!navigator.userAgent.toLocaleLowerCase().match(/ipad|mobile/i) //是否是移动设备
			}
		},
		props: {
			option: {
				type: Object
			}
		},
		computed: {
			showKeyboard() {
				return this.option.show
			}
		},

		mounted() {
			this.keyList = this.lowercase
		},

		methods: {
			tabHandle(value) {
				if(value === 'delete') {
					this.emitValue('delete')
				} else if(value === 'close') {
					this.emitValue('close')
				} else if(value === 'clear') {
					this.emitValue('clear')
				} else {
					this.emitValue(value)
				}
			},

			clickKey(times,qk) {
//				if(event.type === 'click' && this.equip) return
				var value = event.srcElement.innerText
				
				if(value === "删除") {
					this.tabHandle('delete')
				} else if(value === "确定") {
					this.tabHandle('close')
				} else {
				if(qk){
					this.emitValue(times,'qk')
				}else{
					this.emitValue(times)
				}
				}
			},

			emitValue(key,qk) {
				qk?this.$emit('keyValQk', key):this.$emit('keyVal', key);
				
			},
			closeModal(e) {
				if(e.target !== this.option.sourceDom) {
//					this.emitValue('close')
				}
			}
		}
	}
</script>
<style scoped lang="less">
	.keyboard {
		width: 100%;
		margin: 0;
		font-size: 18px;
		border-radius: 2px;
		background-color: #e5e6e8;
		user-select: none;
		position: relative;
		z-index: 9999;
		pointer-events: auto;
		p {
			margin: 0 auto;
			height: .8rem;
			display: flex;
			display: -webkit-box;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: center;
			i {
				border-left:  1px solid #bfbfbf;
				border-top:  1px solid #bfbfbf;
				display: block;
				height: .8rem;
				/*margin: .1rem;*/
				line-height: .8rem;
				font-style: normal;
				font-size: 24px;
				/*border-radius: 3px;*/
				width: 1rem;
				background-color: #fff;
				text-align: center;
				flex-grow: 1;
				flex-shrink: 1;
				flex-basis: 0;
				-webkit-box-flex: 1;
				&:active {
					background-color: darken(#ccc, 10%);
				}
			}
			
			
		}
		.sel_times_p{
			margin: 0 auto;
			height: 1rem;
				.sel_times{
				border:1px solid #bfbfbf;
				border-radius: 3px;
				height: .6rem;
				line-height: .6rem;
				display: block;
				margin: 0.2rem;
				font-size: 20px;
				background: #ffffff -webkit-gradient(radial, 60 60, 60, 50 120, 0, from(ivory), to(rgba(255, 255, 255, 0.6)));
			}
			}
	}
	
</style>