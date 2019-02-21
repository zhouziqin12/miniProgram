// pages/splash/splash.js
let app = getApp();
import douban from '../../utils/douban.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [
      // {image:'',id:xx}
    ],
    count:3
  },

  board(){
    wx.setStorageSync('splash_douban',true);

    wx.switchTab({
      url: '/pages/board/board'
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let value = wx.getStorageSync('splash_douban')

    if (value) {
      wx.switchTab({
        url: '/pages/board/board'
      })
      return;
    }


    douban({
      url: '/v2/movie/coming_soon',
      data: {
        start:1,
        count:this.data.count
      }
    }).then(
      res=>{
        if (!res.data.subjects) return;
        let result = [];
        res.data.subjects.map((item) => {
          result.push({
            image: item.images.large,
            id: item.id
          })
        });
        this.setData({ movies:result});
      }
    )
    // wx.request({
    //   url: app.globalData.baseUrl +'/v2/movie/coming_soon',
    //   data:{
    //     start:1,
    //     count:this.data.count
    //   },
    //   header:{
    //     'content-type':'json'
    //   },
    //   success:function(res){
    //     if (!res.data.subjects) return;
    //     let result = [];
    //     res.data.subjects.map((item) => {
    //       result.push({
    //         image: item.images.large,
    //         id: item.id
    //       })
    //     });

    //     _this.setData({ movies:result});
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})