angular.module('kityminderEditor')
	.directive('mainMenu', ["$state", "$modal", "$q", "valueTransfer", "file", "notify", "minder.service",
	function(a, b, c, d, e, f, g) {
		return {
			restrict: "E",
			templateUrl: "ui/directive/mainMenu/mainMenu.html",
			replace: !0,
			link: function(a, g) {
				function h(a) {
					var b = new e({
						fileName: a.name,
						template: a["class"]
					}),
					c = window.open("about:blank");
					b.touch().then(function(a) {
						d.menuOpen = !1;
						var e = window.location.origin + "/file/";
						c.location.href = e + b.fileGuid
					})
				}
				function i(a) {
					d.menuOpen = !1;
					var b = window.location.origin + "/file/";
					window.open(b + a)
				}
				function j() {
					d.menuOpen = !1;
					var a = b.open({
						animation: !0,
						templateUrl: "ui/dialog/importDialog/importDialog.tpl.html",
						controller: "importDialog",
						size: "md"
					});
					a.result.then(function(a) {
						var b = new e({
							fileName: a.title
						});
						b.touch().then(function() {
							return c(function(b, c) {
								minder.decodeData(a.protocol, a.content).then(function(a) {
									b(a)
								})
							})
						}).then(function(a) {
							return b.save(JSON.stringify(a))
						}).then(function() {
							var a = window.location.origin + "/file/";
							window.location.href = a + b.fileGuid
						})
					})
				}
				function k() {
					d.menuOpen = !1,
					a.file.getRootTree().then(function(c) {
						var d = b.open({
							animation: !0,
							templateUrl: "ui/dialog/dirTree/dirTree.tpl.html",
							controller: "dirTree",
							size: "sm",
							resolve: {
								dirTree: function() {
									return c
								},
								selectedFileGuids: function() {
									return []
								}
							}
						});
						d.result.then(function(b) {
							var c = JSON.stringify(minder.exportJson()),
							d = new e({
								fileName: a.file.fileName + "副本",
								template: a.file.template || "",
								parentGuid: b
							});
							d.touch().then(function() {
								return d.save(c)
							}).then(function(a) {
								f(a ? "保存为副本成功": "保存为副本失败")
							})
						})
					})
				}
				function l() {
					d.menuOpen = !1;
					var c = b.open({
						animation: !0,
						templateUrl: "ui/dialog/singleInput/singleInput.tpl.html",
						controller: "singleInput",
						size: "sm",
						resolve: {
							title: function() {
								return "重命名"
							},
							defaultValue: function() {
								return a.file.fileName
							}
						}
					});
					c.result.then(function(b) {
						return a.file.rename(b)
					}).then(function() {
						f("重命名成功")
					})
				}
				function m() {
					d.menuOpen = !1,
					b.open({
						animation: !0,
						templateUrl: "ui/dialog/exportDialog/exportDialog.tpl.html",
						controller: "exportDialog",
						size: "md",
						resolve: {
							fileName: function() {
								return a.file.fileName
							}
						}
					})
				}
				function n() {
					d.menuOpen = !1,
					b.open({
						animation: !0,
						templateUrl: "ui/dialog/shareDialog/shareDialog.tpl.html",
						controller: "shareDialog",
						size: "md",
						resolve: {
							fileGuid: function() {
								return a.file.fileGuid
							}
						}
					})
				}
				function o(b) {
					a.file.getHistoryData(b).then(function(a) {
						minder.importJson(JSON.parse(a))
					})
				}
				function p() {
					d.menuOpen = !1,
					b.open({
						animation: !0,
						templateUrl: "ui/dialog/shortcutDialog/shortcutDialog.tpl.html",
						controller: "shortcutDialog",
						size: "md"
					})
				}
				a.role = d.role,
				a.tabs = [{
					name: "新建"
				},
				{
					name: "打开"
				},
				{
					name: "另存为"
				},
				{
					name: "反馈"
				}],
				"editor" === a.role && (a.tabs.splice(3, 0, {
					name: "共享"
				}), a.tabs.splice(4, 0, {
					name: "历史版本"
				}), a.tabs.splice(5, 0, {
					name: "帮助"
				})),
				a.current = a.tabs[1];
				var q = function() {
					return d.menuOpen
				};
				a.$watch(q,
				function(b, c) {
					a.menuOpen = d.menuOpen,
					a.menuOpen ? (g.animate({
						left: "0px"
					},
					"fast"), setTimeout(function() {
						g[0].focus()
					},
					10)) : g.animate({
						left: "-740px"
					},
					"fast")
				},
				!0),
				$(".minder-editor-container").on("click",
				function() {
					d.menuOpen = !1,
					a.$apply()
				}),
				g.on("keyup",
				function(b) {
					"27" == b.keyCode && (d.menuOpen = !1, a.$apply()),
					b.stopPropagation(),
					b.preventDefault()
				}),
				a.closeMenu = function() {
					d.menuOpen = !1
				},
				a.select = function(b) {
					b !== a.current && (a.current = b)
				},
				a.templateList = [{
					"class": "default",
					name: "思维导图"
				},
				{
					"class": "structure",
					name: "组织结构图"
				},
				{
					"class": "filetree",
					name: "目录组织图"
				},
				{
					"class": "right",
					name: "逻辑结构图"
				},
				{
					"class": "fishbone",
					name: "鱼骨头图"
				},
				{
					"class": "tianpan",
					name: "天盘图"
				}],
				a.open = i,
				a.touchFromTemplate = h,
				a.importFile = j,
				a.renameDialog = l,
				a.exportFile = m,
				a.share = n,
				a.shortcut = p,
				a.saveAs = k,
				a.importHistory = o,
				a.version = kityminder.version
			}
		}
	}]);