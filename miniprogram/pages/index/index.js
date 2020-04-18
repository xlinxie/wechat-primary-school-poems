//index.js
import Pages from '../../pages';

Page({
  data: {
    showSubmitBtn: false,
    grades: Array(6).fill(0),
  },

  navToGrade: function(e) {
    const { grade } = e.currentTarget.dataset;
    console.log(grade);
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

  onLoad: function() {

  },
})
