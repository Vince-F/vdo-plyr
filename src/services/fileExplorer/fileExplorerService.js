(function(){
	angular.module("fileExplorer")
		.service("fileExplorerService",fileExplorerService);
		
	function fileExplorerService(){
		
		this.requestForFileSelection = function(){
			//return promise or something like that
		};
		
		this.requestForFolderSelection = function(){
			
		};
		
		this.setSelectedEntity = function(selectedEntity){
			this.selectedEntity = selectedEntity;
		}
		
		this.selectEntity = function(){
			
		};
		
		this.cancelSelection = function(){
			
		};
	};
})();