<template>
	<div class="menu" v-show="show">
		<div class="vux-tab" v-if="showMenu">
			<div :class="selectModel=='1'?'vux-tab-item vux-tab-selected':'vux-tab-item'" style="border-width: 1px;">
				<div flex="cross:center main:center" @click="selectModelType('1')">
					官方玩法
				</div>
			</div>
			<div :class="selectModel=='2'?'vux-tab-item vux-tab-selected':'vux-tab-item'" style="border-width: 1px;">
				<div flex="cross:center main:center" @click="selectModelType('2')">
					两面盘
				</div>
			</div>
		</div>
		<div v-if="selectModel==1">
			<div :class="show?'overlay show':'overlay hide'" @click.stop="closeAside"></div>
			<ul class="level_1">
				<li v-for="(item1,index1) in standGameList" :key="index1" :class="selected_index1===index1?'selected_one':''" v-if="item1.gameId!='nn'" @click="selectLevelOne(index1,item1.gameId,item1.gameName)">{{item1.gameName}}</li>
			</ul>
			<div class="level_2" v-for="(val, key,index2) of standGameList[selected_index1].gameSons[0]" :key="index2" v-if="specialGameId.indexOf(standGameList[selected_index1].gameId)==-1&&standGameList[selected_index1].gameId!='4010'&&standGameList[selected_index1].gameId!='4012'">
				<div class="leftTitle">{{key}}</div>
				<ul class="rightList">
					<li v-for="(item3,index3) in val" @click="selectLevelTwo(item3.leftName,item3.rightName,item3.subGameId,index2,index3)" :class="selected_index2===index2&&selected_index3===index3?'selected_two':''">{{item3.rightName}}</li>
				</ul>
			</div>
			<div class="level_2" v-for="(item2,index2) in standGameList[selected_index1].gameSons" :key="index2" v-if="specialGameId.indexOf(standGameList[selected_index1].gameId)!=-1&&standGameList[selected_index1].gameId!='4010'&&standGameList[selected_index1].gameId!='4012'">
				<div class="leftTitle">{{standGameList[selected_index1].gameName}}</div>
				<ul class="rightList">
					<li v-for="(val3, key3,index3) of standGameList[selected_index1].gameSons[0]" @click="selectLevelTwo(val3[0].leftName,val3[0].rightName,val3[0].subGameId,index2,index3)" :class="selected_index2===index2&&selected_index3===index3?'selected_two':''">{{val3[0].leftName}}</li>
				</ul>
			</div>
		</div>
		<div v-if="selectModel==2" style="height:3.2rem;">
			<div :class="show?'overlay show':'overlay hide'" @click.stop="closeAside"></div>
			<ul class="level_1" >
				<li v-for="(item,index) in menu_list[classId]" :class="selected_lmp_index==index?'selected_one':''" @click="onSelectlmpIndex(index,item.title,item.showId)">{{item.title}}</li>
			</ul>
		</div>

	</div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	import { menu_list } from "../../../../static/js/lmp_menulist.js";
	import { createNmubers_lmp } from "../../../../static/js/createNmubers_lmp.js";
	import { renderingData } from "../bet.js";
	import { bus } from "../bus.js";
	export default {
		props: ["show", "standGameList", "standGameList2"],
		data() {
			return {
				showMenu: false,
				showId: '',
				menu_list: menu_list,
				selected_index1: 0,
				selected_index2: 0,
				selected_index3: 0,
				selected_lmp_index: 0,
				specialGameId: ["4001", "3014", "6005", "2003", "2005", "2006", "2008", '2007'],
			}
		},
		created() {
			bus.$off('changeShowId')
			bus.$on("changeShowId",(obj)=>{
				this.onSelectlmpIndex(obj.index,obj.title,obj.showId)
			})
			bus.$on("selectModelType",(type)=>{
				this.selectModelType(type)
			})
			if(this.classId == '3' || this.classId == '6') {
					this.showMenu = true
				} else {
					this.showMenu = false
				}
			if(this.selectModel=='2'){
				this.selected_lmp_index = 0;
			}
		},
		computed: mapState("bet", ["newNumbers", "ticketCount", "selectModel", "classId", "kindId"]),
		methods: {
			...mapActions("bet", ["getGamePlayList", "getSubGames"]),
			...mapMutations("bet", ["saveDataOrSubGameList", "setModelType", "saveSubGameList", "saveLmpData"]),
			selectModelType(type) {
				this.setModelType(type);
				if(type == '1') {
					this.selected_index1 = 0;
					this.selected_index2 = 0;
					this.selected_index3 = 0;
				} else {
					this.selected_lmp_index = 0;
				}
				
			},
			selectLevelOne(index, gameId, gameName) {
				this.selected_index1 = index;
				this.selected_index2 = 0;
				this.selected_index3 = 0;
				this.gameId = gameId;
				this.gameName = gameName
				this.leftName = this.standGameList2[index].gameSons[0].leftName;
				this.rightName = this.standGameList2[index].gameSons[0].rightName;
				this.subGameId = this.standGameList2[index].gameSons[0].subGameId;
				this.gamePlayList = this.standGameList2[this.selected_index1];
				this.$emit("changeSubGame", {
					leftName: this.leftName,
					rightName: this.rightName,
					subGameId: this.subGameId,
					gameName: this.gameName,
					gameId: this.gameId,
					gamePlayList: this.gamePlayList
				})
			},
			selectLevelTwo(leftName, rightName, subGameId, index2, index3) {
				this.selected_index2 = index2;
				this.selected_index3 = index3;
				this.leftName = leftName;
				this.rightName = rightName;
				this.subGameId = subGameId;
				this.gamePlayList = this.standGameList2[this.selected_index1];
				this.$emit("changeSubGame", {
					leftName: leftName,
					rightName: rightName,
					subGameId: subGameId,
					gameName: this.gameName,
					gameId: this.gameId,
					gamePlayList: this.gamePlayList
				})
				this.$emit("close")
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
					item1.gameSons.forEach((obj) => {
						var array = c[obj['leftName']] || [];
						array.push(obj);
						c[obj['leftName']] = array;

					})
					b.push(c);
					obj.gameSons = b;
					if(this.specialGameId.indexOf(obj.gameId) != -1) {
						for(var key in obj.gameSons[0]) {
							var leftName = '';
							var ary = [];
							obj.gameSons[0][key].forEach((item2, index2) => {
								if(item2.leftName != leftName) {
									ary.push(item2)
									leftName = item2.leftName
								}
							})
							obj.gameSons[0][key] = ary
						}
					}
					newData.push(obj)
				})
				return newData
			},
			onSelectlmpIndex(index, gameName, showId) {
				this.selected_lmp_index = index;
				this.showId = showId;
				var gameName1 = gameName;
				var gameId = this.standGameList[0].gameId;
				var leftName = "";
				var rightName = "";
				var subGameId = this.standGameList2[0].gameSons[0].subGameId;
				var betDataList = createNmubers_lmp(this.classId, this.showId);
				
				var data = {
					leftName: leftName,
					rightName: rightName,
					subGameId: subGameId,
					gameName: gameName1,
					gameId: gameId,
					betDataList: betDataList,
				}
				this.saveLmpData(data)
				this.$emit("initStyle")
                bus.$emit("showId",showId)
				this.$emit("close")
			},
			//获取对象的长度
			countProperties(obj) {
				var count = 0;
				for(var property in obj) {
					if(Object.prototype.hasOwnProperty.call(obj, property)) {
						count++;
					}
				}
				return count;
			},
			setDataOrSubGameList(res, res2) {
				var data = {};
				data.betDataList = res.data;
				data.subGameList = res.subGameList;
				data.newNumbers = this.newNumbers;
				data.ticketCount = this.ticketCount;
				data.leftName = res.leftName;
				data.rightName = res.rightName;
				data.subGameId = res.subGameId;
				data.gamePlayList = res2.gamePlayList;
				data.gameId = res2.gameId;
				data.gameName = res2.gameName
				this.saveDataOrSubGameList(data)
			},
			closeAside() {
				this.$emit("close")
			}

		},
		watch: {
			kindId() {
				this.selected_index1 = 0;
				this.selected_index2 = 0;
				this.selected_index3 = 0;
				

			},
			classId() {
				if(this.classId == '3' || this.classId == '6') {
					this.setModelType('1');
					this.showMenu = true
				} else {
					this.setModelType('1');
					this.showMenu = false
				}
			}
		}

	}
</script>

<style lang="less">
	.menu {
		width: 100%;
		min-height: 4rem;
		max-height: 7rem;
		overflow: scroll;
		/*-webkit-overflow-scrolling: touch;*/
		position: fixed;
		top: 45px;
		left: 0;
		background: #f7f7f7;
		z-index: 1001;
		border-bottom: 1px solid #ff5151;
		.vux-tab {
			display: flex;
			background-color: #fff;
			height: 0.8rem;
			padding-top: 0.1rem;
			line-height: 0.7rem;
			font-size: 14px;
			color: #5c5c5c;
			border-bottom: 1px solid #ff5151;
		}
		.vux-tab .vux-tab-item {
			display: block;
			-webkit-box-flex: 1;
			-webkit-flex: 1;
			flex: 1;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			background: -webkit-linear-gradient(top, #e5e5e5, #e5e5e5, hsla(0, 0%, 90%, 0)) 0 100% no-repeat;
			background: linear-gradient(180deg, #e5e5e5, #e5e5e5, hsla(0, 0%, 90%, 0)) 0 100% no-repeat;
			background-size: 100% 1px;
			font-size: 14px;
			text-align: center;
			color: #666;
		}
		.vux-tab .vux-tab-item {
			position: relative;
			background: none;
			height: 0.71rem;
			line-height: 0.7rem;
			border-top-left-radius: 7px;
			border-top-right-radius: 7px;
		}
		.vux-tab .vux-tab-item.vux-tab-selected {
			height: 0.7rem;
			margin-left: 0.1rem;
			margin-right: 0.1rem;
			color: #ff5151;
			background: #f7f7f7;
			border: 1px solid #ff5151;
			border-bottom: none;
			box-sizing: border-box;
		}
		.level_1 {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			margin-bottom: 0.1rem;
			li {
				width: 1.59rem;
				height: 0.7rem;
				display: inline-block;
				margin: 0.1rem 0.14rem;
				line-height: 0.7rem;
				font-size: 14px;
				color: #5c5c5c;
				text-align: center;
				border-radius: 2px;
				background: #fff;
			}
			.selected_one {
				color: #ffffff;
				background: #ff5151;
			}
		}
		.level_2 {
			padding: 0.2rem 0.1rem;
			display: flex;
			background: #FFFFFF;
			align-items: center;
			border-bottom: 1px solid #e6e6e6;
			.leftTitle {
				height: 0.6rem;
				padding: 0 0.1rem;
				font-size: 14px;
				line-height: 0.6rem;
				border: 1px solid #FFFFFF;
				color: #5c5c5c;
			}
			.rightList {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				flex: 1;
				li {
					font-size: 14px;
					height: 0.6rem;
					width: 1.8rem;
					text-align: center;
					/*padding: 0 0.14rem;*/
					line-height: 0.6rem;
					color: #9b9b9b;
					border-radius: 2px;
					margin: 0.1rem 0.06rem;
					border: 1px solid #e6e6e6;
				}
				.selected_two {
					color: #ff5151;
					border: 1px solid #ff5151;
				}
			}
		}
		.overlay.hide {
			opacity: 0;
			visibility: hidden;
		}
		.overlay.show {
			visibility: visible;
		}
		.overlay.show {
			opacity: 0;
		}
		.overlay {
			position: fixed;
			background-color: rgba(55, 55, 55, .7);
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 2;
			-webkit-transition: all .2s ease-in-out;
			-o-transition: all .2s ease-in-out;
			transition: all .2s ease-in-out;
			cursor: pointer;
		}
		.overlay {
			height: 100%;
			top: 0px;
			z-index: -1;
		}
	}
</style>