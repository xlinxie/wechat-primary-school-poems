//app.js

App({
  onLaunch: function () {
    this.globalData = { 
      tocs: {}
    };
    wx.clearStorage();
  }
})
