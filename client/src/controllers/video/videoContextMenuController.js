(function(){
	angular.module("video")
		.controller("VideoContextMenuController",VideoContextMenuController);
		
	VideoContextMenuController.$inject = ["videoService"];
	
	/**
	 * @ngdoc controller
	 * @name video.VideoContextMenuController
	 * @description
	 * controller for the context menu
	 * 
	 * @requires videoService service to control the video object
	 */	
	function VideoContextMenuController(videoService){
		this.menuContent = [
			{name:"Play",action:function(){videoService.pause()},disabled:!videoService.isPaused()},
			{name:"Pause",action:function(){videoService.pause()},disabled:videoService.isPaused()},
			{name:"Stop",action:function(){videoService.stop()},disabled:false},
			{divider:true},
			{name:"Open file",action:function(){}},
			{name:"Open URL",action:function(){}}
		];
	}
})();