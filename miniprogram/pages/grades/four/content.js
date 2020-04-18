import Pages from '../../../pages';

Page({
  data: {
    poem: {},
    playAudio: false,
    showPinyin: true,
  },

  playAudio: function(e) {
    const { title } = e.currentTarget.dataset;
    const { playAudio } = this.data;
    let audioCtx = getApp().globalData.audioContext;
    if (!audioCtx) {
      audioCtx = wx.createInnerAudioContext();
      getApp().globalData.audioContext = audioCtx;
    }
    if (!playAudio) {
      audioCtx.src = `./audios/${title}.mp3`;
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
    } else {
      audioCtx.pause();
      this.setData({ playAudio: false });
    }
  },
  togglePinyin: function() {
    const { showPinyin } = this.data;
    this.setData({ showPinyin: !showPinyin });
  },
  onLoad: function() {
    const poem = getApp().globalData.poem;
    this.setData({ poem });
  },
  onShareAppMessage() {
    return {
      title: '小学古诗知多少',
      path: Pages.index.path,
    }
  }
})
