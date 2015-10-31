(function () {
	angular.module("angu.events", [])
		.directive("anguContextmenu",["$parse", function ($parse) {
			return {
				restrict: 'A',
				compile: function ($element, attr) {
					//based on https://github.com/angular/angular.js/blob/master/src/ng/directive/ngEventDirs.js#L400
					var fn = $parse(attr["anguContextmenu"], null, true);
					return function eventHandler(scope, element) {
						element.on("contextmenu", function (event) {
							scope.$apply( function () {	fn(scope, { $event: event }); } );
						});
					};
				}
			}
		}]);
})();