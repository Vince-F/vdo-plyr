(function () {
	angular.module("video")
		.service("videoService", videoService);

	videoService.$inject = ["$rootScope"]
	function videoService($rootScope) {
		window.dbg = this;
		
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
		
		function updatCursor(){
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
				this.htmlElement.ondurationchange = function(){ updateDuration(); }
				this.htmlElement.ontimeupdate = function(){ updatCursor(); }; //set the updated cursor function
			}
		};
		
		
		
		this.setFrameDimension = function(width,height){
			this.maxWidth = width;
			this.maxHeight = height;
		};
		
		this.getIdealRatio = function (width,height) {
			if (this.htmlElement) {
				var verticalRatio = this.htmlElement.videoWidth / width; //check if good property
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
				console.log("duration ",duration);
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

		

		$rootScope.$watch(function () { return myself.volume },
			function () {
				if (myself.htmlElement) {
					myself.htmlElement.volume = myself.volume / 100;
				}
			}
		);
	};
})();