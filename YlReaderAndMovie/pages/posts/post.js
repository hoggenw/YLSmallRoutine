
var postsData = require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {},
  imagepath: "/images/",
  process: function() {
    var date = "Nov 17 2018";
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("onLoad");


    //this.data.postList = postsData.postList
    this.setData({
      post_key: postsData.postList
    });
  },
  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postId;
    console.log(postId + "onPostTap");
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  },
  onSwipTap: function (event) {
    var postId = event.target.dataset.postId;
    console.log(postId + "onPostTap");
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //console.log("onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    // console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // console.log("onUnload");
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