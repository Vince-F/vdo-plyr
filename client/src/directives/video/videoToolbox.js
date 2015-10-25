(function(){
	angular.module("video")
		.directive("videoToolbox",videoToolbox);
		
	function videoToolbox(){
		return {
			restrict: 'E',
			templateUrl: 'src/views/video/videoToolbox.html',
			controller: 'VideoToolboxController',
			controllerAs: 'videoToolboxCtrl'
		}
	};
})();