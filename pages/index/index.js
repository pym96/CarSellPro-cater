// index.js
// 获取应用实例
const app = getApp()

function transformLatWithXY(x, y) {
    var pi = 3.14159265358979324;
    var lat = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    lat += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    lat += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
    lat += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
    return lat;
}

function transformLonWithXY(x, y) {
    var pi = 3.14159265358979324;
    var lon = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    lon += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    lon += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
    lon += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
    return lon;
}
/**
 *  将WGS-84(国际标准)转为GCJ-02(火星坐标):
 */
function transformFromWGSToGCJ(latitude, longitude) {
    var lat = "";
    var lon = "";
    var ee = 0.00669342162296594323;
    var a = 6378245.0;
    var pi = 3.14159265358979324;


    var adjustLat = transformLatWithXY(longitude - 105.0, latitude - 35.0);
    var adjustLon = transformLonWithXY(longitude - 105.0, latitude - 35.0);
    var radLat = latitude / 180.0 * pi;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    adjustLat = (adjustLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
    adjustLon = (adjustLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
    latitude = latitude + adjustLat;
    longitude = longitude + adjustLon;

    return {
        latitude: latitude,
        longitude: longitude
    };

}
/**
 *  将GCJ-02(火星坐标)转为百度坐标:
 */
function transformFromGCJToBaidu(latitude, longitude) {
    var pi = 3.14159265358979324 * 3000.0 / 180.0;

    var z = Math.sqrt(longitude * longitude + latitude * latitude) + 0.00002 * Math.sin(latitude * pi);
    var theta = Math.atan2(latitude, longitude) + 0.000003 * Math.cos(longitude * pi);
    var a_latitude = (z * Math.sin(theta) + 0.006);
    var a_longitude = (z * Math.cos(theta) + 0.0065);

    return {
        latitude: a_latitude,
        longitude: a_longitude
    };
}

function pointConvert(lat, lng) {

    let point = transformFromWGSToGCJ(lat, lng);
    // console.log(point);
    // point = transformFromGCJToBaidu(point.latitude, point.longitude);
    // console.log(point)
    return point;
}

/**
 * 坐标常量说明：
 * COORDINATES_WGS84 = 1, WGS84坐标， ······························
 * COORDINATES_WGS84_MC = 2, WGS84的平面墨卡托坐标
 * COORDINATES_GCJ02 = 3，GCJ02坐标
 * COORDINATES_GCJ02_MC = 4, GCJ02的平面墨卡托坐标
 * COORDINATES_BD09 = 5, 百度bd09经纬度坐标，···································
 * COORDINATES_BD09_MC = 6，百度bd09墨卡托坐标
 * COORDINATES_MAPBAR = 7，mapbar地图坐标
 * COORDINATES_51 = 8，51地图坐标
 */
Page({
  data: {
      // 用来存储本地要预约的司机信息并渲染到前端界面。
	 markers: [
		{
		  id: 0,
		  latitude: 26.880261,
		  longitude: 112.517705,
		  title: 'Marker 1',
		  callout:{
			content: '这是一个描述',
			color: '#ff0000',
			fontSize: 14,
			borderRadius: 10,
			bgColor: '#ffffff',
			padding: 5,
			display: 'ALWAYS'
		  }
		},
		{
		  id: 1,
		  latitude: 39.908000,
		  longitude: 116.407000,
		  title: 'Marker 2'
		}
	  ],
	 latitude:0.0,
	 longitude:0.0,
	 list:[
		{
            carImage:"./images/car-1.png",
            carNumeber:"湘D12131",
            carOwnerPhoneNumber:"18223231341"
		},
		{
			carImage:"./images/car-2.png",
            carNumeber:"湘DI2331",
            carOwnerPhoneNumber:"15213134132"
		}
	 ],
	 markers: [
		{
		  latitude: 26.880071,
		  longitude: 112.51905,
		  title: 'Marker 1',
		  name:"司机1",
		  callout:{
			content: '司机1',
			color: '#ff0000',
			fontSize: 14,
			borderRadius: 10,
			bgColor: '#ffffff',
			padding: 5,
			display: 'ALWAYS'
		  }
		},
		{
		  latitude: 26.881361,
		  longitude: 112.517005,
		  title: '司机2',
		  callout:{
			content: "司机2",
			color: '#ff0000',
			fontSize: 14,
			borderRadius: 10,
			bgColor: '#ffffff',
			padding: 5,
			display: 'ALWAYS'
		  }
		}],
		setInter:null
  },
  

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },



  onLoad() {
	var that = this;
	
	// 获取用户位置
	wx.getLocation(
		{	
			altitude:false,
			isHighAccuracy: true,
			type:"gcj02",
			success: function(res){

				let p = pointConvert(res.latitude,res.longitude);
				console.log(p)
	
				console.log(res)
				// 更新页面数据
				that.setData({
					latitude:res.latitude,
					longitude:res.longitude
				})
			}
		}
	),
		that.data.setInter = setInterval(function(){

			wx.request({
			  url: 'http://1.12.48.159:8080/owner/inputYes',
			  method:"POST",
			  data:{
				  cater_id:"123"
			  },

			success: (res) =>{
				if(res.data){
					wx.showToast({
					  title: '收到供货请求',
					  icon:"success",
					  duration:4000
					})
				}

				wx.request({
				  url: '',
				})
			}
		})
		},2000)
  },

  settings(e){
	
	wx.showToast({
	  title: '我点击了一个车主',
	  icon:"success",
	  duration:1000
	})

	// 跳转到一个新的界面
	wx.redirectTo({
	  url: '/pages/carOwnerinfo/index',
	}) 


  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
