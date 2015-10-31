(function(){
	angular.module("api",[]);
})();;
(function(){
	angular.module("fileExplorer",[]);
})();;
(function(){
	angular.module("video",['ngMaterial',"angu.events"]);
})();;
(function(){
	angular.module("api")
		.service("apiService",apiService);
		
	function apiService(){
		this.getDirectoryContent = function(){
				
		};
		
		this.getFileContent = function(){
			
		};
	};
})();;
(function(){
	angular.module("fileExplorer")
		.service("fileExplorerService",fileExplorerService);
		
	function fileExplorerService(){
		
		this.requestForFileSelection = function(){
			//return promise or something like that
		};
		
		this.requestForFolderSelection = function(){
			
		};
		
		this.selectEntity = function(){
			
		};
		
		this.cancelSelection = function(){
			
		};
	};
})();;
(function () {
	angular.module("video")
		.service("videoService", videoService);

	videoService.$inject = ["$rootScope"]
	function videoService($rootScope) {		
		var myself = this;
		this.htmlElement;
		this.videoContainer;
		this.isFullScreen = false;
		this.currentTime = 0;
		this.durationTime = 0;
		this.volume = 100;
		this.maxWidth = 0;
		this.maxHeight = 0;

		this.setVideoElement = function (vid) {
			this.htmlElement = vid;
		};
		
		this.setVideoContainer = function (div) {
			this.videoContainer = div;
		};
		
		function updateCursor(){
			$rootScope.$apply( function(){
				myself.currentTime = Math.floor(myself.htmlElement.currentTime);
			});
		};
		
		function updateDuration(){
			$rootScope.$apply( function(){
				myself.duration = Math.floor(myself.htmlElement.duration);
			});
		};

		this.setElementSource = function (newSrc) {
			if (this.htmlElement) {
				this.htmlElement.src = newSrc;
				this.htmlElement.ondurationchange = function(){ updateDuration(); };
				this.htmlElement.ontimeupdate = function(){ updateCursor(); }; 
			}
		};
		
		this.setFrameDimension = function(width,height){
			this.maxWidth = width;
			this.maxHeight = height;
		};
		
		this.getIdealRatio = function (width,height) {
			if (this.htmlElement) {
				var verticalRatio = this.htmlElement.videoWidth / width;
				var horizontalRation = this.htmlElement.videoHeight / height;
				return (verticalRatio < horizontalRation) ? verticalRatio : horizontalRation;
			}
			return 0;
		};
		
		this.computeVideoSize = function(){
			var ratio = this.getIdealRatio(this.maxWidth,this.maxHeight);
			if(this.htmlElement){
				  this.htmlElement.width = Math.floor(this.htmlElement.videoWidth/ratio);
				  this.htmlElement.height = Math.floor(this.htmlElement.videoHeight/ratio);
			}
		};

		this.getDuration = function () {
			if (this.htmlElement) {
				if(isNaN(this.htmlElement.duration)){
					return 0;
				}
				return Math.floor(this.htmlElement.duration);
			}
			return 0;
		};

		this.getDurationTimeString = function () {
			if (this.htmlElement) {
				var duration = Math.floor(this.htmlElement.duration);
				var sec = duration % 60;
				var min = Math.floor(duration / 60);
				if (min > 59) {
					var hour = Math.floor(min / 60);
					min = min % 60;
				};
				var res = min + ":" + sec;
				if (hour) {
					res = hour + ":" + res;
				}
				return res;
			}
			return "--:--";
		};

		this.getCurrentTime = function () {
			if (this.htmlElement) {
				return Math.floor(this.htmlElement.currentTime);
			}
			return 0;
		};

		this.getCurrentTimeString = function () {
			if (this.htmlElement) {
				var duration = Math.floor(this.htmlElement.currentTime);
				var sec = duration % 60;
				var min = Math.floor(duration / 60);
				if (min > 59) {
					var hour = Math.floor(min / 60);
					min = min % 60;
				};
				var res = min + ":" + sec;
				if (hour) {
					res = hour + ":" + res;
				}
				return res;
			}
			return "--:--";
		};
		
		this.updateCurrentTime = function(){
			if(this.htmlElement){
				this.htmlElement.currentTime = this.currentTime;
			}
		};

		this.getVolume = function () {
			return this.volume;
		};

		this.volumeDown = function () {
			this.volume -= 10;
			if (this.volume < 0) {
				this.volume = 0;
			}
		};

		this.volumeUp = function () {
			this.volume += 10;
			if (this.volume > 100) {
				this.volume = 100;
			}
		};

		this.volumeMute = function () {
			if(this.htmlElement) {
				this.htmlElement.muted = !this.htmlElement.muted;
			}
		};

		this.isMuted = function () {
			if(this.htmlElement){
				return this.htmlElement.muted;
			}
			return true;
		};

		this.pause = function () {
			if (this.htmlElement) {
				if (this.isPaused()) {
					this.htmlElement.play();
				} else {
					this.htmlElement.pause();
				}
			}
		};

		this.stop = function () {
			if (this.htmlElement) {
				this.htmlElement.pause();
				this.htmlElement.currentTime = 0;
			}
		};

		this.isPaused = function () {
			if(this.htmlElement){
				return this.htmlElement.paused;
			}
			return true;
		};

		this.getSubtitles = function () {
			if (this.htmlElement) {
				return this.htmlElement.textTracks;
			}
			return [];
		};

		this.getAudioTracks = function () {
			if (this.htmlElement) {
				return this.htmlElement.audioTracks;
			}
			return [];
		};

		this.setFullScreen = function () {
			if(this.videoContainer){
				if (this.videoContainer.requestFullscreen) {
					this.videoContainer.requestFullscreen();
				} else if (this.videoContainer.mozRequestFullScreen) {
					this.videoContainer.mozRequestFullScreen();
				} else if (this.videoContainer.webkitRequestFullscreen) {
					this.videoContainer.webkitRequestFullscreen();
				}
				this.htmlElement.width = window.innerWidth;
				this.htmlElement.height = window.innerHeight;
				this.isFullScreen = true;
			}
		};

		this.exitFullScreen = function () {
			this.isFullScreen = false;
			if (this.videoContainer.cancelFullscreen) {
				this.videoContainer.cancelFullscreen();
			} else if (this.videoContainer.mozcancelFullScreen) {
				this.videoContainer.mozcancelFullScreen();
			} else if (this.videoContainer.webkitcancelFullscreen) {
				this.videoContainer.webkitcancelFullscreen();
			}
		};
		
		document.addEventListener("fullscreenchange", function( event ) {
			myself.isFullScreen = document.fullscreenEnabled;
			$rootScope.$digest();
		});
		document.addEventListener("mozfullscreenchange", function( event ) {
			myself.isFullScreen = document.mozFullScreen;
			$rootScope.$digest();
		});
		document.addEventListener("webkitfullscreenchange", function( event ) {
			myself.isFullScreen = document.webkitIsFullScreen;
			$rootScope.$digest();
		});

		$rootScope.$watch(function () { return myself.volume },
			function () {
				if (myself.htmlElement) {
					myself.htmlElement.volume = myself.volume / 100;
				}
			}
		);
	};
})();;
(function(){
	angular.module("fileExplorer")
		.controller("FileExplorerController",FileExplorerController);
		
	function FileExplorerController(){
		
	};
})();;
(function(){
	angular.module("video")
		.controller("VideoContextMenuController",VideoContextMenuController);
		
	VideoContextMenuController.$inject = ["videoService"];
		
	function VideoContextMenuController(videoService){
		this.menuContent = [
			{name:"Play",action:function(){videoService.pause()},disabled:!videoService.isPaused()},
			{name:"Pause",action:function(){videoService.pause()},disabled:videoService.isPaused()},
			{name:"Stop",action:function(){videoService.stop()},disabled:false},
			{divider:true},
			
		];
	}
})();;
(function(){
	angular.module("video")
		.controller("VideoFrameController",VideoFrameController);
		
	VideoFrameController.$inject = ["videoService","$timeout"];
		
	function VideoFrameController(videoService,$timeout){
		var myself = this;
		this.videoService = videoService;
		this.toolboxDisplayed = false;
		this.timeoutInst;
		
		this.displayToolbox = function(){
			this.toolboxDisplayed = true;
			if(this.timeoutInst){
				$timeout.cancel(this.timeoutInst);
			}
			this.timeoutInst = $timeout(function(){
				myself.toolboxDisplayed = false;
			},5000);
		};
		
		this.displayContextMenu = function(evt){
			console.log("context menu has been trigerred ",evt);
			this.menu = {};
			this.menu.x = evt.x;
			this.menu.y = evt.y;
			console.log(this.menu);
			evt.preventDefault();
		};
		
		this.hideContextMenu = function(){
			this.menu = undefined;
		};
	};
})();;
(function(){
	angular.module("video")
		.controller("VideoToolboxController",VideoToolboxController);
	
	VideoToolboxController.$inject = ["videoService"];
	
	function VideoToolboxController(videoService){
		this.videoService = videoService;
	};
})();;
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
})();;
(function(){
	angular.module("video")
		.directive("videoContextMenu",videoContextMenu);
		
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
})();;
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
})();;
(function(){
	angular.module("video")
		.directive("videoToolbox",videoToolbox);
		
	function videoToolbox(){
		return {
			restrict: 'E',
			templateUrl: 'src/views/video/videoToolbox.html',
			controller: 'VideoToolboxController',
			controllerAs: 'videoToolboxCtrl'
		}
	};
})();;
(function(){
	angular.module("main",["video","api"]);
})();
//# sourceMappingURL=vdo_plyr.dbg.js.map