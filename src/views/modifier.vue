<!-- 修改用户 -->
<template>
	<div>
	<div id="app" class="container">
		<h1>adfgnh</h1>
		<div class="header"><router-link to="/index">返回首页</router-link></div>
		<div class="row">
			<div class="col-2"><img :src="user.avatar" class="avatar" /></div>
			<div class="col-4">
				<div class="card">
					<div class="card-wrap">
						<h4>
							<p class="title">{{ user.nickname }}</p>
						</h4>
						<p class="sub-title">{{ user.create_time }}</p>
						<p class="content">{{ user.introduction }}</p>
						<button class="btn-round" @click="show = !show">编辑个人资料</button>
					</div>
				</div>
				<transition name="fade" class="out">
					<div id="edit-box" v-if="show" style="text-align: center;">
						<span>昵称 :</span>
						<input type="text" placeholder="修改昵称" v-model="user.nickname" />
						<br />
						<span>住址 :</span>
						<input type="text" placeholder="修改住址" v-model="user.address" />
						<br />
						<!-- <span>介绍</span> -->
						<!-- <input type="text" placeholder="修改介绍" v-model="user.description"> -->
						<!-- <br> -->
						<button class="btn-round" @click="updateUser(user)">确定</button>
					</div>
				</transition>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
export default {
	data: {
		user: {},
		show: false
	},
	created: function() {
		var query = window.location.search.substring(1);
		// alert(query);
		var pair = query.split('=');
		// alert(pair[1]);
		var id = pair[1];
		// alert(id);
		var _this = this;
		axios.get('http://localhost:8080/api/user/' + id).then(function(response) {
			// console.log(response.data)
			_this.user = response.data.data;
		});
	},
	methods: {
		updateUser: function(user) {
			let data = {
				id: user.id,
				nickname: user.nickname,
				address: user.address
			};
			var _this = this;
			axios.put('http://localhost:8080/api/user', JSON.stringify(data)).then(function(response) {
				console.log(response.data.msg);
				_this.show = false;
			});
		}
	}
};
</script>

<style scoped="scoped">
.header {
	height: 60px;
	border-bottom: 1px solid lightgray;
	display: flex;
	flex: auto;
	align-items: center;
	justify-content: space-between;
	background-color: rgb(255, 255, 255);
}

.container {
	background-color: rgb(246, 246, 246);
	margin: 0 auto;
}

a {
	text-decoration: none;
	color: rgb(53, 134, 247);
	font-family: STKaiti;
	font-size: ;
}

.row {
	background-color: rgb(255, 255, 255);
	width: 70%;
	margin-top: 10px;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
}

.col-4 {
	flex: 0 0 80%;
}

.col-2 {
	flex: 0 0 20%;
}

.col-2 img {
	left: 20px;
	position: relative;
	top: 20px;
	height: 150px;
	width: 150px;
	border-radius: 10px;
}

.card-wrap {
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
}

.card {
	/* flex: 0 0 23%; */
	margin: 10px 10px 10px 10px;
	border-bottom: 1px solid #333;
	background-color: rgb(255, 255, 255);
}

.card-body {
	flex: 0 0 80%;
	height: 100%;
	padding-left: 25px;
	padding-top: 5px;
}

.thumbnail-wrap {
	height: 100%;
	align-items: center;
}

.thumbnail-wrap img {
	width: 40%;
	height: 70%;
	border-radius: 20px;
	margin-left: 20px;
}

.sub-title {
	font-size: 14px;
	color: rgb(180, 180, 180);
}

.content {
	font-size: 14px;
	color: rgb(180, 180, 180);
}

.btn-round {
	width: 120px;
	height: 39px;
	border: none;
	outline: none;
	border-radius: 20px;
	margin-right: 10px;
	background-color: rgb(53, 134, 247);
	align-content: center;
}

input {
	width: 190px;
	height: 30px;
	margin-bottom: 6px;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.out {
	position: absolute;
	border-color: transparent #ff0 transparent transparent;
	border-style: dashed dashed solid dashed;
	border-width: 50px;
}

.in {
	position: absolute;
	border-color: transparent red transparent transparent;
	border-style: dashed dashed solid dashed;
	border-width: 50px;
}

.demo {
	width: 200px;
	height: 200px;
	border: 2px solid #f30;

	position: relative;
}

.out,
.in {
	position: absolute;
	width: 0;
	height: 0px;
}

.out {
	border: 20px solid transparent;
	border-bottom-color: #f30;
	/*这里的颜色一定要跟上面demo边框颜色一样*/
	top: -40px;
	left: 20%;
}

.in {
	border: 18px solid transparent;
	border-bottom-color: #fff;
	/*这里的颜色一定要跟demo背景颜色一样*/

	top: -35px;
	left: 21%;
}

#edit-box {
	border: 1px solid #333333;
	border-radius: 5px;
}
</style>
