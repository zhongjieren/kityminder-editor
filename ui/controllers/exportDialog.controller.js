angular.module("kityminderDemo")
	.controller("exportDialog", ["$scope", "$modalInstance", "fileName",
		function(a, b, c) {
			function d(a, b, c) {
				var d = kityminder.Promise,
				e = 1e5 * +new Date + Math.floor(99999 * Math.random());
				e = e.toString(36);
				var f = new d(function(a, b) {
					function c() {
						return - 1 != document.cookie.indexOf(e + "=1") ? a([e, d]) : (++d > f && a([e, d]), void setTimeout(c, g))
					}
					var d = 0,
					f = 30,
					g = 1e3;
					setTimeout(c, g)
				}),
				g = a.split(",")[1],
				h = $("<form></form>").attr({
					action: "home/download",
					method: "POST",
					"accept-charset": "utf-8"
				});
				$("<input />").attr({
					name: "content",
					type: "hidden",
					value: decodeURIComponent(g)
				}).appendTo(h),
				$("<input />").attr({
					name: "type",
					type: "hidden",
					value: c
				}).appendTo(h),
				$("<input />").attr({
					name: "filename",
					type: "hidden",
					value: b
				}).appendTo(h),
				$("<input />").attr({
					name: "csrf_token",
					type: "hidden",
					value: $("#km-csrf").val()
				}).appendTo(h);
				return kity.Browser.ie && $('<input name="iehack" value="1" />').appendTo(h),
				$('<input name="stamp" />').val(e).appendTo(h),
				h.appendTo("body").submit().remove(),
				f
			}
			function e(a, b) {
				return "data:" + a + "; utf-8," + encodeURIComponent(b)
			}
			a.protocols = [];
			var f = kityminder.data.getRegisterProtocol();
			for (var g in f) f.hasOwnProperty(g) && f[g].encode && a.protocols.push(f[g]);
			a.exportFile = function(a) {
				var f = c + a.fileExtension,
				g = a.mineType || "text/plain",
				h = {
					download: !0,
					filename: f
				};
				minder.exportData(a.name, h).then(function(c) {
					if ("freemind" == a.name) return void b.dismiss("downloaded");
					switch (a.dataType) {
					case "text":
						return b.dismiss("downloaded"),
						d(e(g, c), f, "text");
					case "base64":
						return b.dismiss("downloaded"),
						d(c, f, "base64");
					case "blob":
						return b.dismiss("downloaded"),
						null
					}
					return b.dismiss("downloaded"),
					null
				})
			},
			a.ok = function() {
				b.close(a.value)
			},
			a.cancel = function() {
				b.dismiss("cancel")
			}
		}]);