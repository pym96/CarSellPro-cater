Page({
	data: {
	  phoneNumber: '',
	  code: '',
	  canSendCode: false,
	  canRegister: false,
	},
  
	onPhoneNumberInput(event) {
	  this.setData({
		phoneNumber: event.detail.value,
		canSendCode: event.detail.value.length === 11
	  });
	},
  
	onCodeInput(event) {
	  this.setData({
		code: event.detail.value,
		canRegister: event.detail.value.length === 6
	  });
	},
  
	onSendCode() {
	  // 发送验证码的逻辑
	  
	  wx.request({
		url: '',
		method:'POST',
		data:{
			
		},
		
		// 成功之后Show Toast Success OR show Toast failed.
		success:(e)=>{
				
		}
	  })
	  

	  wx.showToast({
		title: '验证码发送成功',
		icon:"success",
		duration:1000
	  })
	},
  
	onRegister() {
	  // 注册的逻辑
	  wx.showToast({
		title: '注册成功',
		icon:'success',
		durationd:1000
	  })
	}
  })
  