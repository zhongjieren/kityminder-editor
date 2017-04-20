angular.module("kityminderEditor").service("cookie",
	function() {
		function a(a) {
			for (var b = document.cookie,
			c = b.split("; "), d = 0; d < c.length; d++) {
				var e = c[d].split("=");
				if (e[0] === a) return decodeURIComponent(e[1])
			}
			return ""
		}
		function b(a, b, c) {
			var d = a + "=" + encodeURIComponent(b);
			if (c > 0) {
				var e = new Date;
				e.setTime(e.getTime + 3600 * c * 1e3),
				d = d + "; expire=" + e.toGMTString()
			}
			document.cookie = d
		}
		function c(a, b) {
			if (b.length > 0) {
				var c = b.indexOf(a + "=");
				if ( - 1 != c) {
					c = c + a.length + 1;
					var d = b.indexOf("&", c);
					return - 1 == d && (d = b.length),
					decodeURIComponent(b.substring(c, d))
				}
			}
			return ""
		}
		return {
			get: a,
			set: b,
			getItemValue: c
		}
	});