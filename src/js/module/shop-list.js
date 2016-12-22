var shopObj = Object.create(homeObj);
var obj ={
	name:'店铺列表',
	dom:$('#shop-list'),
	latitude : null,
	longitude : null,
	init:function(){
		this.bindEvent();
	}, 
	render : function(hash){
		this.getLoca(hash);
		this.getSort(hash);
		
		setTimeout(function(){
			shopObj.swipe();
		}, 300);		
	},
	swipe : function(){
		window.Config = {
		  swipe : null,
		  offset : 0
		};
		var Event = {
		  swipe : function(){
		      Config.swipe && Config.swipe.kill && Config.swipe.kill();
		      //得到对应小数点
		      var bullets = document.getElementById('position').getElementsByTagName('li');
		      Config.swipe = Swipe(document.getElementById('mySwipe'), {
		          auto: 0,
		          continuous: true,
		          disableScroll:false,
		          callback: function(pos) {
		          	console.log('滑动结束之后所执行回调函数');
		              var i = bullets.length;
		              while (i--) {
		                  bullets[i].className = ' ';
		              }
		              bullets[pos].className = 'cur';
		          }
		      });

		      setTimeout(function(){
		          var $position = document.querySelector('#position'),
		              $swipeWrap = document.querySelector('.swipe-wrap'),
		              screenHeight = window.innerHeight;
		          $swipeWrap.style.height= '100%';
		          $("#position").removeClass('hidden');
		      },300)

		  }
		}
		Event.swipe();
		console.log('滑动已经运行了')
	},
	bindEvent:function(){
		$('ul.gf-list').click(function(e){
			var sId = $(e.target).parents('li')[0].dataset.id;
			if (sId) {
				location.hash = 'product/' + sId;
			}
		});
	},
	getLoca : function(geo){
		var me = this;		

		$.ajax({
			url : '/v2/pois/' + geo,
			/*async : false,*/
			success : function(a){
				var d = a.address;
				/*this.latitude = ;
				this.longitude = a.longitude;*/
				$('.gf-header .h2').html(d);
				me.getShop(a.latitude,a.longitude);
			}
		});
	},
	getSort : function(geo){
		$.ajax({
			url : 'v2/index_entry',
			data : {
				geohash : geo ,
				group_type :1 ,
				flags : ['F']
			},
			success : function(r){
				var s1 = '', s2 = '' ;
				for(var a in r){
					var sUnit = 
                    '<div class="gf-unit gf-l">'+
                        '<div class="gf-img">'+
                            '<img src="https://fuss10.elemecdn.com/'+ r[a].image_url +'?imageMogr/quality/75/format/webp/">'+
                        '</div>'+
                        '<div class="gf-name">'+ r[a].title +'</div>'+
                    '</div>';	
                    if (a <= 7) {
                    	s1+= sUnit;
                    }else {
                    	s2+= sUnit;
                    }	
				}
                $('div.item.slider1').html(s1);
                $('div.item.slider2').html(s2);				
			}
		});
	},
	getShop : function(lati,long){
		console.log(this.latitude);
		$.ajax({
			url : '/shopping/restaurants',

			data : {
				latitude:lati,
				longitude:long,
				offset:0,
				limit:20,
				extras:['activities']
			},
			success : function(r){
				var s1 = '';
				for(var a in r){
					var url = r[a].image_path;
					var nUrl = url.charAt(0)+'/'+url.slice(1,3)+ '/'+ url.slice(3) +'.'+ url.slice(-4).match(/(jpg|jpeg|png|gif)/g)[0];
					var sD = r[a].distance;
					if (sD >= 1000) {
						var sN = sD/1000 + 'km';
					}else{
						var sN = sD + 'm';
					}

					var sUnit = 
	                '<li data-id="'+ r[a].id +'">'+
	                    '<div class="gf-l gf-s1">'+
	                        '<img src="https://fuss10.elemecdn.com/'+ nUrl +'?imageMogr/quality/75/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" >'+
	                    '</div>'+
	                    '<div class="gf-l gf-s2">'+
	                        '<div class="gf-t1">'+
	                            '<span>'+r[a].name+'</span>'+
	                        '</div>'+
	                        '<div class="gf-t2">'+
	                            '<span>月售'+ r[a].recent_order_num +'单</span>'+
	                        '</div>'+
	                        '<div class="gf-t3">'+
	                            '<span class="gf-l">￥'+ r[a].float_minimum_order_amount +'起送</span>'+
	                            '<span class="gf-l">配送费￥'+ r[a].float_delivery_fee +'</span>'+
	                            '<span class="gf-r gf-time">'+ r[a].order_lead_time +'分钟</span>'+
	                            '<span class="gf-r">'+ sN +'</span>'+
	                        '</div>'+
	                    '</div> '+                   
	                '</li>';
                    s1+= sUnit;
				}
				$('ul.gf-list').html(s1);				
			}
		});
	}


}
$.extend(shopObj,obj);

