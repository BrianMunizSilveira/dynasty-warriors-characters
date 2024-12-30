import { characters} from './characters.js';

// Estado da aplicação
let currentKingdom = 'wei';
let favorites = new Set();
let isLoading = false;
const audio = {
    hover: new Audio('hover.mp3'),
    select: new Audio('select.mp3')
};

// Funções auxiliares
function playSound(soundName) {
    audio[soundName].currentTime = 0;
    audio[soundName].play().catch(() => { });
}

function createCharacterCard(char) {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = `
      <img class="character-image" src="${char.image}" alt="${char.name}" 
           onerror="this.src='/api/placeholder/400/500'">
      <div class="character-info">
        <h3 class="character-name">${char.name}</h3>
        <p class="character-role">${char.role}</p>
        <div class="character-stats">
          <div class="stat">
            <i class="fas fa-fist-raised"></i> Power: ${char.power}
          </div>
          <div class="stat">
            <i class="fas fa-brain"></i> Strategy: ${char.strategy}
          </div>
        </div>
      </div>
      <div class="action-buttons">
        <button class="action-btn favorite-btn" data-tooltip="Add to favorites">
          <i class="fas fa-heart"></i>
        </button>
        <button class="action-btn info-btn" data-tooltip="More info">
          <i class="fas fa-info"></i>
        </button>
      </div>
    `;

    // Event Listeners
    card.addEventListener('mouseenter', () => playSound('hover'));
    return card;
}

function updateCharacterGrid(kingdom) {
    const grid = document.getElementById('charactersGrid');
    grid.innerHTML = '';
    isLoading = true;

    // Mostrar skeleton loading
    for (let i = 0; i < 6; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'character-card skeleton';
        grid.appendChild(skeleton);
    }

    // Simular carregamento
    setTimeout(() => {
        grid.innerHTML = '';
        const chars = characters[kingdom] || [];
        chars.forEach(char => {
            grid.appendChild(createCharacterCard(char));
        });
        isLoading = false;
    }, 1000);
}

// Event Listeners
document.querySelectorAll('.kingdom-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.kingdom-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentKingdom = e.target.dataset.kingdom;
        updateCharacterGrid(currentKingdom);
        playSound('select');
    });
});

// Theme toggler
document.querySelector('[data-tooltip="Toggle Theme"]').addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
});

// Inicialização
updateCharacterGrid('wei');