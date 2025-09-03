import { characters } from './characters.js';

class CharacterManager {
    constructor() {
        this.currentKingdom = 'wei';
        this.favorites = new Set();
        this.isLoading = false;
        this.searchTerm = '';
        this.audio = {
            hover: new Audio('hover.mp3'),
            select: new Audio('select.mp3')
        };
        this.initEventListeners();
        this.initAudioPlayer();
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

    // =============== AUDIO PLAYER FUNCTIONALITY ===============
    initAudioPlayer() {
        this.themeAudio = document.getElementById('themeAudio');
        this.playPauseBtn = document.querySelector('.play-pause-btn');
        this.progressBar = document.querySelector('.progress-bar');
        this.progressFill = document.querySelector('.progress-fill');
        this.timeDisplay = document.querySelector('.time-display');
        this.volumeBtn = document.querySelector('.volume-btn');
        this.volumeInput = document.querySelector('.volume-input');
        this.audioPlayer = document.querySelector('.audio-player');

        if (!this.themeAudio) {
            console.warn('Theme audio element not found');
            return;
        }

        this.setupAudioEventListeners();
        this.loadAudioSettings();
    }

    setupAudioEventListeners() {
        // Play/Pause button
        this.playPauseBtn.addEventListener('click', () => {
            this.togglePlayPause();
        });

        // Progress bar click
        this.progressBar.addEventListener('click', (e) => {
            const rect = this.progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            this.themeAudio.currentTime = percentage * this.themeAudio.duration;
        });

        // Volume control
        this.volumeInput.addEventListener('input', (e) => {
            const volume = parseFloat(e.target.value);
            this.setVolume(volume);
        });

        this.volumeBtn.addEventListener('click', () => {
            this.toggleMute();
        });

        // Audio element events
        this.themeAudio.addEventListener('loadstart', () => {
            this.audioPlayer.classList.add('loading');
        });

        this.themeAudio.addEventListener('canplay', () => {
            this.audioPlayer.classList.remove('loading');
        });

        this.themeAudio.addEventListener('timeupdate', () => {
            this.updateProgress();
        });

        this.themeAudio.addEventListener('loadedmetadata', () => {
            this.updateTimeDisplay();
        });

        this.themeAudio.addEventListener('ended', () => {
            this.playPauseBtn.classList.remove('playing');
            this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });

        this.themeAudio.addEventListener('error', (e) => {
            console.warn('Audio loading error:', e);
            this.audioPlayer.style.opacity = '0.5';
        });
    }

    togglePlayPause() {
        if (this.themeAudio.paused) {
            this.themeAudio.play().then(() => {
                this.playPauseBtn.classList.add('playing');
                this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                this.saveAudioSettings();
            }).catch(error => {
                console.warn('Play failed:', error);
            });
        } else {
            this.themeAudio.pause();
            this.playPauseBtn.classList.remove('playing');
            this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            this.saveAudioSettings();
        }
    }

    setVolume(volume) {
        this.themeAudio.volume = Math.max(0, Math.min(1, volume));
        this.volumeInput.value = this.themeAudio.volume;
        this.updateVolumeIcon();
        this.saveAudioSettings();
    }

    toggleMute() {
        if (this.themeAudio.volume > 0) {
            this.previousVolume = this.themeAudio.volume;
            this.setVolume(0);
        } else {
            this.setVolume(this.previousVolume || 0.7);
        }
    }

    updateVolumeIcon() {
        const volume = this.themeAudio.volume;
        const volumeIcon = this.volumeBtn.querySelector('i');
        
        this.volumeBtn.classList.remove('muted', 'low', 'high');
        
        if (volume === 0) {
            this.volumeBtn.classList.add('muted');
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (volume < 0.5) {
            this.volumeBtn.classList.add('low');
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            this.volumeBtn.classList.add('high');
            volumeIcon.className = 'fas fa-volume-up';
        }
    }

    updateProgress() {
        if (this.themeAudio.duration) {
            const percentage = (this.themeAudio.currentTime / this.themeAudio.duration) * 100;
            this.progressFill.style.width = `${percentage}%`;
            this.updateTimeDisplay();
        }
    }

    updateTimeDisplay() {
        const current = this.formatTime(this.themeAudio.currentTime || 0);
        const duration = this.formatTime(this.themeAudio.duration || 0);
        this.timeDisplay.textContent = `${current} / ${duration}`;
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    saveAudioSettings() {
        const settings = {
            volume: this.themeAudio.volume,
            isPlaying: !this.themeAudio.paused,
            currentTime: this.themeAudio.currentTime
        };
        localStorage.setItem('dw6-audio-settings', JSON.stringify(settings));
    }

    loadAudioSettings() {
        try {
            const settings = JSON.parse(localStorage.getItem('dw6-audio-settings') || '{}');
            
            // Set volume
            if (settings.volume !== undefined) {
                this.setVolume(settings.volume);
            } else {
                this.setVolume(0.7); // Default volume
            }
            
            // Auto-play if it was playing before (respecting browser policies)
            if (settings.isPlaying && settings.currentTime !== undefined) {
                this.themeAudio.currentTime = settings.currentTime;
                // Note: Auto-play might be blocked by browser policies
                this.themeAudio.play().then(() => {
                    this.playPauseBtn.classList.add('playing');
                    this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                }).catch(() => {
                    // Auto-play blocked, that's fine
                });
            }
        } catch (error) {
            console.warn('Failed to load audio settings:', error);
            this.setVolume(0.7);
        }
    }

    // =============== CHARACTER FUNCTIONALITY (unchanged) ===============
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

        const favoriteBtn = card.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', () => {
            this.toggleFavorite(char, favoriteBtn);
        });

        if (this.favorites.has(char.name)) {
            favoriteBtn.classList.add('active');
        }

        card.addEventListener('mouseenter', () => this.playSound('hover'));
        return card;
    }

    toggleFavorite(character, button) {
        if (this.favorites.has(character.name)) {
            this.favorites.delete(character.name);
            button.classList.remove('active');
        } else {
            this.favorites.add(character.name);
            button.classList.add('active');
        }
        this.saveFavorites();
    }

    saveFavorites() {
        localStorage.setItem('dw6-favorites', JSON.stringify([...this.favorites]));
    }

    loadFavorites() {
        try {
            const savedFavorites = localStorage.getItem('dw6-favorites');
            if (savedFavorites) {
                this.favorites = new Set(JSON.parse(savedFavorites));
            }
        } catch (error) {
            console.warn('Failed to load favorites:', error);
            this.favorites = new Set();
        }
    }

    filterCharactersBySearch(chars) {
        if (!this.searchTerm) {
            return chars;
        }
        
        return chars.filter(char => 
            char.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            char.role.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            (char.weapon && char.weapon.toLowerCase().includes(this.searchTerm.toLowerCase()))
        );
    }

    searchAllKingdoms() {
        const allCharacters = [];
        
        Object.keys(characters).forEach(kingdom => {
            characters[kingdom].forEach(char => {
                allCharacters.push({
                    ...char,
                    kingdom: kingdom
                });
            });
        });

        return this.filterCharactersBySearch(allCharacters);
    }

    updateCharacterGrid(kingdom = null) {
        const grid = document.getElementById('charactersGrid');
        grid.innerHTML = '';
        this.isLoading = true;

        // Show skeleton loading
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'character-card skeleton';
            grid.appendChild(skeleton);
        }

        setTimeout(() => {
            grid.innerHTML = '';
            
            let charsToShow = [];
            
            if (this.searchTerm) {
                charsToShow = this.searchAllKingdoms();
                
                if (charsToShow.length === 0) {
                    const noResults = document.createElement('div');
                    noResults.className = 'no-results';
                    noResults.innerHTML = `
                        <i class="fas fa-search"></i>
                        <p>Nenhum personagem encontrado para "${this.searchTerm}"</p>
                        <small>Tente buscar por nome, função ou arma</small>
                    `;
                    grid.appendChild(noResults);
                    this.isLoading = false;
                    return;
                }
            } else {
                const targetKingdom = kingdom || this.currentKingdom;
                charsToShow = characters[targetKingdom] || [];
            }

            charsToShow.forEach(char => {
                grid.appendChild(this.createCharacterCard(char));
            });
            
            this.isLoading = false;
        }, 300);
    }

    handleSearch(searchValue) {
        this.searchTerm = searchValue.trim();
        
        const kingdomButtons = document.querySelectorAll('.kingdom-btn');
        if (this.searchTerm) {
            kingdomButtons.forEach(btn => btn.classList.remove('active'));
        } else {
            kingdomButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[data-kingdom="${this.currentKingdom}"]`).classList.add('active');
        }
        
        this.updateCharacterGrid();
    }

    initEventListeners() {
        // Kingdom selection
        document.querySelectorAll('.kingdom-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const searchInput = document.querySelector('.search-bar input');
                searchInput.value = '';
                this.searchTerm = '';
                
                document.querySelectorAll('.kingdom-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentKingdom = e.target.dataset.kingdom;
                this.updateCharacterGrid(this.currentKingdom);
                this.playSound('select');
            });
        });

        // Search functionality
        const searchInput = document.querySelector('.search-bar input');
        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.handleSearch(e.target.value);
            }, 300);
        });

        // Theme toggler
        const themeToggler = document.querySelector('[data-tooltip="Toggle Theme"]');
        if (themeToggler) {
            themeToggler.addEventListener('click', () => {
                const currentTheme = document.body.dataset.theme;
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                document.body.dataset.theme = newTheme;
                localStorage.setItem('dw6-theme', newTheme);
            });
        }

        // Favorites button
        const favoritesBtn = document.querySelector('[data-tooltip="Favorites"]');
        if (favoritesBtn) {
            favoritesBtn.addEventListener('click', () => {
                console.log('Favorites clicked - functionality to be implemented');
            });
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('dw6-theme');
        if (savedTheme) {
            document.body.dataset.theme = savedTheme;
        }
    }

    init() {
        this.loadTheme();
        this.loadFavorites();
        this.updateCharacterGrid('wei');
    }
}

// Initialize the application
const characterManager = new CharacterManager();
characterManager.init();