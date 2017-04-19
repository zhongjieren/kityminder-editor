angular.module("kityminder").controller("myFile", ["$scope", "$stateParams", "fileNavigator", "memory",
	function(a, b, c, d) {
		a.fileNavigator = new c({
			initUrl: "bos/ls",
			curDir: b.dirGuid,
			fields: ["file_name", "last_modified_time", "size", "operation"],
			operation: ["rename", "delete", "copy", "move", "share"],
			toolbar: ["levelUp", "touch", "mkdir", "batch", "rename", "copy", "move", "delete"],
			enableOpenFile: !0
		}),
		a.fileNavigator.refresh();
		var e = d.get("currentVersion");
		e && e >= window.kityminder.version && $(".change-log").addClass("hasRead");
		var f = d.get("introRead");
		f && f.listPage || setTimeout(function() {
			a.startIntro()
		},
		800),
		a.introOptions = {
			steps: [{
				element: "#btn-create-km",
				intro: "点击这里新建一个脑图吧!"
			}],
			showStepNumbers: !1,
			exitOnOverlayClick: !0,
			exitOnEsc: !0,
			nextLabel: "下一个",
			prevLabel: "前一个",
			skipLabel: "跳过",
			doneLabel: "朕知道了"
		},
		a.finishIntro = function() {
			f = f || {},
			f.listPage = !0,
			d.set("introRead", f)
		}
	}]);