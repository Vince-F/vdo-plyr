(function () {
	angular.module("video")
		.service("videoService", videoService);

	videoService.$inject = ["$rootScope"];
	
	/**
	 * @ngdoc service
	 * @name video.videoService
	 * @description
	 * service to control the video element
	 * 
	 * @requires $rootScope the Angular application scope element
	 */
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

		/**
		 * @ngdoc method
		 * @name setVideoElement
		 * @methodOf video.videoService
		 * @description
		 * set the video DOM element
		 * 
		 * @params vid {Object} the video DOM element
		 */
		this.setVideoElement = function (vid) {
			this.htmlElement = vid;
		};
		
		/**
		 * @ngdoc method 
		 * @name setVideoContainer
		 * @methodOf video.videoService
		 * @description
		 * set the DIV element containing the video element
		 * 
		 * @params div {Object} the DIV DOM element containg the video element
		 */
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

		/**
		 * @ngdoc method
		 * @name setElementSource
		 * @methodOf video.videoService
		 * @description
		 * set the URL containing the video data, that the element will fetch
		 * 
		 * @params newSrc {String} the URL for the data
		 */
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
		
		/**
		 * @ngdoc method
		 * @name getDuration
		 * @methodOf video.videoService
		 * @description
		 * retrieve the duration of the video data, if any
		 * 
		 * @returns {Number} the durationof the video, or 0 if it's invalid
		 */
		this.getDuration = function () {
			if (this.htmlElement) {
				if(isNaN(this.htmlElement.duration)){
					return 0;
				}
				return Math.floor(this.htmlElement.duration);
			}
			return 0;
		};

		/**
		 * @ngdoc directive
		 * @name getDurationTimeString
		 * @description
		 * retrieve the video duration in human redable format ( [HH:]mm:ss )
		 * 
		 * @returns {String} duration time formatted as follow [HH:]mm:ss
		 */
		this.getDurationTimeString = function () {
			if (this.htmlElement) {
				var duration = Math.floor(this.htmlElement.duration);
				if(isNaN(duration)){
					return "--:--";
				} else {
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

		/**
		 * @ngdoc method
		 * @name volumeDown
		 * @methodOf video.videoService
		 * @description
		 * reduce the volume by 10%
		 */
		this.volumeDown = function () {
			this.volume -= 10;
			if (this.volume < 0) {
				this.volume = 0;
			}
		};

		/**
		 * @ngdoc method
		 * @name volumeUp
		 * @methodOf video.videoService
		 * @description
		 * increase the volume by 10%
		 */
		this.volumeUp = function () {
			this.volume += 10;
			if (this.volume > 100) {
				this.volume = 100;
			}
		};

		/**
		 * @ngdoc method
		 * @name volumeMute
		 * @methodOf video.videoService
		 * @description
		 * mute the volume if not muted, unmute it otherwise
		 */
		this.volumeMute = function () {
			if(this.htmlElement) {
				this.htmlElement.muted = !this.htmlElement.muted;
			}
		};

		/**
		 * @ngdoc method
		 * @name isMuted
		 * @methodOf video.videoService
		 * @description
		 * return the mute state of the video, true if there no video data
		 * @returns {Boolean} the mute state
		 */
		this.isMuted = function () {
			if(this.htmlElement){
				return this.htmlElement.muted;
			}
			return true;
		};
		
		/**
		 * @ngdoc method
		 * @name pause
		 * @methodOf video.videoService
		 * @description
		 * pause/unpause the video
		 */
		this.pause = function () {
			if (this.htmlElement) {
				if (this.isPaused()) {
					this.htmlElement.play();
				} else {
					this.htmlElement.pause();
				}
			}
		};

		/**
		 * @ngdoc method
		 * @name stop
		 * @methodOf video.videoService
		 * @description
		 * stop the video and set the current time cursor to 0
		 */
		this.stop = function () {
			if (this.htmlElement) {
				this.htmlElement.pause();
				this.htmlElement.currentTime = 0;
			}
		};

		/**
		 * @ngdoc method
		 * @name isPaused
		 * @methodOf video.videoService
		 * @description
		 * returns the pause state of the video, true if there is no video data
		 * @returns {Boolean} pause state of the video
		 */
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
})();