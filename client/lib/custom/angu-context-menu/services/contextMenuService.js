(function(){
	angular.module("angu.contextMenu")
		.service("contextMenuService",contextMenuService);
		
	function contextMenuService(){
		this.menuContent = [];
		
		this.display = function(){
			if(arguments.length === 1){ //one argument => event
				
			} else if(arguments.length === 2) {//two arguments => coordinatesè
				
			}
		};
	};
})