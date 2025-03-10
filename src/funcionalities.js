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
        particle.src ="src/assets/cannabis-leaf-svgrepo-com.svg";
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



document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los productos
    const productCards = document.querySelectorAll('.product-card');
    const productCarousel = document.querySelector('.product-carousel');
    
    // Eliminar los slides y estructura anterior
    const slides = document.querySelectorAll('.product-slide');
    slides.forEach(slide => slide.remove());
    
    // Eliminar controles antiguos
    const oldArrows = document.querySelectorAll('.carousel-arrow');
    const oldDots = document.querySelector('.carousel-nav');
    if (oldDots) oldDots.remove();
    oldArrows.forEach(arrow => arrow.remove());
    
    // Crear contenedor para el carrusel continuo
    const trackContainer = document.createElement('div');
    trackContainer.classList.add('products-track');
    productCarousel.appendChild(trackContainer);
    
    // Añadir todos los productos al track
    productCards.forEach(card => {
        trackContainer.appendChild(card);
    });
    
    // Clonar algunos productos para el efecto infinito
    // Clonamos los primeros productos para agregarlos al final
    for (let i = 0; i < Math.min(productCards.length, 6); i++) {
        const clone = productCards[i].cloneNode(true);
        trackContainer.appendChild(clone);
    }
    
    // Crear el control deslizante
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('slider-container');
    
    const sliderTrack = document.createElement('div');
    sliderTrack.classList.add('slider-track');
    
    const sliderThumb = document.createElement('div');
    sliderThumb.classList.add('slider-thumb');

    // Crear el elemento de imagen para la hoja de cannabis
    const leafIcon = document.createElement('img');
    leafIcon.src = "src/assets/cannabis-leaf-svgrepo-com.svg";
    leafIcon.alt = "Cannabis leaf";

    // Agregar la imagen al thumb
    sliderThumb.appendChild(leafIcon);

    sliderTrack.appendChild(sliderThumb);
    sliderContainer.appendChild(sliderTrack);
    productCarousel.appendChild(sliderContainer);
    
    // Variables de control
    let scrollPosition = 0;
    const scrollSpeed = 0.3; // Velocidad de desplazamiento en píxeles por frame
    let animationId = null;
    let isDragging = false;
    let lastTime = 0;
    
    // Calcular el ancho total del carrusel original
    const totalWidth = productCards.length * (productCards[0].offsetWidth + 30); // +30 por el gap
    
    // Obtener dimensiones del slider
    const sliderWidth = sliderTrack.offsetWidth;
    const thumbWidth = sliderThumb.offsetWidth;
    
    // Función para actualizar la posición del carrusel y el slider
    function updatePositions() {
        // Actualizar posición del carrusel
        trackContainer.style.transform = `translateX(${-scrollPosition}px)`;
        
        // Calcular y actualizar posición del thumb
        const normalizedPosition = (scrollPosition % totalWidth) / totalWidth;
        const thumbPosition = normalizedPosition * (sliderWidth - thumbWidth);
        sliderThumb.style.transform = `translateX(${thumbPosition}px)`;
    }
    
    // Función para manejar el desplazamiento continuo
    function scrollCarousel(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const elapsed = timestamp - lastTime;
        
        // Limitar la velocidad de actualización para suavizar el movimiento
        if (elapsed > 12) { // ~60fps
            scrollPosition += scrollSpeed * elapsed / 12;
            lastTime = timestamp;
            
            // Si llegamos al final del contenido original, volver al inicio sin transición
            if (scrollPosition >= totalWidth) {
                scrollPosition = 0;
                trackContainer.style.transition = 'none';
                updatePositions();
                // Forzar un reflow antes de restaurar la transición
                void trackContainer.offsetWidth;
                trackContainer.style.transition = 'transform 0.5s ease';
            } else {
                updatePositions();
            }
        }
        
        animationId = requestAnimationFrame(scrollCarousel);
    }
    
    // Establecer transición inicial
    trackContainer.style.transition = 'transform 0.5s ease';
    sliderThumb.style.transition = 'transform 0.1s ease';
    
    // Iniciar el carrusel automático
    animationId = requestAnimationFrame(scrollCarousel);
    
    // Controlar el carrusel con el slider (drag del thumb)
    let startX = 0;
    let currentX = 0;
    let thumbStartX = 0;
    
    sliderThumb.addEventListener('mousedown', startDrag);
    sliderThumb.addEventListener('touchstart', startDrag);
    
    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        
        // Cancelar la animación automática
        cancelAnimationFrame(animationId);
        
        // Guardar posición inicial
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        thumbStartX = parseInt(sliderThumb.style.transform.replace('translateX(', '').replace('px)', '') || 0);
        
        // Agregar event listeners para el movimiento
        document.addEventListener('mousemove', dragThumb);
        document.addEventListener('touchmove', dragThumb);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
    }
    
    function dragThumb(e) {
        if (!isDragging) return;
        
        currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const diff = currentX - startX;
        
        // Calcular nueva posición del thumb
        let newThumbPosition = thumbStartX + diff;
        
        // Limitar al rango del slider
        newThumbPosition = Math.max(0, Math.min(newThumbPosition, sliderWidth - thumbWidth));
        
        // Actualizar posición del thumb
        sliderThumb.style.transform = `translateX(${newThumbPosition}px)`;
        
        // Calcular y actualizar posición del carrusel
        const normalizedPosition = newThumbPosition / (sliderWidth - thumbWidth);
        scrollPosition = normalizedPosition * totalWidth;
        trackContainer.style.transform = `translateX(${-scrollPosition}px)`;
    }
    
    function stopDrag() {
        if (isDragging) {
            isDragging = false;
            
            // Remover event listeners
            document.removeEventListener('mousemove', dragThumb);
            document.removeEventListener('touchmove', dragThumb);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchend', stopDrag);
            
            // Reanudar animación automática
            lastTime = 0;
            animationId = requestAnimationFrame(scrollCarousel);
        }
    }
    
    // Clic en el track del slider
    sliderTrack.addEventListener('click', function(e) {
        // Ignorar si el clic fue en el thumb
        if (e.target === sliderThumb) return;
        
        // Calcular posición relativa del clic en el track
        const rect = sliderTrack.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        
        // Calcular nueva posición normalizada
        const normalizedPosition = Math.max(0, Math.min(clickX / sliderWidth, 1));
        
        // Actualizar posición del carrusel
        scrollPosition = normalizedPosition * totalWidth;
        
        // Actualizar posiciones
        updatePositions();
    });
    
    // Pausar al pasar el mouse
    productCarousel.addEventListener('mouseenter', function() {
        cancelAnimationFrame(animationId);
    });
    
    // Reanudar al quitar el mouse
    productCarousel.addEventListener('mouseleave', function() {
        if (!isDragging) {
            lastTime = 0;
            animationId = requestAnimationFrame(scrollCarousel);
        }
    });
    
    // Actualizar dimensiones en resize
    window.addEventListener('resize', function() {
        // Recalcular dimensiones
        const newTotalWidth = productCards.length * (productCards[0].offsetWidth + 30);
        const newSliderWidth = sliderTrack.offsetWidth;
        
        // Ajustar la posición proporcionalmente
        scrollPosition = (scrollPosition / totalWidth) * newTotalWidth;
        
        // Actualizar variables globales
        totalWidth = newTotalWidth;
        sliderWidth = newSliderWidth;
        
        // Actualizar posiciones
        updatePositions();
    });
});



