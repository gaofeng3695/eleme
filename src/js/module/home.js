var homeObj = {
	name: '首页模块',
	dom: $('#city-list'),
	init: function(){
		this.bindEvent();
		this.loadGuessCity();
		this.loadHotcity();
		this.loadGroupCity();
	},
	bindEvent: function(){
		//与首页相关的绑定事件
		/*this.dom.click(function(){
			location.hash = '#location';
		});*/
		/*$('.login').click(function(e){
			debugger;
			location.hash='yff-login';
		})
		$('.register').click(function(){
			$('#yff-register').show();
			$('#city-list').hide();
		})*/
	},
	leave: function(){
		this.dom.hide();
	},
	enter: function(){
		this.dom.show();
	},
	singleRenderlist: function(res){
		//每一组城市的渲染
		var str = "";
		for(var i = 0; i < res.length; i++) {
			var name = encodeURI(res[i].name);
			/*console.log(res[i].name);*/
			//console.log(res[i].name);
			//console.log(res[i].name);
			str += 
			'<li><a href="#/location/' + res[i].id +"name"+ name +'">' + res[i].name + '</a></li>'
		}
		//把拼接好的html字符串返回
		return str; 	
	},
	loadGuessCity: function(){
		$.ajax({
			url: '/v1/cities',
			type: "GET",
			data: {
				type: 'guess'
			},
			success: function(res){
				console.log(res);
				var name = encodeURI(res.name);
				$(".yff_city span").html('<a href="#/location/' + res.id +"name"+ name + '">' + res.name + '</a>')
			}
		})
	},
	loadGroupCity: function(){
		var me = this;
		$.ajax({
			url: '/v1/cities',
			type: 'GET',
			data: {
				type: 'group'
			},
			success: function(res){
				//console.log('加载分组的城市');
			//console.log(res);
				var str = "";
				var map = [];
				for(var key in res) {
					map.push(key);
				}
				map.sort();
				for(var i =0;i<map.length;i++) {
					str +='<h4><b>' + map[i] + '</b></h4>' +
						'<ul class="sort_city">' +
							me.singleRenderlist(res[map[i]]) +
						'</ul>'
				}
				$('.all_city').html(str);
			}
		})
	},
	loadHotcity: function(){
		//加载热门城市
		$.ajax({
			url: '/v1/cities?type=hot',
			type: "GET",
			success: function(res){
				//console.log(res);
				
				var str = "";
				for(var i = 0; i < res.length; i++) {
					var name = encodeURI(res[i].name);
					str += 
					'<li><a href="#/location/' + res[i].id +"name"+ name + '">'+ res[i].name + '</a></li>'
				}
				$(".slt_city").html(str)
			}
		})
	}
	
}