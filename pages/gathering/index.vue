<template>
  <div class="wrapper">
  <!--中间布局-->
  <div class="wrapper activities">
    <div class="activity-card-list">
      <div class="top-title">
        <h4 class="latest">最新活动</h4>
        <div class="clearfix"></div>
      </div>
      <div class="activity-list" v-infinite-scroll="loadMore" infinite-scroll-distance="5" infinite-scroll-disabled="busy" >
        <ul class="activity" >
          <li class="activity-item" v-for="(item,index) in items" :key="index">
            <div class="activity-inner">
              <a href="http://"></a>
              <div class="img">
                <a :href="'/gathering/item/'+item.id" ><img :src="item.image" alt="" /></a>
              </div>
              <div class="text">
                <p class="title">{{item.name}}</p>
                <div class="fl goin">
                  <p>时间：{{item.starttime}}</p>
                  <p>城市：{{item.city}}</p>
                </div>
                <div class="fr btn">
                  <span class="sui-btn btn-bao">立即报名</span>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div :class="loadMoreHide ? 'load-more-hide' : 'load-more-normal'" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <span v-show="loadingShow">加载中...</span>
      </div>
    </div>
  </div>
  </div>

</template>
<script>
    import '~/assets/css/page-sj-activity-index.css'
    import gatheringApi from '@/api/gathering'
    export default {
      data(){
          return{
            pageNo:1,
            size:12,
            busy:false,
            loadingShow:true,
            loadMoreHide:true
          }
      },
      //   created() {
      //
      //   },
        asyncData() {
          // 查询活动列表
         return  gatheringApi.search(1, 12,{state:'1'}).then(res =>{
            return{items:res.data.data.rows,totalPage:res.data.data.total}
          })
        },
        methods: {
            //瀑布流方法
            loadMore() {
                if (this.pageNo*this.size >=this.totalPage) {
                    this.busy = true //已经是最后一页了，不需要再触发滚动加载了
                    this.loadMoreHide = true  //已经是最后一页了，不需要高度了
                } else {
                    //不是最后一页,不忙碌
                    this.busy = true
                    //设置显示加载中
                    this.loadMoreHide = false
                    //将页数++
                    this.pageNo++
                    //异步调用查询前显示加载框
                    this.loadingShow = true
                setTimeout(() => {
                    gatheringApi.search(this.pageNo, 12, {state: '1'}).then(res => {
                        this.busy = false
                        this.items = this.items.concat(res.data.data.rows)
                        //查到数据后隐藏加载框
                        this.loadingShow = false
                    })
                },400);
                }
            },
        }
    }
</script>
<style type="text/css">
  .load-more-normal {
    text-align: center;
    height: 60px;
    line-height: 60px;
  }

  .load-more-hide {
    height: 0;
  }
</style>
