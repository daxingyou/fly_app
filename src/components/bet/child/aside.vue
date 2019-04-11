<template>
	<div class="asideI">
		<div class="asideI_herd">
            系统菜单
        </div>
        <div class="asideI_list">
            <div  @click="toPash('/redPacket')">
               <img class="img_top" src="../../../../static/img/personal/recharge/play.png" alt="">
                <span >游戏大厅</span> 
            </div>
            <div class="kindList"  v-for="(item,index) in kindNameList"   @click="goBettingHall(classId[index],kindIdList[index])">
                <img :src="'../../../../static/img/logo/'+kindIdList[index]+'.png'" alt="">
                <span :value="kindIdList[index]">{{item}}</span>
            </div>
            <div v-if="userDetails.hierarchy != '0'" v-for="(item,index) in hotSport"  @click="judgeAddress(item.id,item.url,item.name)"  >
                <img :src='item.img' alt="">
                <span >{{item.name}}</span>
            </div>
        </div>
         <!-- <a  ref="goSport" :href = URL_bn target="_blank" style="display: none"></a> -->
        <a  ref="goSport_sb" :href = 'hotSport[0].url' target="_blank" style="display: none"></a>
        <a  ref="goSport_ag" :href = 'hotSport[1].url' target="_blank" style="display: none"></a>
        <a  ref="goSport_bn" :href = 'hotSport[2].url' target="_blank" style="display: none"></a>
        <a  ref="goSport_fl" :href = 'hotSport[3].url' target="_blank" style="display: none"></a>
	</div>
</template>
<script>
    import { mapState, mapActions, mapMutations } from "vuex";
	export default {
		data(){
            return {
                kindNameList:[],
                kindlist:[],
                kindIdList:[],
                classId:[],
                URL_fl:'',
                URL_sb:'',
                URL_ag:'',
                URL_bn:'',
                URL_pt:'',
                hotSport:[
                    {
                        name:'申博',
                        img:'../../../../../static/img/personal/recharge/tgp_t3d.jpg',
                        id:'sb_sb',
                        url:""
                    },
                    {
                        name:'AG',
                        img:'../../../../../static/img/personal/recharge/AG.png',
                        id:'ag_ag',
                        url:""
                    },
                    {
                        name:'Bbin',
                        img:'../../../../../static/img/personal/recharge/logo.png',
                        id:'bn_bn',
                        url:""
                    },
                    {
                        name:'棋牌游戏',
                        img:'../../../../../static/img/personal/recharge/feifan.png',
                        id:'fl_fl',
                        url:""
                    },
                    // {
                    //     name:'PT',
                    //     img:'../../../../../static/img/personal/recharge/pt.png',
                    //     id:'pt_pt'
                    // },
                ]
            }
        },
        created(){
        //    this._kind();
        //     this.goUrl('sb_sb','0');
        //     this.goUrl('ag_ag','1');
        //     this.goUrl('bn_bn','2');
        //     this.goUrl('pt_pt','3');
        //     this.goUrl('fl_fl','4');
        },
        computed:{
            ...mapState('login', [
				'userDetails'
			]),
        },
        methods:{
            ...mapActions('home',[
                'kind',
            ]),
            ...mapMutations('bet', [
				"setClassId",
				"setKindId",
				'cacheHistoryData',
				"setModelType",
				"saveLotteryData"
            ]),
            ...mapActions('home',['balance','amountOut','open','register','withdrawal','moneySwitch']),
            
             // 获取所有彩种
            _kind(){
                var that = this;
                this.kind().then((res) => {
                    var list = res.data;
                    // console.log(list,'00000')
                    list.forEach((item) => {
                    that.kindlist = item.kindList;
                    // console.log(that.kindlist,'3333')
                        that.kindlist.forEach((iv) => {
                            iv.classId=item.classId;
                            that.kindNameList.push(iv.kindName);
                            that.kindIdList.push(iv.kindId)
                            that.classId.push(iv.classId)
                        })
                    })
                    // console.log(that.kindNameList,'595959');
                    // console.log(that.kindIdList);
                    // console.log(that.classId)
                })
            },
            //跳转到相应的投注页面
			goBettingHall(classId,kindId) {
                // console.log(classId,kindId)
                var path = '/bet/';
				if(classId=='2'){
					path = '/hk6bet/'
				}
				var that = this;
				if(that.isLogin == false) {
					that.$dialog.toast({
						mes: '未登录',
						timeout: 1000,
						// icon: 'success'
					});
				} else {
					this.$http.get(this.global.baseUrl + '/inter/ticket/winsDragon/' + kindId, {
						timeout: 500
					}).then((res) => {
//						this.cacheHistoryData(res.data)
						this.$router.push({
							path: path + classId + '/' + kindId,
						})
					}).catch((error) => {
						if(error.response) {} else if(error.request) {
							if(error.request.readyState == 4 && error.request.status == 0) {
//								this.cacheHistoryData(null)
								this.$router.push({
									path: path + classId + '/' + kindId,
								})
							}
						} else {
							console.log('Error', error.message);
						}
					})
					if(JSON.parse(sessionStorage.getItem(kindId))){
						var obj = {};
						var kindList = JSON.parse(sessionStorage.getItem(kindId))
						kindList.forEach((item)=>{
							item.gameSons.forEach((item2)=>{
								obj[item2.subGameId] = item2.odd;
							})
							
						})
					}
					sessionStorage.setItem('classId', JSON.stringify(classId));
					sessionStorage.setItem('kindId', JSON.stringify(kindId));
					sessionStorage.setItem('prevPath', "/allKinds");
					 that.setClassId(classId)
					 that.setKindId(kindId)
					// that.$router.push({name:'bet'})

				}

            },
             // 请求三方地址
                goUrl(id,index){
                    this._register(id)
                    this.open({
                    mobile: "yes",
                    platform: id
                    }).then( res => {
                    if(res.code == 0){
                        if(id == 'sb_sb'){
                        this.hotSport[0].url = res.data;
                        }else if(id == 'ag_ag'){
                        this.hotSport[1].url = res.data;
                        }else if(id == 'bn_bn'){
                        this.hotSport[2].url = res.data;
                        }else if(id == 'fl_fl'){
                        this.hotSport[3].url = res.data;
                        }else if(id == 'pt_pt'){
                        this.hotSport[4].url = res.data;
                        }
                        
                    }
                    })
                    // console.log(this.hotSport,'333')
                },
                 //判断是否请求到体育地址
            judgeAddress(id,url,name){
                // console.log(id,url,name)
                this.goUrl(id);
                var that = this;
                if(url == ''){
                    that.$dialog.alert({mes:'您好，我们的热'+name+'网站正在维护中，请稍后再试!'});
                }else {
                if(id == 'fl_fl'){
                    that.URL_bn = this.hotSport[3].url;
                    that.$refs.goSport_fl.click();
                }else if(id == 'sb_sb'){
                    that.URL_bn = this.hotSport[0].url;
                    that.$refs.goSport_sb.click();
                }else if(id == 'ag_ag'){
                    that.URL_bn = this.hotSport[1].url;
                    that.$refs.goSport_ag.click();
                }else if(id == 'bn_bn' ){
                    that.URL_bn = this.hotSport[2].url;
                    that.$refs.goSport_bn.click();
                }
                // else if(id == 'pt_pt'){
                //     that.gameLogin(1,id)
                // }
                // that.$refs.goSport.click();
                
                }
            },
             // 三方账户注册
            _register(id){
                if(id != 'sb_sb' || id != 'fl_fl'){
                this.register({
                    platform: id
                }).then( res => {

                })
                }
            },
            toPash(name) {
			this.$router.push({
						path: name
					})	
					
			},
        }
	}
</script>

<style lang="less">
.asideI{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .asideI_herd{
        width: 35%;
        height: 1rem;
        position: fixed !important;
        top: 0;
        left: 0;
        background: #011935 !important;
        color: #fff;
        font-size: 0.42rem;
        text-align: center;
        z-index: 100;
        line-height: 1rem;
        box-sizing: border-box;
        border-bottom: 1px solid #fff;
    }
    .asideI_list{
        padding-top: 1rem;
        flex: 1;
        overflow: scroll;
        overflow-y: auto;
        background: #fff;
        -webkit-overflow-scrolling: touch; // 苹果手机上下滑动卡顿
        color: #666;
        div{
            // font-size: 0.29rem;
            height: 0.8rem;
            text-align: center;
            line-height: 0.8rem;
            border-bottom: 1px solid #c5c5c5;
            border-right: 1px solid #c5c5c5;
            img{
                float: left;
                width: 0.55rem;
                height: 0.55rem;
                border-radius: 100%;
                margin: 0.125rem 0.15rem;
            }
            .img_top{
                margin: 0.125rem 0.125rem;
            }
            span{
                float: left;
                min-width: 1.2rem;
                text-align: left;
                // white-space:nowrap;
                // font-weight: 900;
                font-size: 12px;
            }
        }
        .kindList{
            img{
                width: 0.65rem;
                height: 0.65rem;
                margin: 0.05rem;
            }
        }
        
    }
}
</style>
