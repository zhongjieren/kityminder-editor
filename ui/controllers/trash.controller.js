angular.module("kityminderDemo")
	.controller("trash", ["$scope", "fileNavigator", "memory",
		function(a, b, c) {
			a.fileNavigator = new b({
				initUrl: "bos/ls_trash",
				fields: ["file_name", "deleted_time", "size", "operation"],
				operation: ["revert", "remove"],
				toolbar: ["batch", "revert", "revertAll", "remove", "removeAll"]
			}),
			a.fileNavigator.refresh();
			var d = c.get("currentVersion");
			d && d >= window.kityminder.version && $(".change-log").addClass("hasRead")
		}]);