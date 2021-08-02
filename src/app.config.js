export default {
  pages: [
    'pages/index/index',
    // 'pages/details/index',
    'pages/homepage/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  "tabBar": {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页",
    },{
      "pagePath": "pages/homepage/index",
      "text": "个人页面"
    }]
  },
  "subpackages": [
    {
      "root": "details",
      "pages": [
        "index"
      ]
    }
  ]
}
