$(function(){
	(function(){
//		var iptcheck=$(".login-cbox>input");
//		iptcheck.prop("checked",true);
//		var check=iptcheck.hasClass("checked");
		$(".login-cbox").on("click",function(){	
                    var check=$(this).hasClass("checked");
			if(check){
                                $(this).children("input").attr("checked",false);
				$(this).addClass("unchecked");
                                $(this).removeClass("checked");
			}else{
				$(this).children("input").attr("checked",true);
                                $(this).removeClass("unchecked");
				$(this).addClass("checked");
			}
		});
	})();
	(function(){
		var gerenLogin=$(".geren-login");
		var qiyeLogin=$(".qiye-login");
		var loginBody1=$(".login-body1");
		var loginBody2=$(".login-body2");
		gerenLogin.on("click",function(){
			$(this).addClass("active");
			qiyeLogin.removeClass("active");
			loginBody1.show();
			loginBody2.hide();
		});
		qiyeLogin.on("click",function(){
			$(this).addClass("active");
			gerenLogin.removeClass("active");
			loginBody1.hide();
			loginBody2.show();
		});
	})();
})
