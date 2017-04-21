angular.module("kityminderDemo")
	.controller("collaborateDialog", ["$scope", "$modalInstance",
	function(a, b) {
		a.ok = function() {
			"" != a.value && b.close(a.value)
		},
		a.cancel = function() {
			b.dismiss("cancel")
		}
	}]);