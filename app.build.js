({
	paths: {
		angular: "../vendor/angular/angular.min"
	},

	shim: {
		angular: {
			exports: 'angular'
		}
	},

	appDir: "src/",
	baseUrl: "js",
	dir: "dist",
	name: "main",
	optimize: "none",
	removeCombined: true,
	fileExclusionRegExp: /^angular\.js|\.js\.map$/
})
