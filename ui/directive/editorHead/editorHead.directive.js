//angular.module('kityminderEditor')
//	.directive('editorHead', ["$http", "$q", "file", "minder.service", "notify", "memory", "valueTransfer",
//	 function($http,$q,file,minderService,notify, memory, valueTransfer){
//		return {
////			restrict: 'EA',
//			template : "<header><h1>arenzhj</h1></header>"
////			templateUrl: "ui/directive/editorHead/editorHead.html",
////			replace: true,
////			replace: !0,
////			link: function($http) {
////				
////
////			}
//		};
//	}]);


//angular.module('kityminderEditor')
//.directive('editorHead', ["$http", "$q", "file", "minder.service", "notify", "memory", "valueTransfer",
// function($http,$q,file,minderService,notify, memory, valueTransfer){
//	return {
//		restrict: "A",
//		templateUrl: "ui/directive/editorHead/editorHead.html",
//		replace: !0,
//		link: function($http) {
//
//
//		}
//	};
//}]);

angular.module('kityminderEditor')
	.directive('editorHead', ["$http", "$q", "file", "minder.service", "notify", "memory", "valueTransfer",
	function(a, b, c, d, e, f, g) {
		return {
			restrict: "E",
			templateUrl: "ui/directive/editorHead/editorHead.html",
			replace: !0,
			link: function(a) {
				function b() {
					if (l) {
						var b = minder.exportJson(),
						c = JSON.stringify(b);
						$("body").css("cursor", "wait"),
						a.file.save(c).then(function(a) {
							a && e("保存成功"),
							$("body").css("cursor", "default")
						},
						function(a) {
							e("单文件太大，超过了 localStorage 的上限，请调整 localStorage 限额。"),
							$("body").css("cursor", "default")
						})
					}
				}
				var h, i = window.location.href.split("/").pop(),
				j = window.location.search,
				k = j ? i.substring(0, i.indexOf(j)) : i,
				l = !1;
				a.file = new c({
					fileGuid: k
				}),
				a.file.get().then(function(b) {
					document.title = a.file.fileName + " - 百度脑图",
					b && (minder.importJson(JSON.parse(b)), l = !0, h = f.get("introRead"), h && h.editPage || setTimeout(function() {
						a.startIntro()
					},
					800))
				}),
				d.registerEvent(function() {
					var c = null;
					minder.on("contentchange",
					function() {
						if (l) {
							var b = minder.exportJson(),
							d = JSON.stringify(b);
							if (a.file.data.content === d) return;
							a.file.data.content = d;
							var f = a.file.saveToLocal(d);
							f ? (a.file.requesting = !1, a.file.requestMsg = "file_saved_locally") : (a.file.requesting = !1, a.file.requestMsg = "localstorage_quota_exceeded"),
							c && clearTimeout(c),
							c = setTimeout(function() {
								a.file.save(d).then(function() {},
								function(a) {
									e("单文件太大，超过了 localStorage 的上限，请调整 localStorage 限额。")
								}),
								c = null
							},
							1e4)
						}
					}),
					minder.on("initChangeRoot",
					function(c) {
						var d = c.text,
						e = d ? d: "未命名脑图";
						e = e.trim() || "未命名脑图",
						a.file.rename(e).then(function(c) {
							c === !0 && (a.file.fileName = e, document.title = a.file.fileName + " - 百度脑图", b())
						})
					})
				}),
				$("body").on("keydown",
				function(a) {
					83 == a.keyCode && (a.ctrlKey || a.metaKey) && (b(), a.stopPropagation(), a.preventDefault())
				}),
				a.introOptions = {
					steps: [{
						element: ".file-menu",
						intro: "点击这里打开 <strong>文件菜单</strong>"
					},
					{
						element: ".filename-wrap",
						intro: "点击这里重命名"
					},
					{
						element: ".append-group",
						intro: "在这里增加不同的节点"
					},
					{
						element: ".km-priority",
						intro: "在这里选择 <strong>优先级</strong>"
					},
					{
						element: ".km-progress",
						intro: "在这里选择 <strong>进度</strong>"
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
					h = h || {},
					h.editPage = !0,
					f.set("introRead", h)
				},
				a.closeMenu = function() {
					g.menuOpen = !1
				}
			}
		}
	}]);