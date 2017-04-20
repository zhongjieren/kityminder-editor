angular.module("kityminderEditor").service("fileList", ["$http",
	function(a) {
		return {
			curDir: "",
			getRootDir: function() {
				return a.post("bos/get_root_dir")
			},
			getCurDir: function(b) {
				return a.post("bos/file_info", {
					fileGuid: b
				})
			},
			ls: function(b) {
				a.post("bos/ls", {
					dirGuid: b
				})
			},
			get: function(b) {
				return a.post("bos/open", {
					fileGuid: b
				})
			},
			touch: function(b, c) {
				return a.post("bos/touch", {
					fileName: b,
					parentGuid: c || "",
					template: "default",
					version: kityminder.version
				})
			},
			save: function(b, c) {
				return a.post("bos/save", {
					strJson: b,
					fileGuid: c
				})
			},
			rename: function(b, c) {
				return a.post("bos/rename", {
					newName: b,
					selectedFileGuids: c
				})
			},
			touchFromTemplate: function(b, c) {
				return a.post("bos/touch", {
					template: b,
					version: kityminder.version,
					fileName: c,
					parentGuid: ""
				})
			},
			getLatestFiles: function() {
				return a.post("bos/get_latest_files")
			},
			getRootTree: function() {
				return a.post("bos/get_root_tree")
			},
			data: {},
			status: "pending"
		}
	}]);