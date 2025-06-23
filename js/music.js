const audio = new Audio();
let currentSongIndex = -1;

function renderSongList() {
    const songList = document.getElementById("songList");
    songList.innerHTML = "";

    if (songs.length === 0) {
        songList.innerHTML = `<div class="text-center py-10 text-gray-400">Chưa có bài hát nào. Hãy tải lên nhạc của bạn!</div>`;
        return;
    }

    songs.forEach((song, index) => {
        const item = document.createElement("div");
        item.className = "song-item bg-gray-800 p-3 rounded cursor-pointer flex items-center justify-between";
        item.innerHTML = `
            <div>
                <div class="font-semibold">${song.title}</div>
                <div class="text-sm text-gray-400">${song.artist}</div>
            </div>
            <button class="text-gray-400 hover:text-red-400" onclick="deleteSong(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        item.addEventListener("click", () => playSong(index));
        songList.appendChild(item);
    });
}

function playSong(index) {
    const song = songs[index];
    if (!song || !song.audioUrl) return;

    currentSongIndex = index;
    audio.src = song.audioUrl;
    audio.play();

    // Cập nhật UI
    document.getElementById("songTitle").textContent = song.title;
    document.getElementById("songArtist").textContent = song.artist;

    const albumCover = document.getElementById("albumCover");
    if (song.coverUrl) {
        albumCover.innerHTML = `<img src="${song.coverUrl}" class="w-full h-full object-cover rounded-lg">`;
    } else {
        albumCover.innerHTML = `<i class="fas fa-music text-6xl text-gray-600"></i>`;
    }
}

function deleteSong(index) {
    songs.splice(index, 1);
    saveSongs();
    renderSongList();
}

function saveSongs() {
    localStorage.setItem("songs", JSON.stringify(songs));
}

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("songTitleInput").value;
    const artist = document.getElementById("songArtistInput").value;
    const audioFile = document.getElementById("audioFile").files[0];
    const coverFile = document.getElementById("coverFile").files[0];

    if (!title || !artist || !audioFile) {
        alert("Vui lòng điền đầy đủ thông tin và chọn file nhạc!");
        return;
    }

    const audioBase64 = await toBase64(audioFile);
    let coverBase64 = "";
    if (coverFile) coverBase64 = await toBase64(coverFile);

    songs.push({
        title,
        artist,
        audioUrl: audioBase64,
        coverUrl: coverBase64
    });

    saveSongs();
    renderSongList();
    document.getElementById("uploadModal").style.display = "none";
    e.target.reset();
});

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

audio.addEventListener("timeupdate", () => {
    const progress = document.getElementById("progress");
    const current = document.getElementById("currentTime");
    const duration = document.getElementById("duration");

    if (!audio.duration) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";
    current.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
});

function formatTime(time) {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
