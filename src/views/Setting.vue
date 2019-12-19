<template>
  <div style="width: 600px;position: center">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/api/upload"
            :show-file-list="false"
            :on-success="uploadSuccess"
            name="filename">
            <el-avatar :size="100">
              <img :src="form.avatar"/>
            </el-avatar>
          </el-upload>
        </el-form-item>
      <el-form-item label="昵称">
        <el-input type="text" v-model="form.nickname"/>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input type="text" v-model="form.mobile"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.gender" label="男">男</el-radio>
        <el-radio v-model="form.gender" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
          v-model="form.birthday"
          type="date" placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input type="text" v-model="form.introduction"/>
      </el-form-item>
      <el-form-item>
		  <template>
		    <!-- <el-button type="text" @click="open,onSubmit">保存</el-button> -->
			
		  </template>
        <el-button type="primary" style="background-color: #009688;border: #009688;color: #ffffff" @click="onSubmit" >
			<el-button type="primary" style="background-color: #009688;border: #009688;color: #ffffff" @click="open" >
          保存
        </el-button>
		 </el-button>
        <!--        <el-button style="background-color: #009688;border: #009688;color: #ffffff" @click="onSubmit">保存</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          userId: 0,
          mobile: '',
          password: '',
          nickname: '',
          avatar: '',
          gender: '',
          birthday: '',
          introduction: '',
        }
      }
    },
    methods: {
      init() {
        this.form.userId = this.$router.currentRoute.params.userId
        this.axios.get('http://localhost:8080/api/user?userId=' + this.form.userId).then(res => {
          const user = res.data.data
          this.form.mobile = user.mobile
          this.form.password = user.password
          this.form.nickname = user.nickname
          this.form.avatar = user.avatar
          this.form.gender = user.gender
          this.form.birthday = '' + user.birthday.year+'-' + user.birthday.month+'-'+user.birthday.day
          this.form.introduction = user.introduction
        });
      },
      onSubmit() {
        console.log('onsubmit -- ')
        let times = this.form.birthday.split('-');
        console.log(times)
        console.log(times[0])
        console.log(times[1])
        console.log(times[2])
        this.axios({
          method: 'post',
          url: 'http://localhost:8080/api/user/update',
          data: {
            userId: this.form.userId,
            mobile: this.form.mobile,
            password: this.form.password,
            nickname: this.form.nickname,
            avatar: this.form.avatar,
            gender: this.form.gender,
            birthday: {
              year: times[0],
              month: times[1],
              day: times[2]
            },
            introduction: this.form.introduction,
          }
        }).then(() => {
          this.init()
        })
      },
	  open() {
	          this.$confirm('是否保存, 是否继续?', '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'warning'
	          }).then(() => {
	            this.$message({
	              type: 'success',
	              message: '保存成功!'
	            });
	          }).catch(() => {
	            this.$message({
	              type: 'info',
	              message: '已取消保存'
	            });          
	          });
	        }
    },
    mounted() {
      this.init()
    },
	
	// 更改头像
	 uploadSuccess(response, file, fileList) {
	        console.log(response)
	        if (response.code === 0) {
	          this.form.avatar = response.msg
	          this.axios.post(this.GLOBAL.baseUrl + '/user/changeAvatar', {
	            userId: JSON.parse(localStorage.user).id,
	            avatar: this.form.avatar
	          }).then((res) => {
	            let user = JSON.parse(localStorage.user)
	            user.avatar = this.form.avatar
	            localStorage.setItem('user', JSON.stringify(user));
	            location.reload()
	
	          }).catch((err) => {
	          })
	        }
	      },
	    
	    mounted() {
	      this.init()
	    },
    created() {

    },
    computed: {},

  };
</script>

<style scoped="scoped">
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	  }
	
	  .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }
</style>