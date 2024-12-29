document.querySelector('.search-bar').addEventListener('input', function(event) {
    const searchQuery = event.target.value.toLowerCase();
    const games = document.querySelectorAll('.game-card');

    games.forEach(game => {
        const title = game.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchQuery)) {
            game.style.display = 'block';
        } else {
            game.style.display = 'none';
        }
    });
});

// Função para calcular o tempo desde o lançamento
function calculateElapsedTime(releaseDate) {
    const release = new Date(releaseDate);
    const now = new Date();

    // Diferença em milissegundos
    const diffInMs = now - release;
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30.44);
    const years = Math.floor(months / 12);

    // Função para tratar singular e plural
    function pluralize(value, singular, plural) {
        return value === 1 ? `${value} ${singular}` : `${value} ${plural}`;
    }

    // Formatar o tempo decorrido
    if (years > 0) {
        return pluralize(years, 'ano', 'anos');
    } else if (months > 0) {
        return pluralize(months, 'mês', 'meses');
    } else {
        return pluralize(days, 'dia', 'dias');
    }
}

// Atualizar as datas no HTML
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.release-time').forEach(element => {
        const releaseDate = element.getAttribute('data-release');
        element.textContent = calculateElapsedTime(releaseDate) + " atrás";
    });
});

// Fogos
const canvas = document.getElementById('fogosCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function estourarFogos() {
    const particles = [];
    const colors = ['#FF5733', '#33FF57', '#5733FF', '#FFD700', '#FF69B4'];

    function createParticles(x, y) {
        for (let i = 0; i < 100; i++) {
            particles.push({
                x,
                y,
                dx: (Math.random() - 0.5) * 10,
                dy: (Math.random() - 0.5) * 10,
                radius: Math.random() * 2 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 100
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.closePath();

            particle.x += particle.dx;
            particle.y += particle.dy;
            particle.radius *= 0.98;
            particle.life -= 1;

            if (particle.life <= 0) {
                particles.splice(index, 1);
            }
        });
    }

    function animate() {
        drawParticles();
        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }

    // Criar vários fogos em intervalos
    const duration = 10000; // Duração total dos fogos em milissegundos
    const interval = 1000; // Intervalo entre cada explosão
    let elapsed = 0;

    const intervalId = setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;
        createParticles(x, y);
        animate();

        elapsed += interval;
        if (elapsed >= duration) {
            clearInterval(intervalId);
        }
    }, interval);
}

// Fogos

// Script para o botão de voltar ao topo
const scrollToTopButton = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Script para o botão de voltar ao topo



document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.menu').classList.toggle('show');
});
