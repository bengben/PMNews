var WxParse = require('../../dist/wxParse/wxParse.js');
const app = getApp()
Page({
  data:{
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
      },
      children: [{
        type: 'text',
        text: '美国次贷危机（subprime crisis）也称次级房贷危机，也译为次债危机。它是指一场发生在美国，因次级抵押贷款机构破产、投资基金被迫关闭、股市剧烈震荡引起的金融风暴。它致使全球主要金融市场出现流动性不足的危机'
      }]
    },
      {
        name: 'div',
        attrs: {
          class: 'div_class',
        },
        children: [{
          type: 'text',
          text: '美国次贷危机（subprime crisis）也称次级房贷危机，也译为次债危机。它是指一场发生在美国，因次级抵押贷款机构破产、投资基金被迫关闭、股市剧烈震荡引起的金融风暴。它致使全球主要金融市场出现流动性不足的危机'
        }]
      }
      ,
      {
        name: 'div',
        attrs: {
          class: 'div_class',
        },
        children: [{
          type: 'text',
          text: '美国次贷危机（subprime crisis）也称次级房贷危机，也译为次债危机。它是指一场发生在美国，因次级抵押贷款机构破产、投资基金被迫关闭、股市剧烈震荡引起的金融风暴。它致使全球主要金融市场出现流动性不足的危机'
        }]
      }
    ]
  },
  tap() {
    console.log('tap')
  },
  viewImages(){
    wx.previewImage({
      current: 'https://img.huxiucdn.com/article/cover/201612/14/171158998292.jpg?imageView2/1/w/710/h/400/|imageMogr2/strip/interlace/1/quality/85/format/jpg', // 当前显示图片的http链接
      urls: ['https://img.huxiucdn.com/article/cover/201612/14/171158998292.jpg?imageView2/1/w/710/h/400/|imageMogr2/strip/interlace/1/quality/85/format/jpg','https://img.huxiucdn.com/article/content/201808/15/102255629062.jpg?imageView2/2/w/1000/format/jpg/interlace/1/q/85'] // 需要预览的图片http链接列表
    })
  },

  //返回列表页面
  naviToList() {
    console.log(this);
    wx.navigateBack();
  },

  //页面分享
  sharePage(){
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})