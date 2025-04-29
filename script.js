const apiKey = '689B101A8CE90542E3EBF07DBD46D786';  // Dein Steam API-Key
let gameIds = ['440', '570', '730']; // IDs von Spielen, die du abrufen möchtest (z.B. Team Fortress 2, Dota 2, CS:GO)

// Funktion, um die Spielinformationen von Steam zu bekommen
async function getGameDetails(appId) {
  const url = `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${appId}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    console.error('Fehler bei der Steam API Anfrage:', response.statusText);
    return null;
  }

  const data = await response.json();
  console.log('Daten von der Steam API:', data); // Hier wird die Antwort von der API geloggt

  if (data && data.game) {
    const game = data.game;
    return {
      name: game.gameName,
      description: game.gameDescription,
      image: `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`,
      link: `https://store.steampowered.com/app/${appId}`,
    };
  } else {
    console.error('Kein Spiel gefunden für App-ID:', appId);
    return null;
  }
}

// Dynamisch Spiele anzeigen
async function displayGames() {
  const gameListContainer = document.getElementById('games');
  
  gameListContainer.innerHTML = ''; // Leeren der Liste bevor neue Spiele geladen werden
  
  for (let gameId of gameIds) {
    const gameDetails = await getGameDetails(gameId);
    
    if (gameDetails) {
      const gameItem = document.createElement('article');
      gameItem.classList.add('game-item');
      gameItem.innerHTML = `
        <img src="${gameDetails.image}" alt="${gameDetails.name}" />
        <h2>${gameDetails.name}</h2>
        <p>${gameDetails.description}</p>
        <a href="${gameDetails.link}" class="play-link" target="_blank">Jetzt spielen</a>
      `;
      gameListContainer.appendChild(gameItem);
    }
  }
}

// Funktion zum Hinzufügen eines Spiels über den Steam-Link
async function addGameByLink() {
  const gameLink = document.getElementById('game-link').value.trim();
  console.log('Eingegebener Steam-Link:', gameLink); // Log für den eingegebenen Link

  const match = gameLink.match(/\/app\/(\d+)/); // Suche nach der Steam-App-ID im Link
  console.log('App-ID gefunden:', match); // Log für das extrahierte App-ID

  if (match) {
    const appId = match[1]; // Extrahiere die App-ID
    console.log('Verarbeitete App-ID:', appId); // Log für die verarbeitete App-ID
    
    const newGameDetails = await getGameDetails(appId);
    if (newGameDetails) {
      console.log('Neues Spiel hinzugefügt:', newGameDetails); // Log für das hinzugefügte Spiel
      gameIds.push(appId); // Neue App-ID zur Liste der Spiele hinzufügen
      displayGames(); // Spiele neu laden
      
      // Popup schließen
      document.getElementById('add-game-popup').style.display = 'none';
      document.getElementById('game-link').value = ''; // Eingabefeld leeren
    }
  } else {
    console.error('Ungültiger Steam-Link!'); // Fehler-Log für ungültigen Link
    alert('Ungültiger Steam-Link!');
  }
}

// Event-Listener für Button und Popup
document.getElementById('add-game-btn').addEventListener('click', () => {
  document.getElementById('add-game-popup').style.display = 'flex';
});

document.getElementById('close-popup').addEventListener('click', () => {
  document.getElementById('add-game-popup').style.display = 'none';
});

document.getElementById('confirm-add').addEventListener('click', addGameByLink);

// Spiele beim Laden der Seite anzeigen
displayGames();

