// Dados dos personagens
const characters = {
    wei: [
        {
            name: 'Cao Cao',
            role: 'Leader of Wei',
            weapon: 'Chaos Sword',
            image: 'https://kongming.net/dw6/i/artwork/caocao-600.jpg'
        },
        {
            name: 'Cao Pi',
            role: 'Cao Cao\'s Son',
            weapon: 'Twin Sabers',
            image: 'https://kongming.net/dw6/i/artwork/caopi-600.jpg'
        },
        {
            name: 'Cao Ren',
            role: 'Wei General',
            weapon: 'Shield and Sword',
            image: 'https://kongming.net/dw6/i/artwork/caoren-600.jpg'
        },
        {
            name: 'Dian Wei',
            role: 'Cao Cao\'s Bodyguard',
            weapon: 'Dual Axes',
            image: 'https://kongming.net/dw6/i/artwork/dianwei-600.jpg'
        },
        {
            name: 'Sima Yi',
            role: 'Strategist of Wei',
            weapon: 'Feather Fan',
            image: 'https://kongming.net/dw6/i/artwork/simayi-600.jpg'
        },
        {
            name: 'Xiahou Dun',
            role: 'Wei General',
            weapon: 'Podao',
            image: 'https://kongming.net/dw6/i/artwork/xiahoudun-600.jpg'
        },
        {
            name: 'Xiahou Yuan',
            role: 'Wei General',
            weapon: 'Thunder Bow',
            image: 'https://kongming.net/dw6/i/artwork/xiahouyuan-600.jpg'
        },
        {
            name: 'Xu Huang',
            role: 'Wei General',
            weapon: 'Battle Axe',
            image: 'https://kongming.net/dw6/i/artwork/xuhuang-600.jpg'
        },
        {
            name: 'Xu Zhu',
            role: 'Cao Cao\'s Personal Bodyguard',
            weapon: 'Great Club',
            image: 'https://kongming.net/dw6/i/artwork/xuzhu-600.jpg'
        },
        {
            name: 'Zhang He',
            role: 'Wei Elite General',
            weapon: 'Claws',
            image: 'https://kongming.net/dw6/i/artwork/zhanghe-600.jpg'
        },
        {
            name: 'Zhang Liao',
            role: 'Wei General',
            weapon: 'Halberd',
            image: 'https://kongming.net/dw6/i/artwork/zhangliao-600.jpg'
        },
        {
            name: 'Zhen Ji',
            role: 'Cao Pi\'s Wife',
            weapon: 'Flute',
            image: 'https://kongming.net/dw6/i/artwork/zhenji-600.jpg'
        }
    ],
    shu: [
        {
            name: 'Liu Bei',
            role: 'Leader of Shu',
            weapon: 'Twin Swords',
            image: 'https://kongming.net/dw6/i/artwork/liubei-600.jpg'
        },
        {
            name: 'Guan Yu',
            role: 'Shu General',
            weapon: 'Green Dragon Crescent Blade',
            image: 'https://kongming.net/dw6/i/artwork/guanyu-600.jpg'
        },
        {
            name: 'Zhang Fei',
            role: 'Shu General',
            weapon: 'Serpent Spear',
            image: 'https://kongming.net/dw6/i/artwork/zhangfei-600.jpg'
        },
        {
            name: 'Zhao Yun',
            role: 'Shu General',
            weapon: 'Dragon Spear',
            image: 'https://kongming.net/dw6/i/artwork/zhaoyun-600.jpg'
        },
        {
            name: 'Ma Chao',
            role: 'Shu General',
            weapon: 'Spear',
            image: 'https://kongming.net/dw6/i/artwork/machao-600.jpg'
        },
        {
            name: 'Huang Zhong',
            role: 'Shu General',
            weapon: 'Bow',
            image: 'https://kongming.net/dw6/i/artwork/huangzhong-600.jpg'
        },
        {
            name: 'Zhuge Liang',
            role: 'Principal Strategist',
            weapon: 'Feather Fan',
            image: 'https://kongming.net/dw6/i/artwork/zhugeliang-600.jpg'
        },
        {
            name: 'Pang Tong',
            role: 'Shu Strategist',
            weapon: 'Staff',
            image: 'https://kongming.net/dw6/i/artwork/pangtong-600.jpg'
        },
        {
            name: 'Wei Yan',
            role: 'Shu General',
            weapon: 'Double Voulge',
            image: 'https://kongming.net/dw6/i/artwork/weiyan-600.jpg'
        },
        {
            name: 'Yue Ying',
            role: 'Zhuge Liang\'s Wife',
            weapon: 'Crossbow',
            image: 'https://kongming.net/dw6/i/artwork/yueying-600.jpg'
        }
    ],
    wu: [
        {
            name: 'Sun Jian',
            role: 'Founder of Wu',
            weapon: 'Nine Rings Sword',
            image: ''
        },
        {
            name: 'Sun Ce',
            role: 'Leader of Wu',
            weapon: 'Tonfa',
            image: ''
        },
        {
            name: 'Sun Quan',
            role: 'Emperor of Wu',
            weapon: 'Flame Sword',
            image: ''
        }
    ],
    other: [
        {
            name: 'Lu Bu',
            role: 'Mighty Warrior',
            weapon: 'Sky Piercer',
            image: 'https://kongming.net/dw6/i/artwork/lubu-600.jpg'
        },
        {
            name: 'Dong Zhuo',
            role: 'Tyrant',
            weapon: 'Flame Blade',
            image: 'https://kongming.net/dw6/i/artwork/dongzhuo-600.jpg'
        },
        {
            name: 'Diao Chan',
            role: 'Dancer',
            weapon: 'Mace',
            image: 'https://kongming.net/dw6/i/artwork/diaochan-600.jpg'
        }
    ]
};

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