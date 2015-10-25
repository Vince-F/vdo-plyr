(function(){
	angular.module("video")
		.directive("videoContextMenu",videoContextMenu);
		
	function videoContextMenu(){
		return {
			restrict: 'E',
			templateUrl: 'src/views/video/videoContextMenu.html',
			controller: 'VideoContextMenuController',
			controllerAs: 'videoContextMenuCtrl'
		}
	};
})