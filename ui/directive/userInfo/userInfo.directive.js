angular.module('kityminderEditor')
	.directive('userInfo', ["valueTransfer",function(a) {
		return {
			restrict: "E",
			templateUrl: 'ui/directive/userInfo/userInfo.html",
			replace: true,
			link: function(b) {
				function c(a) {
					if (document.cookie.length > 0) {
						var b = document.cookie.indexOf(a + "=");
						if ( - 1 != b) {
							b = b + a.length + 1;
							var c = document.cookie.indexOf(";", b);
							return - 1 == c && (c = document.cookie.length),
							decodeURIComponent(document.cookie.substring(b, c))
						}
					}
					return ""
				}
				function d(a, b) {
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
				var e = "bds_wiE55BGOG8BkGnpPs6UNtPbb_",
				f = c(e + "session");
				b.avatarid = d("portrait", f),
				b.username = d("uname", f),
				a.userLogin = "" != b.avatarid
			}
		}
	}]);