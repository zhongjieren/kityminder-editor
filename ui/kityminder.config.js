angular.module('kityminderEditor')
	.config(function($sceDelegateProvider) {
		$sceDelegateProvider.resourceUrlWhitelist([
			// Allow same origin resource loads.
			'self',
			// Allow loading from our assets domain.  Notice the difference between * and **.
			'http://agroup.baidu.com:8910/**',
            'http://cq01-fe-rdtest01.vm.baidu.com:8910/**',
            'http://agroup.baidu.com:8911/**'
		]);
	}).config(["$translateProvider",
	    function($translateProvider) {
			$translateProvider.useStaticFilesLoader({
		      prefix: 'l10n/',
		      langKey: 'zh',
		      suffix: '.js'
		    });
		
		$translateProvider.preferredLanguage("zh");
		$translateProvider.useSanitizeValueStrategy("escaped");
	    // Tell the module to store the language in the local storage
	    $translateProvider.useLocalStorage();
	}]);