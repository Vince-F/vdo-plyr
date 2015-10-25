(function(){
	angular.module("video")
		.directive("videoFrame",videoFrame);
		
	videoFrame.$inject = ["videoService"];
		
	function videoFrame(videoService){
		return {
			restrict: 'E',
			templateUrl: 'src/views/video/videoFrame.html',
			controller: 'VideoFrameController',
			controllerAs: 'videoFrameCtrl',
			link : function(scope,element){
				var elem = element.find("video");
				var vidDiv = element.find("div")[0];
				videoService.setVideoContainer(vidDiv);
				videoService.setFrameDimension(vidDiv.getBoundingClientRect().width,vidDiv.getBoundingClientRect().height)
				videoService.setVideoElement(elem[0]);
				videoService.setElementSource("test/test.mp4");
			}
		}
	};
})();