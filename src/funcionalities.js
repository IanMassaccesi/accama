document.addEventListener("DOMContentLoaded", function () {
    const numParticles = 24; // Cantidad de partículas
    const hero = document.querySelector(".mainhero"); // Seleccionamos el hero
    if (!hero) return;

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = 0;
    container.style.left = 0;
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.overflow = "hidden";
    container.style.pointerEvents = "none";
    hero.appendChild(container);

    function createParticle() {
        const particle = document.createElement("img");
        particle.src ="src/assets/cannabis-leaf-svgrepo-com.svg"; // Ruta de la imagen SVG
        particle.style.position = "absolute";
        particle.style.width = "30px";
        particle.style.height = "30px";
        particle.style.opacity = Math.random() * 0.8 + 0.2;
        particle.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        const heroRect = hero.getBoundingClientRect();
        const startX = Math.random() * heroRect.width;
        const startY = Math.random() * heroRect.height;
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;

        container.appendChild(particle);
        animateParticle(particle);
    }

    function animateParticle(particle) {
        const speedX = (Math.random() - 0.5) * 0.5;
        const speedY = (Math.random() - 0.5) * 0.5;
        function move() {
            let x = parseFloat(particle.style.left);
            let y = parseFloat(particle.style.top);
            x += speedX;
            y += speedY;
            
            if (x < 0) x = hero.clientWidth;
            if (x > hero.clientWidth) x = 0;
            if (y < 0) y = hero.clientHeight;
            if (y > hero.clientHeight) y = 0;
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            requestAnimationFrame(move);
        }
        move();
    }

    for (let i = 0; i < numParticles; i++) {
        createParticle();
    }

    document.addEventListener("mousemove", function (e) {
        document.querySelectorAll(".hero img").forEach((particle) => {
            const dx = e.clientX - parseFloat(particle.style.left);
            const dy = e.clientY - parseFloat(particle.style.top);
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                particle.style.transform = `translate(${dx * 0.1}px, ${dy * 0.1}px)`;
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
});



document.addEventListener("scroll", function () {
    const logoContainer = document.getElementById("h1");
    const logodesplazado = document.getElementById("logoimg");
    if (window.scrollY > 30 && window.scrollY < 1600) { 
        logoContainer.classList.add("scrolled");
        logodesplazado.classList.add("des")
        logoContainer.classList.remove("appear"); // Remueve la animación de vuelta
    } else {
        logoContainer.classList.remove("scrolled");
        logodesplazado.classList.remove("des")
        logoContainer.classList.add("appear"); // Remueve la animación de vuelta
    }
});

