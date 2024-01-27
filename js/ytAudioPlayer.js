var duration;
var currentTime;
var player;
var isPlaying = false;

function onYouTubeIframeAPIReady() {
    var e = document.getElementById("youtube-audio");
    var a = document.createElement("div");
    a.setAttribute("id", "youtube-player");
    e.appendChild(a);

    e.onclick = function () {
        togglePlayPause();
    };

    player = new YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: e.dataset.video,
        playerVars: {
            autoplay: e.dataset.autoplay,
            loop: e.dataset.loop
        },
        events: {
            onReady: function (e) {
                duration = player.getDuration();
                updateUI();
                setInterval(updateTimeInfo, 1000);
                updateTitle();
            },
            onStateChange: function (e) {
                if (e.data === YT.PlayerState.ENDED) {
                    isPlaying = false;
                } else if (e.data === YT.PlayerState.PLAYING) {
                    isPlaying = true;
                } else if (e.data === YT.PlayerState.PAUSED) {
                    isPlaying = false;
                }
                updateUI();
            }
        }
    });
}

function togglePlayPause() {
    if (isPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
    isPlaying = !isPlaying;
    updateUI();
}

function updateTimeInfo() {
    currentTime = player.getCurrentTime();
    updateUI();
}

function updateUI() {
    var durationElement = document.getElementById('timeInfo');
    var progressBar = document.getElementById('progressBar');
    var progressPercentage = (currentTime / duration) * 100;
    progressBar.style.width = progressPercentage + '%';

    var youtubeIcon = document.getElementById('youtube-icon');
    youtubeIcon.style.backgroundImage = 'url(' + (isPlaying ? '/static/pause.png' : '/static/play.png') + ')';

    var formattedTime = formatTime(currentTime) + ' / ' + formatTime(duration);
    durationElement.textContent = formattedTime;

    updateTitle();
}

function updateTitle() {
    var currentTitleElement = document.getElementById('title');
    var videoData = player.getVideoData();
    var title = videoData.title;

    currentTitleElement.textContent = title;
}


function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function seekToTime(event) {
    var progressBar = document.getElementById('progressContainer');
    var clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
    var percentage = clickPosition / progressBar.clientWidth;
    var seekTime = duration * percentage;
    player.seekTo(seekTime);
}
