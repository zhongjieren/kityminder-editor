angular.module("kityminderDemo")
	.controller("alertDialog", ["$scope", "$modalInstance", "$translate", "msg",
	function(a, b, c, d) {
		a.msg = d,
		a.reload = function() {
			window.location.reload()
		},
		a.cancel = function() {
			b.dismiss("cancel")
		}
	}]);