// js/playlist.js

newPlaylistBtn.addEventListener('click', () => {
    playlistModal.style.display = 'block';
});

document.getElementById('playlistForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('playlistName').value.trim();
    if (name) {
        playlists.push({ name, songs: [] });
        savePlaylistsToStorage();
        renderPlaylists();
        playlistModal.style.display = 'none';
    }
});

function renderPlaylists() {
    playlistContainer.innerHTML = '';
    playlists.forEach((pl, idx) => {
        const div = document.createElement('div');
        div.className = 'bg-gray-800 rounded p-3 text-white cursor-pointer hover:bg-gray-700';
        div.textContent = pl.name;
        playlistContainer.appendChild(div);
    });
}
