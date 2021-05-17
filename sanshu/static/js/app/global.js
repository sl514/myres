
var str = "";
str += "<li class=\"layui-nav-item\">";
str += "<a class=\"fly-nav-avatar\" href=\"javascript:;\">";
str += "  <cite class=\"layui-hide-xs\">{{d.user_name}}</cite>";
str += "  <img src=\"{{d.avatar_url}}\">";
str += " ";
str += "</a>";
str += "<dl class=\"layui-nav-child\">";
str += "  <dd><a href=\"user/set.html\"><i class=\"layui-icon\">&#xe620;</i>基本设置</a></dd>";
str += "  <dd><a href=\"account/setting/profile/\"><i class=\"layui-icon\" style=\"margin-left: 2px; font-size: 22px;\">&#xe68e;</i>我的主页</a></dd>";
str += "  <hr style=\"margin: 5px 0;\">";
str += "   {{# if(d.admin=='Y')}}";
str += "			<dd><a href=\"/admin/\" style=\"text-align: center;\">管理</a></dd>";
str += "			<?php } ?>";
str += "			";
str += "  <dd><a href=\"account/logout/\" style=\"text-align: center;\">退出</a></dd>";
str += "</dl>";
str += "</li>";
$(function(){
	  $.getJSON("/account/ajax/check_login/",function(r){
	if(r.code==0){
		layui.use('laytpl',function(){
			var string = layui.laytpl(str).render(r);
			$("#userul").html(string);
		});
		
	}
})
})


