var routerControl = {
	pageHashMap: {
		'city-list': homeObj,
		'location': locationObj,
		'shop-list': shopObj,
		'product': proObj,
		'comment' : comObj,
		'yff-login':loginObj,
		'checkout':checkoutObj
	},
	pageCacheMap : {},
	pre_module : null ,
	cur_module : null ,
	switch: function(hashname,flag){ 
		console.log(hashname);
		if(flag){
			if (typeof(flag) === 'boolean') {
				locationObj.changecity(hashname);
				hashname = 'location';
			}else if (typeof(flag) === 'string') {
				if (hashname === 'shop-list') {
					shopObj.render(flag);
				}else if (hashname === 'product') {
					proObj.render(flag);
				}
			}
		}
		this.pre_module = this.cur_module;
		this.cur_module = this.pageHashMap[hashname];
		if (this.pre_module) {
			this.pre_module.leave();
		}
		this.cur_module.enter();
		if (!this.pageCacheMap[hashname]) {
			this.cur_module.init();
			this.pageCacheMap[hashname] = true ;
		}
	}
}