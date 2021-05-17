function insertAfter( newElement, targetElement ){
var parent = targetElement.parentNode;
if( parent.lastChild == targetElement ){
parent.appendChild( newElement, targetElement );
}else{
parent.insertBefore( newElement, targetElement.nextSibling );
};
};
DEBUG = false;
var data = {};
String.prototype.format = function(args) {
	if (arguments.length > 0) {
		var result = this;
		if (arguments.length == 1 && typeof(args) == "object") {
			for (var key in args) {
				var reg = new RegExp("({" + key + "})", "g");
				result = result.replace(reg, args[key]);
			}
		} else {
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i] == undefined) {
					return "";
				} else {
					var reg = new RegExp("({[" + i + "]})", "g");
					result = result.replace(reg, arguments[i]);
				}
			}
		}
		return result;
	} else {
		return this;
	}
};

var all = {
	'replace_class': function(name, rename) {
		$('.' + name).each(function() {
			$(this).removeClass(name).addClass(rename);
		});
	},
	'set_html': function(name, data) {
		$(name).html(data);
	},
	'set_text': function(name, data) {
		$(name).text(data);
	},
	'load_resources': function(name, filePath, ver, type, genTag) {
		if (DEBUG) ver = Math.random();
		if (genTag) {
			var url = config.cdn_host[0] + filePath + '?v=' + ver;
			if (type == 'css') {
				document.write('<link type="text/css" rel="stylesheet" href="{0}"/>'.format(url));
			} else {
				document.write('<script src="{0}"><\/script>'.format(url));
			}
			return;
		}
		var key = name + '_' + type;
		var localVer = window.localStorage.getItem(key + '_ver');
		if (localVer != ver) {
			var urls = [];
			for (var i in config.cdn_host) urls.push(config.cdn_host[i] + filePath + '?v=' + ver);
			var resources = all.get_resources(urls);
			if (resources) {
				window.localStorage.setItem(key + '_ver', ver);
				window.localStorage.setItem(key, resources);
			}
		}
		var data = window.localStorage.getItem(key);
		var header1 = document.getElementsByTagName("title")[0];
		if(type === 'css'){
			var el1 = document.createElement("style");
			el1.innerHTML=data;
			insertAfter(el1,header1);
		}else{
			var el1 = document.createElement("script");
			el1.innerHTML=data;
			insertAfter(el1,header1);
		}
		//document.writeln(type === 'css' ? '<style>' + data + '<\/style>' : '<script>' + data + '<\/script>');
	},
	'get_resources': function(urls, index) {
		index = index ? index : 0;
		var url = urls[index];
		try {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4 && xhr.status === 200) {
					data[url] = xhr.responseText;
				}
			};
			xhr.open('get', url, false);
			xhr.send();
			if ((!data[url] || data[url].indexOf('end_sub') === -1) && index < urls.length - 1) {
				console.log('load url failure>>' + url);
				return all.get_resources(urls, index + 1);
			} else {
				setTimeout(function() {
					delete data[url];
				}, 100);
				return data[url];
			}
		} catch (e) {
			console.log('load url error>>' + url);
			if ((!data[url] || data[url].indexOf('end_sub') === -1) && index < urls.length - 1) {
				return all.get_resources(urls, index + 1);
			} else {
				setTimeout(function() {
					delete data[url];
				}, 100);
				return data[url];
			}
		}
	}
};