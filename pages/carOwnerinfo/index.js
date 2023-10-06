// pages/carOwnerinfo/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
 		list:[
		{
            carImage:"/pages/index/images/car-1.png",
            carNumeber:"湘D12131",
            carOwnerPhoneNumber:"18223231341"
		},
		],
		soldsList:[
			{
				icon:"./images/coke_cola.png",
				title:"可口可乐",
				left:2,
				click:"cokeCola"
			},
			{
				icon:"./images/pespi_cola.png",
				title:"百事可乐",
				left:0,
				click:"pepsiCola"
			},
			{
				icon:"./images/water.png",
				title:"农夫山泉",
				left:0,
				click:"nongFu"  
			},
			{
				icon:"./images/energy_drink.png",
				title:"能量饮料",
				left:0,
				click:"hongNiu"
			}
		]  
	},

	// 得到农夫山泉的数量
	nongFu(e){

		var that = this;
	
		wx.request({
		  url: 'http://1.12.48.159:8080/drinkInfo/getNongFuLeft',
		
		  method:'POST',
		  data:{
			  drink_name:"农夫山泉"
		  },
	
		  success: (res) =>{
			  let soldList = that.data.soldsList;
			  
			  let index = soldList.findIndex(item => item.title === "农夫山泉");
	
			  console.log(`获取农夫山泉数量是的index为${index}`);
	
	
			  // hast table 寻找，如果没有找到就返回-1
	
			  if(index != -1){
				let key = `soldsList[${index}].left`;
				let raw_data = that.data.soldsList;
				raw_data[index].left = res.data;
				console.log(raw_data)
				// console.log(that.data.soldsList)
				that.setData({
					'soldsList': raw_data
				})
	
				console.log(that.data.soldsList[index].left + "\t11111")
				console.log(that.data.soldsList)
				// console.log(that.soldsList[index].left + "111111");
				
			  }
		  },
	
		  // 当获取失败时
		  fail: (res)=>{
			wx.showToast({
			  title: '获取可口可乐剩余信息失败',
			  icon:'error',
			  duration:1000
			})
		 } 
		})
	  },
	
	  // 页面隐藏后不再进行计数
	  onHide(){
		clearInterval(that.data.setInter);
	  },
	
	  cokeCola(e){
		
		var that = this;
	
		wx.request({
		  url: 'http://1.12.48.159:8080/drinkInfo/getCokeLeft',
		  method:'POST',
		  data:{
			drink_name:"可口可乐"
		  },
		  
		  // 如何修改字典中的元素。
		  success: (res)=>{
			  // 修改可口可乐的数量
			  let soldList = that.data.soldsList;
			  let index = soldList.findIndex(item => item.title === '可口可乐');
	
			  console.log(index);
	
			  // hash table 的寻找， 如果没有找到则返回 -1
			  if(index != -1){
					let key = `soldsList[${index}].left`;
					let raw_data = that.data.soldsList;
					raw_data[index].left = res.data;
					console.log(raw_data)
					// console.log(that.data.soldsList)
					that.setData({
						'soldsList': raw_data
					})
	
					console.log(that.data.soldsList[index].left + "\t11111")
					console.log(that.data.soldsList)
					// console.log(that.soldsList[index].left + "111111");
			  }
		  },
		  
		  fail: (res)=>{
			  wx.showToast({
				title: '获取可口可乐剩余信息失败',
				icon:'error',
				duration:1000
			  })
		   }
		})
	  },
	
	  pesiCola(e){
		var that = this;
	
		wx.request({
		  url: 'http://1.12.48.159:8080/drinkInfo/getPesiLeft',
		  method:'POST',
		  data:{
			drink_name:"百事可乐"
		  },
		  
		  // 如何修改字典中的元素。
		  success: (res)=>{
			  // 修改可口可乐的数量
			  let soldList = that.data.soldsList;
			  let index = soldList.findIndex(item => item.title === '百事可乐');
	
			  console.log(index);
	
			  // hash table 的寻找， 如果没有找到则返回 -1
			  if(index != -1){
					let key = `soldsList[${index}].left`;
					let raw_data = that.data.soldsList;
					raw_data[index].left = res.data;
					console.log(raw_data)
					// console.log(that.data.soldsList)
					that.setData({
						'soldsList': raw_data
					})
	
					console.log(that.data.soldsList[index].left + "\t11111")
					console.log(that.data.soldsList)
					// console.log(that.soldsList[index].left + "111111");
			  }
		  },
		  
		  fail: (res)=>{
			  wx.showToast({
				title: '获取百事可乐剩余信息失败',
				icon:'error',
				duration:1000
			  })
		   }
		})
	  },
	
	  rebBull(e){
		var that = this;
	
		wx.request({
		  url: 'http://1.12.48.159:8080/drinkInfo/getRedBullLeft',
		  method:'POST',
		  data:{
			drink_name:"能量饮料"
		  },
		  
		  // 如何修改字典中的元素。
		  success: (res)=>{
			  // 修改红牛的数量
			  let soldList = that.data.soldsList;
			  let index = soldList.findIndex(item => item.title === '能量饮料');
	
			  console.log(index);
	
			  // hash table 的寻找， 如果没有找到则返回 -1
			  if(index != -1){
					let key = `soldsList[${index}].left`;
					let raw_data = that.data.soldsList;
					raw_data[index].left = res.data;
					console.log(raw_data)
					// console.log(that.data.soldsList)
					that.setData({
						'soldsList': raw_data
					})
	
					console.log(that.data.soldsList[index].left + "\t11111")
					console.log(that.data.soldsList)
					// console.log(that.soldsList[index].left + "111111");
			  }
		  },
		  
		  fail: (res)=>{
			  wx.showToast({
				title: '获取能量饮料剩余信息失败',
				icon:'error',
				duration:1000
			  })
		   }
		})
		
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

	invite(e){
		

		let that = this;

		wx.showModal({
		  title: '提示',
		  content: '确定发出邀请？',
		  complete: (res) => {
			if (res.cancel) {
			  wx.showToast({
				title: '请求取消',
				icon:'error',
				duration:1000
			  })
			}
		
			if (res.confirm) {
			  
				// 发出请求, 也就是说车主端一直在监听。
				wx.request({
				  url: 'http://1.12.48.159:8080/cater/invite',
				  method:'POST',
				  data:{
					 phone: "18223231341"
				  },

				  success: (res) =>{
					  wx.showToast({
						title: '成功发送邀请',
						icon:"success",
						duration:1000
					  }),
					  
					  console.log(res.data);
				  },
				  
				  fail: (res) =>{
					  if(res.data){
					   wx.showToast({
						 title: '发送邀请失败',
						 icon:"error",
						 duration:1000
					   })
					}
				  	}
				})

			}
		  }
		})

	},

	shutDoorDown(e){


		wx.showModal({
		  title: '提示',
		  content: ' 您确定强制关机售卖柜',
		  complete: (res) => {
			if (res.cancel) {
				wx.showToast({
				  title: '操作取消',
				  icon:'error',
				  duration:1000
				})
			}
		
			if (res.confirm) {
				wx.showToast({
				  title: '操作提交，待审核',
				  icon:'success',
				  duration:1000
				})

				// 强制关机售卖柜的逻辑
				wx.request({
				  url: '',
				})
				
				
			}
		  }
		})
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		let that = this;

		that.cokeCola();
		that.nongFu();
		that.pesiCola();
		that.rebBull();
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