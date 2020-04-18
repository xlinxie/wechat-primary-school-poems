// components/collapse-panel/panel.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    open: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleCollapse: function() {
      const { open } = this.data;
      this.setData({ open: !open });
    }
  }
})
