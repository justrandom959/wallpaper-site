document.addEventListener("DOMContentLoaded", function () {
    const uploadInput = document.getElementById("wallpaperUpload");
    const wallpaperGallery = document.getElementById("wallpaperGallery");

    // Load stored images on page load
    loadWallpapers();

    function loadWallpapers() {
        const storedWallpapers = JSON.parse(localStorage.getItem("wallpapers")) || [];
        storedWallpapers.forEach(imgSrc => {
            addWallpaperToGallery(imgSrc);
        });
    }

    function uploadWallpaper() {
        const file = uploadInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgSrc = e.target.result;
                addWallpaperToGallery(imgSrc);

                // Store image in local storage
                const storedWallpapers = JSON.parse(localStorage.getItem("wallpapers")) || [];
                storedWallpapers.push(imgSrc);
                localStorage.setItem("wallpapers", JSON.stringify(storedWallpapers));
            };
            reader.readAsDataURL(file);
        }
    }

    function addWallpaperToGallery(imgSrc) {
        const card = document.createElement("div");
        card.classList.add("wallpaper-card");

        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = "Uploaded Wallpaper";

        const link = document.createElement("a");
        link.href = imgSrc;
        link.download = "wallpaper.jpg";
        link.textContent = "Download";

        card.appendChild(img);
        card.appendChild(link);
        wallpaperGallery.appendChild(card);
    }
});