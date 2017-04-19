angular.module('kityminderEditor')
	.directive('filename', ["notify",
	function(a) {
		return {
			restrict: "E",
			scope: {
				file: "="
			},
			templateUrl: "ui/directive/filename/filename.html",
			replace: !0,
			link: function(b) {
				b.editMode = !1,
				b.$watch("editMode",
				function(a, c) {
					1 == a && ($(".filename-edit").focus(), $(".filename-edit")[0].setSelectionRange(0, b.file.fileName.length))
				}),
				b.rename = function(c) {
					if (b.editMode && 27 === c.keyCode) b.editMode = !1;
					else if (b.editMode && ("blur" === c.type || 13 === c.keyCode)) {
						var d = b.file.fileName || "未命名脑图";
						if (b.editMode = !1, d === b.oldName) return;
						b.file.rename(d).then(function(c) {
							c === !0 && (document.title = b.file.fileName + " - 百度脑图", a("重命名成功"))
						})
					}
				}
			}
		}
	}]);