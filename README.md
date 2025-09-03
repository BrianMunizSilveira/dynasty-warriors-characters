# 🏮 DW6 - Three Kingdoms Character Gallery

Um site interativo que exibe os personagens icônicos do jogo **Dynasty Warriors 6**, organizado por reino com funcionalidades modernas de busca e reprodução de áudio temático.

![Dynasty Warriors 6](https://img.shields.io/badge/Dynasty_Warriors-6-red?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🌟 Funcionalidades

### 🎮 Personagens
- **35+ personagens** dos três reinos e outros
- **Informações detalhadas**: nome, função, arma, datas de nascimento e morte
- **Imagens de alta qualidade** de cada personagem
- **Organização por reino**: Wei (魏), Shu (蜀), Wu (吳) e Outros

### 🔍 Sistema de Busca
- **Busca em tempo real** com debounce
- **Busca multiplataforma**: nome, função e arma
- **Busca global** em todos os reinos simultaneamente
- **Feedback visual** quando nenhum resultado é encontrado

### 🎵 Player de Áudio Temático
- **Música tema** do Dynasty Warriors 6
- **Controles completos**: play/pause, volume, progresso
- **Barra de progresso interativa** (clique para pular)
- **Persistência de configurações** (volume, posição, estado)
- **Loop automático** da trilha sonora

### ⭐ Sistema de Favoritos
- **Adicionar/remover** personagens favoritos
- **Persistência local** dos favoritos
- **Interface intuitiva** com feedback visual

### 🎨 Interface Moderna
- **Design responsivo** para todos os dispositivos
- **Tema claro/escuro** alternável
- **Glass morphism** no player de áudio
- **Animações suaves** e micro-interações
- **Skeleton loading** durante carregamentos

## 🏗️ Estrutura do Projeto

```
dw6-three-kingdoms/
├── src/
│   ├── js/
│   │   ├── main.js          # Lógica principal da aplicação
│   │   └── characters.js    # Base de dados dos personagens
│   ├── styles/
│   │   ├── main.css         # Estilos principais
│   │   ├── reset.css        # Reset CSS
│   │   └── responsive.css   # Media queries
│   ├── images/
│   │   ├── characters/      # Imagens dos personagens
│   │   ├── DW-Wei.webp     # Símbolos dos reinos
│   │   ├── DW-Shu.webp
│   │   ├── DW-Wu.webp
│   │   ├── DW-Other.webp
│   │   └── favicon.ico
│   └── audio/
│       ├── dw6-theme.mp3    # Tema principal (adicionar)
│       └── dw6-theme.ogg    # Formato alternativo
├── index.html
└── README.md
```

## 🚀 Como Usar

### 1. **Clone o Repositório**
```bash
git clone https://github.com/seu-usuario/dw6-three-kingdoms.git
cd dw6-three-kingdoms
```

### 2. **Adicione o Arquivo de Áudio**
- Coloque o arquivo `dw6-theme.mp3` em `./src/audio/`
- Opcionalmente, adicione `dw6-theme.ogg` para melhor compatibilidade

### 3. **Sirva os Arquivos**
```bash
# Com Python (recomendado para desenvolvimento local)
python -m http.server 8000

# Com Node.js
npx serve .

# Com PHP
php -S localhost:8000
```

### 4. **Acesse no Navegador**
```
http://localhost:8000
```

## 🎯 Navegação

### **Seleção de Reino**
- **Wei (魏)**: Reino azul - Cao Cao e seus generais
- **Shu (蜀)**: Reino verde - Liu Bei e os irmãos jurados
- **Wu (吳)**: Reino vermelho - Família Sun e comandantes
- **Outros**: Personagens independentes como Lu Bu

### **Busca de Personagens**
1. Digite no campo de busca no header
2. Busque por nome (ex: "Cao Cao")
3. Busque por função (ex: "Strategist")
4. Busque por arma (ex: "Sword")

### **Player de Áudio**
- **▶️/⏸️**: Play/Pause da música tema
- **🔊**: Controle de volume (hover para mostrar)
- **📊**: Barra de progresso clicável
- **🔄**: Loop automático ativado

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com Grid/Flexbox
- **Vanilla JavaScript**: ES6+ com modules
- **Font Awesome**: Ícones
- **LocalStorage**: Persistência de dados

## 📱 Compatibilidade

- ✅ **Desktop**: Chrome, Firefox, Safari, Edge
- ✅ **Mobile**: iOS Safari, Android Chrome
- ✅ **Tablet**: iPad, Android tablets
- ⚠️ **Nota**: Reprodução automática pode ser bloqueada por políticas do navegador

## 🎨 Recursos de Design

### **Paleta de Cores**
- **Wei**: `#3B82F6` (Azul)
- **Shu**: `#10B981` (Verde)
- **Wu**: `#EF4444` (Vermelho)
- **Neutro**: `#6B7280` (Cinza)

### **Tipografia**
- **Títulos**: Fonte system stack otimizada
- **Corpo**: Sans-serif responsiva
- **Tamanhos**: Escala harmônica para legibilidade

### **Animações**
- **Hover effects**: Transformações suaves
- **Loading**: Skeleton screens
- **Transições**: 300ms ease timing

## 📊 Dados dos Personagens

Cada personagem inclui:
- **Nome**: Nome completo do personagem
- **Função**: Posição/título no reino
- **Arma**: Arma característica
- **Nascimento**: Ano de nascimento
- **Morte**: Ano de morte
- **Imagem**: Avatar em alta resolução

## 🔄 Futuras Melhorias

- [ ] **Modal de detalhes** com biografia completa
- [ ] **Comparação** entre personagens
- [ ] **Filtros avançados** (por período, tipo de arma)
- [ ] **Galeria de imagens** expandida

## 📝 Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'feat: Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

## 🙏 Agradecimentos

- **Koei Tecmo**: Pelos personagens icônicos de Dynasty Warriors
- **Font Awesome**: Pelos ícones utilizados
- **Comunidade DW**: Por manter viva a paixão pelo jogo
- **Khinsider**: Por disponibilizar os áudios inclusive o que foi utilizado no projeto: 
https://downloads.khinsider.com/game-soundtracks/album/shin-sangokumusou-5-dynasty-warriors-6-ost?theme=dark

## 📞 Contato

- **GitHub**: [@BrianMunizSilveira](https://github.com/BrianMunizSilveira)
- **Email**: brian.muniz.silveira@gmail.com
- **Site**: [dw6threekingdoms.vercel.app](https://dw6threekingdoms.vercel.app)

---

<div align="center">
  <img src="./src/images/favicon.ico" alt="DW6 Icon" width="32">
  <p><strong>Feito com ❤️ para os fãs de Dynasty Warriors</strong></p>
</div>