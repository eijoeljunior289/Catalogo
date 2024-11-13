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
