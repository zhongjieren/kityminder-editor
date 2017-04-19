angular.module('kityminderEditor')
    .controller('singleInput.ctrl', ["$scope", "$modalInstance", "title", "defaultValue",
	function(a, b, c, d) {
		a.title = c,
		a.value = d,
		a.ok = function() {
			"" != a.value && b.close(a.value)
		},
		a.cancel = function() {
			b.dismiss("cancel")
		},
		setTimeout(function() {
			$(".single-input").focus(),
			$(".single-input")[0].setSelectionRange(0, d.length)
		},
		30),
		a.shortCut = function(b) {
			b.stopPropagation(),
			13 == b.keyCode ? a.ok() : 27 == b.keyCode && a.cancel()
		}
	}]);