// Array für die hinzugefügten Spiele
let games = [];

// Funktion zum Hinzufügen eines Spiels
function addGame() {
  const title = document.getElementById('game-title').value.trim();
  const image = document.getElementById('game-image').value.trim();
  const link = document.getElementById('game-link').value.trim();

  if (title && image && link) {
    const newGame = {
      title: title,
      image: image,
      link: link,
    };

    games.push(newGame);
    displayGames(); // Spiele neu laden
    closePopup(); // Popup schließen
  } else {
    alert('Bitte alle Felder ausfüllen!');
  }
}

// Funktion, um alle Spiele anzuzeigen
function displayGames() {
  const gamesContainer = document.getElementById('games');
  gamesContainer.innerHTML = '';

  games.forEach(game => {
    const gameItem = document.createElement('div');
    gameItem.classList.add('game-item');
    gameItem.innerHTML = `
      <img src="${game.image}" alt="${game.title}" />
      <h2>${game.title}</h2>
      <a href="${game.link}" target="_blank">Jetzt spielen</a>
    `;
    gamesContainer.appendChild(gameItem);
  });
}

// Popup öffnen
document.getElementById('add-game-btn').addEventListener('click', () => {
  document.getElementById('add-game-popup').style.display = 'flex';
});

// Popup schließen
document.getElementById('close-popup').addEventListener('click', closePopup);
document.getElementById('confirm-add').addEventListener('click', addGame);

function closePopup() {
  document.getElementById('add-game-popup').style.display = 'none';
  document.getElementById('game-title').value = '';
  document.getElementById('game-image').value = '';
  document.getElementById('game-link').value = '';
}

// Initiale Anzeige der Spiele (falls vorhanden)
displayGames();
