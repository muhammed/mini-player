new Vue({
  el: "#app",
  // components: {
  //     player
  // }
  data() {
    return {
      testData: "asda",
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "The Upside 1",
          artist: "Lindsey Stirling",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
          source: "https://customhtml5video.000webhostapp.com/audio.mp3",
          favorited: false
        },
        {
          name: "The Upside 2",
          artist: "Lindsey Stirling",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
          source: "https://customhtml5video.000webhostapp.com/audio.mp3",
          favorited: true
        },
        {
          name: "The Upside 3",
          artist: "Lindsey Stirling",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
          source: "https://customhtml5video.000webhostapp.com/audio.mp3",
          favorited: false
        },
        {
          name: "The Upside 4",
          artist: "Lindsey Stirling",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
          source: "https://customhtml5video.000webhostapp.com/audio.mp3",
          favorited: false
        },
        {
          name: "The Upside 5",
          artist: "Lindsey Stirling",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
          source: "https://customhtml5video.000webhostapp.com/audio.mp3",
          favorited: true
        },
        {
          name: "The Upside 6",
          artist: "Lindsey Stirling",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
          source: "https://customhtml5video.000webhostapp.com/audio.mp3",
          favorited: false
        },
        {
          name: "The Upside 7",
          artist: "Lindsey Stirling",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
          source: "https://customhtml5video.000webhostapp.com/audio.mp3",
          favorited: true
        },
        {
          name: "The Upside 8",
          artist: "Lindsey Stirling",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
          source: "https://customhtml5video.000webhostapp.com/audio.mp3",
          favorited: false
        },
        {
          name: "The Upside 9",
          artist: "Lindsey Stirling",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
          source: "https://customhtml5video.000webhostapp.com/audio.mp3",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      //calculate drag position
      //and update video currenttime
      //as well as progress bar
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    nextTrack () {
      console.log('next');
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    prevTrack () {
      console.log('prev');
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer () {
      this.audio.pause();
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      this.isTimerPlaying = true;
      setTimeout(() => {
        this.audio.play();
      }, 300);
    },
    favorite () {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[this.currentTrackIndex].favorited
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.isTimerPlaying = false;
      vm.nextTrack();
    };
  }
});
