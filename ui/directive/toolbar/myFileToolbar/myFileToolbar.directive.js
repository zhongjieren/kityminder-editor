angular.module('kityminderEditor')
	.directive('myFileToolbar', ["$http",
	function(a) {
		return {
			restrict: "E",
			templateUrl: "ui/directive/toolbar/myFileToolbar/myFileToolbar.html",
			replace: !0,
			link: function(a) {}
		}
	}]);