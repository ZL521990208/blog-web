import Vue from 'vue'
import VueRouter from 'vue-router'

import Nav from '@/views/Nav.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'

import Index from '@/views/Index.vue'
import Articles from '@/views/Articles.vue'
import Topics from '@/views/Topics.vue'
import Users from '@/views/Users.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import TopicDetail from '@/views/TopicDetail.vue'
import UserDetail from '@/views/UserDetail.vue'
import modifier from '@/views/modifier.vue'
import send from '@/views/send.vue'

import Search from '@/views/Search.vue'
import SearchUser from '@/views/SearchUser.vue'
import SearchTopic from '@/views/SearchTopic.vue'
import SearchArticle from '@/views/SearchArticle.vue'

import Basic from '@/views/Basic.vue'
import Setting from '@/views/Setting.vue'
import Empty from '@/views/Empty.vue'
import Message from '@/views/Message.vue'
Vue.use(VueRouter)

const routes = [{
		path: '/',
		component: Nav,
		children: [{
				path: '/',
				redirect: 'index'
			},
			{
				path: 'index',
				component: Index
			},
			{
				path: 'articles',
				component: Articles
			},
			{
				path: 'modifier',
				component: modifier
			},
			{
				path: 'send',
				component: send
			},
			{
				path: 'article/:id',
				component: ArticleDetail
			},
			{
				path: 'topics',
				component: Topics
			},
			{
				path: 'topic/:id',
				component: TopicDetail
			},
   //          {
			// 	path: 'message',
			// 	component: Message
			// },
			{
				path: 'users',
				component: Users
			},
			{
				path: 'user/:id',
				component: UserDetail
			},
			{
				path: 'setting/:userId',
				component: Setting
			},
			{
					path :'search',
					component:Search,
					children:[
						{
							path: '/',
							redirect: 'article'
						},
						{
							path: 'article',
							component: SearchArticle
						},
						{
							path: 'topic',
							component: SearchTopic
						},
						{
							path: 'user',
							component: SearchUser
						}
					]
			},
			{
				path: 'empty',
				component: Empty
			}
		]
	},
	{
		path: '/sign-in',
		component: SignIn
	},
	{
		path: '/sign-up',
		component: SignUp
	}
]

const router = new VueRouter({
	routes
})

export default router
