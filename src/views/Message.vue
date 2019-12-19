<template>
	
		<div class="wrap">
				<div class="says">
					<h1>来，说说你在做什么，想什么...</h1>
					<textarea placeholder="请写下你的评论" v-model="commentDto.content"></textarea><input type="button" value="发布" @click="Connect(commentDto)">
					<div class="errmsg">请填写内容后再发布！</div>
				</div>
				<ul>
					 
				</ul>
			</div>
	
</template>


<script src="../assets/js/test.js"></script>
<script>
	// import $ from '../assets/js/test.js'
	export default {
		data(){
			return {
				id:'',
				comments : [],
				commentDto: {
					userId: 1,
					content: '',
					nickname: '张三',
				},
			};
		},
		created : function() {
			/* 查询所有评论 */
			this.axios.get('http://localhost:8080/api/comment').then(res=>{
				console.log(res.data);
				this.comments = res.data;
			})
			},
			
			
			
		
			methods:{
				del(id) {
					this.axios({
						method: 'post',
						url: this.GLOBAL.baseUrl + '/api/comment/del',
						data: JSON.stringify(this.id)
					}).then(res => {
						if (res.data.msg === '成功') {
							alert('删除成功');
						} else {
							alert(res.data.msg);
						}
					});
					// window.location.reload();
					},
					
				
				
				Connect(commentDto) {
					this.axios({
						method: 'post',
						url: this.GLOBAL.baseUrl + '/comment/con',
						data: JSON.stringify(this.commentDto)
					}).then(res => {
						if (res.data.msg === '成功') {
							alert('添加成功');
						} else {
							alert(res.data.msg);
						}
					});
					// window.location.reload();
				   }
				},
			}
</script>

<style scoped="scoped">
	/* .name{
		width: 200px;
		height: 50px;
		border-radius: 20px;
	} */
	/* .msg-leaver {
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    align-items: center;
	}
	.board-item {
	    font-family: FangSong;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    padding: 5px 10px;
	    width: 100%;
	}
	.leavemsg {
	    margin-top: 32px;
	}
	.btn-n{
		width: 100px;
		height: 34px;
		outline: none;
		border: 1px solid #08D;
		color: #fff;
		padding:0 32px;
		text-align: center;
		font-size: 14px;
		border-radius: 10px;
	    background-color: rgb(74, 138, 244);
		margin-top: 10px;
		margin-left: 545px;
		cursor: pointer;
	}
	.shade{
		background-color: rgb(0, 121, 215);
	}
	.bottom-col{
		
	}
	
	.exit-aite {
	    margin-left: 5px;
	    color: #5bc0de;
	    cursor: pointer;
	}
	.msgboard {
	    background: #faf7f7;
	    margin-top: 10px;
	    padding: 20px 10px;
	    border-radius: 5px;
	    font-size: 14px;
	    color: #404040;
		}
	.say-box{
		margin: 10px 10px 5px;
	}
	.say-box textarea {
	    font-family: STFangsong;
	    resize: none;
	    overflow-y: none;
	    outline: none;
	    font-size: 14px;
	    padding: 5px;
	    border: none;
	    border-radius: 6px;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    width: 100%;
	    height: 100px;
	    -webkit-box-shadow: 0 0 8px rgba(0,0,0,.4);
	    box-shadow: 0 0 8px rgba(0,0,0,.4);
	}

	a, a:link {
		font-weight:bold;
	    color:rbg(26, 160, 52);
	    text-decoration: none;
		
	}
	a:hover{
		color: #FFD700;
	} */
	*{margin:0;padding: 0;}
			.wrap{
				width:780px;
				height: 880px;
				margin:0 auto;
				box-shadow: 10px 10px 30px #ccc;
				border-radius: 2px;
				padding: 10px;
				position: relative;
				top: 100px;
			}
			.says{
				width:780px;
				height: 200px;
	 			position: absolute;
			}
			.says h1{
				font-size:18px;
				color:#A8A8A8;
				margin-bottom: 5px;
			}
			textarea{
				width:760px;
				height: 100px;
				outline: none;
				resize: none;
				border:1px solid #ccc;
				border-radius: 3px;
				padding: 5px;
				color:#660000;
			}
			input{
				width:100px;
				height: 30px;
				border:none;
				cursor: pointer;
				background: #00CC66;
				color:white;
				border-radius: 2px;
				position: absolute;
				right: 10px;
				bottom: 5px;
				transition: all ease 0.4s;
				font-size: 16px;
			}
			input:hover{
				filter:alpha(opaciyt:70);
				opacity: 0.7;
			}
			ul{
				width:750px;
				height: 640px;
	 			position: absolute;
				bottom: 0;
				overflow-x: hidden;
				overflow-y: scroll;
	
	 		}
			li{
				width:750px;
	 			border-bottom: 1px  dotted #ccc;
				list-style:none;
				line-height: 57px;
				font-size: 14px;
				color:#606060;
				overflow: hidden;
				filter: alpha(opacity:0);
				opacity: 0;
	
			}
			span{
				float: right;
				margin-right: 30px;
			}
			.errmsg{
				font-size: 14px;
				color:red;
				font-weight: bold;
				filter: alpha(opacity:0);
				opacity:0;
	 		}
	 		a{
	 			font-size: 14px;
	 			color:#990000;
	 			text-decoration: none;
	 			margin-left: 10px;
	 		}
	 		a:hover{
	 			color:red;
	 			text-decoration: underline;
	 		}
</style>
