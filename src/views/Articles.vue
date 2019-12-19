<template>
	<div>
		<!-- 锚点 -->
		<!-- <Anchor show-ink>
		        <AnchorLink href="#basic_usage" title="Basic Usage" />
		        <AnchorLink href="#static_position" title="Static Position" />
		        <AnchorLink href="#API" title="API">
		            <AnchorLink href="#Anchor_props" title="Anchor props" />
		            <AnchorLink href="#Anchor_events" title="Anchor events" />
		            <AnchorLink href="#AnchorLink_props" title="AnchorLink props" />
		        </AnchorLink>
		    </Anchor>
			
			 -->
			
	<div class="demo-image__lazy">	
	<div class="row">
		<div v-for="(item, index) in articles" :key="index" class="col-6">
			<div class="media-wraaper bg shadow">
				<div class="media-left">
					<img :src="item.author.avatar" class="avatar-lg link" />
					<p>{{ item.author.nickname }}</p>
					<strong>来自</strong>
					<p>{{ item.topic.topicName }}</p>
				</div>
				<div class="media-middle flex flex-left">
						<p>
							<span>{{ item.article.id }}</span>
							{{ item.article.title }}
						</p>
					<p class="sub-title link">{{ item.article.summary }}</p>
					<p>
						<el-badge :value="item.article.comments" class="item">
						  <el-button size="small">评论</el-button>
						</el-badge>
						<div class="like">
						<el-badge :value="item.article.likes" class="item">
						  <el-button size="small">喜欢</el-button>
						</el-badge>
						</div>
						
							<div class="art">
								<router-link :to="{ path: '/article/' + item.article.id }">
						  <el-button :plain="true" @click="open" size="small">查看原文>></el-button>
						  </router-link>
						</div>

						<!-- <span class="meta">{{ item.article.comments }}评论</span> -->
						<!-- <span class="meta">{{ item.article.likes }}喜欢</span> -->
					</p>
				</div>
				<div class="media-right"><img :src="item.article.thumbnail" /></div>
			</div>
		</div>

		<div class="row"><button class="btn btn-lg btn-rd dark-fill" @click="loadMore">点击加载更多</button></div>
		
		</div>
	</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			articles: [],
			currentPage: 1,
			count: 20
		};
	},
	created() {
		this.axios
			.get(this.GLOBAL.baseUrl + '/article', {
				params: {
					page: this.currentPage,
					count: this.count
				}
			})
			.then(res => {
				console.log(res.data.data.length);
				this.articles = res.data.data;
			});
	},
	methods: {
		open() {
		        this.$message('欢迎来到文章详情页');
		      },
		loadMore() {
			this.currentPage = this.currentPage + 1;
			this.axios
				.get(this.GLOBAL.baseUrl + '/article', {
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
						this.articles.splice(this.currentPage * this.count, 0, temp[i]);
					}
					console.log(this.articles.length);
				});
		}
	}
};
</script>

<style scoped="scoped">
.bg {
	/* 	background-image: url(../assets/img/article.png); */
	background-size: contain;
	background-position-y: 100px;
}
.like{
	margin-left: 40px;
}
.art{
	margin-left: 40px;
}
.row{
	border: 2px;
}
</style>
