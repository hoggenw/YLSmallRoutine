// pages/movies/more-movies/more-movies.js
var utils = require('../../../utils/utils.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: '',
    movies: {},
    totalCount: 0,
    isEmpty: true,
    url: '',
    title: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var category = options.category;
    this.data.category = category;
    var globalData = app.globalData;
    var url;
    var title;
    if (category == '豆瓣电影Top250') {
      url = globalData.g_topUrl;
      title = 'topData';
    } else if (category == '即将上映的电影') {
      url = globalData.g_screeningUrl;
      title = 'screeningData';
    } else {
      url = globalData.g_hotUrl;
      title = 'hotData';
    }
    this.data.url = url;
    this.data.title = title;
    this.requestDataWithUrl(url + '&start=' + this.data.totalCount + '&count=20', title);
    console.log(url);
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
    var count = moviesDouban.total;
    if (key === 'topData') {
      for (var index in moviesDouban.subjects) {
        var temp;
        var average;
        var stars;

        temp = moviesDouban.subjects[index];
        average = temp.rating.average;
        stars = utils.convertToStarsArray(temp.rating.stars);


        var title = temp.title;
        if (title.length > 6) {
          title = title.substring(0, 6) + '...';
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
    } else {
      for (var index in moviesDouban.entries) {
        var temp;
        var average;
        var stars;

        temp = moviesDouban.entries[index];
        average = temp.rating;
        stars = utils.convertToStarsArray(temp.stars);


        var title = temp.title;
        if (title.length > 6) {
          title = title.substring(0, 6) + '...';
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
    }

    var totalMovies = []

    //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.data.totalCount += movies.length;
    this.setData({
      movies: totalMovies
    });
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh()
  },

  onScrollLower: function(event) {
    this.requestDataWithUrl(this.data.url + '&start=' + this.data.totalCount + '&count=20', this.data.title);
    console.log(this.data.url);
    wx.showNavigationBarLoading();
    
  },
  onPullDownRefresh:function (){
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    this.requestDataWithUrl(this.data.url + '&start=' + this.data.totalCount + '&count=20', this.data.title);
    console.log(this.data.url);
    wx.startPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.category,
    })
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