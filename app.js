(function () {
    // Navigation and theme toggle
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        });
    });

    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    // Slideshow logic
    const images = ["img/me1.png", "img/me4.png"];
    let index = 0;
    let intervalId;
    let isPlaying = true;
    const duration = 5000;
    const imgElement = document.getElementById("slideshow");
    const toggleButton = document.getElementById("toggleSlideshow");
    const progressCircle = document.querySelector(".progress-ring__circle");

    const radius = 20;
    const circumference = 2 * Math.PI * radius;

    progressCircle.style.strokeDasharray = `${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;

    function setProgress(value) {
        const offset = circumference - (value * circumference);
        progressCircle.style.strokeDashoffset = offset;
    }

    function startProgressAnimation() {
        // Reset animation
        progressCircle.style.transition = 'none';
        setProgress(0);
        void progressCircle.offsetWidth; // Force reflow
        progressCircle.style.transition = `stroke-dashoffset ${duration}ms linear`;
        setProgress(1);
    }

    function startSlideshow() {
        startProgressAnimation();
        intervalId = setInterval(() => {
            index = (index + 1) % images.length;
            imgElement.src = images[index];
            startProgressAnimation();
        }, duration);
    }

    function stopSlideshow() {
        clearInterval(intervalId);
        progressCircle.style.transition = 'none';
        setProgress(0);
    }

    if (imgElement && toggleButton) {
        startSlideshow();

        toggleButton.addEventListener("click", () => {
            if (isPlaying) {
                stopSlideshow();
                toggleButton.textContent = "▶";
            } else {
                startSlideshow();
                toggleButton.textContent = "⏸";
            }
            isPlaying = !isPlaying;
        });
    }
})();
