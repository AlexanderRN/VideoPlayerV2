window.addEventListener('load', function() {
  //Video Container
  video = document.getElementById('video');

  //Button Container
  playBtn = document.getElementById('play-button');
  timeField = document.getElementById('time-field');
  soundBtn = document.getElementById('sound-button');
  fullscreenBtn = document.getElementById('fullscreen-button');
  screenBtn = document.getElementById('screen-button');
  pauseScreen = document.getElementById('screen');

  //Progress Bar
  pbarContainer = document.getElementById('pbar-container');
  pbar = document.getElementById('pbar');

  //Volume Bar
  sbarContainer = document.getElementById('sbar-container');
  sbar = document.getElementById('sbar');

  video.load();
  video.addEventListener('canplay', function() {
    playBtn.addEventListener('click', playOrPause, false);
    soundBtn.addEventListener('click', muteOrUnmute, false);
    fullscreenBtn.addEventListener('click', fullscreen, false);
    pbarContainer.addEventListener('click', skip, false);
    sbarContainer.addEventListener('click', setVolume, false);
    screenBtn.addEventListener('click', playOrPause, false);
    updatePlayer();
  }, false);

}, false);

function playOrPause() {
  if (video.paused) {
    video.play();
    playBtn.src="imgs/pause.png";
    update = setInterval(updatePlayer, 30);

    screenBtn.src="imgs/pause.png";
    pauseScreen.style.display = 'none';
  } else {
    video.pause();
    playBtn.src="imgs/play.png";
    window.clearInterval(update);

    screenBtn.src="imgs/play.png";
    pauseScreen.style.display = 'block';
  }
}

function updatePlayer() {
  var percentage = (video.currentTime/video.duration)*100;
  pbar.style.width = percentage + '%';
  timeField.innerHTML = getFormattedTime();

  if (video.ended) {
    window.clearInterval(update);
    playBtn.src="imgs/replay.png";

    pauseScreen.style.display = 'block';
    screenBtn.src="imgs/replay.png";
  } else if(video.paused) {
    playBtn.src="imgs/play.png";
    screenBtn.src="imgs/play.png";
  }
}

function skip(ev) {
  var mouseX = ev.pageX - pbarContainer.offsetLeft;
  var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');
  width = parseFloat(width.substr(0, width.length - 2));
  video.currentTime = (mouseX/width)*video.duration;
  updatePlayer();
}

function getFormattedTime() {
  var seconds = Math.round(video.currentTime);
  var minutes = Math.floor(seconds/60);
    if(minutes > 0) { seconds -= minutes*60;}
  if (seconds.toString().length == 1) { seconds = "0" + seconds;}

  var totalSeconds = Math.round(video.duration);
  var totalMinutes = Math.floor(totalSeconds/60);

  if(totalMinutes > 0 ){totalSeconds -= totalMinutes*60;}
  if(totalSeconds.toString().length == 1) { totalSeconds = "0" + totalSeconds;}


  return minutes + ":" + seconds + "/" + totalMinutes + ":" + totalSeconds;
}

function muteOrUnmute() {
  if(!video.muted) {
    video.muted = true;
    soundBtn.src="imgs/mute.png";
    sbar.style.display = 'none';
  } else {
    video.muted = false;
    soundBtn.src="imgs/sound.png";
    sbar.style.display = 'block';
  }
}

function setVolume(ev) {
  var mouseX = ev.pageX - sbarContainer.offsetLeft;
  var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');
  width = parseFloat(width.substr(0, width.length - 2));

  video.volume = (mouseX/width);
  sbar.style.width = (mouseX/width)*100 + '%';
  video.muted = false;
  soundBtn.src="imgs/sound.png";
  sbar.style.display = 'block';
}

function fullscreen() {
  if(video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.mozRequestFullscreen) {
    video.mozRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
}
