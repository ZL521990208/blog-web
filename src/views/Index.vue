<template>
	<div>
 
		<div class="banner">
			<transition-group tag="ul" class="slide-ul" name="slide">
				<li v-for="(item,index) in slideList"
				 :key="index"
				  v-show="index===currentIndex" 
				  @mouseenter="stop"
				   @mouseleave="go">
					<a :href="item.url">
						<img :src="item.image" :alt="item.description">
					</a>
				</li>
			</transition-group>
			<div class="carousel-items">
				<span v-for="(item,index) in slideList" 
				:class="{active:index===currentIndex}"
				 @mouseover="change(index)"></span>
			</div>
		</div>
		
		
		
		<div class="row">
			<div class="col-8">
				
				<h3>热门文章</h3>
				<div v-for="(item, index) in articles" :key="index" class="col-12">
					<div class="media-wraaper border">
						<!-- <div class="media-left">
							<p>来自{{ item.topic.topicName }}</p>
							
							<router-link :to="{ path: '/user/' + item.article.userId }"><img :src="item.author.avatar" class="avatar-lg link" /></router-link>
							<p>{{ item.author.nickname }}</p>
							
						</div> -->
						<div class="media-middle flex flex-around flex-left">
							<router-link :to="{ path: '/article/' + item.article.id }" class="subtitle">{{ item.article.title }}</router-link>
							<p class="sub-title link">{{ item.article.summary }}</p>
							<p>
								<el-badge :value="item.article.comments" class="item">
								  <el-button size="small"><router-link to="/message">评论</router-link></el-button>
								</el-badge>
								<!-- <span class="meta gutter">{{ item.article.comments }}评论</span> -->
								<el-badge :value="item.article.likes" class="item">
								  <el-button size="small">喜欢</el-button>
								</el-badge>
								<el-badge  class="item">
									<el-popconfirm
									  title="确定删除吗？"
									>
								  <el-button size="small" slot="reference" @click="del(item.id)">删除</el-button>
								  </el-popconfirm>
								</el-badge>
								<!-- <span class="meta">{{ item.article.likes }}喜欢</span> -->
								<el-dropdown trigger="click">
								  <span class="el-dropdown-link">
								    点我查看<i class="el-icon-caret-bottom el-icon--right"></i>
								  </span>
								  <el-dropdown-menu slot="dropdown">
								    <el-dropdown-item class="clearfix">
										<router-link to="/modifier">
								      修改
								</router-link>
								      <el-badge class="mark" />
								    </el-dropdown-item>
								    <el-dropdown-item class="clearfix">
								      回复
								      <el-badge class="mark" :value="3" />
								    </el-dropdown-item>
									<el-dropdown-item class="clearfix">
									  打赏
									  <el-badge class="mark" :value="3" />
									</el-dropdown-item>
								  </el-dropdown-menu>
								</el-dropdown>
							</p>
						</div>
						<div class="media-right">
							<router-link :to="{ path: '/user/' + item.article.userId }"><img :src="item.article.thumbnail" alt="" /></router-link>
						</div>
					</div>
				</div>
			</div>
						<div class="col-4">
							<iframe src="http://i.tianqi.com/index.php?c=code&id=7&icon=1&num=3" frameborder="0" style="margin: 10% "></iframe>

							
									<div class="music-size">
											<video controls="" autoplay="" name="media" style="width: 80%;">
											<source src="http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a" type="audio/mp4">
											</video>	
									</div>				
						<br>
						<h3>热门作者</h3>
									<div v-for="(item, index) in users" :key="index" class="row">
										<div class="col-12 border box">
											<div class="flex-center-y">
												<router-link :to="{ path: '/user/' + item.id }"><img :src="item.avatar" class="avatar-xs link" /></router-link>
												<p class="sub-title">{{ item.nickname }}</p>
											</div>
											<div class="flex-center-y">
												<p class="meta"><i class="iconfont">&#xe614; </i>{{ item.fans }}</p>
												<p class="meta"><i class="iconfont">&#xe62c; </i>{{ item.articles }}</p>
											</div>
											<!-- 不能用 ？？-->
											<div  v-if="item.flag ===0 " class="flex-center-y"><button class="btn btn-follow" v-on:click="clickfans(item.id , 0 )">关注</button></div>
										    <div  v-else class="flex-center-y"><button class="btn btn-follow" v-on:click="clickfans(item.id , 1 )">取消关注</button></div>

											 
												
										</div>
									</div>
									
						</div>
		</div>
	</div>
</template>

<script>
	// import $ from 'assets/js/jquery.min.js'
export default {
	data() {
		return {
			articles: [],
			users: [],
			topics: [],
			id:null,
		
		slideList: [
			{
				"url": "#",
				"description": "one",
				"image": "https://cdn.dribbble.com/users/329207/screenshots/7824170/media/cc77353e67ca46a4da78553330209a72.jpg"
			},
			{
				"url": "#",
				"description": "two",
				"image": "https://cdn.dribbble.com/users/63407/screenshots/7825858/media/547d13eb0522eabcbbaa6683c82bfe40.png"
			},
			{
				"url": "#",
				"description": "three",
				"image": "https://cdn.dribbble.com/users/1018201/screenshots/7816965/media/2ed92a6a7ee0017e28f3bbcaf88b8138.png"
			}
		],
		currentIndex: 0,
		timer: null,	
			
			
			
		};
	},
	
	
	created() {
		var user = JSON.parse(localStorage.getItem("user"));
				this.id=user.id ;
		
		this.$nextTick(() => {
			this.timer = setInterval(() => {this.autoPlay()}, 3000)
		});
		
		
		this.axios.get(this.GLOBAL.baseUrl + '/article').then(res => {
			// console.log(res.data.data);
			this.articles = res.data.data;
		});
		this.axios.get(this.GLOBAL.baseUrl + '/user',{params: {f_user: user.id } }).then(res => {
			// console.log(res.data.data);
			this.users = res.data.data;
		});
		this.axios.get(this.GLOBAL.baseUrl + '/topic').then(res => {
			// console.log(res.data.data);
			this.topics = res.data.data;
		});
	},
	
	methods:{
		clickfans(id  ,index ){
			if(index=== 0 ){
				this.axios.get(this.GLOBAL.baseUrl + '/userFan', {params: {f_user: this.id,
						t_user:id,}
				}).then(res => {
					console.log(res);
				});
			}else{

				this.axios.get(this.GLOBAL.baseUrl + '/userFaned', {params: {f_user: this.id,
						t_user:id,}
				}).then(res => {
					console.log(res);
				});
			}
			this.$router.go(0)
		},
	
		
		// changeBtnMsg(e){
		// 		//得到事件源
		// 		var btn = e.target
		// 		var msg = btn.innerText
		// 		if (msg == '已关注') {
		// 			// btn.innerText = '取消关注'
		// 			btn.style.color = '#fff'
		// 		} else {
		// 			// btn.innerText = '已关注'
		// 			btn.style.color = '#fff'
		// 		}
		// 	},
			
		// 		changeFollowed(user) {
		// 	user.user_followed = !user.user_followed
		// },
		
		
		
		del(id) {
			this.axios.post(this.GLOBAL.baseUrl + '/delete')
		},
		
		go() {
			this.timer = setInterval(() => {
				this.autoPlay()
			}, 3000)
		},
		
		
		stop() {
			clearInterval(this.timer)
			this.timer = null
		},
		change(index) {
			this.currentIndex = index
		},
		autoPlay() {
			this.currentIndex++
			if (this.currentIndex > this.slideList.length - 1) {
				this.currentIndex = 0
			}
		}
		
	}
	
	
};
</script>

<style scoped="scoped">
	@font-face {
	  font-family: 'iconfont';  /* project id 1434147 */
	  src: url('//at.alicdn.com/t/font_1434147_rxu7f3gnwcd.eot');
	  src: url('//at.alicdn.com/t/font_1434147_rxu7f3gnwcd.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1434147_rxu7f3gnwcd.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1434147_rxu7f3gnwcd.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1434147_rxu7f3gnwcd.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1434147_rxu7f3gnwcd.svg#iconfont') format('svg');
	}
	.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
.logo {
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}
.logo:hover {
	opacity: 0.6;
}
.box {
	display: flex;
	justify-content: space-around;
	height: 70px;
	padding: 10px;
}
.btn-follow {
	background-color: #42c02e;
	font-weight: 400;
	font-size: 15px;
	color: #fff;
	padding: 5px 0;
	width: 80px;
	height: 30px;
	border-radius: 40px;
	display: inline-block;
	text-align: center;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .music-size{
	  margin-top: -200px;
	  }
	.banner{
		position: relative;
		width: 97%;
		height: 300px;
		overflow: hidden;
		margin-left:20px ;
	}  
	
	.btn-green {
		background-color: #008000;
		color: #fff;
	}
	
	.btn-grey {
		background-color: #ddd;
		color: #fff;
	}
</style>
