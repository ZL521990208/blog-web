<template>
	<div>
		<div class="row">
			<div v-for="(item, index) in topics" :key="index" class="col-4 flex flex-center">
				<div class="card shadow flex flex-top-y">
					<div class="card-head flex flex-center">
						<p class="title">{{ item.topicName }}</p>
						<router-link :to="{ path: '/topic/' +item.id}">
						<img :src="item.logo"/>
						</router-link>
					</div>
					<div class="card-body flex flex-left">
						<p class="sub-title">{{ item.description.slice(0,30) }}</p>
						<p class="meta"><i class="iconfont">&#xe61e; </i>{{ item.articles }}篇文章，<i class="iconfont">&#xe629; </i>{{ item.fans }}人关注</p>
					</div>
				
				</div>
			</div>
		</div>
		<div class="row"><button class="btn btn-lg btn-rd dark-fill" @click="loadMore">点击加载更多</button></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			topics: [],
			currentPage: 1,
			count: 6
		};
	},
	created() {
		this.axios
			.get(this.GLOBAL.baseUrl + '/topic', {
				params: {
					page: this.currentPage,
					count: this.count
				}
			})
			.then(res => {
				console.log(res.data.data.length);
				this.topics = res.data.data;
			});
	},
	methods: {
		loadMore() {
			this.currentPage = this.currentPage + 1;
			this.axios
				.get(this.GLOBAL.baseUrl + '/topic', {
					params: {
						page: this.currentPage,
						count: this.count
					}
				})
				.then(res => {
					console.log(res.data.data.length);
					let temp = [];
					temp = res.data.data;
					for (var i = 0; i < temp.length; i++) {
						this.topics.splice(this.currentPage * this.count, 0, temp[i]);
					}
					console.log(this.topics.length);
				});
		},
		go(page) {
			window.location.href = page;
		}
	}
};
</script>
<style scoped>
	@font-face {
	  font-family: 'iconfont';  /* project id 1563844 */
	  src: url('//at.alicdn.com/t/font_1563844_debkfeuzk18.eot');
	  src: url('//at.alicdn.com/t/font_1563844_debkfeuzk18.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1563844_debkfeuzk18.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1563844_debkfeuzk18.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1563844_debkfeuzk18.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1563844_debkfeuzk18.svg#iconfont') format('svg');
	}
	.iconfont{
	    font-family:"iconfont" !important;
	    font-size:16px;font-style:normal;
	    -webkit-font-smoothing: antialiased;
	    -webkit-text-stroke-width: 0.2px;
	    -moz-osx-font-smoothing: grayscale;}
.card {
	width: 90%;
	height: 300px;
	/* background-image: url(../assets/img/topic.png); */
	background-size: 100%, 100%;
	margin-bottom: 50px;
	padding: 20px;
}
.card-head {
	height: 30%;
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.card-head img {
	width: 80px;
	height: 80px;
	border-radius: 10px;
	margin-left: 20px;
}
.card-body {
	width: 80%;
	margin: 0 auto;
}
.card-body > p {
	line-height: 30px;
}
.card a {
	color: rgb(0, 98, 89);
	font-weight: 700;
}
</style>
