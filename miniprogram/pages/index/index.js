//index.js
import Pages from '../../pages';

Page({
  data: {
    showSubmitBtn: false,
    grades: Object.values(Pages.grades),
  },

  navToGrade: function(e) {
    const { path } = e.currentTarget.dataset;
    wx.navigateTo({ url: path });
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
