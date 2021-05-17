function addLink() {
    var body_element = document.getElementsByTagName('body')[0];
    var selection;
    if (window.getSelection) {//DOM,FF,Webkit,Chrome,IE10
        selection = window.getSelection();
        //layer.msg(selection)
        layer.msg("文字复制成功！若有文字残缺请用右键复制\n转载请注明出处：" + document.location.href);
 
        } else if (document.getSelection) {//IE10
        selection = document.getSelection();
        layer.msg("文字复制成功！若有文字残缺请用右键复制\n转载请注明出处：" + document.location.href);
 
        } else if (document.selection) {//IE6+10-
        selection = document.selection.createRange().text;
        layer.msg("文字复制成功！若有文字残缺请用右键复制\n转载请注明出处：" + document.location.href);
    } else {
        selection = "";
        layer.msg("浏览器兼容问题导致复制失败！");
    }
    
    var copy_text = selection + "";
     var pagelink = "";
    if(copy_text.indexOf("转载申明")==-1){
     	copy_text += "<br /> "+$("#copyright").html();
 	}
        var new_div = document.createElement('div');
 
        new_div.style.left = '-99999px';
    new_div.style.position = 'absolute';
 
        body_element.appendChild(new_div);
        new_div.innerHTML = copy_text;
 
        selection.selectAllChildren(new_div);
 
        window.setTimeout(function () {
            body_element.removeChild(new_div);
        }, 0);
    }

jQuery("#genqrcode").click(function(){
	layer.open({
			  type: 1,
			  title: false,
			  closeBtn: 0,
			  area: ['280px','280px'],
			  shadeClose: true,
			  content: "<img style=\"width:280px\" src=\"http://qr.topscan.com/api.php?text="+window.location.href+"\">"
			});
})