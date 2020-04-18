//index.js
import { Poems } from '../../utils/data';
import Pages from '../../pages';

Page({
  data: {
    poems: [
      { title: '咏鹅', author: '骆宾王', dynasty: '唐' },
      { title: '咏鹅', author: '骆宾王', dynasty: '唐' },
      { title: '咏鹅', author: '骆宾王', dynasty: '唐' },
      { title: '咏鹅', author: '骆宾王', dynasty: '唐' },
      { title: '咏鹅', author: '骆宾王', dynasty: '唐' },
    ],
    keyword: '',
    result: []
  },
  navToContent: function() {
    wx.navigateTo({
      url: Pages.poems.content.path,
    });
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
    Poems.forEach((poems) => {
      poems.forEach((poem) => {
        const poemStr = JSON.stringify(poem);
        if (poemStr.indexOf(keyword) >= 0) {
          result.push(poem);
        }
      })
    });
    return result;
  },
  onLoad: function() {},
  onReady: function() {
    // wx.setNavigationBarTitle({ title: '搜索' });
  }
})
