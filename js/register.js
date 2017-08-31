$(function(){

	// 设置小眼睛点击睁开
	$('.icon-eye').click(function() {
		$('.icon-eye').css('display','none');
		$('.icon-notsee').css('display','block');
		$('#password').attr('type','password');		
		$('#repassword').attr('type','password');		
	});
	// 点击闭上
	$('.icon-notsee').click(function() {
		$('.icon-notsee').css('display','none');
		$('.icon-eye').css('display','block');
		$('#password').attr('type','text');		
		$('#repassword').attr('type','text');		
	});
	// 设置随机数验证码，56个字母，声明定时器和初试时间3秒
	var arr=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var timer;
	var second=3;
	// 当点击时，先清除定时器。设定空字符串。循环遍历4次。获取0-52之间的随机数作为索引，取出数组项添加到字符串中
	$('#getcode').click(function(){
		clearInterval(timer);
		var str='';
		while (str.length<4) {
			var num=parseInt(Math.random()*52);
			str+=arr[num];
		}
	//调用定时器，隔1秒执行函数fn
		timer=setInterval(fn, 1000);
	// 设定函数fn，second初始值为3。大于0则显示，否则清除定时器，将字符串显示在文本框中，初始值回归3
		function fn(){
			// console.log(second);
			if(second>0){
				$('#getcode').html('0'+second+'后重发');
				second--;	
			}else{
				clearInterval(timer);
				$('#getcode').html('获取验证码');					
				$('#checkcode').val(str);
				second=3;
			}
		}
	});


	// 设置提交按钮。点击时form表单提交
	$('#login').click(function(){
		$('#frm').submit();
	});
});
//**********************************************************
	// 定义localstorage
	function writeLocalStorage(){
		if(!checkInput()){//先做判断。如果用户提交信息有误则返回
			return;
		}else{
			var keys=localStorage.length;
			// console.log(keys);
			var mykey=$('#phone').val();//手机号为key
			var mypassword=$('#password').val();//密码为value
		// 方法一 判断localstorage中是否有当前值，如果没有则写入
			if(localStorage.getItem(mykey)){
				alert('该用户已存在，请重新输入！');
				return false;
			}else{
				localStorage.setItem(mykey,mypassword);
			}
		// 方法二
			// 设定flag，如果有一样的key，将flag设置为false
			// var flag=true;
			// for(var i=0;i<keys;i++){
			// 	if (localStorage.key(i)==mykey) {
			// 		flag=false;
			// 		break;
			// 	}
			// }
			// flag为false时，提示用户已存在，否则写入
			// if(flag==false){
			// 	alert('该用户已存在，请重新输入！');
			// }else{
			// 	localStorage.setItem(mykey,mypassword);
			// }
		}
	}


	// 设置表单效验
	function checkInput(){
		checkPhone();
		checkPassword();
		recheckPassword();
		return checkPhone()&&checkPassword()&&recheckPassword();
	};
	// 校验手机号
	function checkPhone(){
		var phoneReg=/^1\d{10}$/;
		var phone=$('#phone').val();
		if(!phoneReg.test(phone)){
			$('#phonetxt').text('手机号码不合法!');
			return false;
		}else{
			$('.icon-phone').css({
				'color':'green',
				'border-color':'green',
				'background':'lightgreen',
			});
			$('#phone').css({
				'border-color':'green',
			})
			$('#phonetxt').css('color','green').text('输入正确');
			return true;
		}	
	};
	// 校验密码
	function checkPassword(){
		var passwordReg=/^[\da-z]{6,12}$/i;
		var password=$('#password').val();
		if(!passwordReg.test(password)){
			$('#passwordtxt').text('输入密码不合法!');
			return false;
		}else{
			$('.icon1').css({
				'color':'green',
				'border-color':'green',
				'background':'lightgreen',
			});
			$('#password').css({
				'border-color':'green',
			})
			$('#passwordtxt').css('color','green').text('输入正确');
			return true;
		}	
	}
	// 校验重复密码
	function recheckPassword(){
		var repassword=$('#repassword').val();//获取重复密码
		var password=$('#password').val();//获取密码
		if(repassword!=password||repassword==0){//如果两者不等或其中之一为空
			$('#repasswordtxt').text('两次输入必须一致！');
			return false;
		}else{
			$('.icon2').css({
				'color':'green',
				'border-color':'green',
				'background':'lightgreen',
			});
			$('#repassword').css({
				'border-color':'green',
			})
			$('#repasswordtxt').css('color','green').text('输入正确');
			return true;
		}	
	}
	