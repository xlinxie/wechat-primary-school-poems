import Pages from '../../../pages';
import Poems from '../../../utils/poems';
import { Grades, Volumes } from '../../../utils/constants';

const LoopMode = {
  ONE: 'one',
  LIST: 'list',
};

const LoopOptions = [
  { name: '本文', value: LoopMode.ONE },
  { name: '本书', value: LoopMode.LIST },
];

Page({
  data: {
    poem: {},
    audioPlaying: false,
    pinyinVisible: true,
    loopMode: LoopOptions[0],
  },
  changeLoopMode: function() {
    const { loopMode } = this.data;
    const loopModeIndex = loopMode.value === LoopMode.ONE ? 1 : 0;
    
    getApp().globalData.loopMode = loopMode.value === LoopMode.ONE ? 
      LoopMode.LIST : LoopMode.ONE;
    getApp().globalData.audioContext.loop = loopMode.value !== LoopMode.ONE;

    this.setData({ loopMode: LoopOptions[loopModeIndex] });
    wx.showToast({
      icon: 'none',
      title: `${LoopOptions[loopModeIndex].name}循环`
    });
  },
  playAudio: function() {
    const { poem } = this.data;
    const { audioPlaying } = this.data;
    let audioCtx = getApp().globalData.audioContext;
    if (!audioCtx) {
      audioCtx = wx.createInnerAudioContext();
      getApp().globalData.audioContext = audioCtx;
    }

    const pages = getCurrentPages();
    const currentPath = pages[pages.length - 1].route;
    const baseAudioPath = currentPath.slice(0, currentPath.lastIndexOf('/'));
    const { loopMode = LoopMode.ONE, grade, volIndex } = getApp().globalData;
    if (!audioPlaying) {
      audioCtx.src = `/${baseAudioPath}/audios/${poem.title}.mp3`;
      audioCtx.loop = loopMode === LoopMode.ONE;
      audioCtx.onPlay(() => {
        this.setData({ audioPlaying: true });
      });
      audioCtx.onStop(() => {
        this.setData({ audioPlaying: false });
      });
      audioCtx.onEnded(() => {
        const { loopMode } = getApp().globalData;
        if (loopMode === LoopMode.ONE) {
          return;
        }
        // 本书循环播放
        const { poem: currentPoem } = getApp().globalData;
        const poemsOfGrade = Poems[grade];
        let nextPoem = poem;
        poemsOfGrade.forEach((poems, i) => {
          poems.forEach((poem, j) => {
            if (poem.id === currentPoem.id) {
              nextPoem = poems[j + 1];
              let _volIndex = i;
              if (j === poems.length - 1) {
                _volIndex = i < poemsOfGrade.length - 1 ? i + 1 : i - 1;
                nextPoem = poemsOfGrade[_volIndex][0];
              }
              getApp().globalData.volIndex = _volIndex;
              getApp().globalData.poem = nextPoem;
              wx.setNavigationBarTitle({ title: `${Grades[grade]} - ${Volumes[_volIndex]}` });
              audioCtx.src = `/${baseAudioPath}/audios/${nextPoem.title}.mp3`;
              audioCtx.play();
            }
          })
        });
        this.setData({ poem: nextPoem });
      });
      audioCtx.play();
    } else {
      audioCtx.pause();
      this.setData({ audioPlaying: false });
    }
  },
  togglePinyin: function() {
    const { pinyinVisible } = this.data;
    this.setData({ pinyinVisible: !pinyinVisible });
  },
  onLoad: function(query) {
    const { id } = query;
    let { grade, volIndex, poem } = getApp().globalData;
    if (id) {
      poem = Poems[query.grade][query.volIndex].find(p => p.id === id);
      grade = query.grade;
      volIndex = query.volIndex;
      getApp().globalData.poem = poem;
    }
    wx.setNavigationBarTitle({ title: `${Grades[grade]} - ${Volumes[volIndex]}` });
    this.setData({ poem });
  },
  onUnload: function() {
    let audioCtx = getApp().globalData.audioContext;
    if (audioCtx) audioCtx.stop();
  },
  onShareAppMessage() {
    const pages = getCurrentPages();
    const currentPath = pages[pages.length - 1].route;
    const { poem } = this.data;
    const { grade, volIndex } = getApp().globalData;
    return {
      title: '小学古诗知多少',
      path: `${currentPath}?id=${poem.id}&grade=${grade}&volIndex=${volIndex}`,
    }
  }
})
