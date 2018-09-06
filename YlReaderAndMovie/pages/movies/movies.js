var utils = require('../../utils/utils.js')
var app = getApp();

Page({

  

  /**
   * 页面的初始数据
   */
  data: {
    hotData: {},
    topData: {},
    screeningData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var globalData = app.globalData;
    this.requestDataWithUrl(globalData.g_hotUrl +'&start=0&count=3','hotData');

    this.requestDataWithUrl(globalData.g_topUrl + '&start=0&count=3', 'topData');
    this.requestDataWithUrl(globalData.g_screeningUrl + '&start=0&count=3','screeningData');

  },

  requestDataWithUrl: function(ulrString, key) {
    var that = this;
    wx.request({

      url: ulrString,

      //必须要设置"content-type":"json",不然会报错 400 (Bad Request)
      method: 'GET',
      header: {

        "content-type": "json"

      },

      success: function(backData) {

        that.processDoubanData(backData.data, key);
      }

    })

  },

  processDoubanData: function(moviesDouban, key) {
    var movies = [];
    //console.log(moviesDouban);
    for (var index = 0; index <= 2; index++) {
      var temp;
      var average;
      var stars;
      if (key ==='topData') {
        temp = moviesDouban.subjects[index];
        average = temp.rating.average;
        stars = utils.convertToStarsArray(temp.rating.stars) ;
      } else {
        temp = moviesDouban.entries[index];
        average = temp.rating;
        stars = utils.convertToStarsArray(temp.stars);
      }

      var title = temp.title;
      if (title.length > 6) {
        title = title.substring(0, 6);
      }
      var model = {
        title: title,
        average: average,
        coverageUrl: temp.images.medium,
        movieId: temp.id,
        stars: stars
      }
      movies.push(model);
    }
    var readyData = {};
    readyData[key] = {
      movies: movies,
      categoryTitile: moviesDouban.title
    };
    this.setData(readyData)
  },

  onMoreTap:function(event){
    //'豆瓣电影Top250' '即将上映的电影' '正在上映的电影'
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movies/more-movies?category=' + category,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})