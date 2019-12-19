<template>
	<div :class="{red: !isshow,blue: isshow}" >
				
					
		<div class="nav primary-fill shadow top-card">
			<div class="nav-bar">
				<ul class="nav-list flex-around">
					<li class="nav-item"><router-link to="/index">主页</router-link></li>
					<li class="nav-item"><router-link to="/topics">专题</router-link></li>
					<li class="nav-item"><router-link to="/articles">文章</router-link></li>
					<li class="nav-item"><router-link to="/users">作者</router-link></li>
					<li class="nav-item"><input type="text" class="input-box" placeholder="请输入....." v-model="keywords" /></li>
					<li class="nav-item"><button class="btn btn-lg btn-rd dark-border btn-color" @click="search" >搜索</button></li>
					<li class="nav-item" v-if="!this.user"><router-link to="/sign-in">登录</router-link></li>
						<!-- <router-link :to="{ path: '/user/' + user.id }" v-if="this.user"><img :src="user.avatar" @mouseenter="this.show = true" class="avatar-xs abs-center-right" /></router-link> -->
						
						<li class="nav-item">
							<router-link to="/send" v-if="this.user">发表</router-link>
							</li>
							
					<li class="nav-item" v-if="this.user"><a class="link" @click="logout">退出</a></li>
					<li v-if="this.user">
					            <el-dropdown @command="handleCommand" style="background-color: #009688;border: #009688">
					              <img :src="this.user.avatar" class="avatar-xs abs-center-right"/>
					              <el-dropdown-menu slot="dropdown">
					                <el-dropdown-item command="a">我的主页</el-dropdown-item>
									   <el-dropdown-item command="c">写文章</el-dropdown-item>
					                <el-dropdown-item command="b">设置</el-dropdown-item>
					              </el-dropdown-menu>
					            </el-dropdown>
					         </li>
					<li class="nav-item" @click="isshow=!isshow"><router-link to="/">换肤</router-link></li>
					<!-- <li class="nav-item"><button class="huanfu" @click="isshow=!isshow">换肤</button></li> -->
				</ul>
			</div>
			</div>
		
		<router-view class="container" />
	</div>
</template>
<script>
export default {
	data() {
		return {
			user: JSON.parse(localStorage.getItem('user')),
			keywords: '',
			isshow: true,
		};
	},
	created() {},
	methods: {
		logout() {
			this.user = null;
			localStorage.clear();
		},
		search() {
			let currentPath = this.$route.path;
			alert(currentPath);
			if (currentPath != '/search' || currentPath != '/search/article' || currentPath != '/search/topic' || currentPath != '/search/usere') {
				this.$router.push({ path: '/search', query: { keywords: this.keywords } });
			} else {
				this.$router.push({ path: '/empty', query: { keywords: this.keywords } });
			}
		},
		handleCommand(command) {
		        if (command === 'a') {
		          console.log(this.user.id)
		          this.$router.push({path: '/user/' + this.user.id})
		        }
		        if (command === 'b') {
		          this.$router.push({path: '/setting/' + this.user.id})
		        }
				 if (command === 'c') {
				          this.$router.push({path: '/write_article/'})
				        }
		      }

	}
};
</script>
<style scoped>
/* 路由激活高亮样式 */
.router-link-active {
	background-color: rgba(0, 0, 0, 0.35);
	font-weight: 700;
	border-radius: 50px;
}
.top-card {
	
	
	background-repeat: no-repeat;
	background-size:100% 100% ;
	 background-position: center;
}
.container {
	margin-top: 80px;
}
.gif-size{
	height: 60px;
	width:60px;
	border-radius: 50%;
}
.router-link-active {
		background-color: rgba(0, 0, 0, 0);
		font-weight: 700;
	}
	.container {
		margin-top: 80px;
	}
		.red {
	      background-image: linear-gradient(rgba(230, 169, 182));
	      color: #DDDDDD;
	    }
	/* 	.primary-fill {
		background: linear-gradient(to bottom, rgb(218, 60, 180), rgb(108, 149, 218));;
			color: #fff;
		}
		.middle-fill {
		  background: linear-gradient(to bottom, rgb(255, 101, 144), rgb(123, 110, 157));;
		  	color: #DDDDDD;
		} */
		.nav-item {
			height: 70px;
			line-height: 70px;
		}
		
		.nav-item input {
			margin-top: 15px;
			width: 200px;
			height: 35px;
		}
		
		.nav-item img {
			width: 45px;
			height: 45px;
			border-radius: 50%;
		}
		
		.nav-item a {
			display: inline-block;
			width: 80px;
			height: 35px;
			margin-right: 5px;
			font-size: 18px;
			font-weight: 600;
			color: #fff;
			text-align: center;
			line-height: 35px;
			letter-spacing: 3px;
		}
		.fu{
			margin-left: 90px;
		}
       
     .btn-color{
	   background-color: #EEEEEE;
	   
      }
	  
	 
</style>
