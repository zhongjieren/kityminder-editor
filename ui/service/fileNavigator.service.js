angular.module("kityminderEditor").service("fileNavigator", ["$http", "$modal", "$translate", "$q", "memory",
	function(a, b, c, d, e) {
		function f() {
			function b() {
				return a.post(e.initUrl, {
					dirGuid: e.curDir
				}).success(function(a) {
					var b = a;
					0 === b.errno && (e.fileList = b.data, e.requesting = !1)
				})
			}
			function c() {
				return a.post("bos/get_root_dir").success(function(a) {
					var b = a;
					0 == b.errno && (e.curDir = b.data.file_guid, e.parentDir = b.data.parent_guid)
				})
			}
			function d() {
				return a.post("bos/file_info", {
					fileGuid: e.curDir
				}).success(function(a) {
					var b = a;
					0 == b.errno && (e.curDir = b.data.file_guid, e.parentDir = b.data.parent_guid)
				})
			}
			var e = this;
			return e.requesting = !0,
			e.fileList = [],
			"bos/ls" !== e.initUrl ? a.post(e.initUrl).success(function(a) {
				0 === a.errno && (e.fileList = a.data, e.requesting = !1)
			}) : void(e.curDir ? d().then(b) : c().then(b))
		}
		function g() {
			function b(b) {
				return a.post("bos/touch", {
					fileName: b,
					parentGuid: c.curDir,
					template: "default",
					version: kityminder.version
				})
			}
			var c = this;
			b("新建脑图").success(function(a) {
				0 == a.errno && (c.fileList.push(a.data), window.location.href = "file/" + a.data.file_guid)
			})
		}
		function h() {
			function c(b) {
				return a.post("bos/mkdir", {
					dirName: b,
					parentGuid: d.curDir
				})
			}
			var d = this,
			e = b.open({
				animation: !0,
				templateUrl: "public/ui/dialog/singleInput/singleInput.tpl.html",
				controller: "singleInput",
				size: "sm",
				resolve: {
					title: function() {
						return "新建文件夹"
					},
					defaultValue: function() {
						return "新建文件夹"
					}
				}
			});
			e.result.then(function(a) {
				c(a).success(function(b) {
					if (0 == b.errno) {
						var c = {
							create_time: s(),
							deleted_time: null,
							ext_name: "",
							file_guid: b.data.dirGuid,
							file_name: a,
							file_type: "directory",
							last_modified_time: s(),
							parent_guid: d.curDir,
							size: 0,
							share_type: "private"
						};
						d.fileList.push(c)
					}
				})
			})
		}
		function i(c) {
			function d(b) {
				return a.post("bos/rename", {
					newName: b,
					selectedFileGuids: e.selectedList
				})
			}
			var e = this,
			f = b.open({
				animation: !0,
				templateUrl: "public/ui/dialog/singleInput/singleInput.tpl.html",
				controller: "singleInput",
				size: "sm",
				resolve: {
					title: function() {
						return "重命名"
					},
					defaultValue: function() {
						return c && 1 === e.selectedList.length ? c.file_name: "请输入新的文件名"
					}
				}
			});
			f.result.then(function(a) {
				a = a.replace(/[<>'"\/\|\?\*\[\]&\$#\{\}=;]+/g, ""),
				d(a).success(function(b) {
					0 == b.errno && b.data && e.fileList.forEach(function(b, c) {
						e.selectedList.indexOf(b.file_guid) > -1 && (e.fileList[c].file_name = a, e.fileList[c].last_modified_time = s())
					})
				})
			})
		}
		function j() {
			function b() {
				return a.post("bos/rm", {
					selectedFileGuids: f.selectedList
				})
			}
			function e() {
				if (1 === f.selectedList.length) {
					var a = "";
					return f.fileList.every(function(b) {
						return b.file_guid == f.selectedList[0] ? (a = b.file_name + b.ext_name, !1) : !0
					}),
					c("are_you_confirm_delete_this_file", {
						filename: a
					})
				}
				return c("are_you_confirm_delete_these_files", {
					numberOfFiles: f.selectedList.length
				})
			}
			var f = this;
			e().then(function(a) {
				var c = confirm(a);
				return c ? b() : d(function(a, b) {
					b("canceled delete.")
				})
			}).then(function(a) {
				var b = a.data;
				0 == b.errno && b.data && f.selectedList.forEach(function() {
					f.fileList.every(function(a, b) {
						return - 1 !== f.selectedList.indexOf(a.file_guid) ? (f.fileList.splice(b, 1), !1) : !0
					})
				})
			})
		}
		function k() {
			function c(b) {
				return a.post("bos/cp", {
					copyTo: b,
					selectedFileGuids: d.selectedList
				})
			}
			var d = this;
			r().success(function(a) {
				if (0 == a.errno) {
					var e = a.data,
					f = b.open({
						animation: !0,
						templateUrl: "public/ui/dialog/dirTree/dirTree.tpl.html",
						controller: "dirTree",
						size: "sm",
						resolve: {
							dirTree: function() {
								return e
							},
							selectedFileGuids: function() {
								return d.selectedList
							}
						}
					});
					f.result.then(function(a) {
						c(a).success(function(b) {
							0 == b.errno && 1 == b.data && a == d.curDir && d.refresh()
						})
					})
				}
			})
		}
		function l() {
			function c(b) {
				return a.post("bos/mv", {
					moveTo: b,
					selectedFileGuids: d.selectedList
				})
			}
			var d = this;
			r().success(function(a) {
				if (0 == a.errno) {
					var e = a.data,
					f = b.open({
						animation: !0,
						templateUrl: "public/ui/dialog/dirTree/dirTree.tpl.html",
						controller: "dirTree",
						size: "sm",
						resolve: {
							dirTree: function() {
								return e
							},
							selectedFileGuids: function() {
								return d.selectedList
							}
						}
					});
					f.result.then(function(a) {
						c(a).success(function(b) {
							0 == b.errno && 1 == b.data && a != d.curDir && d.selectedList.forEach(function() {
								d.fileList.every(function(a, b) {
									return - 1 !== d.selectedList.indexOf(a.file_guid) ? (d.fileList.splice(b, 1), !1) : !0
								})
							})
						})
					})
				}
			})
		}
		function m() {
			var b = this;
			return a.post("bos/revert", {
				selectedFileGuids: b.selectedList
			}).success(function(a) {
				0 == a.errno && a.data && b.selectedList.forEach(function() {
					b.fileList.every(function(a, c) {
						return - 1 !== b.selectedList.indexOf(a.file_guid) ? (b.fileList.splice(c, 1), !1) : !0
					})
				})
			})
		}
		function n() {
			var b = this;
			return a.post("bos/revert_trash").success(function(a) {
				0 == a.errno && 1 == a.data && (b.fileList = [])
			})
		}
		function o() {
			function b() {
				return a.post("bos/clear", {
					selectedFileGuids: g.selectedList
				})
			}
			function f() {
				if (1 === g.selectedList.length) {
					var a = "";
					return g.fileList.every(function(b) {
						return b.file_guid == g.selectedList[0] ? (a = b.file_name + b.ext_name, !1) : !0
					}),
					c("are_you_confirm_remove_this_file", {
						filename: a
					})
				}
				return c("are_you_confirm_remove_these_files", {
					numberOfFiles: g.selectedList.length
				})
			}
			var g = this;
			f().then(function(a) {
				var c = confirm(a);
				return c ? b() : d(function(a, b) {
					b("canceled remove.")
				})
			}).then(function(a) {
				var b = a.data;
				0 == b.errno && b.data && g.selectedList.forEach(function() {
					g.fileList.every(function(a, b) {
						return - 1 !== g.selectedList.indexOf(a.file_guid) ? (e.remove(a.file_guid), g.fileList.splice(b, 1), !1) : !0
					})
				})
			})
		}
		function p() {
			function b() {
				return a.post("bos/clear_trash")
			}
			function f() {
				return c("are_you_confirm_clear_trash")
			}
			var g = this;
			f().then(function(a) {
				var c = confirm(a);
				return c ? b() : d(function(a, b) {
					b("canceled clear trash.")
				})
			}).then(function(a) {
				var b = a.data;
				0 == b.errno && b.data && (g.fileList.forEach(function(a) {
					e.remove(a.file_guid)
				}), g.fileList = [])
			})
		}
		function q() {
			var a = this;
			return 1 !== a.selectedList.length ? void console.log("please select only one file to share") : void b.open({
				animation: !0,
				templateUrl: "public/ui/dialog/shareDialog/shareDialog.tpl.html",
				controller: "shareDialog",
				size: "md",
				resolve: {
					fileGuid: function() {
						return a.selectedList[0]
					}
				}
			})
		}
		function r() {
			return a.post("bos/get_root_tree")
		}
		function s() {
			var a = new Date;
			return t(a)
		}
		function t(a) {
			return a.getFullYear() + "-" + u(1 + a.getMonth()) + "-" + u(a.getDate()) + " " + u(a.getHours()) + ":" + u(a.getMinutes()) + ":" + u(a.getSeconds())
		}
		function u(a) {
			return a >= 0 && 10 > a ? "0" + a.toString() : a > -10 && 0 > a ? "-0" + ( - 1 * a).toString() : a.toString()
		}
		var v = function(a) {
			this.requesting = !1,
			this.fileList = [],
			this.fields = a.fields,
			this.curDir = a.curDir,
			this.parentDir = "",
			this.batchMode = !1,
			this.selectedList = [],
			this.initUrl = a.initUrl,
			this.operation = a.operation,
			this.toolbar = a.toolbar,
			this.enableOpenFile = a.enableOpenFile,
			this.refresh = f,
			this.touch = g,
			this.mkdir = h,
			this.rename = i,
			this["delete"] = j,
			this.copy = k,
			this.move = l,
			this.revert = m,
			this.revertAll = n,
			this.remove = o,
			this.removeAll = p,
			this.share = q
		};
		return v
	}]);