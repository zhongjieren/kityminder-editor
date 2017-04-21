
angular.module("kityminderDemo", 
		["ui.router", 
		 "ui.bootstrap", 
		 "kityminderEditor", 
		 "angular-loading-bar", 
		 "cgNotify", 
		 "ngClipboard", 
		 "pascalprecht.translate", 
		 "angular-intro"])
	.config(["$httpProvider",function($httpProvider) {
			$httpProvider.defaults.transformRequest = function($httpProvider) {
				var b = [];
				for (var c in $httpProvider) b.push(encodeURIComponent(c) + "=" + encodeURIComponent($httpProvider[c]));
				return b.join("&")
			},
			$httpProvider.defaults.headers.post = {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			$httpProvider.interceptors.push("httpInterceptor")
		}])
	.config(["cfpLoadingBarProvider",
		function(cfpLoadingBarProvider) {
			cfpLoadingBarProvider.includeSpinner = false;
		}])
	.config(["ngClipProvider",
		function(ngClipProvider) {
			ngClipProvider.setPath("bower_components/zeroclipboard/dist/ZeroClipboard.swf");
		}])
	.config(["$sceDelegateProvider",
		function($sceDelegateProvider) {
			$sceDelegateProvider.resourceUrlWhitelist(["self"])
		}])
	.config(["configProvider",
		function(configProvider) {
			configProvider.set("imageUpload", "bos/upload_image")
		}])
	.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$urlMatcherFactoryProvider",
		function($stateProvider,$urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
			$locationProvider.html5Mode(true),
			$urlRouterProvider.otherwise("/home"),
			$stateProvider.state("home", {
					url: "/home",
					templateUrl: "ui/views/myfile.html",
					controller: "myFile"
				}).state("subdir", {
					url: "/home/{dirGuid}",
					templateUrl: "ui/views/myfile.html",
					controller: "myFile"
				}).state("trash", {
					url: "/trash",
					templateUrl: "ui/views/trash.html",
					controller: "trash"
				}).state("myshare", {
					url: "/myshare",
					templateUrl: "ui/views/myShare.html",
					controller: "myShare"
				}).state("file", {
					url: "/file/{fileGuid}"
				})
		}])
	.run(["$rootScope", "$state", "$modal",function(a, b, c) {
			a.$state = b,
			window.onerror = function(a, b, d, e, f) {
				c.open({
					animation: false,
					templateUrl: "ui/dialog/errorDialog/errorDialog.tpl.html",
					controller: "errorDialog",
					size: "md",
					resolve: {
						errorObj: function() {
							return {
								msg: a,
								file: b,
								line: d,
								column: e,
								error: f
							}
						}
					}
				})
			}
		}]);
//	.config(["$translateProvider",
//	    function($translateProvider) {
//			$translateProvider.useStaticFilesLoader({
//		      prefix: 'l10n/',
//		      langKey: 'zh',
//		      suffix: '.js'
//		    });
//		
//		$translateProvider.preferredLanguage("zh");
//		$translateProvider.useSanitizeValueStrategy("escaped");
//	    // Tell the module to store the language in the local storage
//	    $translateProvider.useLocalStorage();
//	}]);