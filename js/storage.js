// js/storage.js

function saveSongsToStorage() {
    localStorage.setItem('songs', JSON.stringify(songs));
    songs.forEach(song => {
        if (song.audioUrl) localStorage.setItem(`audio_${song.id}`, song.audioUrl);
        if (song.coverUrl) localStorage.setItem(`cover_${song.id}`, song.coverUrl);
    });
}

function savePlaylistsToStorage() {
    localStorage.setItem('playlists', JSON.stringify(playlists));
}

function saveUserToStorage() {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}
