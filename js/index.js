$(function(){
  // 进入首页，如果localstorage中有login键，则将其显示在登录信息中
  var username=localStorage.getItem('login');
  if(username){
      $('a').css('display','none');
      $('#info').css('display','inline-block');
      $('#username').html(username);
  }
  // 设置退出，删除localstorage中的login
  $('#exit').click(function(){
     localStorage.removeItem('login');
     $('#info').css('display','none');
     $('a').css('display','inline-block');
  })
  // 设置swiper，默认top1和top2都不显示display为none
	var swiper=new Swiper('.swiper-container',{
		  pagination: '.swiper-pagination',
	  	paginationClickable: true,
      direction: 'vertical',
  //初始化时添加样式top1，并设置显示
      onInit:function(swiper){
           $("#top").addClass('top1');
           $("#top").css('display','block');
      },
    // 改变滑块时top隐藏，top滑出，table和top图片隐藏
      onSlideChangeEnd:function(swiper){
            $("#top").css('display','none');
            $("#top").slideDown(1000);
            $('#table').css('display','none');
            $('#hand').css('display','none');
      // 如果索引为0移除样式top2，增加样式top1，反之移除样式top1，增加样式top2
            if(swiper.activeIndex==0){
                $("#top").removeClass('top2');
                $("#top").addClass('top1');
            }else{
                $("#top").removeClass('top1');
                $("#top").addClass('top2');
           };
           console.log(swiper.activeIndex);
        // 如果索引为1，显示动画
           if(swiper.activeIndex==1){
                $('#hand').show(1000);
                $('#table').fadeIn(1000);
           };
    	}
	})
})