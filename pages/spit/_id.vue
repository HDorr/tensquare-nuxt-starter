<template>
  <div class="wrapper">
    <!--两列布局-->
    <div class="wrapper tc-detail">
      <div class="fl left-list">
        <div class="tc-detail">
          <!-- 标题区 -->
          <div class="detail-tit">
            <div class="detail-author">
              <a href="javascript:;">{{pojo.nickname}}</a> 发布
            </div>
            <div class="detail-content">
              <p>{{pojo.content}}</p>
            </div>
            <div class="detail-tool">
              <ul>
                <li><span class="star"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>{{pojo.thumbup}}</span></li>
                <li><a href="#" data-toggle="modal" data-target="#shareModal"><i class="fa fa-share-alt" aria-hidden="true"></i> {{pojo.share}}</a></li>
                <li><a data-toggle="modal" data-target="#remarkModal"><i class="fa fa-commenting" aria-hidden="true"></i> {{pojo.comment}}</a></li>
              </ul>
            </div>
          </div>
          <!-- 评论区 -->
          <div class="comment-area">
            <div class="comment-tit">
              <span>评论</span>
            </div>
            <ul class="comment-list">
              <li v-for="(item,index) in commentList" :key="index">
                <div class="item-photo" >
                  <img src="~/assets/img/widget-widget-photo.png" alt="" />
                </div>
                <div class="item-content">
                  <p class="author"><a href="javascript:;">{{item.nickname}}</a> 发布</p>
                  <p class="content">{{item.content}}</p>
                </div>
                <div class="item-thumb">
                  <div>
                    <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>{{item.thumbup}}
                  </div>
                </div> </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="fl right-tag">
        <div class="block-btn">
          <p>来个匿名吐槽，发泄一下你心中的怒火吧！</p>
          <a class="sui-btn btn-block btn-share" href="/spit/submit" >发吐槽</a>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script>
    import '~/assets/plugins/bootstrap/dist/css/bootstrap.min.css'
    import '~/assets/css/page-sj-spit-detail.css'
    import spitApi from "../../api/spit";
    import Axios from 'axios'
    export default {
        head:{
            script:[
                {src:'http://v2.uyan.cc/code/uyan.js'},
                {src:'http://v3.jiathis.com/code/jia.js'},
            ],
            link:[
            ]
        }
        ,
        data() {
            return{
            }
        },
        asyncData({params}) {
        //    根据id查询吐槽,以及查询吐槽列表
            return  Axios.all([spitApi.findById(params.id),spitApi.commentList(params.id)]).then(
                Axios.spread(function (pojo,commentList) {
                    return{
                        pojo: pojo.data.data,
                        commentList: commentList.data.data
                    }
                })
            )
        },
        methods:{
        }
    }
</script>
