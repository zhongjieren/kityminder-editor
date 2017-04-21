window.kityminder.data.registerProtocol("freemind",
	function(a) {
		function b(a, c) {
			c.data = {
				text: a.TEXT
			};
			var d;
			if (a.icon) {
				var f, g = a.icon;
				if (g.length && g.length > 0) for (d in g) f = e[g[d].BUILTIN],
				f && (c.data[f[0]] = f[1]);
				else f = e[g.BUILTIN],
				f && (c.data[f[0]] = f[1])
			}
			if (a.LINK && (c.data.hyperlink = a.LINK), a.node) {
				var h = a.node;
				if (h.length && h.length > 0) {
					c.children = [];
					for (d in h) c.children.push({}),
					b(h[d], c.children[d])
				} else c.children = [{}],
				b(h, c.children[0])
			}
		}
		function c(a) {
			var c = $.xml2json(a),
			d = {};
			return b(c.node, d),
			d
		}
		var d = kityminder.Promise,
		e = {
			"full-1": ["priority", 1],
			"full-2": ["priority", 2],
			"full-3": ["priority", 3],
			"full-4": ["priority", 4],
			"full-5": ["priority", 5],
			"full-6": ["priority", 6],
			"full-7": ["priority", 7],
			"full-8": ["priority", 8]
		};
		return {
			fileDescription: "Freemind 格式",
			fileExtension: ".mm",
			dataType: "text",
			decode: function(a) {
				return new d(function(b, d) {
					try {
						b(c(a))
					} catch(e) {
						d(new Error("XML 文件损坏！"))
					}
				})
			},
			encode: function(a, b, c) {
				function e() {
					return new d(function(a, b) {
						var c = new XMLHttpRequest;
						c.open("POST", g),
						c.responseType = "blob",
						c.onload = a,
						c.onerror = b;
						var d = new FormData;
						d.append("type", "freemind"),
						d.append("data", h),
						d.append("csrf_token", document.querySelector("#km-csrf").value),
						c.send(d)
					}).then(function(a) {
						return a.target.response
					})
				}
				function f() {
					function a(a, b) {
						var c = document.createElement("input");
						return c.type = "hidden",
						c.name = a,
						c.value = b,
						c
					}
					var b = c.filename || "freemind.mm",
					d = document.createElement("form");
					d.setAttribute("action", g),
					d.setAttribute("method", "POST"),
					d.appendChild(a("filename", b)),
					d.appendChild(a("type", "freemind")),
					d.appendChild(a("data", h)),
					d.appendChild(a("download", "1")),
					d.appendChild(a("csrf_token", document.querySelector("#km-csrf").value)),
					document.body.appendChild(d),
					d.submit(),
					document.body.removeChild(d)
				}
				var g = "home/export",
				h = JSON.stringify(a.root);
				return c && c.download ? f() : e()
			}
		}
	} ());