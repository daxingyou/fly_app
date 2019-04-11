import { request } from "../../../utils/request.js"
export default {
	namespaced: true,
	state: {
		classId: "",
		kindId: "",
		leftName: "",
		rightName: "",
		subGameId: "",
		gameName: "",
		gameId: "",
		ticketCount: 0,
		newNumbers: [],
		gamePlayList: [],
		standGameList: [],
		lotteryData: {
			'1': [],
			'2': [],
		},
		currentAwarPeriod: '',
		prevAwarPeriod: '',
		dragons: [],
		hotCold: [],
		omit: [],
		winList: [],
		subGameList: [],
		betDataList: {},
		standGameLists: {},
		historyData: null,
		selectModel: '1',
		betDataList_lmp: [],
		twoGameOddList: {},
		orderPrompt: 'true',
		defaultPrice: '',
		times: {},
	},
	getters: {},
	mutations: {
		setDefaultPrice(state, data) {
			state.defaultPrice = data;
		},
		setGamePlayList(state, data) {
			state.gamePlayList = data;
		},
		clearStyle_lmp(state) {
			state.betDataList_lmp.forEach((item1) => {
				item1.groups.forEach((item2) => {
					item2.selected = false
				})
			})
		},
		setOrderPrompt(state, data) {
			state.orderPrompt = data;
		},
		setBetDataList(state, data) {
			state.betDataList_lmp[data.index1].groups[data.index2].selected = !state.betDataList_lmp[data.index1].groups[data.index2].selected
		},
		saveGameName(state, data) {
			state.gameName = data;
		},
		saveLmpData(state, data) {
			state.leftName = data.leftName;
			state.rightName = data.rightName;
			state.subGameId = data.subGameId;
			state.gameName = data.gameName;
			state.gameId = data.gameId;
			state.betDataList_lmp = data.betDataList;
		},
		setModelType(state, data) {
			state.selectModel = data;
		},
		cacheHistoryData(state, data) {
			state.historyData = data
		},
		setClassId(state, classId) {
			state.classId = classId;
		},
		setKindId(state, kindId) {
			state.kindId = kindId;
		},
		saveStandGameList(state, obj) {
			state.standGameLists[obj.kindId] = obj.standGameList
		},
		setBetOrder(state, obj) {
			state.ticketCount = obj.ticketCount;
			state.newNumbers = obj.newNumbers;
		},
		saveGamePlayList(state, obj) {
			state.standGameList = obj
		},
		saveDataOrSubGameList(state, obj) {
			state.betDataList = obj.betDataList;
			state.newNumbers = obj.newNumbers;
			state.leftName = obj.leftName;
			state.rightName = obj.rightName;
			state.subGameId = obj.subGameId;
			state.gameName = obj.gameName;
			state.gameId = obj.gameId;
			state.gamePlayList = obj.gamePlayList
		},
		saveSubGameList(state, data) {
			state.subGameList = data
		},
		getWinsDragon(state, data) {
			state.currentAwarPeriod = data.winList[0] ? data.winList[0].awarPeriod : null;
			state.prevAwarPeriod = data.winList[1] ? data.winList[1].awarPeriod : null;
			state.dragons = data.dragons;
			state.hotCold = data.hotCold;
			state.omit = data.omit;
			state.winList = data.winList
		},
		// 购彩蓝
		saveLotteryData(state, data) {
			state.lotteryData[state.selectModel] = data;
			state.lotteryData = Object.assign({}, state.lotteryData)
		},
		updateAwarPeriod(state, obj) {

			obj.currentAwarPeriod ? state.currentAwarPeriod = obj.currentAwarPeriod : null;
			obj.prevAwarPeriod ? state.prevAwarPeriod = obj.prevAwarPeriod : null;
		},
		deleteLotteryData(state, index) {
			state.lotteryData[state.selectModel].splice(index, 1)
		},
		saveTwoGameOdd(state, data) {
			state.twoGameOddList = data;
		},
	},
	actions: {
		getTwoGameOdd({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				var res = request('get', 'twoGameOdd', params).then((res) => {
					commit("saveTwoGameOdd", res.data)
					resolve(res)
				})
			})
		},
		getGamePlayList({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				var res = request('get', 'getGamePlayList', params).then((res) => {
					commit("saveGamePlayList", res.data.standGameList)
					resolve(res)
				})
			})
		},
		getSubGames({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				var res = request('post', 'getSubGames', params).then((res) => {
					resolve(res)
				})
			})
		},
		getWinsDragon({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				var res = request('get', 'getWinsDragon', params).then((res) => {
					commit("getWinsDragon", res.data)
					resolve(res)
				})
			})
		},
		recentOpenCode({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				var res = request('get', 'recentOpenCode', params).then((res) => {
					resolve(res)
				})
			})
		},
		quickBet({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				var res = request('post', 'chipIn', params).then((res) => {
					resolve(res)
				})
			})
		},
		lmpbet({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				var res = request('post', 'twoBet', params).then((res) => {
					console.log(res)
					resolve(res)
				})
			})
		},
		getTimes({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				var res = request('get', 'getTimes', params).then((res) => {
					resolve(res)
				})
			})
		},
		getSubGames({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				var res = request('post', 'getSubGames', params).then((res) => {
					resolve(res)
				})
			})
		},

	}
}