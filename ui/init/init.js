window.jQuery &&
	function(a) {
		a.extend({
			xml2json: function(b, c) {
				function d(b, g) {
					if (!b) return null;
					var h = "",
					i = null,
					j = null;
					b.nodeType,
					e(b.localName || b.nodeName),
					b.text || b.nodeValue || "";
					b.childNodes && b.childNodes.length > 0 && a.each(b.childNodes,
					function(a, b) {
						var c = b.nodeType,
						g = e(b.localName || b.nodeName),
						j = b.text || b.nodeValue || "";
						if (8 != c) if (3 != c && 4 != c && g) i = i || {},
						i[g] ? (i[g].length || (i[g] = f(i[g])), i[g] = f(i[g]), i[g][i[g].length] = d(b, !0), i[g].length = i[g].length) : i[g] = d(b);
						else {
							if (j.match(/^\s+$/)) return;
							h += j.replace(/^\s+/, "").replace(/\s+$/, "")
						}
					}),
					b.attributes && b.attributes.length > 0 && (j = {},
					i = i || {},
					a.each(b.attributes,
					function(a, b) {
						var c = e(b.name),
						d = b.value;
						j[c] = d,
						i[c] ? (i[cnn] = f(i[cnn]), i[c][i[c].length] = d, i[c].length = i[c].length) : i[c] = d
					})),
					i && (i = a.extend("" != h ? new String(h) : {},
					i || {}), h = i.text ? [i.text || ""].concat([h]) : h, h && (i.text = h), h = "");
					var k = i || h;
					return c && (h && (k = {}), h = k.text || h || "", h && (k.text = h), g || (k = f(k))),
					k
				}
				if (!b) return {};
				var e = function(a) {
					return String(a || "").replace(/-/g, "_")
				},
				f = function(b) {
					return a.isArray(b) || (b = [b]),
					b.length = b.length,
					b
				};
				if ("string" == typeof b && (b = a.text2xml(b)), b.nodeType) {
					if (3 == b.nodeType || 4 == b.nodeType) return b.nodeValue;
					var g = 9 == b.nodeType ? b.documentElement: b,
					h = d(g, !0);
					return b = null,
					g = null,
					h
				}
			},
			text2xml: function(b) {
				return a.parseXML(b)
			}
		})
	} (jQuery);
	
	$(document).ready(function() {
		function a() {
			$(".content-wrap").css("height", $(window).height() - 40 + "px")
		}
		$(window).bind("load resize scroll",
		function() {
			a()
		}),
		a()
	})	
	