/* global jQuery:true, escape:true, unescape:true */

function getCookie_eu(c_name) {
	"use strict";
	var i, x, y, ARRcookies = document.cookie.split(";");
	for (i=0; i<ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x === c_name) {
			return unescape(y);
		}
	}
}

function checkCookie_eu() {
	"use strict";
	var consent = getCookie_eu("cookies_consent");
	if (consent == null || consent === "" || consent === undefined){
		// show notification bar
		jQuery("#cookiesDirectiveContainer").show();
	}
}

function setCookie_eu(c_name,value,exdays) {
	"use strict";
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie = c_name + "=" + c_value+"; path=/";
	jQuery("#cookiesDirectiveContainer").fadeOut("slow");
}


jQuery(function($) {
	"use strict";
	checkCookie_eu();
	$("#acceptCookies button").click(function() {
		setCookie_eu("cookies_consent", 1, 30);
	});
});