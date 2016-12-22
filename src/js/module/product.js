var proObj = Object.create(homeObj);
var obj ={
	name:'商品详情',
	dom:$('#product'),
     c : "",
    data : {},
	init:function(){
		this.bindEvent();
        this.getData(1165492);

	},
    render : function(a){
        this.getData(a);
    },
	bindEvent:function(){
        _self = this;
        this.dom.click(function(e){
            if(e.target.className == "add ccc"){
                var oP = $(e.target.parentNode);
                _self.zongjia(oP.siblings(".fix").children("h3").html(),oP.siblings(".price").children("i").html(),_self.add(e));
                _self.jiesu();
            }
            if(e.target.className == "prev ccc"){
                var oP = $(e.target.parentNode);
                _self.zongjia(oP.siblings(".fix").children("h3").html(),oP.siblings(".price").children("i").html(),_self.prev(e));
                _self.jiesu();
            }
		});
        $('.nav').click(function (e) {
            _self.display(e.target.dataset.main);

        });
	},
    display: function (node) {
        var omain = $(".main-body");
        var omain2 = $(".main-body2");
        var ocar = $(".car");
        var ospan = $(".nav span");
        if(node == "main-body"){
            omain[0].style.display = "block";
            ospan[0].className = "active";
            ospan[1].className = "";
            omain2[0].style.display = "none";
            ocar[0].style.display = "block";
        }else{
            omain[0].style.display = "none";
            omain2[0].style.display = "block";
            ospan[1].className = "active";
            ospan[0].className = "";
            ocar[0].style.display = "none";
        }
    },
	getHast: function () {
		var x = location.hash();
		console.log(x);
	},
	getData:function (id) {
        _self = this;
        var subnav = document.getElementsByClassName("subnav")[0].querySelector("ul");
		var mList = document.querySelector(".main-list");
		$.ajax({
			url:"/shopping/v1/menu",
			type:"GET",
			data:"restaurant_id="+id,
			success: function (res) {
				for(var i=0;i<res.length;i++) {
					var res2 = res[i];
					var food = res2.foods;
                    _self.list(res2,subnav);
                    _self.xiangqi(food,mList);
				}
                var iScroll = new IScroll(".subnav",{
                    scrollbars: false,
                    probeType:2,
                    bounce:true,
                    click:true,
                    taps:true
                });
                var myScroll = new IScroll('.box',{
                    scrollbars: true,
                    probeType:2,
                    bounce:true,
                    click:true,
                    taps:true
                });
			}
		});
        var extras = ["activities","album","license","identification","statistics"],
        latitude=31.31014,
        longitude=121.44209;
        var str ="";
        for(var i= 0,l=extras.length;i<l;i++){
            str += "extras[]="+extras[i]+"&";
        }
        str += "latitude="+latitude+"&longitude="+longitude;
        var url = "/shopping/restaurant/"+id;
        $.getJSON(url,str,function(res,err){
            if(err == 'success'){
               _self.getheader(res,$("header"));
            }
        });

	},
    getheader: function (res,node) {
        console.log(res);
        var str = '<div class="title">'+
                        '<div class="t-left">'+
                            '<img src="src/img/list/logo.png" alt=""/>'+
                        '</div>'+
                        '<div class="t-right">'+
                        '<h3>'+res.name+'</h3>'+
                        '<p class="introduce">'+
                            '<span>蜂鸟专送</span>'+
                            '<span>/29分钟送达</span>'+
                            '<span>/满70免配送费</span>'+
                        '</p>'+
                        '<p>'+res["activities"][0]["description"]+'</p>'+
                        '<p>'+res["activities"][1]["description"]+'</p>'+
                    '</div>'+
                '</div>'+
                '<div class="notice clearfix">'+
                    '<p>'+res.promotion_info+'</p>'+
                    '<i>></i>'+
                '</div>';
        node.html(str);
    },
	xiangqi:function(obj,node){
		var oDl = document.createElement("dl");
		var str = c;
		for(var k=0;k<obj.length;k++){
			str += '<dd class="clearfix">'+
				'<div class="img">'+
				'<img src="'+this.substr(obj[k].image_path)+'" alt=""/>'+
				'</div>'+
				'<div class="name">'+
				'<div class="fix">'+
				'<h3>'+obj[k].name+'</h3>'+
				'<p class="jianjie">'+obj[k].description+'</p>'+
				'<p class="yueshou">'+obj[k].tips+'</p>'+
				'</div>'+
				'<p class="price">￥<i>'+obj[k]["specfoods"][0]["price"]+'</i></p>'+
                '<p class="num clearfix"><span class="prev ccc">-</span><i class="shuliang"></i><span class="add ccc">+</span></p>'+
				'</div>';
		}
		str +='</dd>';
		oDl.innerHTML = str;
		node.appendChild(oDl);
	},
	list:function(res,node){
		var oLi = document.createElement("li");
		if(res.icon_url !=""){

			oLi.innerHTML = "<a href='#'><img src='"+this.substr(res.icon_url)+"' />"+res.name+"</a>";
		}else{
			oLi.innerHTML = "<a href='#'>"+res.name+"</a>";
		}
		c = '<dt>'+res.name+'<span>'+res.description+'</span><i>```</i></dt>';
		node.appendChild(oLi);
	},
    substr: function (str) {
        if(!str){
            return "";
        }
        var icon_url = "//fuss10.elemecdn.com/";
        icon_url += str.slice(0,1)+"/";
        icon_url += str.slice(1,3)+"/";

        var reg = /([A-z]{3,4})$/;
        var x = str.match(reg);
        icon_url += str.slice(3)+"."+x[0]+"?imageMogr/thumbnail/140x140";
        return icon_url;
	},
	add: function (e) {
        var oI =  $(e.target).siblings("i");
		var x =oI.html();
        x++;
        oI.html(x);
        $(e.target).siblings("span.prev").css('display','inline-block');
        return x;
	},
    prev: function (e) {
        var oI =  $(e.target).siblings("i");
        var x = oI.html();
        x--;
        if(x==0){
            oI.html("");
            $(e.target).css('display','none');
            return 0;
        }else{
            oI.html(x);
        }
        return x;
    },
    zongjia: function (name,price,num) {
        var a = this.data;
        if(num == ""){
            num = 0;
        }
        if(!a[name]){
            a[name] = {
                price : price,
                num : num
            }
        }else{
            a[name].num = num;
        }
        localStorage.setItem("shangpin",JSON.stringify(this.data));

    },
    jiesu: function () {
        console.log(c);
        var x = JSON.parse(localStorage.getItem("shangpin"));
        var c=0;
        console.log(x);
        for(var key in x){
            c += parseInt(x[key]["price"]) * x[key]["num"];
        }
        $(".zongjia p").html("￥"+c);
    }
};
$.extend(proObj,obj);