window.kityminder.data.registerProtocol("xmind",
	function(a) {
		var b = window.kityminder.Promise,
		c = {
			"priority-1": ["priority", 1],
			"priority-2": ["priority", 2],
			"priority-3": ["priority", 3],
			"priority-4": ["priority", 4],
			"priority-5": ["priority", 5],
			"priority-6": ["priority", 6],
			"priority-7": ["priority", 7],
			"priority-8": ["priority", 8],
			"task-start": ["progress", 1],
			"task-oct": ["progress", 2],
			"task-quarter": ["progress", 3],
			"task-3oct": ["progress", 4],
			"task-half": ["progress", 5],
			"task-5oct": ["progress", 6],
			"task-3quar": ["progress", 7],
			"task-7oct": ["progress", 8],
			"task-done": ["progress", 9]
		};
		return {
			fileDescription: "XMind 格式",
			fileExtension: ".xmind",
			dataType: "blob",
			mineType: "application/octet-stream",
			decode: function(a) {
				function d(a, b) {
					if (b.data = {
						text: a.title
					},
					a.marker_refs && a.marker_refs.marker_ref) {
						var e, f = a.marker_refs.marker_ref;
						if (f.length && f.length > 0) for (var g in f) e = c[f[g].marker_id],
						e && (b.data[e[0]] = e[1]);
						else e = c[f.marker_id],
						e && (b.data[e[0]] = e[1])
					}
					a["xlink:href"] && (b.data.hyperlink = a["xlink:href"]);
					var h = a.children && a.children.topics,
					i = h && (h.topic || h[0] && h[0].topic);
					if (i) {
						var j = i;
						if (j.length && j.length > 0) {
							b.children = [];
							for (var g in j) b.children.push({}),
							d(j[g], b.children[g])
						} else b.children = [{}],
						d(j, b.children[0])
					}
				}
				function e(a) {
					var b = $.xml2json(a),
					c = {},
					e = b.sheet,
					f = Array.isArray(e) ? e[0].topic: e.topic;
					return d(f, c),
					c
				}
				function f(a, c) {
					return new b(function(b, c) {
						zip.createReader(new zip.BlobReader(a),
						function(a) {
							a.getEntries(b)
						},
						c)
					})
				}
				function g(a) {
					return new b(function(b, c) {
						for (var d, f; (d = a.pop()) && "content.xml" != d.filename.split("/").pop();) d = null;
						d ? d.getData(new zip.TextWriter,
						function(a) {
							try {
								f = e($.parseXML(a)),
								b(f)
							} catch(d) {
								c(d)
							}
						}) : c(new Error("Content document missing"))
					})
				}
				return f(a).then(g)
			},
			encode: function(a, c, d) {
				function e() {
					return new b(function(a, b) {
						var c = new XMLHttpRequest;
						c.open("POST", g),
						c.responseType = "blob",
						c.onload = a,
						c.onerror = b;
						var d = new FormData;
						d.append("type", "xmind"),
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
					var b = d.filename || "xmind.xmind",
					c = document.createElement("form");
					c.setAttribute("action", g),
					c.setAttribute("method", "POST"),
					c.appendChild(a("filename", b)),
					c.appendChild(a("type", "xmind")),
					c.appendChild(a("data", h)),
					c.appendChild(a("download", "1")),
					c.appendChild(a("csrf_token", document.querySelector("#km-csrf").value)),
					document.body.appendChild(c),
					c.submit(),
					document.body.removeChild(c)
				}
				var g = "home/export",
				h = JSON.stringify(a.root);
				return d && d.download ? f() : e()
			},
			recognizePriority: -1
		}
	} ());