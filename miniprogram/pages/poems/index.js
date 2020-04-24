//index.js
import Pages from '../../pages';
import Poems from '../../utils/poems';
import { Grades, Volumes } from '../../utils/constants';

Page({
  data: {
    volumes: Volumes,
    volIndex: 0,
    tocs: [[], []],
    pages: Object.keys(Pages.grades).map((key) => Pages.grades[key].path)
  },

  switchVol: function(e) {
    const { volIndex } = e.currentTarget.dataset;
    if (typeof volIndex === 'number') {
      getApp().globalData.volIndex = volIndex;
      this.setData({ volIndex });
    }
  },
  navToContent: function(e) {
    const { title } = e.currentTarget.dataset;
    if (!title) return;

    const { volIndex, volumes, pages, poems } = this.data;
    const { grade } = getApp().globalData;
    getApp().globalData.poem = poems[volIndex].find((poem) => poem.title === title);
    getApp().globalData.grade = grade;
    wx.navigateTo({ url: pages[grade] });
  },

  onLoad: function(query) {
    let { grade } = getApp().globalData;
    getApp().globalData.volIndex = 0;

    // 处理通过分享进页面的情况
    if (query.grade) {
      grade = +query.grade;
      const volIndex = +query.volIndex;
      getApp().globalData.grade = grade;
      getApp().globalData.volIndex = volIndex;
      this.setData({ volIndex });
    }
    wx.setNavigationBarTitle({ title: Grades[grade] });

    let tocs = getApp().globalData.tocs[grade];
    const poemsOfGrade = Poems[grade];
    if (tocs) {
      this.setData({ tocs, poems: poemsOfGrade });
      return;
    }
    tocs = poemsOfGrade.map((vol) => {
      const toc = vol.map(({ title, author, dynasty }) => ({ title, author, dynasty }));
      return toc;
    });
    getApp().globalData.tocs[grade] = tocs;
    this.setData({ tocs, poems: poemsOfGrade });
  },
  onShareAppMessage() {
    const { grade, volIndex } = getApp().globalData;
    return {
      title: '小学古诗知多少',
      path: `${Pages.poems.index.path}?grade=${grade}&volIndex=${volIndex}`,
    }
  }
})
