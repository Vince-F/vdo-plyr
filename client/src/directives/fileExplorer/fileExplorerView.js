(function(){
	angular.module("fileExplorer")
		.directive("fileExplorerView",fileExplorerView);
		
	function fileExplorerView(){
		return {
			restrict: 'E',
			templateUrl: 'src/views/fileExplorer/fileExplorerView.html',
			controller: 'FileExplorerViewController',
			controllerAs: 'fileExplorerCtrl'
		}
	}
})();