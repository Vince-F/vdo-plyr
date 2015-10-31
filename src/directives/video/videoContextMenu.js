(function(){
	angular.module("video")
		.directive("videoContextMenu",videoContextMenu);
		
	/**
	 * @ngdoc directive
	 * @name video.videoContextMenu
	 * @description
	 * directive for the context menu
	 */
	function videoContextMenu(){
		return {
			restrict: 'E',
			templateUrl: 'src/views/video/videoContextMenu.html',
			scope:{
				xPosition:"&",
				yPosition:"&"
			},
			bindToController:true,
			controller: 'VideoContextMenuController',
			controllerAs: 'videoContextMenuCtrl'
		}
	};
})();