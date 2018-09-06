// pages/movies/more-movies/more-movies.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.category = category;
    var globalData = app.globalData;
    var url;
    if (category == '豆瓣电影Top250') {
      url = globalData.g_topUrl;
    } else if (category == '即将上映的电影') {
      url = globalData.g_screeningUrl;
    } else {
      url = globalData.g_hotUrl;
    }
    console.log(url);
    //this.requestDataWithUrl(stringUrl);
  },
  requestDataWithUrl: function (ulrString) {
    var that = this;
    wx.request({

      url: ulrString,

      //必须要设置"content-type":"json",不然会报错 400 (Bad Request)
      method: 'GET',
      header: {

        "content-type": "json"

      },

      success: function (backData) {

        that.processDoubanData(backData.data, key);
      }

    })

  },

  processDoubanData: function (moviesDouban, key) {
    var movies = [];
    console.log(moviesDouban);
    for (var index = 0; index <= 2; index++) {
      var temp;
      var average;
      var stars;
      if (key === 'topData') {
        temp = moviesDouban.subjects[index];
        average = temp.rating.average;
        stars = utils.convertToStarsArray(temp.rating.stars);
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
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.category,
    })
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