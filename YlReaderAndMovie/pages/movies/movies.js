var utils = require('../../utils/utils.js')

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

    // 正在热映
    var hotUrl = "http://api.douban.com/v2/movie/nowplaying?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=3";
    //top250
    var topUrl = "http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=3";
    //即将上映
    var screeningUrl = "http://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=3";

    this.requestDataWithUrl(hotUrl,'hotData');

    this.requestDataWithUrl(topUrl, 'topData');
    this.requestDataWithUrl(screeningUrl,'screeningData');

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
    console.log(moviesDouban);
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