(function(){
	angular.module("video")
		.controller("VideoFrameController",VideoFrameController);
		
	VideoFrameController.$inject = ["videoService","$timeout"];
		
	/**
	 * @ngdoc controller
	 * @name video.VideoFrameController
	 * @description
	 * controller for the component displaying the video
	 * 
	 * @requires videoService service to control the video object
	 * @requires $timeout used to delay the hide action of the toolbox in fullscreen
	 */
	function VideoFrameController(videoService,$timeout){
		var myself = this;
		this.videoService = videoService;
		this.toolboxDisplayed = false;
		this.timeoutInst;
		
		/**
		 * @ngdoc method
		 * @name displayToolbox
		 * @methodOf video.VideoFrameController
		 * @description
		 * display the toolbox and trigger timeout for hidding process (cancel any previous timeout)
		 */
		this.displayToolbox = function(){
			this.toolboxDisplayed = true;
			if(this.timeoutInst){
				$timeout.cancel(this.timeoutInst);
			}
			this.timeoutInst = $timeout(function(){
				myself.toolboxDisplayed = false;
			},5000);
		};
		
		/**
		 * @ngdoc method
		 * @name displayContextMenu
		 * @methodOf video.VideoFrameController
		 * @description
		 * display the context menu (right click on PC) allowing to control the video
		 * 
		 * @params evt {Object} the DOM event object
		 */
		this.displayContextMenu = function(evt){
			console.log("context menu has been trigerred ",evt);
			this.menu = {};
			this.menu.x = evt.x;
			this.menu.y = evt.y;
			console.log(this.menu);
			evt.preventDefault();
		};
		
		/**
		 * @ngdoc method
		 * @name hideContextMenu
		 * @methodOf video.hideContextMenu
		 * @description
		 * hide the context menu
		 */
		this.hideContextMenu = function(){
			this.menu = undefined;
		};
	};
})();