<template>
	<div id="bg">
		<router-link to="/">首页</router-link>
		<div class="login-box">
			<form class="login-form">
				<input type="text" v-model="userDto.mobile" id="mobile" placeholder="账号" />
				<input type="password" v-model="userDto.password" placeholder="密码"/>
				<div class="code-box">
					<input type="text" v-model="userDto.code" class="code" placeholder="验证码"/>
					<img class="verify" @click.prevent="refresh" ref="codeImg" />
				</div>
				<input type="button" class="btn btn-lg dark-fill" value="登录" @click="signIn(userDto)" />
				<router-link to="/sign-up">没有账号？去注册</router-link>
			</form>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			userDto: {
				mobile: '',
				password: '',
				code: ''
			},
			token: ''
		};
	},
	created() {
		this.axios.get(this.GLOBAL.baseUrl + '/code', { responseType: 'blob' }).then(res => {
			// console.log(res);
			var img = this.$refs.codeImg;
			let url = window.URL.createObjectURL(res.data);
			img.src = url;
			console.log(res.headers);
			//取得后台通过响应头返回的sessionId的值
			this.token = res.headers['access-token'];
			console.log(this.token);
		});
	},
	methods: {
		signIn(userDto) {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/user/sign-in',
				data: JSON.stringify(this.userDto),
				headers: {
					'Access-Token': this.token  //将token放在请求头带到后端
				}
			}).then(res => {
				if (res.data.msg === '成功') {
					alert('登录成功');
					localStorage.setItem('user', JSON.stringify(res.data.data));
					this.$router.push('/');
				} else {
					alert(res.data.msg);
					this.userDto.code = '';
				}
			});
		},
		refresh() {
			this.axios.get(this.GLOBAL.baseUrl + '/code', { responseType: 'blob' }).then(res => {
				console.log(res);
				var img = this.$refs.codeImg;
				let url = window.URL.createObjectURL(res.data);
				img.src = url;
			});
		}
	}
};
</script>
<style scoped>
#bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
    background-image: url(../assets/img/bili.jpg);
}
.login-box {
	width: 450px;
	height: 300px;
	border: 2px solid rgb(255, 254, 250);
	border-radius: 10px;
	background-color: rgb(210, 226, 245);
	position: absolute;
	top: 200px;
	left: 30%;
}
.login-form {
	padding-top: 20px;
	width: 70%;
	margin: 0 auto;
	text-align: left;
}
.login-form input {
	width: 100%;
	height: 35px;
	outline: none;
	border: none;
	margin-bottom: 10px;
	border-radius: 5px;
}
.code-box {
	display: flex;
	margin-top: 10px;
	margin-bottom: 20px;
	justify-content: space-between;
}
.verify {
	flex: 0 0 50%;
	height: 40px;
}
.verify:hover {
	cursor: pointer;
}
.code {
	flex: 0 0 40%;
	height: 40px;
}
a {
	color: #008b8b;
	font-weight: 700;
}
</style>
