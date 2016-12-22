var comObj = Object.create(homeObj);
var obj ={
	name:'评价',
	dom:$('#comment'),
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){		//与评价页相关的绑定事件
		//实现页面刷新出来，全部（），有对应的 ul 
		//注：jQ中的 first方法 在zepto.js 中无法实现
		$('.rate-section .rate-list').addClass('active');
		
		$(".tag-list li").click(function(){
			//实现点击 li 后，li 块颜色改变
			$(this).addClass("active").siblings().removeClass("active");
			
			//实现点击后，全部（）、满意（）、不满意（），和对应 ul 的一一对应
			$(this).each(function(){
				var $this=$(this).index();
				$('.rate-section .rate-list').eq($this).addClass("active").siblings().removeClass("active");
			})
		})
	}
}
$.extend(comObj,obj);


