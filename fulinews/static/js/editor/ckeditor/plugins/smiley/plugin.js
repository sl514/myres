CKEDITOR.plugins.add( 'smiley', {
	requires: 'dialog',
	// jscs:disable maximumLineLength
	lang: 'zh-cn', // %REMOVE_LINE_CORE%
	// jscs:enable maximumLineLength
	icons: 'smiley', // %REMOVE_LINE_CORE%
	hidpi: true, // %REMOVE_LINE_CORE%
	init: function( editor ) {
		editor.config.smiley_path = editor.config.smiley_path || ( this.path + 'images/' );
		editor.addCommand( 'smiley', new CKEDITOR.dialogCommand( 'smiley', {
			allowedContent: 'img[alt,height,!src,title,width]',
			requiredContent: 'img'
		} ) );
		editor.ui.addButton && editor.ui.addButton( 'Smiley', {
			label: editor.lang.smiley.toolbar,
			command: 'smiley',
			toolbar: 'insert,50'
		} );
		CKEDITOR.dialog.add( 'smiley', this.path + 'dialogs/smiley.js' );
	}
} );

//图片文件名
CKEDITOR.config.smiley_images = [
	'1_simley.gif','2_simley.gif','3_simley.gif','4_simley.gif','5_simley.gif','6_simley.gif','7_simley.gif','8_simley.gif',
	'9_simley.gif','10_simley.gif','11_simley.gif','12_simley.gif','13_simley.gif','14_simley.gif','15_simley.gif','16_simley.gif',
	'17_simley.gif','18_simley.gif','19_simley.gif','20_simley.gif','21_simley.gif','22_simley.gif','23_simley.gif','24_simley.gif',
	'25_simley.gif','26_simley.gif','27_simley.gif','28_simley.gif','29_simley.gif','30_simley.gif','31_simley.gif','32_simley.gif',
	'33_simley.gif','34_simley.gif','35_simley.gif','36_simley.gif','37_simley.gif','38_simley.gif','39_simley.gif','40_simley.gif',
	'41_simley.gif','42_simley.gif','43_simley.gif','44_simley.gif','45_simley.gif','46_simley.gif','47_simley.gif','48_simley.gif',
	'49_simley.gif','50_simley.gif','51_simley.gif','52_simley.gif','53_simley.gif','54_simley.gif'
];
//图片显示名称
CKEDITOR.config.smiley_nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14','15', '16', '17', '18', '19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54'];
CKEDITOR.config.smiley_descriptions = ['唉哟，好无聊啊……', '在行走中思考人生……', '我依旧如此花枝招展……', '假装看不见……', '真让人垂涎三尺……', '我表示有点小火气……', '象小纸片一样粘人啊……', '优雅的我，悄悄来了……', '我要一直顶您……', '真能扯……', '我可是路过……', '我只是个伙夫……', '我很拽吧…？', '给你降降温喽', '您懂的……', '您是大爷，服了', '花儿在心动……', '有点心动……', '路过……', '送花使者……', '花儿为您开……', '我也是伙夫…？', '好人一生平安', '真棒……', '呵呵呵', '我就是看看……', '服啦……', '让我说啥好呢……', '就是这样倍儿……', '鄙视你……', '这样也行…？', '困了哦', '再见……', '愿者上钩钩……', '俺是新人咧……', '利害……', '没人？我闪……', '嘘，静静……', '好热啊……', '您真强…？', '真馋人……', '你吓着俺了……', '我要表达……', '一起耍耍……', '给个拥抱呗……', '可怜可怜我吧？……', '有些说不出口……', '做一回强盗……', '回家喽……', '约么……', '你吓着俺了……', '这就是我……', '姜太公在此……', '这就是命运……'];

//图片一行几个
CKEDITOR.config.smiley_columns = 9;
