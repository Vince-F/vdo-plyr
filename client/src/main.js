(function(){
	/**
	 * @ngdoc module
	 * @name main
	 * @description
	 * Main application module (used by ng-app)
	 * 
	 * @requires video module containing video components
	 * @requires api contains service to communicate with the server
	 */
	angular.module("main",["video","api"]);
})();