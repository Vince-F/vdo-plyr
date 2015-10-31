(function(){
	angular.module("video")
		.controller("VideoFrameController",VideoFrameController);
		
	VideoFrameController.$inject = ["videoService"];
		
	function VideoFrameController(videoService){
		this.videoService = videoService;
	};
})();