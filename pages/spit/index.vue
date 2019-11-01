<template>
<div class="wrapper">
  <!--两列布局-->
  <div class="wrapper tag-item">
    <div class="fl left-list">
      <div class="tc-data-list">
        <div class="tc-list" v-infinite-scroll="loadMore">
          <ul class="detail-list" >
            <li class="qa-item" v-for="(item,index) in items":key="index">
              <div class="fl record">
                <div class="number">
                  <div class="border useful">
                    <p class="usenum" @click="thumbup(index)">
                      <a class="zan"><i :class="'fa fa-thumbs-up ' +item.zan" aria-hidden="true"></i></a>
                    </p>
                    <p class="zannum"> {{item.thumbup}} </p>
                  </div>
                  <div class="border answer">
                    <a href="#" class="star"><i class="fa fa-star-o" aria-hidden="true"></i></a>
                  </div>
                </div>
              </div>
              <div class="info">

                <p class="text"> <router-link :to="'/spit/'+item.id"> {{item.content}} </router-link></p>
                <div class="other">
                  <div class="fl date">
                    <span>{{item.publishtime}}</span>
                  </div>
                  <div class="fr remark">
                    <a href="#" data-toggle="modal" data-target="#shareModal" class="share"><i class="fa fa-share-alt" aria-hidden="true"></i> 分享</a>
                    <a href="#" data-toggle="modal" data-target="#remarkModal" class="comment"><i class="fa fa-commenting" aria-hidden="true"></i> 回复</a>
                  </div>
                </div>
              </div>
              <div class="clearfix"></div> </li>
          </ul>
        </div>
      </div>
      <!-- <script>
     $(function () {
         $(".zan").click(function () {
             $(this).children(".fa").toggleClass("color");
             var c = parseInt($(this).parent().siblings(".zannum").html());
             c = c++;
         });
         $(".star").click(function () {
             console.log("eeee");
             $(this).children(".fa").removeClass("fa-star-o").addClass("fa-star color");
         });
         $(".detail-list").unbind("scroll").bind("scroll", function (e) {
             var sum = this.scrollHeight;
             if (sum - 10 <= $(this).scrollTop() + $(this).height()) {
                 $(".detail-list").append($("li").clone());
             }
         });
     })

 </script> -->
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
  import '~/assets/css/page-sj-spit-index.css'
  import spitApi from "../../api/spit";
  import {getUser} from '@/utils/auth'
  export default {
      data() {
          return{
          pageNo:1,
          size:10,
          searchMap:{}
          }
      },
      asyncData() {
          return spitApi.search(1, 10, {state:'1'}).then(res=>{
              /*
              用map方法加载数据时加一个属性zan,返回一个tmp,就为数组每一项都加上了zan的属性
              ,点击时改变其值
               */
              let tmp=res.data.data.rows.map(item=>{
                  return {
                      ...item,//原有的item
                      zan:''//额外加的属性
                  }
              })
              return {items:tmp}
          })
      },
      methods:{
          loadMore() {
              this.pageNo++;
              spitApi.search(this.pageNo,10,{state: 1}).then(res=>{
                  let tmp=res.data.data.rows.map(item=>{
                      return {
                          ...item,
                          zan:''
                      }
                  })
                  this.items = this.items.concat(tmp);
              })
          },
          thumbup(index) {
              //判断是否登录
              if (getUser().name === undefined) {
                  this.$message({
                      message:'客官,请先登录!',
                      type:"warning"
                  })
                  return
              }
              //禁止重复点赞
              /*
              这只是前端处理,真正还需后端进行处理,将token提交过去,
              校验是否点赞过
               */
              if (this.items[index].zan === 'color') {
                  this.$message({
                      message:'只能点赞一次哦!',
                      type:"warning"
                  })
                  return
              }
              this.items[index].zan='color';
              spitApi.thumbup(this.items[index].id).then(res=>{
                  if (res.data.flag) {
                      // 每条不同的索引点赞数++
                      this.items[index].thumbup++

                  }
              })
          }
      }
  }
</script>
