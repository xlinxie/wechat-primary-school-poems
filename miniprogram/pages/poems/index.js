//index.js
import Pages from '../../pages';

Page({
  data: {
    volumes: ['上册', '下册'],
    volIndex: 0,
    tocs: [
      [
        { title: '咏鹅', author: '骆宾王', dynasty: '唐' },
        { title: '咏鹅', author: '骆宾王', dynasty: '唐' },
        { title: '咏鹅', author: '骆宾王', dynasty: '唐' },
        { title: '咏鹅', author: '骆宾王', dynasty: '唐' },
        { title: '咏鹅', author: '骆宾王', dynasty: '唐' },
      ],
      [
        { title: '静夜思', author: '李白', dynasty: '唐' },
        { title: '静夜思', author: '李白', dynasty: '唐' },
        { title: '静夜思', author: '李白', dynasty: '唐' },
        { title: '静夜思', author: '李白', dynasty: '唐' },
        { title: '静夜思', author: '李白', dynasty: '唐' },
      ]
    ]
  },

  switchVol: function(e) {
    const { volIndex } = e.currentTarget.dataset;
    if (typeof volIndex === 'number') {
      this.setData({ volIndex });
    }
  },
  navToContent: function() {
    wx.navigateTo({
      url: Pages.poems.content.path
    });
  },

  onLoad: function() {

  },
})
