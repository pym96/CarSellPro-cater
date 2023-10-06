// pages/setting/index.js

const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
		username: '微信用户',
    	headIcon : 'images/icon_default.png',
    	deviceName:"设备编号",
    	deviceId:'',
    	code:'',
    	services:'',
    	tel:'',
    	list:[
      	{
        	icon:"images/us.png",
        	title:"信息反馈",
        	click:"feedback"
      	}
  		],
    	settingDetails:[
	  	{
			icon:"images/feedback.png",
			title:"进货记录",
			click:"inputRecord",
	   	},
      	{
        	icon:"images/blue_tooth.png",
        	title:"补货邀约",
        	click:"inputDemand"
	  	}
    ]
  },

  caterEnroll(e){
	wx.redirectTo({
	  url: '/pages/caterEnroll/index',
	})
  },

  inputDemand(e){
	wx.redirectTo({
	  url: '/pages/waitingList/index',
	})

  },

  inputRecord(e){
	wx.redirectTo({
	  url: '/pages/inputRecord/index',
	})
  },


  feedback(e){
    wx.redirectTo({
      url: '/pages/feedback/index',
    })    
  },

  choices(e){
    console.log("我选择了一个设备")
    wx.redirectTo({
      url: '/pages/choices/index',
    })
  },
  
  shopping(e){
    console.log("我选择了商城")
    var that = this;
    if (app.globalData.isLogin) {
  // 跳转到登录界面
    wx.navigateToMiniProgram({
        appId:"wx91d27dbf599dff74",
        path:"#小程序://京东购物/FiycVU9MGFrUITv",
        success:function(res){

        },
            
        fail:function(){

        }        
      })
      }else{
        wx.showToast({
            title: '请先登陆',
            icon:"error",
            duration:800
          })
    }
  },
  
  login() {
    console.log("我点击了登陆按钮");
    if (!app.globalData.isLogin) {
      // 选择是否开启订阅通知
      wx.requestSubscribeMessage({
        tmplIds: ['1kz2gJdUSQqpd4CS7Av3sAsTrWNC9d5e_S2ZmPzIE9g'],
        success : (res) => {
          console.log(res);
        },
        fail : (res) => {
          console.log(res);
        }
      })
      wx.getUserProfile({
        desc: '用户展示用户信息',
        success : (res) => {
          wx.login({
            success: (res) => {
              if (res.code) {
                wx.request({
				//   url: 'https://www.yiyu951.xyz/login/userLogin',
				  url:'http://1.12.48.159:8080/login/userLogin',
                  method : 'POST',
                  data : {
                    code : res.code
                  },
                  success : (res) => {
                    console.log(res.data);
                    // 将数据保存在本地
                    wx.setStorageSync('session_key', res.data.session_key);
                    wx.setStorageSync('openid', res.data.openid);
                    wx.setStorageSync('unionid', res.data.unionid);
                    console.log("保存成功");
                    wx.showToast({
                      title: '登录成功',
                      icon : 'success',
                      duration:1000   
                    })
                    console.log(wx.getStorageSync('session_key'))
                    console.log(wx.getStorageSync('openid'))
                    console.log(wx.getStorageSync('unionid'))
                    app.globalData.isLogin = true;

                    // wx.request({
                    //   url: 'https://www.yiyu951.xyz/timer/getEndTime',
                    //   method:'POST',
                    //   data:{
                    //     session_key:wx.getStorageSync('session_key'),
                    //     openid:wx.getStorageSync('openid'),
                    //     unionid:wx.getStorageSync('unionid')
                    //   },
                    //   success: (res)=>{
                    //     if (res.data === 'no task') {
                    //       console.log(res.data)
                    //       return;
                    //     }
                    //     app.globalData.endTime = res.data;
                    //     console.log(app.globalData.endTime);
                    //   }
                    // })
                  },
                  fail : (res) => {
                    wx.showToast({
                      title: '登录失败',
                      icon : "error"
                    })
                  }
                })
              }
            },
          })
        }
      })
    }    
    else {
      wx.showToast({
        title: '已登录',
      })
    }
},

	onSet() {
		console.log(app.globalData.isLogin);
		if (!app.globalData.isLogin) {
			// 跳转到登录界面
			wx.navigateTo({
				url: '/pages/login/index',
		  	})
		}
		else {
			// 跳转到退出界面
			wx.navigateTo({
			   url: '/pages/exit/index',
			})
		}
	},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
		if (app.globalData.isLogin) {
			console.log(app.globalData.headIcon);
			this.setData({
				headIcon : app.globalData.headIcon,
				username : app.globalData.username
			});
		}
    },

    alterConfigPage:function(){
  
        // 跳转到登录界面
        wx.navigateTo({
          url: '/pages/bluetoothPage/index',
          })
      // }else{
      //   wx.showToast({
      //     title: '请先登录后再进行设置',
      //     icon:"error",
      //     duration:800
      //   })
      // }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})