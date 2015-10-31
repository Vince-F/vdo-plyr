(function(){
	angular.module("video")
		.controller("VideoToolboxController",VideoToolboxController);
	
	VideoToolboxController.$inject = ["videoService"];
	
	function VideoToolboxController(videoService){
		this.videoService = videoService;
	};
})();