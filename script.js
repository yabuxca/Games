const apiKey = '689B101A8CE90542E3EBF07DBD46D786';
let gameIds = ['440', '570', '730'];

const exampleGame = {
  name: "TITEL",
  description: "Beschreibung hier",
  image: "EMPTY",
  link: "#"
};

async function getGameDetails(appId) {
  try {
    const url = `https://store.steampowered.com/api/appdetails?appids=${appId}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data[appId].success) {
      const game = data[appId].data;
      return {
        name: game.name,
        description: game.short_description,
        image: game.header_image,
        link: `https://store.steampowered.com/app/${appId}`
      };
    }
  } catch (err) {
    console.error('API Fehler:', err);
  }
  return null;
}

async function displayGames() {
  const container = document.getElementById('games');
  container.innerHTML = '';

  const exampleEl = document.createElement('div');
  exampleEl.classList.add('game-item');
  exampleEl.innerHTML = `
    <div style="background-color:#444; height: 180px; display: flex; align-items: center; justify-content: center;">
      <span>EMPTY</span>
    </div>
    <h2>${exampleGame.name}</h2>
    <p>${exampleGame.description}</p>
    <a href="${exampleGame.link}" class="play-link">Jetzt spielen</a>
  `;
  container.appendChild(exampleEl);

  for (const id of gameIds) {
    const game = await getGameDetails(id);
    if (game) {
      const el = document.createElement('div');
      el.className = 'game-item';
      el.innerHTML = `
        <img src="${game.image}" alt="${game.name}">
        <h2>${game.name}</h2>
        <p>${game.description}</p>
        <a href="${game.link}" class="play-link" target="_blank">Jetzt spielen</a>
      `;
      container.appendChild(el);
    }
  }
}

async function addGameByLink() {
  const input = document.getElementById('game-link').value.trim();
  const match = input.match(/\/app\/(\d+)/);
  if (match) {
    const appId = match[1];
    if (!gameIds.includes(appId)) {
      gameIds.push(appId);
      await displayGames();
    }
    document.getElementById('add-game-popup').style.display = 'none';
    document.getElementById('game-link').value = '';
  } else {
    alert('Ungültiger Steam-Link!');
  }
}

// Event-Handling
document.getElementById('add-game-btn').addEventListener('click', () => {
  document.getElementById('add-game-popup').style.display = 'flex';
});
document.getElementById('close-popup').addEventListener('click', () => {
  document.getElementById('add-game-popup').style.display = 'none';
});
document.getElementById('confirm-add').addEventListener('click', addGameByLink);

displayGames();
