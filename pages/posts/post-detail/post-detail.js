var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.data.postId = postId;
    // console.log("id = " + postId);
    var postData = postsData.postList[postId];
    this.data.postData = postData;
    //this.data.postData = postData;
    // console.log( postData);
    this.setData({
      postData
    });
    // var postCollected = {
    //   1:"true",
    // } 
    var postCollected = wx.getStorageSync('postCollected');
    if (postCollected){
      var collected = postCollected[postId];
      this.setData({
        conllected:collected
      });
    }else {
      var postCollected ={};
      postCollected[postId] = false;
      wx.setStorageSync('postCollected', postCollected);
    }
    this.setMusicStatus();

  

  },

  setMusicStatus:function(){
    var globalData = app.globalData;
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      globalData.g_isPlayMusic = false;
      globalData.g_currentMusicPostId = this.data.postId;
      that.setData({
        isPlayMusic: false
      });
    });

    wx.onBackgroundAudioPause(function () {
      globalData.g_isPlayMusic = true;
      globalData.g_currentMusicPostId = this.data.postId;
      that.setData({
        isPlayMusic: true
      });
    });

    that.setData({
      isPlayMusic: (globalData.g_isPlayMusic && this.data.postId == globalData.g_currentMusicPostId)
    });
  },

  onCollectionTap : function(event){
    var info = wx.getStorageSync('postCollected');
    var postId = this.data.postId;
    var collected = info[postId];
    var title;
    if (collected){
      info[postId] = false;
      title = '取消成功';
    }else{
      info[postId] = true;
      title = '收藏成功';
    }
    collected = !collected;
    this.setData({
      conllected:collected
    });
    wx.setStorageSync('postCollected', info);
    this.showToast(title);
    // wx.showModal({
    //   title: '需要关闭',
    //   content: '是的撒大所大所',
    // })
    // console.log(info.game + ' China ' + info.name)
  },

  showToast:function(title){
    wx.showToast({
      title: title,
      duration: 1500,
      // icon:'loading',
    })
  },
  onShareTap :function(event){
    //wx.removeStorageSync('Fkey');
    //缓存上限为10M
    // 清除所有缓存
    //wx.clearStorageSync();
    var that = this;
      wx.showActionSheet({
        itemList: [
          "分享给微信好友",
          "分享到朋友圈",
          "分享到微博",
          "分享到QQ",
        ],
        itemColor:"#405f80",
        success:function(res){
          //res.cancel
          //res.tapindex
          that.showToast("分享：" + res.tapIndex);
        },
      })

  },

  musicAction :function(event){
    var isPlayMusic = this.data.isPlayMusic;
    if (isPlayMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayMusic : false
      });
    }else{
      var postData = this.data.postData;
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      });
      this.setData({
        isPlayMusic: true
      });
    }
    

    
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