//index.js
import Pages from '../../../pages';
import Poems from './data';

Page({
  data: {
    volumes: ['上册', '下册'],
    volIndex: 0,
    tocs: [[], []]
  },

  switchVol: function(e) {
    const { volIndex } = e.currentTarget.dataset;
    if (typeof volIndex === 'number') {
      this.setData({ volIndex });
    }
  },
  navToContent: function(e) {
    const { title } = e.currentTarget.dataset;
    if (!title) return;

    const { volIndex } = this.data;
    getApp().globalData.poem = Poems[volIndex].find((poem) => poem.title === title);
    wx.navigateTo({
      url: Pages.poems.content.path
    });
  },

  onLoad: function() {
    const pages = getCurrentPages();
    try {
      const key = `toc:${pages[pages.length - 1].route}`;
      const cachedTocs = wx.getStorageSync(key);
      if (cachedTocs) {
        this.setData({ tocs: cachedTocs });
      } else {
        const tocs = Poems.map((vol) => {
          const toc = vol.map(({ title, author, dynasty }) => ({ title, author, dynasty }));
          return toc;
        });
        this.setData({ tocs });
        wx.setStorage({ key, data: tocs });
      }
    } catch (e) {
      console.log(e.message);
    }
  },
})
