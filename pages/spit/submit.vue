<template xmlns:v-quill="http://www.w3.org/1999/xhtml">
  <div class="wrapper release-tc">
    <div class="release-box">
      <h3>发布吐槽</h3>
      <div class="editor">
        <div class="quill-editor"
             :content="content"
             @change="onEditorChange($event)"
             @blur="onEditorBlur($event)"
             @focus="onEditorFocus($event)"
             @ready="onEditorReady($event)"
             v-quill:myQuillEditor="editorOption">
        </div>
        <div class="btns">
          <button class="sui-btn btn-danger btn-release" @click="save">发布</button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
<div class="clearfix"></div>
</div>
</template>
<script>
  import "~/assets/css/page-sj-spit-submit.css"
  import spitApi from "@/api/spit";
  export default {
      data () {
          return {
              content: '',
              editorOption: {
              }
          }
      },
      mounted() {
      },
      methods: {
          //离开焦点
          onEditorBlur(editor) {
              console.log('editor blur!', editor)
          },
          //获取焦点
          onEditorFocus(editor) {
              console.log('editor focus!', editor)
          },
          //初始加载时执行
          onEditorReady(editor) {
              console.log('editor ready!', editor)
          },
          //改变时执行
          onEditorChange({ editor, html, text }) {
              console.log('editor change!', editor, html, text)
              this.content = html
          },
          //发布吐槽
          save(){
              spitApi.save({content: this.content}).then(res=>{
                  this.$message({
                      message: res.data.message,
                      type:(res.data.flag?'success':'error')
                  })
                  if (res.data.flag) {
                      this.$router.push('/spit')
                  }
              })
          }
      }
  }
</script>
<style>
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
</style>
