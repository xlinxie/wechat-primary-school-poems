//index.js
import Pages from '../../pages';
import Poems from '../../utils/poems';
import { Grades } from '../../utils/constants';

Page({
  data: {
    volumes: ['上册', '下册'],
    volIndex: 0,
    tocs: [[], []],
    pages: Object.keys(Pages.grades).map((key) => Pages.grades[key].path)
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

    const { volIndex, volumes, pages, poems } = this.data;
    const grade = getApp().globalData.grade;
    getApp().globalData.poem = poems[volIndex].find((poem) => poem.title === title);
    getApp().globalData.poemContentTitle = `${Grades[grade]} - ${volumes[volIndex]}`;
    wx.navigateTo({ url: pages[grade] });
  },

  onLoad: function() {
    const grade = getApp().globalData.grade;
    const poemsOfGrade = Poems[grade];
    try {
      const key = `toc:${grade}`;
      const cachedTocs = wx.getStorageSync(key);
      if (cachedTocs) {
        this.setData({ tocs: cachedTocs, poems: poemsOfGrade });
      } else {
        const tocs = poemsOfGrade.map((vol) => {
          const toc = vol.map(({ title, author, dynasty }) => ({ title, author, dynasty }));
          return toc;
        });
        this.setData({ tocs, poems: poemsOfGrade });
        wx.setStorage({ key, data: tocs });
      }
    } catch (e) {
      console.log(e.message);
    }
    wx.setNavigationBarTitle({ title: Grades[grade] });
  },
  onShareAppMessage() {
    return {
      title: '小学古诗知多少',
      path: Pages.index.path,
    }
  }
})
