<template>
	<div></div>
</template>
<script>
   var str = window.location.origin;
//    const baseUrl = str;
//    const baseUrl = "http://192.168.0.179:8900";
//const baseUrl = "http://localhost:8081";
//  const baseUrl = "http://fly.pxklos.com"
 const baseUrl = 'https://www.9txmh.net'
//   const baseUrl = "http://202.153.198.80:8081";//服务器地址
//const baseUrl = "http://192.168.0.56:8081";//本地开发地址(钟)
// const baseUrl = str; //本地开发地址(服务器)
// const baseUrl = "http://192.168.0.33:8083"; //本地开发地址(陈宁)
// const baseUrl = "http://192.168.0.119:9090"; //本地开发地址(啊碎)
// const chart_baseUrl = "http://localhost:6789";
	//   const chart_baseUrl = str //聊天室服务器
	// const chart_baseUrl = "http://192.168.0.179:8900";
//const chart_baseUrl = "http://192.168.0.56:6789";
//const chart_baseUrl="http://zxcswveveda.pxklos.com:6789"
// const chart_baseUrl="http://fly.pxklos.com"
const chart_baseUrl = 'https://www.9txmh.net'

//   const chart_baseUrl = "http://202.153.198.80:6789";//聊天室服务器
// const chart_baseUrl = str;//聊天室服务器
// const chart_baseUrl = "http://192.168.0.119:6789";
// const chart_baseUrl = "http://192.168.0.101:6789"; //本地开发地址
// const serverUrl = 'https://janus.pxklos.com:8089/janus' // janus服务地址
// 时间格式化  yyyy-mm-dd
function timeFormate(now) {
    var year = new Date(now).getFullYear();
    var month = new Date(now).getMonth() + 1;
    var date = new Date(now).getDate();
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    return year + "-" + month + "-" + date;
}
// 时:分:秒
function _time(now) {
    var hour = new Date(now).getHours();
    var min = new Date(now).getMinutes();
    var sec = new Date(now).getSeconds();
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    return hour + ":" + min + ":" + sec;
}
// 起始时间与终止时间
var time = {
    timeStart: timeFormate(new Date()),
    timeEnd: timeFormate(new Date()),
    today: timeFormate(new Date())
};
//记录类型
var type = "1";
// const BankNo = ['qqpay', 'alipay', 'weixinpay', 'weixin_scan', 'qq_scan'];
const BankNo = [
    "QQPAY",
    "ALIPAY",
    "WEIXINPay",
    "weixin_scan",
    "qq_scan",
    "direct_pay",
    "alipay_scan",
    'union_quick',//银联快捷
    'jd_scan',//京东扫码
    'union_scan'//银联扫码
];

	//时间处理(模拟qq)
	function _timeFormate(time, type) {
		var weekday = Array.of(
			"星期天",
			"星期一",
			"星期二",
			"星期三",
			"星期四",
			"星期五",
			"星期六"
		);
		if(new Date(time).getDate() === new Date().getDate()) {
			return _time(time).slice(0, -3);
		} else if(
			new Date(time).getDate() ==
			new Date(new Date().getTime() - 1 * 24 * 3600 * 1000).getDate()
		) {
			if(type === "1") {
				return "昨天";
			} else if(type === "2") {
				return "昨天 " + _time(time).slice(0, -3);
			}
		} else if(
			new Date(new Date().getTime() - 7 * 24 * 3600 * 1000).getTime() <
			new Date(time).getTime() <
			new Date(new Date().getTime() - 1 * 24 * 3600 * 1000).getTime()
		) {
			if(type === "1") {
				return weekday[new Date(time).getDay()];
			} else if(type === "2") {
				return(
					weekday[new Date(time).getDay()] +
					" " +
					_time(time).slice(0, -3)
				);
			}
		} else {
			if(type === "1") {
				return timeFormate(time);
			} else if(type === "2") {
				return timeFormate(time) + " " + _time(time).slice(0, -3);
			}
		}
	}
	var _timer;
	export default {
		time,
		timeFormate,
		baseUrl,
		type,
		_time,
		BankNo,
		chart_baseUrl,
		_timeFormate,
		_timer,
		// serverUrl
	};
</script>
<style>

</style>