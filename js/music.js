// js/music.js

function renderSongList() {
    songList.innerHTML = '';
    if (songs.length === 0) {
        songList.innerHTML = '<div class="text-center py-10 text-gray-400">Chưa có bài hát nào. Hãy tải lên nhạc của bạn!</div>';
        return;
    }

    songs.forEach((song, index) => {
        const songDiv = document.createElement('div');
        songDiv.className = 'song-item flex items-center justify-between p-2 rounded transition cursor-pointer bg-gray-800 hover:bg-gray-700';
        songDiv.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${song.coverUrl}" alt="cover" class="w-12 h-12 rounded object-cover">
                <div>
                    <p class="text-white font-medium">${song.title}</p>
                    <p class="text-gray-400 text-sm">${song.artist}</p>
                </div>
            </div>
        `;
        songDiv.onclick = () => playSong(index);
        songList.appendChild(songDiv);
    });
}

function playSong(index) {
    const song = songs[index];
    if (!song) return;

    audio.src = song.audioUrl;
    audio.play();
    currentSongIndex = index;
    albumCover.innerHTML = `<img src="${song.coverUrl}" class="w-full h-full object-cover rounded-lg">`;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
});

audio.addEventListener('timeupdate', () => {
    const { duration, currentTime } = audio;
    const percent = (currentTime / duration) * 100;
    progress.style.width = percent + '%';
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
});

function formatTime(sec) {
    const min = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${min}:${seconds}`;
}

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});
