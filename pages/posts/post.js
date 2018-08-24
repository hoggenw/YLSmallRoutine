Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  imagepath:"/images/",
  process:function() {
    var date = "Nov 17 2018";

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad");
    var posts_contents = [
      {
        date: "Nov 17 2018",
        title: "达到减肥的",
        img: {
          post_img: "/images/post/crab.png",
          author_img: "/images/avatar/4.png",
        },
        img_condition: true,
        a: "1",
        b: 2,
        c: 3,
        content: "第二步，打开微信开发者工具，选择新建小程序项目，我们先不需理解AppID的概念，新建项目时选择无AppID，并取消勾选“建立普通快速启动模板”的选项。",
        view_num: "1120",
        conllect_num: "98",
      },
      {
        date: "Nov 17 2018",
        title: "达到减sds肥的",
        img: {
          post_img: "/images/post/vr.png",
          author_img: "/images/avatar/5.png",
        },
        img_condition: true,
        a: "1",
        b: 2,
        c: 3,
        content: "组件模版的写法与页面模板相同。组件模版与组件数据结合后生成的节点树，将被插入到组件的引用位置上。在组件模板中可以提供一个<slot> 节点，用于承载组件引用时提供的子节点。",
        view_num: "3120",
        conllect_num: "298",
      },
      {
        date: "Feb 27 2018",
        title: "都是块级的",
        img: {
          post_img: "/images/post/bl.png",
          author_img: "/images/avatar/2.png",
        },
        img_condition: true,
        a: "1",
        b: 2,
        c: 3,
        content: " 一个服务仅仅只有界面展示是不够的，还需要和用户做交互：响应用户的点击、获取用户的位置等等。在小程序里边，我们就通过编写 JS 脚本文件来处理用户的操作。",
        view_num: "2340",
        conllect_num: "198",
      }
    ]

      this.setData({post_key:posts_contents});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload");
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