$(function(){
	// 设置小眼睛
	$('.icon-notsee').click(function(){
		$(this).css('display','none');
		$('.icon-eye').css('display','block');
		$('#password').attr('type','text');
	});
	$('.icon-eye').click(function(){
		$(this).css('display','none');
		$('.icon-notsee').css('display','block');
		$('#password').attr('type','password');

	});
// 设置验证码切换
	// 建立对象数组，存放验证图信息
	arr=[{name:'dwse',src:'images/0.png'},{name:'m8k2',src:'images/1.png'},{name:'3n3d',src:'images/2.png'}];
	//获取随机数0-3作为索引
	num=parseInt(Math.random()*3);
	console.log(num);
	// 显示当前索引图像
	$('#change_pic').css('background','url(images/'+num+'.png) no-repeat');
	// 点击时在次获取随机数并换图
	$('#change_txt').click(function(){
		num=parseInt(Math.random()*3);
		$('#change_pic').css('background','url(images/'+num+'.png) no-repeat');
	});
	// checkCode();
// 设置登录按钮
	$('.login').click(function(){
		$('#frm').submit();
	});

})
// 定义全局变量和函数**********************************
// 声明对象数组和随机数索引
var arr;
var num;
// 声明提交验证定义两个变量存储用户名和密码
var myphone;
var mypassword;



// 设置提交验证

function checkInput(){
	// 如果用户名、密码、验证码都正确，则创建一个键为login，值为username的对象存入localstorage，返回true
	if (checkPhone()&&checkPassword()&&checkCode()) {
		localStorage.setItem('login', $('#user').val());
		return true;
	}else{//否则返回false，不提交
		return false;
	}

}
// 设置函数判断用户名
function checkPhone(){
	// 判断localstora中是否有该值，如果有则存入全局变量myphone，没有则返回false
	var user=$('#user').val();
	if(localStorage.getItem(user)){
		myphone=user;
		return true;
	}else{
		alert('该用户不存在！');
		return false;
	}
}
// 设置函数判断密码
function checkPassword(){
	var password=$('#password').val();
	mypassword=localStorage.getItem(myphone);
	if(mypassword!=password){
		alert('密码输入有误！');
		return false;
	}else{
		return true;
	}
}
// 设置函数判断验证码
function checkCode(){
	var check=$('#check').val().toLowerCase();
	if(check==arr[num].name){
		return true;
	}else{
		alert('验证码有误！');
		return false;
	}
}