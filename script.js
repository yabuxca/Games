const apiKey = 'DEIN_STEAM_API_KEY';  // Dein Steam API-Key hier einfügen
const gameIds = ['440', '570', '730']; // IDs von Spielen, die du abrufen möchtest (z.B. Team Fortress 2, Dota 2, CS:GO)

// Funktion, um die Spielinformationen von Steam zu bekommen
async function getGameDetails(appId) {
  const url = `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${appId}`;
  const response = await fetch(url);
  const data = await response.json();
  
  if (data && data.game) {
    const game = data.game;
    return {
      name: game.gameName,
      description: game.gameDescription,
      image: `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`,
      link: `https://store.steampowered.com/app/${appId}`,
    };
  } else {
    return null;
  }
}

// Dynamisch Spiele anzeigen
async function displayGames() {
  const gameListContainer = document.getElementById('games');
  
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

// Starte das Laden der Spiele
displayGames();
