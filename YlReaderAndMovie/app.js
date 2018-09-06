// //"#b3d4db"
App({

  globalData:{
    g_isPlayMusic:false,
    g_currentMusicPostId:null,
    // 正在热映
    g_hotUrl: "http://api.douban.com/v2/movie/nowplaying?apikey=0df993c66c0c636e29ecbb5344252a4a",
    //top250
    g_topUrl: "http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a",
    //即将上映
    g_screeningUrl: "http://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a",
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
