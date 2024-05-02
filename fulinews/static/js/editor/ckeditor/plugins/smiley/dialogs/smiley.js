﻿/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.dialog.add( 'smiley', function( editor ) {
	var config = editor.config,
		lang = editor.lang.smiley,
		images = config.smiley_images,
		columns = config.smiley_columns || 8,
		i;

	// Simulate "this" of a dialog for non-dialog events.
	// @type {CKEDITOR.dialog}
	var dialog;
	var onClick = function( evt ) {
			var target = evt.data.getTarget(),
				targetName = target.getName();

			if ( targetName == 'a' )
				target = target.getChild( 0 );
			else if ( targetName != 'img' )
				return;

			var src = target.getAttribute( 'cke_src' ),
				title = target.getAttribute( 'title' );
				nums = target.getAttribute( 'cke_num' );
		 
			editor.insertText('[smiley]' + nums +'[/smiley]' + title +'');
            // editor.insertElement(img);  
			dialog.hide();
			evt.data.preventDefault();
		};

	var onKeydown = CKEDITOR.tools.addFunction( function( ev, element ) {
		ev = new CKEDITOR.dom.event( ev );
		element = new CKEDITOR.dom.element( element );
		var relative, nodeToMove;

		var keystroke = ev.getKeystroke(),
			rtl = editor.lang.dir == 'rtl';
		switch ( keystroke ) {
			// UP-ARROW
			case 38:
				// relative is TR
				if ( ( relative = element.getParent().getParent().getPrevious() ) ) {
					nodeToMove = relative.getChild( [ element.getParent().getIndex(), 0 ] );
					nodeToMove.focus();
				}
				ev.preventDefault();
				break;
				// DOWN-ARROW
			case 40:
				// relative is TR
				if ( ( relative = element.getParent().getParent().getNext() ) ) {
					nodeToMove = relative.getChild( [ element.getParent().getIndex(), 0 ] );
					if ( nodeToMove )
						nodeToMove.focus();
				}
				ev.preventDefault();
				break;
				// ENTER
				// SPACE
			case 32:
				onClick( { data: ev } );
				ev.preventDefault();
				break;

				// RIGHT-ARROW
			case rtl ? 37 : 39:
				// relative is TD
				if ( ( relative = element.getParent().getNext() ) ) {
					nodeToMove = relative.getChild( 0 );
					nodeToMove.focus();
					ev.preventDefault( true );
				}
				// relative is TR
				else if ( ( relative = element.getParent().getParent().getNext() ) ) {
					nodeToMove = relative.getChild( [ 0, 0 ] );
					if ( nodeToMove )
						nodeToMove.focus();
					ev.preventDefault( true );
				}
				break;

				// LEFT-ARROW
			case rtl ? 39 : 37:
				// relative is TD
				if ( ( relative = element.getParent().getPrevious() ) ) {
					nodeToMove = relative.getChild( 0 );
					nodeToMove.focus();
					ev.preventDefault( true );
				}
				// relative is TR
				else if ( ( relative = element.getParent().getParent().getPrevious() ) ) {
					nodeToMove = relative.getLast().getChild( 0 );
					nodeToMove.focus();
					ev.preventDefault( true );
				}
				break;
			default:
				// Do not stop not handled events.
				return;
		}
	} );

	// Build the HTML for the smiley images table.
	var labelId = CKEDITOR.tools.getNextId() + '_smiley_emtions_label';
	var html = [
		'<div style="position:relative;"><div style="background:#fff;position:absolute;display:none;" id="xian"></div>' +
		'<span id="' + labelId + '" class="cke_voice_label">' + lang.options + '</span>',
		'<table role="listbox" id="smileybox" aria-labelledby="' + labelId + '" style="width:100%;height:100%;border-collapse:separate;" cellspacing="2" cellpadding="2"',
		CKEDITOR.env.ie && CKEDITOR.env.quirks ? ' style="position:absolute;"' : '',
		'><tbody>'
	];
	
	var size = images.length;
	for ( i = 0; i < size; i++ ) {
		if ( i % columns === 0 )
			html.push( '<tr role="presentation">' );

		var smileyLabelId = 'cke_smile_label_' + i + '_' + CKEDITOR.tools.getNextNumber();
		html.push(
			'<td class="cke_dark_background cke_centered" style="vertical-align: middle;" role="presentation">' +
			'<a href="javascript:void(0)" title="', config.smiley_descriptions[ i ], '" role="option"', ' aria-posinset="' + ( i + 1 ) + '"', ' aria-setsize="' + size + '"', ' aria-labelledby="' + smileyLabelId + '"',
			' class="cke_smile cke_hand" tabindex="-1" onkeydown="CKEDITOR.tools.callFunction( ', onKeydown, ', event, this );">',
			'<img id="smile_' + config.smiley_nums[ i ] + '" class="cke_hand" title="', config.smiley_descriptions[ i ], '" cke_num="', config.smiley_nums[ i ], '"' +
			' cke_src="', CKEDITOR.tools.htmlEncode( config.smiley_path + images[ i ] ), '" alt="', config.smiley_descriptions[ i ], '"',
			' src="', CKEDITOR.tools.htmlEncode( config.smiley_path + images[ i ] ), '"',
			' style="width:32px;height:32px;" onMouseOver="imgzoomf(this,60,event);" onMouseOut="imgzoom(this,32);">' +
			'<span id="' + smileyLabelId + '" class="cke_voice_label">' + config.smiley_nums[ i ] + '</span>' +
			'</a>', '</td>'
		);

		if ( i % columns == columns - 1 )
			html.push( '</tr>' );
	}

	if ( i < columns - 1 ) {
		for ( ; i < columns - 1; i++ )
			html.push( '<td></td>' );
		html.push( '</tr>' );
	}

	html.push( '</tbody></table></div>' );
	
	var smileySelector = {
		type: 'html',
		id: 'smileySelector',
		html: html.join( '' ),
		onLoad: function( event ) {
			dialog = event.sender;
		},
		focus: function() {
			var self = this;
			// IE need a while to move the focus (#6539).
			setTimeout( function() {
				var firstSmile = self.getElement().getElementsByTag( 'a' ).getItem( 0 );
				firstSmile.focus();
			}, 0 );
		},
		onClick: onClick,
		style: 'width: 100%; border-collapse: separate;'
	};

	return {
		title: editor.lang.smiley.title,
		minWidth: 470,
		minHeight: 120,
		contents: [ {
			id: 'tab1',
			label: '',
			title: '',
			expand: true,
			padding: 0,
			elements: [
				smileySelector
			]
		} ],
		buttons: [ CKEDITOR.dialog.cancelButton ]
	};
} );
function imgzoomf(img,maxsize,e){
	var e = e || window.event; 
	var imgId ='#'+ $(e.target).attr('id');
	var value = imgId.replace(/[^0-9]/ig,""); 
	document.getElementById('xian').style.display='block';
	if(value==1 || value==10 || value==19 || value==28 || value==37 || value==46){
		document.getElementById('xian').style.left='200px';
	}else{
		document.getElementById('xian').style.left='0px';
	}
	if(value>=1 && value<=18){
		document.getElementById('xian').style.top='150px';
	}else{
		document.getElementById('xian').style.top='0px';
	}
	//
	a='<img src="'+img.src+'" style="min-width:60px;max-width:200px;min-height:60px;max-height:200px;border:2px solid #FF6666;padding:6px;">';
	document.getElementById('xian').innerHTML=a;
	return false;
}
function imgzoom(img,maxsize){
	document.getElementById('xian').style.display='none';
	var a=new Image();
	a.src=img.src
	img.style.width = maxsize+'px';
	img.style.height = maxsize+'px';
	return false;
}

