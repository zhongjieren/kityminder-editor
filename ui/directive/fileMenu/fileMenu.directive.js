angular.module("kityminderEditor").directive("fileMenu", ["valueTransfer",
	function(a) {
		return {
			restrict: "E",
			templateUrl: "ui/directive/button/fileBtn/fileBtn.html",
			replace: !0,
			link: function(b, c) {
				b.openMenu = function() {
					a.menuOpen = !0,
					b.file.getLatestFiles(),
					b.file.getLatestVersions()
				}
			}
		}
	}]);