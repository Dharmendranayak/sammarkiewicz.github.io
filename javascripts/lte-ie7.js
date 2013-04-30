/* Use this script if you need to support IE 7 and IE 6. */


window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-twitter' : '&#x74;&#x77;&#x69;&#x74;&#x74;&#x65;&#x72;',
			'icon-github' : '&#x67;&#x69;&#x74;&#x68;&#x75;&#x62;',
			'icon-dribbble' : '&#x64;&#x72;&#x69;&#x62;&#x62;&#x62;&#x6c;&#x65;',
			'icon-html5' : '&#x68;&#x74;&#x6d;&#x6c;&#x35;',
			'icon-css3' : '&#x63;&#x73;&#x73;&#x33;',
			'icon-code' : '&#x63;&#x6f;&#x64;&#x65;',
			'icon-pencil' : '&#x64;&#x65;&#x73;&#x69;&#x67;&#x6e;',
			'icon-mobile' : '&#x72;&#x65;&#x73;&#x70;&#x6f;&#x6e;&#x73;&#x69;&#x76;&#x65;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; i < els.length; i += 1) {
		el = els[i];
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c) {
			addIcon(el, icons[c[0]]);
		}
	}
};
