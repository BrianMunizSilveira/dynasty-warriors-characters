import { characters } from './characters.js';

class CharacterManager {
    constructor() {
        this.currentKingdom = 'wei';
        this.favorites = new Set();
        this.isLoading = false;
        this.audio = {
            hover: new Audio('hover.mp3'),
            select: new Audio('select.mp3')
        };
        this.initEventListeners();
    }

    playSound(soundName) {
        try {
            const sound = this.audio[soundName];
            sound.currentTime = 0;
            sound.play();
        } catch (error) {
            console.warn('Audio playback failed:', error);
        }
    }

    createCharacterCard(char) {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <img class="character-image" src="${char.image}" alt="${char.name}" 
                 onerror="this.src='/api/placeholder/400/500'">
            <div class="character-info">
                <h3 class="character-name">${char.name}</h3>
                <p class="character-role">${char.role}</p>
                <div class="character-details">
                    <div class="detail">
                        <i class="fas fa-sword"></i> Weapon: ${char.weapon || 'Unknown'}
                    </div>
                    <div class="detail">
                        <i class="fas fa-calendar-alt"></i> Born: ${char.birthYear || 'Unknown'}
                    </div>
                    <div class="detail">
                        <i class="fas fa-skull"></i> Died: ${char.deathYear || 'Unknown'}
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

        // Favorite button logic
        const favoriteBtn = card.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', () => {
            this.toggleFavorite(char, favoriteBtn);
        });

        card.addEventListener('mouseenter', () => this.playSound('hover'));
        return card;
    }

    toggleFavorite(character, button) {
        if (this.favorites.has(character)) {
            this.favorites.delete(character);
            button.classList.remove('active');
        } else {
            this.favorites.add(character);
            button.classList.add('active');
        }
        // Optional: Persist favorites to localStorage
        this.saveFavorites();
    }

    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify([...this.favorites]));
    }

    loadFavorites() {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            this.favorites = new Set(JSON.parse(savedFavorites));
        }
    }

    updateCharacterGrid(kingdom) {
        const grid = document.getElementById('charactersGrid');
        grid.innerHTML = '';
        this.isLoading = true;

        // Show skeleton loading
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'character-card skeleton';
            grid.appendChild(skeleton);
        }

        // Simulate loading
        setTimeout(() => {
            grid.innerHTML = '';
            const chars = characters[kingdom] || [];
            chars.forEach(char => {
                grid.appendChild(this.createCharacterCard(char));
            });
            this.isLoading = false;
        }, 500);
    }

    initEventListeners() {
        // Kingdom selection
        document.querySelectorAll('.kingdom-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.kingdom-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentKingdom = e.target.dataset.kingdom;
                this.updateCharacterGrid(this.currentKingdom);
                this.playSound('select');
            });
        });

        // Theme toggler
        document.querySelector('[data-tooltip="Toggle Theme"]').addEventListener('click', () => {
            document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
        });
    }

    init() {
        this.loadFavorites();
        this.updateCharacterGrid('wei');
    }
}

// Initialize the application
const characterManager = new CharacterManager();
characterManager.init();