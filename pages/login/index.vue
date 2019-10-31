<template>
  <div class="wrapper loginsign">
    <div class="item signup">
      <div class="form"  >
        <h3 class="loginsign-title">注册新账号</h3>
        <form class="sui-form  sui-validate" >
          <div class="control-group">
            <label for="inputname" class="control-label">名字</label>
            <div class="controls" >
              <input type="text" id="inputname" name="name" data-rules="required|minlength=2|maxlength=19"  v-model="pojo.nickname"  placeholder="真实姓名或常用昵称" class="input-xlarge" />
            </div>
          </div>
          <div class="different">
            <div class="radio-content">
              <div id="a1" class="phone">
                <div class="control-group number">
                  <input type="text" v-model="pojo.mobile" name="mobile" data-rules="required|mobile"  placeholder="仅支持大陆手机号" class="input-xlarge" />
                </div>
                <div class="control-group code">
                  <div class="input-append">
                    <input id="appendedInputButton" v-model="code" name="code" data-rules="required|number"  type="text" placeholder="短信验证" class="span2 input-large msg-input" />
                    <button type="button" @click="sendsms" class="sui-btn msg-btn">获取验证码</button>
                  </div>
                </div>
                <div class="control-group">
                  <label for="inputpassword"  class="control-label">密码</label>
                  <div class="controls">
                    <input type="password" style="height: 32px;font-size: 14px" id="inputpassword" name="password" v-model="pojo.password"  data-rules="required|minlength=6|maxlength=26"  placeholder="请输入6-16位密码" class="input-xlarge" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="control-group btn-signup">
            <label class="control-label"></label>
            <div class="controls">
              <label >
                <input type="checkbox" name="agree" data-rules="required" />
                <span class="type-text" style="font-size:12px;">同意协议并接受《服务条款》</span>
              </label>
              <button type="submit" class="sui-btn btn-danger btn-yes" @click="register">注 册</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="item">
      <div class="form">
        <h3 class="loginsign-title">用户登录</h3>
        <form class="sui-form login-form sui-validate">
          <div class="control-group">
            <label for="inputname" class="control-label">手机号：</label>
            <div class="controls">
              <input type="text" id="inputname2" name="mobile2" v-model="mobile" data-rules="required" placeholder="11位手机号" class="input-xlarge"  />
            </div>
          </div>
          <div class="control-group">
            <label for="inputpassword" class="control-label">密码：</label>
            <div class="controls">
              <input type="text" id="inputpassword2" name="password2" v-model="password" data-rules="required" placeholder="输入登录密码" class="input-xlarge" />
            </div>
          </div>
          <div class="controls">
            <label> <input type="checkbox" name="remember-me" data-rules="required" /><span class="type-text" style="font-size:12px;">记住登录状态</span> </label>
            <button type="submit" @click="login" class="sui-btn btn-danger btn-yes">登 录</button>
          </div>
          <div class="other-methods">
          </div>
        </form>
      </div>
    </div>

  </div>
</template>
<script>
import '~/assets/css/page-sj-person-loginsign.css'
import userApi from "@/api/user";
import $ from 'jquery'
import {setUser} from '@/utils/auth'
  export default {
      head:{
          script:[
              {src:' http://g.alicdn.com/sj/lib/jquery/dist/jquery.min.js'},
              {src:'http://g.alicdn.com/sj/dpl/1.5.1/js/sui.min.js'},
          ],
          link:[
              // {rel:'stylesheet',href:'https://cdn.bootcss.com/social-share.js/1.0.16/css/share.min.css'}
          ]
      },
      data(){
          return{
              pojo: {},
              code:'',
              mobile: '',
              password: ''
          }
      },
    methods:{
        //  发送短信验证码
        sendsms() {
            userApi.sendsms(this.pojo.mobile).then(res=>{

               this.$message({
                   message:res.data.message,
                   type:(res.data.flag ? 'success':'error')
               })
               //  alert(res.data.message)
            })
        },
        //注册
        register() {
            userApi.register(this.pojo,this.code).then(res=>{
                this.$message({
                    message:res.data.message,
                    type:(res.data.flag ? 'success':'error')
                })
            })
        },
        login(mobile, password) {
            userApi.login(this.mobile,this.password).then(res=>{
                if (res.data.flag) {
                    //成功,保存用户信息到Cookies中
                    setUser(res.data.data.token,res.data.data.name,res.data.data.avatar)
                    location.href='/'
                }else {
                this.$message({
                    message:res.data.message,
                    type:'error'
                });
                    this.mobile = '';
                    this.password = '';
                }
            })
        }
    }
  }

</script>
