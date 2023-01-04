import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => {
    return {
      // 是否登录
      isLogin: localStorage.getItem("token") ? true : false,
      //Token
      token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
      //UserInfo
      userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {uid: -1, userName: "未登录", userNo: "-1", userPermission: 0},
      //用户头像
      userIcon: localStorage.getItem("userIcon") ? JSON.parse(localStorage.getItem("userIcon")) : "empty",

      //设置界面
      showSetting: false,
      //背景图片（网络）
      networkBG: "https://psl-pictures.oss-ap-southeast-1.aliyuncs.com/pictures/水族館.jpg",
      nowBG: '',
    }
  },
  

  actions: {
    
  },
})
