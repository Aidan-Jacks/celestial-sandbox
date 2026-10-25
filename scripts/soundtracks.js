// Background music controls for pages that include the music setting.
const musicToggle = document.querySelector("#ambient-music");

// Yonatan Riklis, "Far Away Galaxies" (licensed via Artlist).
const soundtrack = new Audio("/sounds/Yonatan Riklis - Far Away Galaxies.mp3");
soundtrack.loop = true;

if (musicToggle instanceof HTMLInputElement) {
    function updateMusicPlayback() {
        if (musicToggle.checked) {
            soundtrack.play().catch((error) => {
                // Browsers may block playback until the user interacts with the page.
                console.info("Background music could not start yet:", error);
            });
        } else {
            soundtrack.pause();
        }
    }

    musicToggle.addEventListener("change", updateMusicPlayback);
    updateMusicPlayback();
}
