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
