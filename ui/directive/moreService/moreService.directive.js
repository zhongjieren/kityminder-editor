angular.module('kityminderEditor')
	.directive('moreService',function() {
		return {
			restrict: "E",
			template: '<span class="moreservice"></span>',
			replace: !0,
			link: function(a, b) {
				var c = {
					list: [{
						link: "http://h5.baidu.com",
						iconPos: "0px 0px",
						title: "百度 H5",
						background: "#47C3EE",
						"border-color": "#47C3EE"
					},
					{
						link: "http://naotu.baidu.com",
						iconPos: "-70px 0px",
						title: "百度脑图",
						background: "#FC8383",
						"border-color": "#FC8383"
					}],
					button: {},
					"z-index": 2e3
				},
				d = function(a, b) {
					var c = '<li><a href="' + b.link + '" target="_blank"><span class="is_c" style="background:' + b.background + '"><span class="img" style="background-position:' + b.iconPos + '"></span></span><span>' + b.title + "</span></a></li>",
					d = $(c),
					e = d.find("a");
					d.hover(function() {
						e.css("border-color", b["border-color"])
					},
					function() {
						e.css("border-color", "transparent")
					}),
					a.append(d)
				},
				e = function(a, b) {
					var c = $(a),
					e = b["z-index"];
					c.css(b.button).css("z-index", e),
					c.addClass("moreservice");
					var f = c.offset(),
					g = c.outerHeight() + f.top,
					h = f.left,
					i = '<div class="office-container"><div><div class="office-bubbleBreak"></div><div class="office-outerContainer"><div class="office-innerContainer"><ul></ul><div style="clear:both"></div></div></div></div>',
					j = $(i).css("z-index", e),
					k = j.find("ul"),
					l = $('<div class="mask">').css("z-index", e - 1);
					return $.each(b.list,
					function(a, b) {
						d(k, b)
					}),
					j.offset({
						top: g,
						left: h
					}),
					$("body").append(l).append(j),
					{
						widget: j,
						mask: l
					}
				};
				$.fn.moreService = function(a) {
					var a = $.extend(!0, {},
					c, a);
					return this.each(function() {
						var b, c = this,
						d = e(c, a),
						f = d.mask,
						g = d.widget;
						$(c).mouseup(function() {
							g.hasClass("show") ? (g.removeClass("show"), $(c).removeClass("active"), b = setTimeout(function() {
								f.hide(),
								g.hide()
							},
							200)) : (clearTimeout(b), $(c).addClass("active"), f.show("fast"), g.show("fast",
							function() {
								g.addClass("show")
							}))
						}),
						f.mouseup(function() {
							$(c).removeClass("active"),
							g.removeClass("show"),
							b = setTimeout(function() {
								f.hide(),
								g.hide()
							},
							200)
						})
					})
				},
				$(b[0]).moreService({
					button: {
						"float": "left",
						width: "40px",
						height: "40px",
						"border-right": "1px solid rgba(255, 255, 255, .5)"
					}
				}),
				$(b[0]).css("z-index", "1")
			}
		}
	});