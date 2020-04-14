// 诗集
// type Anthology = {
//   title: string,
//   desc: string,
// }

// 作者
// type Author = {
//   name: string,
//   title: string, // 称号如诗仙 诗圣
//   bio: Array<string>
// }

// 诗 https://en.wikipedia.org/wiki/Classical_Chinese_poetry_forms
// type Poetry = {
//   title: string,
//   author: string,
//   theme: Array<string>[], // 内容主题
//   genre: Array<string>, // 体裁 分类 如 ['唐诗', '七言绝句']
//   keywords: Array<string>,
//   content: {
//     stanzas: Array<{
//       lines: Array<{
//         couplets: Array<{
//           pinyins: Array<string>,
//           characters: string
//         }>
//       }>
//     }>
//   }
// }

const Poems = [
  [
    {
      title: '江南',
      author: '佚名',
      theme: [''],
      genre: ['汉乐府'],
      keywords: ['江南', '莲'],
      content: {
        lines: [
          {
            couplets: [
              {
                characters: '江南可采莲',
                pinyins: ['jiāng','nán','kě','cǎi','lián']
              },
              {
                characters: '莲叶何田田',
                pinyins: ['lián','yè','hé','tián','tián']
              }
            ]
          }
        ]
      }
    }
  ]
]
