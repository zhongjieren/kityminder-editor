angular.module("kityminder").controller("errorDialog", ["$scope", "$modalInstance", "$translate", "errorObj",
	function(a, b, c, d) {
		function e() {
			c("already_copied_and_please_tell_us").then(function(a) {
				alert(a),
				b.close()
			})
		}
		a.detailCollapsed = !0,
		d.hasOwnProperty("errno") ? (a.errorShortMsg = "错误 " + d.errno + ": " + d.msg, a.errorDetail = "错误\n " + d.errno + ": " + d.msg) : d.hasOwnProperty("config") ? (a.errorShortMsg = "错误 " + d.status, a.errorDetail = "错误\n " + JSON.stringify(d)) : (a.errorShortMsg = "错误 " + d.msg, a.errorDetail = "错误\n " + d.file + "\n行号：" + d.line + "\n错误信息：" + d.msg, void 0 != d.column && (a.errorDetail += "\n列号：" + d.column), void 0 != d.error && (a.errorDetail += "\n错误对象：" + d.error)),
		c("browser_info").then(function(b) {
			a.errorDetail += "\n\n" + b + "：" + navigator.userAgent
		}),
		a.alertCopied = e,
		a.cancel = function() {
			b.dismiss("cancel")
		}
	}]);