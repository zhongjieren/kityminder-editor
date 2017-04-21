angular.module("kityminderDemo")
	.controller("importDialog", ["$scope", "$modalInstance", "notify",
		function(a, b, c) {
			function d(a, b) {
				b = b || {};
				for (var c = a.split("/");
				"/" == c[0] || "" === c[0];) c.shift();
				for (;
				"/" == c[c.length - 1] || "" === c[c.length - 1];) c.pop();
				if (b.filename = c.pop() || null, c.length ? b.parentPath = "/" + c.join("/") + "/": b.parentPath = b.filename ? "/": null, b.filename) {
					var d = b.filename.split(".");
					d.length > 1 ? b.extension = "." + d.pop() : b.extension = null,
					b.name = d.join("."),
					b.path = b.parentPath + b.filename
				} else b.path = "/";
				return b
			}
			var e = kityminder.data.getRegisterProtocol(),
			f = [],
			g = {};
			for (var h in e) if (e.hasOwnProperty(h) && e[h].decode) {
				var i = e[h];
				g[i.fileExtension] = i,
				f.push(i.fileExtension)
			}
			a.accepts = f,
			a.acceptsInfo = "支持的格式：" + f.map(function(a) {
				var b = g[a];
				return b.fileDescription + "(" + a + ")"
			}).join(", "),
			a.readFile = function(a) {
				function e(b, c) {
					var d = kityminder.Promise;
					return new d(function(b, d) {
						var e;
						"blob" == c.dataType ? b(a) : (e = new FileReader, e.onload = function() {
							b(this.result)
						},
						e.onerror = d, e.readAsText(a, "utf-8"))
					})
				}
				function f() {
					c("解析失败")
				}
				function h(a) {
					var b = {
						content: a,
						protocol: j.name,
						title: i.filename,
						source: "local"
					};
					return b
				}
				if (a) {
					var i = d(a.name),
					j = g[i.extension];
					return j && j.decode ? e(a, j).then(h, f).then(function(a) {
						b.close(a)
					}) : (c("不支持的文件格式"), Promise.reject())
				}
			},
			a.ok = function() {
				b.close(a.abc)
			},
			a.cancel = function() {
				b.dismiss("cancel")
			}
		}]);