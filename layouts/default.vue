<template>
  <div>
    <header>
      <div class="activity‐head">
        <div class="wrapper">
          <div class="sui-navbar">
            <div class="navbar-inner">
              <a href="#" class="sui-brand">
                <img src="~/assets/img/asset-logo-black.png" alt="社交"/>
              </a>
              <ul class="sui-nav">
                <!--            <li class="active"><a href="/">头条</a></li>-->
                <!--            <li><a href="/qa">问答</a></li>-->
                <!--            <li><a href="/gathering">活动</a></li>-->
                <!--            <li><a href="/friend">交友</a></li>-->
                <!--            <li><a href="/spit">吐槽</a></li>-->
                <!--            <li><a href="/recruit">招聘</a></li>-->
                <router-link tag="li" active-class="active" exact to="/"><a>首页</a></router-link>
                <router-link tag="li" active-class="active" to="/qa"><a>问答</a></router-link>
                <router-link tag="li" active-class="active" to="/gathering"><a>活动</a></router-link>
                <router-link tag="li" active-class="active" to="/friend"><a>交友</a></router-link>
                <router-link tag="li" active-class="active" to="/spit"><a>吐槽</a></router-link>
                <router-link tag="li" active-class="active" to="/recruit"><a>招聘</a></router-link>
              </ul>
              <form class="sui-form pull-left">
                <input type="text" placeholder="输入关键词..."/>
                <span class="btn-search fa fa-search"></span>
              </form>
<!--   这里一定不要使用v-if,那样服务端渲染和客户端渲染会冲突啊啊啊啊啊-->
              <div class="sui-nav pull-right info side" v-show="user.name===undefined">
                <router-link to="/login" class="gologin">登录</router-link>
              </div>
              <div class="sui-nav pull-right info" v-show="user.name!==undefined">
                <li>
                  <a href="/manager"  class="notice">
                    {{user.name}}
                  </a>
                </li>
                <li>
                  <a @click="logout" class="notice">
                    <span>退出登录</span>
                  </a>
                </li>
                <li class="hover">
                  <span class="fa fa-plus "></span>
                  <ul class="hoverinfo">
                    <li><i class="fa fa-share-alt" aria-hidden="true"></i> <a
                      href="~/assets/headline-submit.html">去分享</a></li>
                    <li><i class="fa fa-question-circle" aria-hidden="true"></i> <a href="~/assets/qa-submit.html"
                                                                                    target="_blank">提问题</a>
                    </li>
                    <li><i class="fa fa-comments" aria-hidden="true"></i><a href="~/assets/spit-submit.html"
                                                                            target="_blank">去吐槽</a></li>
                    <li><i class="fa fa-heartbeat" aria-hidden="true"></i> <a href="~/assets/makeFriends-submit.html"
                                                                              target="_blank">发约会</a></li>
                  </ul>
                </li>
                <li>
                  <a href="/manager" class="homego">
                    <img :src="user.avatar" :alt="user.name" style="width: 39px;height: 39px"/>
                  </a>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <nuxt/>
    <footer>
      <div class="footer">
        <div class="wrapper">
          <div class="footer-bottom">
            <div class="link">
              <dl>
                <dt>
                  网站相关
                </dt>
                <dd>
                  关于我们
                </dd>
                <dd>
                  服务条款
                </dd>
                <dd>
                  帮助中心
                </dd>
                <dd>
                  编辑器语法
                </dd>
              </dl>
              <dl>
                <dt>
                  常用链接
                </dt>
                <dd>
                  传智播客
                </dd>
                <dd>
                  传智论坛
                </dd>
              </dl>
              <dl>
                <dt>
                  联系我们
                </dt>
                <dd>
                  联系我们
                </dd>
                <dd>
                  加入我们
                </dd>
                <dd>
                  建议反馈
                </dd>
              </dl>
              <dl>
                <dt>
                  关注我们
                </dt>
                <dd>
                  微博
                </dd>
                <dd>
                  twitter
                </dd>
              </dl>
              <div class="xuke">
                <h3>内容许可</h3>
                <p>除特别说明外，用户内容均采用知识共享署名-非商业性使用-禁止演绎4.0 国际许可协议 (CC BY-NC-ND 4.0) 进行许可</p>
                <p>本站由 传智研究院 提供更新服务</p>
              </div>
            </div>
            <p class="Copyright">Copyright &copy; 2017 传智问答社区 当前版本 0.0.1</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
    import '~/assets/plugins/normalize-css/normalize.css'
    import '~/assets/plugins/yui/cssgrids-min.css'
    import '~/assets/plugins/sui/sui.min.css'
    import '~/assets/plugins/sui/sui-append.min.css'
    import '~/assets/plugins/font-awesome/css/font-awesome.min.css'
    import '~/assets/css/widget-base.css'
    import '~/assets/css/widget-head-foot.css'
    import {getUser,removeUser} from '@/utils/auth.js'

    export default {
        data() {
            return {
                user: {}
            }
        },
        mounted() {
            this.user = getUser();
        },
        methods:{
            logout() {
                removeUser();
                location.href='/'
            }
        }
    }
</script>
<style type="text/css">
  .gologin{
    font-size: 15px;
    font-weight: bolder;

  }
  .gologin:hover {
    text-decoration: none;
  }
  .side{
    position: absolute;
    top: 23px;
    padding-right: 20px;
  }
</style>

