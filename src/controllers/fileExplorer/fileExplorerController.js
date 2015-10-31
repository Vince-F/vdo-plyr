(function(){
	angular.module("fileExplorer")
		.controller("FileExplorerController",FileExplorerController);
		
	FileExplorerController.$inject = ["fileExplorerService"]
		
	function FileExplorerController(fileExplorerService){
		this.fileExplorerService = fileExplorerService;
		this.listView = false;
		
		this.isListView = function(){
			return this.listView;
		};
		
		this.setListView = function(){
			this.listView = true;
		};
		
		this.setTableView = function(){
			this.listView = false;
		};
	};
})();