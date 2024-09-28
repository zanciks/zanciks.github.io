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
    { image: '../music/01/image.jpg', length: '1:43', title: 'Save the Cat (from The Bad Guys)', artist: 'Daniel Pemberton', source: '../music/01/source.mp3' },
    { image: '../music/02/image.jpg', length: '3:19', title: 'I\'ll Try Anything Once', artist: 'The Strokes', source: '../music/02/source.mp3' },
    { image: '../music/00/image.jpg', length: '0:00', title: 'SONG 004', artist: 'ARTIST 004', source: '../music/00/source.mp3' },
    { image: '../music/00/image.jpg', length: '0:00', title: 'SONG 005', artist: 'ARTIST 005', source: '../music/00/source.mp3' },
    { image: '../music/00/image.jpg', length: '0:00', title: 'SONG 006', artist: 'ARTIST 006', source: '../music/00/source.mp3' },
    { image: '../music/00/image.jpg', length: '0:00', title: 'SONG 007', artist: 'ARTIST 007', source: '../music/00/source.mp3' },
    { image: '../music/00/image.jpg', length: '0:00', title: 'SONG 008', artist: 'ARTIST 008', source: '../music/00/source.mp3' },
    { image: '../music/00/image.jpg', length: '0:00', title: 'SONG 009', artist: 'ARTIST 009', source: '../music/00/source.mp3' },
    { image: '../music/00/image.jpg', length: '0:00', title: 'SONG 010', artist: 'ARTIST 010', source: '../music/00/source.mp3' },
    { image: '../music/00/image.jpg', length: '0:00', title: 'SONG 011', artist: 'ARTIST 011', source: '../music/00/source.mp3' },
    { image: '../music/00/image.jpg', length: '0:00', title: 'SONG 012', artist: 'ARTIST 012', source: '../music/00/source.mp3' },
    { image: '../music/00/image.jpg', length: '0:00', title: 'SONG 013', artist: 'ARTIST 013', source: '../music/00/source.mp3' },
    { image: '../music/00/image.jpg', length: '0:00', title: 'SONG 014', artist: 'ARTIST 014', source: '../music/00/source.mp3' },
    { image: '../music/00/image.jpg', length: '0:00', title: 'SONG 015', artist: 'ARTIST 015', source: '../music/00/source.mp3' },
]

function togglePlay() {
	if (musicPlayer.paused) {
		musicPlayer.play();
        musicPlaying.innerHTML = `${playlist[currentSongIndex].title} <b>|</b> ${playlist[currentSongIndex].artist}`;
	} else {
		musicPlayer.pause();
        musicPlaying.innerHTML = `${playlist[currentSongIndex].title} <b>|</b> ${playlist[currentSongIndex].artist}`;
	}
}

function previousSong() {
    if (timePercentage > 5) {
        togglePlay();
        musicPlayer.currentTime = 0;
        togglePlay();
        return;
    }
    currentSongIndex--;
    if (currentSongIndex < 0) { currentSongIndex = playlist.length - 1 }
    musicImage.style.backgroundImage = `url(${playlist[currentSongIndex].image})`;
    musicPlayer.src = playlist[currentSongIndex].source;
    setPlaylistDisplay();
    togglePlay();
}

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= playlist.length) { currentSongIndex = 0 }
    musicImage.style.backgroundImage = `url(${playlist[currentSongIndex].image})`;
    musicPlayer.src = playlist[currentSongIndex].source;
    setPlaylistDisplay();
    togglePlay();
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
    togglePlay();
    currentSongIndex = index;
    musicImage.style.backgroundImage = `url(${playlist[currentSongIndex].image})`;
    musicPlayer.src = playlist[currentSongIndex].source;
    setPlaylistDisplay();
    togglePlay();
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

musicPlayer.addEventListener('ended', () => {
    nextSong();
});

playSong(0);
setPlaylistDisplay();