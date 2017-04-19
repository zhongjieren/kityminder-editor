angular.module('kityminderEditor')
	.directive('menuToggler', 
	function() {
		return {
			restrict: "E",
			templateUrl: "ui/directive/menuToggler/menuToggler.html",
			link: function(a) {
				a.toggleMenu = function() {
					$("body").toggleClass("mini-menu")
				}
			}
		}
	});