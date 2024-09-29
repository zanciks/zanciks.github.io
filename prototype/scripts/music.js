const musicPlayer = document.getElementById('music-player');
const musicImage  = document.getElementById('music-image');
const progressBar = document.getElementById('music-progress');
const volumeRange = document.getElementById('music-volume-input');
const musicPlaying = document.getElementById('music-playing');
const currentSong = musicPlaying.children;
const playlistDisplay = document.getElementById('music-playlist');

var currentSongIndex = 0;
var timePercentage = 100;

const playlist = [
    { image: '../music/00/image.jpg', length: '2:30', title: 'The Orb of Dreamers', artist: 'Daniel Pemberton', source: '../music/00/source.mp3' },
    { image: '../music/01/image.jpg', length: '1:43', title: 'Save the Cat', artist: 'Daniel Pemberton', source: '../music/01/source.mp3' },
    { image: '../music/02/image.jpg', length: '3:19', title: 'I\'ll Try Anything Once', artist: 'The Strokes', source: '../music/02/source.mp3' },
    { image: '../music/03/image.jpg', length: '3:09', title: 'Paul (Big Thief Cover)', artist: 'Cavetown', source: '../music/03/source.mp3' },
    { image: '../music/04/image.jpg', length: '3:24', title: 'Call it Fate, Call it Karma', artist: 'The Strokes', source: '../music/04/source.mp3' },
    { image: '../music/05/image.jpg', length: '4:17', title: 'Postcards from Italy', artist: 'Beirut', source: '../music/05/source.mp3' },
]

function togglePlay() {
	if (musicPlayer.paused) {
		musicPlayer.play();
	} else {
		musicPlayer.pause();
	}
}

function previousSong() {
    if (timePercentage > 5) {
        playSong(currentSongIndex);
        return;
    }
    currentSongIndex--;
    if (currentSongIndex < 0) { currentSongIndex = playlist.length - 1 }
    playSong(currentSongIndex);
    setPlaylistDisplay();
}

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= playlist.length) { currentSongIndex = 0 }
    playSong(currentSongIndex);
    setPlaylistDisplay();
}

function setPlaylistDisplay() {
    playlistDisplay.innerHTML = '';

    var count = 0;
    for (let i = currentSongIndex + 1; i < playlist.length; i++) {
        addPlaylistEntry(i)
    }
    for (let i = 0; i < currentSongIndex; i++) {
        addPlaylistEntry(i)
    }

    function addPlaylistEntry(index) {
        count++
        const songElement = document.createElement('div');
        songElement.className = 'music-playlist-item';

        const leftItem = document.createElement('div');
        leftItem.className = 'item-left';
        leftItem.innerHTML = `<button onclick="playSong(${index})">${count}</button> ${playlist[index].title}`;

        const rightItem = document.createElement('div');
        rightItem.className = 'item-right';
        rightItem.innerHTML = `${playlist[index].artist} (${playlist[index].length})`;

        songElement.appendChild(leftItem);
        songElement.appendChild(rightItem);
        playlistDisplay.appendChild(songElement);

        const hrContainer = document.createElement('div');
        const hr = document.createElement('hr');
        hrContainer.appendChild(hr);
        playlistDisplay.appendChild(hrContainer);
    }
}

function playSong(index) {
    musicPlayer.pause();
    currentSongIndex = index;
    musicPlaying.innerHTML = `${playlist[currentSongIndex].title} | ${playlist[currentSongIndex].artist}`;
    musicImage.style.backgroundImage = `url(${playlist[currentSongIndex].image})`;
    musicPlayer.src = playlist[currentSongIndex].source;
    setPlaylistDisplay();
    musicPlayer.play();
}

musicPlayer.addEventListener('timeupdate', () => {
    const currentTime = musicPlayer.currentTime;
    const duration = musicPlayer.duration;
    timePercentage = (currentTime / duration) * 100;
    if (timePercentage != NaN) { progressBar.value = timePercentage }
});

volumeRange.addEventListener('input', () => {
    const volume = volumeRange.value / 100;
    musicPlayer.volume = volume;
});

volumeRange.addEventListener("wheel", function(e) {
    if (e.deltaY < 0) { volumeRange.valueAsNumber += 5 }
    else { volumeRange.valueAsNumber -= 5 }
    e.preventDefault();
    e.stopPropagation();
    const volume = volumeRange.value / 100;
    musicPlayer.volume = volume;
});

musicPlayer.addEventListener('ended', () => {
    nextSong();
});

// we won't actually autoplay because the user hasn't interacted
// so we're just using playSong(0) to set the song data!!
playSong(0); 
setPlaylistDisplay();