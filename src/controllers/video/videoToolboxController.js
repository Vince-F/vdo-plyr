(function(){
	angular.module("video")
		.controller("VideoToolboxController",VideoToolboxController);
	
	VideoToolboxController.$inject = ["videoService"];
	
	/**
	 * @ngdoc controller
	 * @name video.VideoToolboxController
	 * @description
	 * controller of the toolbox (i.e. the bar where there is commands to control the video)
	 * 
	 * @requires videoService the service to control the video object
	 */
	function VideoToolboxController(videoService){
		this.videoService = videoService;
	};
})();