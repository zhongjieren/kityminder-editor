angular.module("kityminder").controller("shareDialog", ["$scope", "$http", "$modalInstance", "notify", "fileGuid",
	function(a, b, c, d, e) {
		function f(a, c, d, e) {
			return b.post("bos/set_token_info", {
				fileGuid: a,
				token: c,
				period: d,
				password: e
			})
		}
		function g(a, c, d) {
			return b.post("bos/set_share_status", {
				fileGuid: a,
				token: c,
				isOpen: d
			})
		}
		function h(a) {
			var b = "0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
			c = "";
			a = a || 4;
			for (var d = 0; a > d; d++) c += b.charAt(Math.ceil(1e3 * Math.random()) % b.length);
			return c
		}
		function i() {
			a.viewPeriodOpen || a.viewPasswordOpen ? a.viewUrlCopyedText = "复制链接及信息": a.viewUrlCopyedText = "复制链接"
		}
		a.viewUrlOpen = !1,
		a.viewPeriodOpen = !1,
		a.viewPasswordOpen = !1,
		a.viewPeriodEdit = !1,
		a.viewPasswordEdit = !1,
		a.viewUrl = "",
		a.viewPeriod = "",
		a.viewPassword = "";
		var j = "";
		b.post("bos/get_token_info", {
			fileGuid: e,
			role: "viewer"
		}).success(function(b, c, d, f) {
			if (0 == b.errno) {
				var g = b.data;
				a.viewUrlOpen = !!parseInt(g.is_open),
				a.viewPeriodOpen = !!g.expired_duration,
				a.viewPasswordOpen = !!g.password,
				a.viewUrl = "http://" + window.location.host + "/file/" + e + "?token=" + g.token,
				a.viewPeriod = g.expired_duration / 60 || 5,
				a.viewPassword = g.password || h(4),
				a.viewUrlData = a.viewUrl,
				a.viewUrlData += a.viewPeriodOpen ? " 有效期: " + a.viewPeriod + " 分钟": "",
				a.viewUrlData += a.viewPasswordOpen ? " 密码: " + a.viewPassword: "",
				i(),
				j = g.token
			}
		}),
		a.toggleViewUrlStatus = function() {
			a.viewUrlOpen = !a.viewUrlOpen;
			var b = g(e, j, a.viewUrlOpen);
			b.success(function(b) {
				if (0 == b.errno) {
					var c = "";
					c = a.viewUrlOpen ? "启用链接成功": "关闭链接成功",
					d(c)
				}
			})
		},
		a.setViewOption = function(b) {
			if (0 == a.viewPeriod ? a.viewPeriodOpen = !1 : "" == a.viewPassword && (a.viewPasswordOpen = !1), 1 == a.viewPasswordOpen && "addPassword" == b ? a.viewPassword = h(4) : 1 == a.viewPeriodOpen && "addPeriod" == b && (a.viewPeriod = 5), i(), a.checkPeriodPassed = !a.viewPeriodOpen || a.viewPeriodOpen && a.viewPeriod > 0, a.checkPasswordPassed = a.viewPasswordOpen || a.viewPasswordOpen && "" != a.viewPassword, !a.checkPeriodPassed && a.viewPeriodOpen) return void $(".view-period")[0].focus();
			if (!a.checkPasswordPassed && a.viewPasswordOpen) return void $(".view-password")[0].focus();
			var c = a.viewPeriodOpen ? a.viewPeriod: 0,
			g = a.viewPasswordOpen ? a.viewPassword: "",
			k = f(e, j, c, g);
			k.success(function(b) {
				0 == b.errno && (d("设置成功"), a.viewUrlData = a.viewUrl, a.viewUrlData += a.viewPeriodOpen ? " 有效期: " + a.viewPeriod + " 分钟": "", a.viewUrlData += a.viewPasswordOpen ? " 密码: " + a.viewPassword: "")
			})
		},
		a.copyViewUrl = function() {
			a.viewUrlCopyedText = "已复制",
			setTimeout(function() {
				i(),
				a.$apply()
			},
			1e3)
		},
		a.cancel = function() {
			c.dismiss("cancel")
		}
	}]);