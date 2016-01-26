﻿/*
 * JavaScript Debug - v0.4 - 6/22/2010
 * http://benalman.com/projects/javascript-debug-console-log/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 * 
 * With lots of help from Paul Irish!
 * http://paulirish.com/
 */
window.debug = (function () { var i = this, b = Array.prototype.slice, d = i.console, h = {}, f, g, m = 9, c = ["error", "warn", "info", "debug", "log"], l = "assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "), j = l.length, a = []; while (--j >= 0) { (function (n) { h[n] = function () { m !== 0 && d && d[n] && d[n].apply(d, arguments) } })(l[j]) } j = c.length; while (--j >= 0) { (function (n, o) { h[o] = function () { var q = b.call(arguments), p = [o].concat(q); a.push(p); e(p); if (!d || !k(n)) { return } d.firebug ? d[o].apply(i, q) : d[o] ? d[o](q) : d.log(q) } })(j, c[j]) } function e(n) { if (f && (g || !d || !d.log)) { f.apply(i, n) } } h.setLevel = function (n) { m = typeof n === "number" ? n : 9 }; function k(n) { return m > 0 ? m > n : c.length + m <= n } h.setCallback = function () { var o = b.call(arguments), n = a.length, p = n; f = o.shift() || null; g = typeof o[0] === "boolean" ? o.shift() : false; p -= typeof o[0] === "number" ? o.shift() : n; while (p < n) { e(a[p++]) } }; return h })();
/*
 * adapted from http://stackoverflow.com/a/16972927/585552 on 2015-06-27 by gdh because BBQ needs $.browser.msie
 */
jQuery.browser = {};
(function () {
	jQuery.browser.msie = false;
	jQuery.browser.version = 0;
	if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
		jQuery.browser.msie = true;
		jQuery.browser.version = RegExp.$1;
	}
})();
/*
 * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function ($, p) { var i, m = Array.prototype.slice, r = decodeURIComponent, a = $.param, c, l, v, b = $.bbq = $.bbq || {}, q, u, j, e = $.event.special, d = "hashchange", A = "querystring", D = "fragment", y = "elemUrlAttr", g = "location", k = "href", t = "src", x = /^.*\?|#.*$/g, w = /^.*\#/, h, C = {}; function E(F) { return typeof F === "string" } function B(G) { var F = m.call(arguments, 1); return function () { return G.apply(this, F.concat(m.call(arguments))) } } function n(F) { return F.replace(/^[^#]*#?(.*)$/, "$1") } function o(F) { return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1") } function f(H, M, F, I, G) { var O, L, K, N, J; if (I !== i) { K = F.match(H ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/); J = K[3] || ""; if (G === 2 && E(I)) { L = I.replace(H ? w : x, "") } else { N = l(K[2]); I = E(I) ? l[H ? D : A](I) : I; L = G === 2 ? I : G === 1 ? $.extend({}, I, N) : $.extend({}, N, I); L = a(L); if (H) { L = L.replace(h, r) } } O = K[1] + (H ? "#" : L || !K[1] ? "?" : "") + L + J } else { O = M(F !== i ? F : p[g][k]) } return O } a[A] = B(f, 0, o); a[D] = c = B(f, 1, n); c.noEscape = function (G) { G = G || ""; var F = $.map(G.split(""), encodeURIComponent); h = new RegExp(F.join("|"), "g") }; c.noEscape(",/"); $.deparam = l = function (I, F) { var H = {}, G = { "true": !0, "false": !1, "null": null }; $.each(I.replace(/\+/g, " ").split("&"), function (L, Q) { var K = Q.split("="), P = r(K[0]), J, O = H, M = 0, R = P.split("]["), N = R.length - 1; if (/\[/.test(R[0]) && /\]$/.test(R[N])) { R[N] = R[N].replace(/\]$/, ""); R = R.shift().split("[").concat(R); N = R.length - 1 } else { N = 0 } if (K.length === 2) { J = r(K[1]); if (F) { J = J && !isNaN(J) ? +J : J === "undefined" ? i : G[J] !== i ? G[J] : J } if (N) { for (; M <= N; M++) { P = R[M] === "" ? O.length : R[M]; O = O[P] = M < N ? O[P] || (R[M + 1] && isNaN(R[M + 1]) ? {} : []) : J } } else { if ($.isArray(H[P])) { H[P].push(J) } else { if (H[P] !== i) { H[P] = [H[P], J] } else { H[P] = J } } } } else { if (P) { H[P] = F ? i : "" } } }); return H }; function z(H, F, G) { if (F === i || typeof F === "boolean") { G = F; F = a[H ? D : A]() } else { F = E(F) ? F.replace(H ? w : x, "") : F } return l(F, G) } l[A] = B(z, 0); l[D] = v = B(z, 1); $[y] || ($[y] = function (F) { return $.extend(C, F) })({ a: k, base: k, iframe: t, img: t, input: t, form: "action", link: k, script: t }); j = $[y]; function s(I, G, H, F) { if (!E(H) && typeof H !== "object") { F = H; H = G; G = i } return this.each(function () { var L = $(this), J = G || j()[(this.nodeName || "").toLowerCase()] || "", K = J && L.attr(J) || ""; L.attr(J, a[I](K, H, F)) }) } $.fn[A] = B(s, A); $.fn[D] = B(s, D); b.pushState = q = function (I, F) { if (E(I) && /^#/.test(I) && F === i) { F = 2 } var H = I !== i, G = c(p[g][k], H ? I : {}, H ? F : 2); p[g][k] = G + (/#/.test(G) ? "" : "#") }; b.getState = u = function (F, G) { return F === i || typeof F === "boolean" ? v(F) : v(G)[F] }; b.removeState = function (F) { var G = {}; if (F !== i) { G = u(); $.each($.isArray(F) ? F : arguments, function (I, H) { delete G[H] }) } q(G, 2) }; e[d] = $.extend(e[d], { add: function (F) { var H; function G(J) { var I = J[D] = c(); J.getState = function (K, L) { return K === i || typeof K === "boolean" ? l(I, K) : l(I, L)[K] }; H.apply(this, arguments) } if ($.isFunction(F)) { H = F; return G } else { H = F.handler; F.handler = G } } }) })(jQuery, this);
/*
 * jQuery hashchange event - v1.2 - 2/11/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function ($, i, b) { var j, k = $.event.special, c = "location", d = "hashchange", l = "href", f = $.browser, g = document.documentMode, h = f.msie && (g === b || g < 8), e = "on" + d in i && !h; function a(m) { m = m || i[c][l]; return m.replace(/^[^#]*#?(.*)$/, "$1") } $[d + "Delay"] = 100; k[d] = $.extend(k[d], { setup: function () { if (e) { return false } $(j.start) }, teardown: function () { if (e) { return false } $(j.stop) } }); j = (function () { var m = {}, r, n, o, q; function p() { o = q = function (s) { return s }; if (h) { n = $('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow; q = function () { return a(n.document[c][l]) }; o = function (u, s) { if (u !== s) { var t = n.document; t.open().close(); t[c].hash = "#" + u } }; o(a()) } } m.start = function () { if (r) { return } var t = a(); o || p(); (function s() { var v = a(), u = q(t); if (v !== t) { o(t = v, u); $(i).trigger(d) } else { if (u !== t) { i[c][l] = i[c][l].replace(/#.*/, "") + "#" + u } } r = setTimeout(s, $[d + "Delay"]) })() }; m.stop = function () { if (!n) { r && clearTimeout(r); r = 0 } }; return m })() })(jQuery, this);
/*
 * adapted from http://stackoverflow.com/a/149099/585552 on 2012-11-02 by gdh
 */
Number.prototype.formatMoney = function () { var n = this, c = 2, d = ".", t = ",", s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0; return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "") };
/*
 * jquery-cookie
 * 2012-12-14 16:31 EST
 * https://github.com/carhartl/jquery-cookie
 */
(function (e, t, n) { function i(e) { return e } function s(e) { return decodeURIComponent(e.replace(r, " ")) } var r = /\+/g; var o = e.cookie = function (r, u, a) { if (u !== n) { a = e.extend({}, o.defaults, a); if (u === null) { a.expires = -1 } if (typeof a.expires === "number") { var f = a.expires, l = a.expires = new Date; l.setDate(l.getDate() + f) } u = o.json ? JSON.stringify(u) : String(u); return t.cookie = [encodeURIComponent(r), "=", o.raw ? u : encodeURIComponent(u), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("") } var c = o.raw ? i : s; var h = t.cookie.split("; "); for (var p = 0, d = h.length; p < d; p++) { var v = h[p].split("="); if (c(v.shift()) === r) { var m = c(v.join("=")); return o.json ? JSON.parse(m) : m } } return null }; o.defaults = {}; e.removeCookie = function (t, n) { if (e.cookie(t) !== null) { e.cookie(t, null, n); return true } return false } })(jQuery, document)