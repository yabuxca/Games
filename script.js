const apiKey = '689B101A8CE90542E3EBF07DBD46D786';  // Dein Steam API-Key
let gameIds = ['440', '570', '730']; // IDs von Spielen, die du abrufen möchtest (z.B. Team Fortress 2, Dota 2, CS:GO)

// Beispielspiel hinzufügen, das vor echten Spielen angezeigt wird
const exampleGame = {
  name: "TITEL",
  description: "Beschreibung hier",
  image: "EMPTY", // Platzhalter für das Bild
  link: "#"
};

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

  // Füge das Beispielspiel immer als erstes hinzu
  const exampleGameItem = document.createElement('article');
  exampleGameItem.classList.add('game-item');
  exampleGameItem.innerHTML = `
    <div class="game-image">${exampleGame.image}</div>
    <h2>${exampleGame.name}</h2>
    <p>${exampleGame.description}</p>
    <a href="${exampleGame.link}" class="play-link">Jetzt spielen</a>
  `;
  gameListContainer.appendChild(exampleGameItem);

  // Lade und zeige echte Spiele an
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

  if (match
