// var player = Vue.component("player", {
// 	template: `<div>asdasd</div>`
// });
// var player = Vue.component("player", {
// 	template: `<div>asdasd</div>`
// });
// window.onload = main;
// var audio = new Audio();
// var playPause = document.querySelector(".js-play");
// var seek = document.querySelector(".seek");
// function main() {
//   audio.src = "https://customhtml5video.000webhostapp.com/audio.mp3";
//   playPause.addEventListener("click", play);
//   audio.addEventListener("timeupdate", time);
//   console.log(audio.duration);
// }
// function play() {
//     console.log('play');
//   if (audio.paused) {
//     audio.play();
//     playPause.innerHTML =
//       '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" version="1.1"><g id="surface1"><path style=" " d="M 12 8 L 12 42 L 22 42 L 22 8 Z M 28 8 L 28 42 L 38 42 L 38 8 Z "></path></g></svg>';
//   } else {
//     audio.pause();
//     playPause.innerHTML =
//       '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" version="1.1"><g id="surface1"><path style=" " d="M 7 5 L 7 19 L 19 12 Z "></path></g></svg>';
//   }
// }
// function time() {
//   var width = (100 / audio.duration) * audio.currentTime;
//   seek.style.width = width + "%";
//   document.querySelector(".circle").style.marginLeft = width + "%";
//   var durtime = document.querySelector("#dur");
//   var curtime = document.querySelector("#cur");
//   var durmin = Math.floor(audio.duration / 60);
//   var dursec = Math.floor(audio.duration - durmin * 60);
//   var curmin = Math.floor(audio.currentTime / 60);
//   var cursec = Math.floor(audio.currentTime - curmin * 60);
//   if (durmin < 10) {
//     durmin = "0" + durmin;
//   }
//   if (dursec < 10) {
//     dursec = "0" + dursec;
//   }
//   if (curmin < 10) {
//     curmin = "0" + curmin;
//   }
//   if (cursec < 10) {
//     cursec = "0" + cursec;
//   }
//   durtime.innerHTML = durmin + ":" + dursec;
//   curtime.innerHTML = curmin + ":" + cursec;
// }

// var timeDrag = false; /* check for drag event */
// document.querySelector(".seek-con").addEventListener("mousedown", function(e) {
//   timeDrag = true;
//   audio.pause();
//   updatebar(e.pageX);
// });
// document.addEventListener("mouseup", function(e) {
//   if (timeDrag) {
//     timeDrag = false;
//     updatebar(e.pageX);
//     audio.play();
//   }
// });
// document.addEventListener("mousemove", function(e) {
//   if (timeDrag) {
//     updatebar(e.pageX);
//   }
// });
// var updatebar = function(x) {
//   var progress = document.querySelector(".seek-con");

//   //calculate drag position
//   //and update video currenttime
//   //as well as progress bar
//   var maxduration = audio.duration;
//   var position = x - progress.offset().left;
//   var percentage = (100 * position) / progress.width();
//   if (percentage > 100) {
//     percentage = 100;
//   }
//   if (percentage < 0) {
//     percentage = 0;
//   }
//   document.querySelector(".seek").style.width = percentage + "%";
//   audio.currentTime = (maxduration * percentage) / 100;
//   document.querySelector(".circle").style.marginLeft = percentage + "%";
// };
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
      timeDrag: false
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
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
    updateBar (x) {
        this.timeDrag = false;
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
        this.timeDrag = true;
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
  }
});
