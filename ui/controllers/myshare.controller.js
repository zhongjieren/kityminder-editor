angular.module("kityminderDemo")
	.controller("myShare", ["$scope", "fileNavigator", "memory",
		function(a, b, c) {
			a.fileNavigator = new b({
				initUrl: "bos/ls_my_share",
				fields: ["file_name", "last_modified_time", "size", "operation"],
				operation: ["share"],
				enableOpenFile: !0
			}),
			a.fileNavigator.refresh();
			var d = c.get("currentVersion");
			d && d >= window.kityminder.version && $(".change-log").addClass("hasRead")
		}]);