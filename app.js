const availableSongs = [
    { name: "Lovely Night", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { name: "Serene Beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { name: "Ocean Waves", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_01_-_Rain.mp3" },
    { name: "Misty Rain", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Komiku_-_07_-_Battlefield_Hero.mp3" }
];

const songSelectionList = document.querySelector(".song-list");
const playlistDropdown = document.querySelector(".playlist-dropdown");
const clearPlaylistButton = document.querySelector(".clear-playlist");
const audioPlayer = document.querySelector(".audio-player");
const currentSongText = document.querySelector(".current-song");
const popup = document.querySelector(".popup");

let playlist = []; // Array to store selected songs

// Load Available Songs with Play and Add Buttons
function loadAvailableSongs() {
    songSelectionList.innerHTML = ""; // Clear existing list

    availableSongs.forEach((song) => {
        const listItem = document.createElement("li");
        listItem.classList.add("song-item");
        listItem.textContent = song.name;

        // Play Button
        const playBtn = document.createElement("button");
        playBtn.textContent = "▶ Play";
        playBtn.classList.add("play-btn");
        playBtn.addEventListener("click", () => {
            playSong(song.name, song.url);
        });

        // Add Button
        const addBtn = document.createElement("button");
        addBtn.textContent = "Add";
        addBtn.classList.add("add-btn");
        addBtn.addEventListener("click", () => {
            addSongToPlaylist(song.name, song.url);
        });

        listItem.appendChild(playBtn);
        listItem.appendChild(addBtn);
        songSelectionList.appendChild(listItem);
    });
}

// Play a Song
function playSong(name, url) {
    audioPlayer.src = url;
    audioPlayer.play();
    currentSongText.textContent = `Now Playing: ${name}`;
}

// Add Song to Playlist
function addSongToPlaylist(name, url) {
    const isAlreadyAdded = playlist.some(song => song.name === name);
    if (!isAlreadyAdded) {
        playlist.push({ name, url });
        updatePlaylistDropdown();
        showPopup(`${name} added to playlist!`);
    }
}

// Update Playlist Dropdown
function updatePlaylistDropdown() {
    playlistDropdown.innerHTML = "";
    playlist.forEach(song => {
        const option = document.createElement("option");
        option.value = song.url;
        option.textContent = song.name;
        playlistDropdown.appendChild(option);
    });
}

// Clear Playlist
clearPlaylistButton.addEventListener("click", () => {
    playlist = [];
    playlistDropdown.innerHTML = "";
    showPopup("Playlist cleared!");
});

// Play selected song from playlist
playlistDropdown.addEventListener("change", (event) => {
    const selectedSongUrl = event.target.value;
    const selectedSongName = playlist.find(song => song.url === selectedSongUrl)?.name;
    if (selectedSongUrl) {
        playSong(selectedSongName, selectedSongUrl);
    }
});

// Show Popup Notification
function showPopup(message) {
    popup.textContent = message;
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);
}

// Load Songs Initially
loadAvailableSongs();
