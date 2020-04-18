//app.js
import lunr from 'lunr';
import { Poems } from '/utils/data';

App({
  onLaunch: function () {
    const searchIndex = lunr(function() {
      this.field('title');
      this.field('content');
      this.ref('id');

      Poems[0].forEach((poem) => {
        this.add(poem);
      })
    });
    // console.log(searchIndex)
    // const searchIndex = new FlexSearch("speed");
    // searchIndex.add(1, Poems[0].toString());
    // searchIndex.search('江')
    this.globalData = {
      searchIndex
    };
  }
})
