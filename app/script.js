// SCRIPT PARA INTERACTIVIDAD DE LA PÁGINA PRINCIPAL

// 1. Seleccionamos todos los enlaces
const navLinks = document.querySelectorAll('.nav-link');

// Variable para bloquear el scroll spy mientras se hace un desplazamiento suave
let isScrolling = false;

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Solo si es un enlace interno (empieza con #)
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // BLOQUEAMOS el scroll spy momentáneamente
                isScrolling = true;

                // Cambiamos el estilo visual de inmediato
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // Desplazamiento suave
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });

                // Desbloqueamos el scroll spy después de que termine la animación (aprox 600ms)
                setTimeout(() => {
                    isScrolling = false;
                }, 800);
            }
        }
    });
});

// 2. Lógica de Scroll
window.addEventListener('scroll', () => {
    // Si estamos en medio de un click (desplazamiento suave), no hacemos nada
    if (isScrolling) return;

    let current = '';
    const sections = document.querySelectorAll('section');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150; // Margen de detección
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Botón "Haz tu Pedido"
const btnPedido = document.querySelector('.btn-pedido');

if (btnPedido) {
    btnPedido.addEventListener('click', () => {
        const pathActual = window.location.pathname;

        if (pathActual.includes('template/')) {
            window.location.href = 'pedido.html';
        } else {
            window.location.href = 'template/pedido.html';
        }
    });
}
const boton = document.getElementById('tuBoton');


// Botón "Ver el Menú"
document.querySelector('.btn-menu').addEventListener('click', () => {
    const menuSection = document.querySelector('../template/menu.html');
    menuSection.scrollIntoView({ behavior: 'smooth' });
});
// Animación de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.filosofia-item, .producto-card, .horario-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Función para abrir modal de contacto
function openContactModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="
            background-color: white;
            padding: 40px;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        ">
            <h2 style="margin-bottom: 20px; color: #2B2B2B; font-family: Georgia, serif;">Contáctanos</h2>
            <form onsubmit="handleContactForm(event)">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nombre</label>
                    <input type="text" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Email</label>
                    <input type="email" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Mensaje</label>
                    <textarea required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; min-height: 120px; font-family: inherit;"></textarea>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button type="submit" style="
                        flex: 1;
                        background-color: #D4A574;
                        color: white;
                        border: none;
                        padding: 12px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Enviar</button>
                    <button type="button" onclick="this.closest('div').parentElement.parentElement.remove()" style="
                        flex: 1;
                        background-color: #f0f0f0;
                        color: #333;
                        border: none;
                        padding: 12px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Cancelar</button>
                </div>
            </form>
        </div>
    `;
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    document.body.appendChild(modal);
}

function handleContactForm(event) {
    event.preventDefault();
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
    event.target.closest('div').parentElement.parentElement.remove();
}

// Event listeners para redes sociales
document.querySelectorAll('.footer-section.social a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Pronto estaremos disponibles en redes sociales. ¡Síguenos!');
    });
});

// Cargar animación al iniciar
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Efecto parallax en hero
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const scrollPosition = window.pageYOffset;
        heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// Función para cambiar tema (opcional)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Cargar tema guardado
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Inicializar
console.log('Pancraft - Panadería Artesanal cargada correctamente');
