
//监听hash的改变
var router = new Router({
	':hashName': function(hashname){
		routerControl.switch(hashname);
	},
	'/location/:cityid': function(id){
		console.log(id);
		routerControl.switch(id,true);
	},
	'/shop-list/:geo' : function(hash){
		routerControl.switch('shop-list',hash);
	},
	'/product/:id' : function(hash){
		routerControl.switch('product',hash);
	}	
});
router.init('city-list');