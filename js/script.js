// js/script.js

loadData();
renderSongList();
renderPlaylists();
toggleAuthButtons();

closeBtns.forEach(btn => {
    btn.onclick = () => {
        btn.closest('.modal').style.display = 'none';
    };
});

window.onclick = e => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
};
