//index.js
import Poems from '../../utils/poems';
import Pages from '../../pages';

Page({
  data: {
    keyword: '',
    pages: Object.keys(Pages.grades).map((key) => Pages.grades[key].path),
    result: []
  },
  navToContent: function(e) {
    const { grade, id } = e.currentTarget.dataset;
    const { pages, result } = this.data;
    const poem = result.find((poem) => poem.id === id);
    getApp().globalData.poem = poem;
    wx.navigateTo({ url: pages[grade] });
  },
  handleSubmit: function(e) {
    let keyword = e.detail.value;
    if (e.type === 'submit') {
      keyword = e.detail.value.keyword;
    }
    const result = this.search(keyword);
    this.setData({ keyword, result });
  },
  search: function(keyword) {
    const result = [];
    Poems.forEach((poemsOfGrade, grade) => {
      poemsOfGrade.forEach((poems) => {
        poems.forEach((poem) => {
          if (poem.title.includes(keyword)) {
            result.push({ grade, ...poem });
            return;
          }
          if (poem.author.includes(keyword)) {
            result.push({ grade, ...poem });
            return;
          }
          const content = poem.lines.map(
            ({ characters }) => characters.join('')
          ).join(',');
          if (content.includes(keyword)) {
            result.push({ grade, ...poem });
            return;
          }
        })
      })
    });
    return result;
  },
  onLoad: function() {},
  onReady: function() {
    // wx.setNavigationBarTitle({ title: '搜索' });
  }
})
