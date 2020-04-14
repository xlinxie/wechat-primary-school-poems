//index.js

Page({
  data: {
    volumes: ['上册', '下册'],
    volIndex: 0,
    poetry: {
      lines: [
        { title: '咏鹅', author: '骆宾王', dynasty: '唐' },
        { title: '咏鹅', author: '骆宾王', dynasty: '唐' },
        { title: '咏鹅', author: '骆宾王', dynasty: '唐' },
        { title: '咏鹅', author: '骆宾王', dynasty: '唐' },
        { title: '咏鹅', author: '骆宾王', dynasty: '唐' },
      ],
    },
    playAudio: false
  },

  switchVol: function(e) {
    const { volIndex } = e.target.dataset;
    if (typeof volIndex === 'number') {
      this.setData({ volIndex });
    }
  },
  playAudio: function() {
    const audioCtx = wx.createInnerAudioContext();
    audioCtx.src = `/public/audios/01江南.mp3`;
    audioCtx.onPlay(() => {
      this.setData({ playAudio: true });
    });
    audioCtx.onStop(() => {
      this.setData({ playAudio: false });
    });
    audioCtx.onEnded(() => {
      this.setData({ playAudio: false });
    });
    audioCtx.play();
  },

  onLoad: function() {

  },
})
