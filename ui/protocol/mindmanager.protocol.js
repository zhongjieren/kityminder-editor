window.kityminder.data.registerProtocol("mindmanager",
	function(a) {
		function b(a, c) {
			if (c.data = {
				text: a.Text && a.Text.PlainText || ""
			},
			a.Task) {
				var d;
				a.Task.TaskPriority && (d = g[a.Task.TaskPriority], d && (c.data[d[0]] = d[1])),
				a.Task.TaskPercentage && (d = g[a.Task.TaskPercentage], d && (c.data[d[0]] = d[1]))
			}
			if (a.Hyperlink && (c.data.hyperlink = a.Hyperlink.Url), a.SubTopics && a.SubTopics.Topic) {
				var e = a.SubTopics.Topic;
				if (e.length && e.length > 0) {
					c.children = [];
					for (var f in e) c.children.push({}),
					b(e[f], c.children[f])
				} else c.children = [{}],
				b(e, c.children[0])
			}
		}
		function c(a) {
			var c = $.xml2json(a),
			d = {};
			return b(c.OneTopic.Topic, d),
			d
		}
		function d(a) {
			return new f(function(b, c) {
				zip.createReader(new zip.BlobReader(a),
				function(a) {
					a.getEntries(b)
				},
				c)
			})
		}
		function e(a) {
			return new f(function(b, d) {
				for (var e, f; (e = a.pop()) && "Document.xml" != e.filename.split("/").pop();) e = null;
				e ? e.getData(new zip.TextWriter,
				function(a) {
					f = c($.parseXML(a)),
					b(f)
				}) : d(new Error("Main document missing"))
			})
		}
		var f = kityminder.Promise,
		g = {
			"urn:mindjet:Prio1": ["PriorityIcon", 1],
			"urn:mindjet:Prio2": ["PriorityIcon", 2],
			"urn:mindjet:Prio3": ["PriorityIcon", 3],
			"urn:mindjet:Prio4": ["PriorityIcon", 4],
			"urn:mindjet:Prio5": ["PriorityIcon", 5],
			0 : ["ProgressIcon", 1],
			25 : ["ProgressIcon", 2],
			50 : ["ProgressIcon", 3],
			75 : ["ProgressIcon", 4],
			100 : ["ProgressIcon", 5]
		};
		return {
			fileDescription: "MindManager 格式",
			fileExtension: ".mmap",
			dataType: "blob",
			decode: function(a) {
				return d(a).then(e)
			},
			encode: null,
			recognizePriority: -1
		}
	} ());