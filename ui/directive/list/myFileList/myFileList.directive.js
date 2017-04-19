angular.module('kityminderEditor')
	.directive('myFileList', ["$http", "$state",
	function(a, b) {
		return {
			restrict: "E",
			templateUrl: "ui/directive/list/myFileList/myFileList.html",
			replace: !0,
			link: function(a) {
				function c(b) {
					return a.reverse = a.predicate === b ? !a.reverse: !1,
					a.predicate = b,
					d(a.predicate, a.reverse)
				}
				function d(b, c) {
					a.fileNavigator.fileList.sort(function(a, d) {
						var e, f = a[b],
						g = d[b];
						return "string" == typeof f ? e = f.localeCompare(g) : "number" == typeof f && (e = f - g),
						c ? -e: e
					})
				}
				function e(b) {
					if (a.fileNavigator && a.fileNavigator.fileList) {
						var c = a.fileNavigator.fileList;
						c.forEach(function(a, d) {
							c[d].selected = b
						})
					}
				}
				e(!1),
				a.predicate = "last_modified_time",
				a.reverse = !0,
				a.reorder = c,
				a.setAllSelect = e,
				a.$watch("fileNavigator.fileList",
				function(b, c) {
					b.length != c.length && d(a.predicate, a.reverse),
					a.fileNavigator.selectedList = [],
					a.fileNavigator.fileList.forEach(function(b, c) {
						b.selected && a.fileNavigator.selectedList.push(b.file_guid)
					})
				},
				!0),
				a.open = function(a, c) {
					c.preventDefault(),
					"directory" == a.file_type ? b.go("subdir", {
						dirGuid: a.file_guid
					}) : window.location.href = "/file/" + a.file_guid
				},
				a.getUrl = function(a) {
					return "directory" == a.file_type ? "/home/" + a.file_guid: "/file/" + a.file_guid
				}
			}
		}
	}]);