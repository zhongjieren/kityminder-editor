angular.module('kityminderEditor')
	.filter('commandState', function() {
		return function(minder, command) {
			return minder.queryCommandState(command);
		}
	})
	.filter('commandValue', function() {
		return function(minder, command) {
			return minder.queryCommandValue(command);
		}
	})
	.filter( "sizer", function() {
		return function(a, b) {
			return 1024 > a ? a + " B" : 1048576 > a ? (a / 1024)
					.toFixed(2)
					+ " K" : 1073741824 > a ? (a / 1048576).toFixed(2)
					+ " M" : "太大了"
		}
	})
	.filter( "timer", function() {
		return function(a, b) {
			if (!a)
				return "未知时间";
			var c = new Date, d = new Date(a.replace(/-/g, "/")), e = c
					- d, f = Math.round(e / 1e3), g = Math
					.round(f / 60);
			if (5 > g)
				return "刚刚";
			if (60 > g)
				return g + " 分钟前";
			var h = Math.round(g / 60);
			if (24 > h)
				return h + " 小时前";
			var i = Math.round(h / 24);
			return 2 > i ? "昨天" : 90 > i ? i + " 天前" : d
					.getFullYear() === c.getFullYear() ? d
					.getMonth()
					+ 1 + "月" + d.getDate() + "日" : "很久以前"
		}
	})
	.filter("trusted", ["$sce",
		function(a) {
			return function(b) {
				return a.trustAsHtml(b)
			}
		}]);
