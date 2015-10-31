(function(){
	angular.module("video")
		.directive("videoToolbox",videoToolbox);
		
	/**
	 * @ngdoc directive
	 * @name video.videoToolbox
	 * @description
	 * directive containing the commands for user interaction with the video
	 */
	function videoToolbox(){
		return {
			restrict: 'E',
			templateUrl: 'src/views/video/videoToolbox.html',
			controller: 'VideoToolboxController',
			controllerAs: 'videoToolboxCtrl'
		}
	};
})();