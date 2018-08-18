const app = getApp()
Page({
  data: {
    tabs: ['发现', '周记'],
    page:'没有',
    stv: {
      windowWidth: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false,
      scrollvieWidth:0
    },
    // activeTab: 0
  },
  onLoad: function (options) {
    try {
      let { tabs } = this.data;
      
      let res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.stv.scrollvieWidth = res.windowHeight - 90;
      
      console.log('screenWidth	屏幕宽度', res.screenWidth);
      console.log('statusBarHeight	状态栏的高度', res.statusBarHeight);
      console.log('windowHeight	可使用窗口高度', res.windowHeight);
      console.log('scrollvieWidth', this.data.stv.scrollvieWidth);
      console.log('windowHeight:', res.windowHeight-90)
      this.data.stv.lineWidth = this.windowWidth / (this.data.tabs.length*2)-10;
      console.log('this.windowWidth:' + this.windowWidth + "      this.data.tabs.length:" + this.data.tabs.length +" = "+ this.data.stv.lineWidth)
      this.data.stv.windowWidth = res.windowWidth;
      this.setData({ stv: this.data.stv })
      this.tabsCount = tabs.length;
    } catch (e) {
      console.error(e)
    }
  },
  handlerStart(e) {
    let { clientX, clientY } = e.touches[0];
    this.startX = clientX;
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.data.stv.tStart = true;
    this.tapStartTime = e.timeStamp;
    this.setData({ stv: this.data.stv })
  },
  handlerMove(e) {
    let { clientX, clientY } = e.touches[0];
    let { stv } = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    stv.offset += offsetX;
    if (stv.offset <= 0) {
      stv.offset = 0;
    } else if (stv.offset >= stv.windowWidth * (this.tabsCount - 1)) {
      stv.offset = stv.windowWidth * (this.tabsCount - 1);
    }
    this.setData({ stv: stv });
  },
  handlerCancel(e) {
    console.log(e);
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  handlerEnd(e) {
    let { clientX, clientY } = e.changedTouches[0];
    let endTime = e.timeStamp;
    let { tabs, stv, activeTab } = this.data;
    let { offset, windowWidth } = stv;
    //快速滑动
    if (endTime - this.tapStartTime <= 300) {
      //向左
      if (Math.abs(this.tapStartY - clientY) < 50) {
        if (this.tapStartX - clientX > 5) {
          if (activeTab < this.tabsCount - 1) {
            this.setData({ activeTab: ++activeTab })
            this.setData.page = "左边";
            console.log('向左');
          }
        } else {
          if (activeTab > 0) {
            this.setData({ activeTab: --activeTab });
            this.setData.page = "右边";
            console.log('向右');
          }
        }
        stv.offset = stv.windowWidth * activeTab;
      } else {
        //快速滑动 但是Y距离大于50 所以用户是左右滚动
        let page = Math.round(offset / windowWidth);
        if (activeTab != page) {
          this.setData({ activeTab: page })
        }
        stv.offset = stv.windowWidth * page;
      }
    } else {
      let page = Math.round(offset / windowWidth);
      if (activeTab != page) {
        this.setData({ activeTab: page })
      }
      stv.offset = stv.windowWidth * page;
    }
    stv.tStart = false;
    this.setData({ stv: this.data.stv })
  },
  _updateSelectedPage(page) {
    let { tabs, stv, activeTab } = this.data;
    activeTab = page;
    this.setData({ activeTab: activeTab })
    stv.offset = stv.windowWidth * activeTab;
    this.setData({ stv: this.data.stv })
  },
  handlerTabTap(e) {
    this._updateSelectedPage(e.currentTarget.dataset.index);
  },

  //跳转详情页面
  naviToDetail(){
    console.log(this);
    wx.navigateTo({
      url: "../detail/detail",
      success:function(){
        console.log('success:跳转到详情页面');
      },
      fail:function(){
        console.log('Fail:跳转到详情页面');
      }
    })
  }
})