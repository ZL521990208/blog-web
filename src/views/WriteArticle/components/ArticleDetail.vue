<template>
  <div style="margin-top: 150px">
    <el-form ref="postForm" :model="postForm" class="form-container" :span="24">

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <el-input v-model="postForm.title" :maxlength="100" name="name" placeholder="请输入文章标题" required/>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="4">
                  <el-form-item label-width="60px" label="作者:" class="postInfo-container-item">
                    <el-input v-model="postForm.author" placeholder="作者"/>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="60px" label="话题:" class="postInfo-container-item">
                    <el-select v-model="postForm.topicId" placeholder="请选择">
                      <el-option
                        v-for="item in topic_list"
                        :key="item.id"
                        :label="item.topicName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="60px" label="总结:">
          <el-input v-model="postForm.summary" :rows="1" type="textarea" class="article-textarea" autosize
                    placeholder="请输入总结"/>
        </el-form-item>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <quill-editor
            v-model="postForm.content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"/>
        </el-form-item>
      </div>
      <el-upload
        class="upload-demo"
        drag
        action="http://localhost:9091/api/upload"
        name="filename"
        :on-success="uploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将封面拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-button @click="submitForm">发布文章</el-button>
    </el-form>
  </div>
</template>

<script>
  import {quillEditor} from "vue-quill-editor"; //调用编辑器
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  export default {
    name: 'ArticleDetail',
    components: {quillEditor},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        postForm: {
          userId: JSON.parse(localStorage.user).id,
          topicId: '',
          title: '',
          summary: '',
          thumbnail: '',
          content: `<p></p><p><br></p><ol><li><strong><em>Or drag/paste an image here.</em></strong></li><li><strong><em>rerew</em></strong></li><li><strong><em>rtrete</em></strong></li><li><strong><em>tytrytr</em></strong></li><li><strong><em>uytu</em></strong></li></ol>`
        },
        editorOption: {},
        topic_list: [
          "Demo", "Demo", "Demo",
        ]
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.axios.get(this.GLOBAL.baseUrl + '/topic/list', {
          params: {}
        }).then(res => {
          this.topic_list = res.data.data
        });
      },
      submitForm() {
        console.log(this.postForm)

        this.axios.post(this.GLOBAL.baseUrl + '/article/write',this.postForm).then(res => {
          if (this.postForm.title === '') {
            this.$message.error('相关内容不能为空')
            return
          }
          console.log(res.data);
          if (res.data.code === 1) {
            this.$message({
              message: '发表成功',
              type: 'success'
            });
            console.log(this.postForm.userId);
            this.$router.push({path: '/user_detail/' + this.postForm.userId})
          } else {
            this.$message.error('服务器出小差，请重试');
          }
        });
      },
      onEditorReady(editor) { // 准备编辑器

      },
      onEditorBlur() {
      }, // 失去焦点事件
      onEditorFocus() {
      }, // 获得焦点事件
      onEditorChange() {
      }, // 内容改变事件
      uploadSuccess(response, file, fileList) {
        console.log(response)
        if (response.code === 0) {
          this.postForm.thumbnail = response.msg
          this.$message({
            message: '上传成功',
            type: 'success'
          });
        }
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      }
    }
  }
</script>

<style scoped>
  .form-container {
    margin-top: 50px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>