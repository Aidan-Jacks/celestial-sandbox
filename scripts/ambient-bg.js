// Draw and animate the ambient star field behind the interface.
const canvas = document.querySelector("#stars");

// Pages without a star canvas should simply skip this effect.
if (canvas instanceof HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const starsToggle = document.querySelector("#ambient-stars");

    if (context) {
        // The settings checkbox only exists on the Settings page.
        if (starsToggle instanceof HTMLInputElement) {
            const updateStarsVisibility = () => {
                canvas.hidden = !starsToggle.checked;
            };

            starsToggle.addEventListener("change", updateStarsVisibility);
            updateStarsVisibility();
        }

        let width = 0;
        let height = 0;
        let stars = [];

        function resizeCanvas() {
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;

            canvas.width = Math.floor(width * pixelRatio);
            canvas.height = Math.floor(height * pixelRatio);
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

            const starCount = Math.min(220, Math.max(80, Math.floor((width * height) / 7000)));
            stars = Array.from({ length: starCount }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 3.3 + 0.4,
                phase: Math.random() * Math.PI * 2,
                speed: Math.random() * 2.5 + 0.5,
            }));
        }

        function drawStars(time = 0) {
            context.clearRect(0, 0, width, height);

            for (const star of stars) {
                const opacity = reduceMotion
                    ? 0.65
                    : 0.15 + (Math.sin(time * 0.001 * star.speed + star.phase) + 1) * 0.4;

                context.beginPath();
                context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                context.fillStyle = `rgba(150, 225, 255, ${opacity})`;
                context.fill();
            }

            if (!reduceMotion) window.requestAnimationFrame(drawStars);
        }

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        drawStars();
    }
}
