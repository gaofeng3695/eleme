var checkoutObj = Object.create(homeObj);
checkoutObj.dom=$('#checkout');
$(function(){
		$('.address-item').click(function(){
			$('.addressform').show();
			$('.enter-transition').css('transform','translateX(-100%)');
		});
		$('.left-button').find('img').click(function(){
			$('.addressform').hide();
		$('.enter-transition').css('transform','translateX(100%)');
		});
	})
	$(function(){
		$('.cartitem-right img').click(function(){
			$('.cart-secondary').show();
			$('.show').css('transform','translateX(-100%)');
		});
		$('.eleme-header a').find('img').click(function(){
			$('.cart-secondary').hide();
			$('.show').css('transform','translateX(100%)');
		});
	});