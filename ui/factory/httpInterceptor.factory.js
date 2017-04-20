angular.module("kityminder").factory("httpInterceptor", ["$q", "$injector",
	function(a, b) {
		return {
			request: function(a) {
				return "POST" === a.method && ("bos/upload_image" === a.url ? a.data.append("csrf_token", $("#km-csrf").val()) : (a.data = a.data || {},
				a.data.csrf_token = $("#km-csrf").val())),
				a
			},
			responseError: function(c) {
				var d = d || b.get("$modal");
				return 401 === c.status ? d.open({
					animation: !0,
					templateUrl: "ui/dialog/alertDialog/alertDialog.tpl.html",
					controller: "alertDialog",
					size: "md",
					resolve: {
						msg: function() {
							return "你可能太长时间没有编辑了, 出于安全考虑, 系统拒绝了你的请求, 刷新一下试试."
						}
					}
				}) : ("bos/save" !== c.config.url || 0 !== c.status && -1 !== c.status) && d.open({
					animation: !0,
					templateUrl: "ui/dialog/errorDialog/errorDialog.tpl.html",
					controller: "errorDialog",
					size: "md",
					resolve: {
						errorObj: function() {
							return c
						}
					}
				}),
				a.reject(c)
			},
			response: function(a) {
				var c, d = a.data,
				e = b.get("notify");
				return e.config({
					duration: 3e3,
					position: "center",
					maximumOpen: 3
				}),
				"number" == typeof d.errno && ( - 1 !== [0, 208, 210].indexOf(d.errno) || ([ - 1 !== [247, 248, 249, 250].indexOf(d.errno)] ? e({
					message: d.msg,
					classes: "alert-warning"
				}) : (c = c || b.get("$modal"), c.open({
					animation: !0,
					templateUrl: "ui/dialog/errorDialog/errorDialog.tpl.html",
					controller: "errorDialog",
					size: "md",
					resolve: {
						errorObj: function() {
							return d
						}
					}
				})))),
				a
			}
		}
	}]);