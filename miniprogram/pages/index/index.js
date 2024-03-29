//index.js
import Pages from '../../pages';

Page({
  data: {
    showSubmitBtn: false,
    grades: Array(6).fill(0),
  },

  navToGrade: function(e) {
    const { grade } = e.currentTarget.dataset;
    getApp().globalData.grade = grade;
    wx.navigateTo({ url: Pages.poems.index.path });
  },
  navToSearch: function() {
    // prevent navigate multiple times
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      wx.navigateTo({
        url: Pages.search.result.path,
        success: () => {
          clearTimeout(this.timer);
          this.timer = null;
        }
      });
    }, 100);
  },
  navToAbout() {
    wx.navigateTo({ url: Pages.about.path });
  },
  onLoad: function() {},
  onShareAppMessage() {
    return {
      title: '小学古诗知多少',
      path: Pages.index.path,
    }
  }
})
