var locationObj = Object.create(homeObj);
var obj ={
	name : '地点定位',
	dom : $('#location'),
	init : function(){
		this.bindEvent();
		this.localStorage();
	},
	changecity:function(id){
		var cityid = id.match(/\d+/)[0];
		var city_name = decodeURI(id.match(/name([%\d\w\W]+)/)[1]);
		$("#city").html(city_name);
		$('input[name=city_id]').val(cityid);
	},
	localStorage:function(){
		if(localStorage.length !== 0){
			$('.history').show();
			var str = "";
			for(var i=0; i<localStorage.length; i++){
                   var key = localStorage.key(i);
                   var value = localStorage.getItem(key);
                   value = JSON.parse(value);
                   str += '<li data-geo="'+ key +'"><p>'+value["name"]+'</p><p>'+value.address+'</p></li>';
            }
            $('.h-address').html(str);
            $('#changeCity,#direct').click(function(){
				$('.ul li').remove();
				$('input[name=keyword]').val('');
				$('.history').show();
			});  
		}else{
			$('.history').hide();
		}
	},
	bindEvent:function(){
		var form = $("form");
		$('#submit').click(function(event){
			$('.history').hide();
			event.preventDefault();
			$.ajax({
				url: '/v1/pois?' + form.serialize(),
				type: 'get',
				success: function(res){
					console.log(res); 
					var str = "";
					for(var i =0;i < res.length;i++) {
						str += '<li data-geo="'+ res[i].geohash +'" class="search-result"><p class="one">' + res[i].name +'</p><p class="two">'+res[i].address+'</p></li>'
					}	
					$('.h-list .ul').html(str);
				}
			}); 	
		});
		this.dom.click(function(e){
			var geo = e.target.parentElement.dataset.geo || e.target.dataset.geo || false;
				var name = $('.search-result').find('.one').html();
				var address = $('.search-result').find('.two').html();
			if (geo) {
				localStorage.setItem(geo,JSON.stringify({'name':name,'address':address}));
				location.hash = 'shop-list/' + geo;
				$('.ul li').remove();
				$('input[name=keyword]').val('');
				$('.history').show();
			}
		});
	}
}
$.extend(locationObj,obj);