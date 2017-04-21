angular.module("kityminderEditor").service("file", ["$http", "$q", "memory", "cookie",
	function(a, b, c, d) {
		function e() {
			function d() {
				return a.post("bos/open", {
					fileGuid: f.fileGuid
				})
			}
			function e() {
				return c.get(f.fileGuid)
			}
			var f = this;
			return f.requesting = !0,
			d().then(function(a) {
				return f.requesting = !1,
				b(function(b, c) {
					var d = a.data,
					g = e();
					g = JSON.parse(g),
					0 == d.errno ? (g && g.content != d.data.content && g.lastModifiedTime > d.data.last_modified_time && g.lastModifiedUser === p() ? (f.fileName = d.data.file_name, f.data.content = g.content, f.save(g.content)) : (f.fileName = d.data.file_name, f.data = d.data), b(f.data.content)) : c("get file failed")
				})
			})
		}
		function f() {
			function c() {
				return a.post("bos/touch", {
					fileName: d.fileName,
					parentGuid: d.parentGuid || "",
					template: d.template,
					version: kityminder.version
				})
			}
			var d = this;
			return d.requesting = !0,
			c().then(function(a) {
				return d.requesting = !1,
				b(function(b, c) {
					var e = a.data;
					0 == e.errno ? (d.fileGuid = e.data.file_guid, b(a.data)) : c("touch file failed")
				})
			})
		}
		function g(d) {
			function e(b) {
				return a.post("bos/save", {
					strJson: b,
					fileGuid: f.fileGuid
				})
			}
			var f = this;
			return f.requesting = !0,
			f.requestMsg = "saving_file",
			e(d).then(function(a) {
				return b(function(b, e) {
					var g = a.data,
					i = p();
					if (0 == g.errno && g.data) f.data.content = d,
					f.requesting = !1,
					f.requestMsg = "file_saved",
					c.get(f.fileGuid) && JSON.parse(c.get(f.fileGuid)).lastModifiedUser === i && c.remove(f.fileGuid),
					b(!0);
					else {
						var j = h(d);
						j ? setTimeout(function() {
							f.requesting = !1,
							f.requestMsg = "file_saved_locally_since_cloud_save_failed",
							b(!1)
						},
						500) : (f.requesting = !1, f.requestMsg = "localstorage_quota_exceeded", e("localstorage quota exceeded."))
					}
				})
			},
			function(a) {
				return b(function(a, b) {
					var c = h(d);
					c ? setTimeout(function() {
						f.requesting = !1,
						f.requestMsg = "file_saved_locally_since_cloud_save_failed",
						a(!1)
					},
					500) : (f.requesting = !1, f.requestMsg = "localstorage_quota_exceeded", b("localstorage quota exceeded."))
				})
			})
		}
		function h(a) {
			var b = i(a);
			return c.set(this.fileGuid, JSON.stringify(b)) ? !0 : k(a)
		}
		function i(a) {
			var b = p();
			return {
				fileGuid: this.fileGuid,
				fileName: this.fileName,
				content: a,
				lastModifiedTime: q(),
				lastModifiedUser: b
			}
		}
		function j() {
			var a = window.localStorage,
			b = p(),
			d = [];
			for (var e in a) a.hasOwnProperty(e) && JSON.parse(JSON.parse(a[e])).lastModifiedUser == b && d.push(c.get(e));
			return d.sort(function(a, b) {
				var c = JSON.parse(a),
				d = JSON.parse(b);
				return c.lastModifiedTime > d.lastModifiedTime
			}),
			d
		}
		function k(a) {
			for (var b = j(), d = i(a), e = d.length, f = 0; f < b.length && (c.remove(JSON.parse(b[f]).fileGuid), e -= b[f].length, f++, !(1 > e)););
			return 1 > e ? c.set(this.fileGuid, JSON.stringify(d)) : !1
		}
		function l(c) {
			function d() {
				return a.post("bos/rename", {
					newName: c,
					selectedFileGuids: e.fileGuid
				})
			}
			var e = this;
			return c = c.replace(/[<>'"\/\|\?\*\[\]&\$#\{\}=;]+/g, ""),
			e.requesting = !0,
			d().then(function(a) {
				return e.requesting = !1,
				b(function(b, d) {
					var f = a.data;
					0 == f.errno && f.data ? (e.fileName = c, b(f.data)) : d("rename file failed")
				})
			})
		}
		function m() {
			function c() {
				return a.post("bos/get_latest_files")
			}
			var d = this;
			return d.requesting = !0,
			c().then(function(a) {
				return d.requesting = !1,
				b(function(b, c) {
					var e = a.data;
					0 == e.errno ? (e.data = e.data.filter(function(a) {
						return "0" === a.is_deleted
					}), d.latestFiles = e.data.sort(function(a, b) {
						return - a.last_modified_time.localeCompare(b.last_modified_time)
					}).slice(0, 5), b(d.latestFiles)) : c("get latest files failed")
				})
			})
		}
		function n() {
			function c() {
				return a.post("bos/get_latest_versions", {
					fileGuid: d.fileGuid
				})
			}
			var d = this;
			return d.requesting = !0,
			c().then(function(a) {
				return d.requesting = !1,
				b(function(b, c) {
					var e = a.data;
					0 == e.errno ? (d.latestVersions = e.data, b(e.data)) : c("get latest versions failed")
				})
			})
		}
		function o() {
			function c() {
				return a.post("bos/get_root_tree")
			}
			var d = this;
			return d.requesting = !0,
			c().then(function(a) {
				return d.requesting = !1,
				b(function(b, c) {
					var e = a.data;
					0 == e.errno ? (d.rootTree = e.data, b(e.data)) : c("get root tree failed")
				})
			})
		}
		function p() {
			var a = "bds_wiE55BGOG8BkGnpPs6UNtPbb_",
			b = d.get(a + "session");
			return d.getItemValue("uid", b)
		}
		function q() {
			var a = new Date;
			return r(a)
		}
		function r(a) {
			return a.getFullYear() + "-" + s(1 + a.getMonth()) + "-" + s(a.getDate()) + " " + s(a.getHours()) + ":" + s(a.getMinutes()) + ":" + s(a.getSeconds())
		}
		function s(a) {
			return a >= 0 && 10 > a ? "0" + a.toString() : a > -10 && 0 > a ? "-0" + ( - 1 * a).toString() : a.toString()
		}
		function t(c) {
			var d = this;
			return d.requesting = !0,
			a.post("bos/get_history_data", {
				bosGuid: c,
				fileGuid: d.fileGuid
			}).then(function(a) {
				return d.requesting = !1,
				b(function(b, c) {
					var e = a.data;
					0 == e.errno ? (d.data.content = e.data, b(e.data)) : c("get history data failed")
				})
			})
		}
		var u = function(a) {
			this.requesting = !1,
			this.requestMsg = "ready",
			this.data = {},
			this.fileGuid = a.fileGuid,
			this.fileName = a.fileName,
			this.template = a.template,
			this.latestFiles = [],
			this.latestVersions = [],
			this.rootTree = {},
			this.parentGuid = a.parentGuid,
			this.get = e,
			this.touch = f,
			this.save = g,
			this.saveToLocal = h,
			this.makeLocalPackage = i,
			this.DeleteExpiredAndSave = k,
			this.rename = l,
			this.getLatestFiles = m,
			this.getLatestVersions = n,
			this.getRootTree = o,
			this.getHistoryData = t;
		};
		return u
	}]);