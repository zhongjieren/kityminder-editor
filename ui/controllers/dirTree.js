angular.module("kityminder").controller("dirTree", ["$scope", "$modalInstance", "dirTree", "selectedFileGuids",
	function(a, b, c, d) {
		a.selectedDir = "",
		a.dirTree = c,
		a.selectedFileGuids = d,
		a.ok = function() {
			"" != a.value && b.close(a.selectedDir)
		},
		a.cancel = function() {
			b.dismiss("cancel")
		},
		a.selectDir = function(b) {
			a.selectedDir = b,
			$(".root-dir-wrap").focus()
		},
		setTimeout(function() {
			$(".root-dir-wrap").focus()
		},
		30),
		a.shortCut = function(b) {
			b.stopPropagation(),
			13 == b.keyCode ? a.ok() : 27 == b.keyCode && a.cancel()
		}
	}]);