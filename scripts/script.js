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
      isTimerPlaying: false
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
      var width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      var durmin = Math.floor(this.audio.duration / 60);
      var dursec = Math.floor(this.audio.duration - durmin * 60);
      var curmin = Math.floor(this.audio.currentTime / 60);
      var cursec = Math.floor(this.audio.currentTime - curmin * 60);
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
      var progress = this.$refs.progress;
      //calculate drag position
      //and update video currenttime
      //as well as progress bar
      var maxduration = this.audio.duration;
      var position = x - progress.offsetLeft;
      var percentage = (100 * position) / progress.offsetWidth;
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
    }
  },
  mounted() {},
  created() {
    let vm = this;
    this.audio = new Audio();
    this.audio.src = "https://customhtml5video.000webhostapp.com/audio.mp3";
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.isTimerPlaying = false;
    };
  }
});
