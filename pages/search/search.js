// pages/search/search.js
import douban from '../../utils/douban.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    size: 20,
    subtitle: '请在此输入搜索内容',
    list: [],
    search: '恐怖',
    loading: false,
    hasMore: false
  },

  loadList(){
    this.setData({ subtitle: '加载中...', hasMore: true, loading: true })
    let start = (this.data.page - 1) * this.data.size;//计算开始条数
    this.setData({
      page: this.data.page + 1
    });
    // console.log('https://douban.uieee.com/v2/movie/search?q=' + this.data.search + '&start=' + start + '&count=' + this.data.size);
    douban({
      url: '/v2/movie/search',
      data: {
        tag: this.data.search,
        start: start,
        count: this.data.size
      }
    }).then(
      res => {
        this.setData({ loading: false, hasMore: false, subtitle: res.data.title });
        console.log('请求成功', res.data.subjects)
        if (!res.data.subjects.length) {
          return;
        }

        let result = [];
        res.data.subjects.map((item) => {
          result.push({
            image: item.images.small,
            id: item.id,
            title: item.title,
            average: item.rating.average,
            original_title: item.original_title,
            year: item.year,
            directors: (item.directors.length && item.directors[0].name) || '-'
          })
        });
        this.setData({
          list: this.data.list.concat(result),
        });

        console.log(res.data.total, res.data.count,this.data.list.length)
        
        wx.stopPullDownRefresh(); //停止下拉刷新UI
      }
    )
  },

  handleSearch(e) {
    if (!e.detail.value) return
    this.setData({ list: [], page: 1 })//每次搜索前清空数据
    this.setData({ subtitle: '加载中...', hasMore: true, loading: true, search: e.detail.value });
    this.loadList()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    this.data.list = [];
    this.data.page = 1;
    this.loadList();
      // app.wechat.original.stopPullDownRefresh(); //停止下拉刷新UI
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
    this.loadList(); //加载更多
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})