// list.js
import douban from '../../utils/douban.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '数据加载中',//页面第一次渲染用到的值
    type: '',
    page: 1, //页码
    size: 10,//页数
    list: [
      // {id:'', image: '', title: '', average: 4.3, original_title: '', year: '', directors:''}
    ]
  },

  /*
    加载
  */
  loadList: function () {
    douban({
      url: '/v2/movie/' + this.data.type,
      data: {
        count: this.data.size,
        start: this.data.page++
      },
      loading: true
    }).then(
      res => {
        if (!res.data.subjects) return;
        let result = [];
        res.data.subjects.map((item) => {
          result.push({
            image: item.images.small,
            id: item.id,
            title: item.title,
            average: item.rating.average,
            original_title: item.original_title,
            year: item.year,
            directors: item.directors[0].name
          })
        });
        this.setData({
          list: result,
          title: res.data.title//渲染list时需要在渲染一次title
        });

        // console.log(this.data.list)
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.title = options.title || this.data.title

    // 类型： in_theaters  coming_soon  us_box
    this.data.type = options.key || this.data.type
    this.loadList();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title + ' « 电影 « 豆瓣'
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.loadList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})