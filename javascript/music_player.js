const playlist = [
    {title: 'Clair de Lune - Claude Debussy', src: '../music/song 1.mp3'},
    {title: 'Merry Go Round of Life - Joe Hisaishi', src: '../music/song 2.mp3'},
    {title: 'Partita for Lute in C Minor, BWV 997, Prelude - J.S Bach', src: '../music/song 3.mp3'},
    {title: 'Save the Cat (from The Bad Guys) - Daniel Pemberton', src: '../music/song 4.mp3'},
    {title: 'Cloud Symphony - Shook', src: '../music/song 5.mp3'},
    {title: 'Nantes (instrumental) - Beirut', src: '../music/song 6.mp3'},
]

let currentSongIndex = 0;
const audioPlayer = document.getElementById('audio-player');
const progress = document.getElementById('progress-bar');
const volumeRange = document.getElementById('range');
const currentSong = document.getElementById('current-song');
const container = document.getElementById('song-container');

audioPlayer.addEventListener('ended', () => {
    currentSongIndex++;
    if (currentSongIndex >= playlist.length) {
        currentSongIndex = 0;
    }
    audioPlayer.src = playlist[currentSongIndex].src;
    audioPlayer.play();
    changeName(playlist[currentSongIndex].title);
})

function previous() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = playlist.length - 1;
    }
    audioPlayer.src = playlist[currentSongIndex].src;
    audioPlayer.play();
    changeName(playlist[currentSongIndex].title);
}

function next() {
	currentSongIndex++;
	if (currentSongIndex >= playlist.length) {
	  currentSongIndex = 0;
	}
	audioPlayer.src = playlist[currentSongIndex].src;
	audioPlayer.play();
    changeName(playlist[currentSongIndex].title);
}

function togglePlay() {
	if (audioPlayer.paused) {
		audioPlayer.play();
        changeName(playlist[currentSongIndex].title);
	} else {
		audioPlayer.pause();
        changeName("Paused. Click play to resume.");
	}
}

function updateTime(timePercentage) {
	const duration = audioPlayer.duration;
	const currentTime = (timePercentage / 100) * duration;
	audioPlayer.currentTime = currentTime;
}

audioPlayer.addEventListener('timeupdate', () => {
	const currentTime = audioPlayer.currentTime;
	const duration = audioPlayer.duration;
	const timePercentage = (currentTime / duration) * 100;
	progress.value = timePercentage;
});

function changeVolume(volume) {
	audioPlayer.volume = volume;
}

volumeRange.addEventListener('input', () => {
	const volume = volumeRange.value / 100;
	changeVolume(volume);
})

function changeName(newText) {
    container.classList.remove("marquee");
    currentSong.textContent = newText;


    if (newText.length >= 40) {
        container.classList.add("marquee");
    }
}

changeName("Paused. Press play to start.")
audioPlayer.src = playlist[currentSongIndex].src;