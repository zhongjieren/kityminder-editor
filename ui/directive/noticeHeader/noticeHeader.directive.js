angular.module('kityminderEditor')
	.directive('noticeHeader', ["memory",
	function(a) {
		return {
			restrict: "E",
			templateUrl: "ui/directive/noticeHeader/noticeHeader.html",
			replace: !0,
			link: function(b, c) {
				function d() {
					b.showNotice = !1,
					setTimeout(function() {
						$("div.minder-editor-container").css("top", b.showNotice ? "72px": "40px")
					},
					100),
					a.set("readed160822", !0)
				}
				b.showNotice = !a.get("readed160822"),
				b.closeNotice = d,
				setTimeout(function() {
					$("div.minder-editor-container").css("top", b.showNotice ? "72px": "40px")
				},
				100)
			}
		}
	}]);