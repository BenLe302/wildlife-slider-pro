# Wildlife Slider Pro 🦁

Une application React moderne et interactive pour explorer la faune sauvage mondiale avec des fonctionnalités avancées de visualisation, de recherche et de conservation.

## 🌟 Fonctionnalités

### 🎯 Fonctionnalités Principales
- **Galerie Interactive** : Explorez une vaste collection d'animaux avec des cartes détaillées
- **Slider Dynamique** : Présentation immersive avec animations fluides
- **Recherche Avancée** : Recherche intelligente avec suggestions et filtres
- **Système de Favoris** : Sauvegardez vos animaux préférés
- **Détails Complets** : Informations détaillées sur chaque espèce
- **Statistiques** : Visualisation des données de conservation
- **Thème Sombre/Clair** : Interface adaptable selon vos préférences

### 🔍 Fonctionnalités de Recherche
- Recherche par nom, catégorie, habitat
- Suggestions automatiques
- Historique des recherches
- Filtres par statut de conservation
- Tri personnalisable

### 🎨 Interface Utilisateur
- Design moderne et responsive
- Animations fluides avec Framer Motion
- Navigation intuitive
- Composants réutilisables
- Accessibilité optimisée

### 📊 Données et Conservation
- Informations sur le statut de conservation
- Statistiques détaillées
- Efforts de conservation
- Sensibilisation environnementale

## 🚀 Technologies Utilisées

### Frontend
- **React 19** - Framework JavaScript moderne
- **TypeScript** - Typage statique pour plus de robustesse
- **Styled Components** - CSS-in-JS pour un styling modulaire
- **Framer Motion** - Animations et transitions fluides
- **React Router** - Navigation côté client

### Outils de Développement
- **React Hook Form** - Gestion des formulaires
- **React Query** - Gestion d'état et cache
- **Lucide React** - Icônes modernes
- **Swiper** - Carrousels et sliders
- **React Hot Toast** - Notifications

### Qualité du Code
- **ESLint** - Linting du code
- **Prettier** - Formatage automatique
- **TypeScript** - Vérification de types
- **Testing Library** - Tests unitaires

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── ErrorBoundary/   # Gestion d'erreurs
│   ├── FavoriteButton/  # Bouton de favoris
│   ├── Footer/          # Pied de page
│   ├── LoadingSpinner/  # Indicateurs de chargement
│   ├── Navigation/      # Barre de navigation
│   ├── SearchBar/       # Barre de recherche
│   ├── ThemeToggle/     # Basculeur de thème
│   └── WildlifeSlider/  # Slider principal
├── context/             # Contextes React
│   └── AppContext.tsx   # État global de l'application
├── data/                # Données statiques
│   └── animals.ts       # Base de données des animaux
├── hooks/               # Hooks personnalisés
│   └── useLocalStorage.ts # Gestion du localStorage
├── pages/               # Pages de l'application
│   ├── About/           # À propos
│   ├── AnimalDetail/    # Détails d'un animal
│   ├── Conservation/    # Conservation
│   ├── Contact/         # Contact
│   ├── Favorites/       # Favoris
│   ├── Gallery/         # Galerie
│   ├── Home/            # Accueil
│   ├── NotFound/        # Page 404
│   ├── Search/          # Recherche
│   └── Statistics/      # Statistiques
├── styles/              # Styles globaux
│   ├── GlobalStyles.ts  # Styles CSS globaux
│   └── theme.ts         # Thème de l'application
├── types/               # Types TypeScript
│   └── index.ts         # Définitions de types
└── utils/               # Utilitaires
    └── index.ts         # Fonctions utilitaires
```

## 🛠️ Installation et Démarrage

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/BenLe302/wildlife-slider-pro.git
   cd wildlife-slider-pro
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Démarrer l'application**
   ```bash
   npm start
   # ou
   yarn start
   ```

4. **Ouvrir dans le navigateur**
   L'application sera disponible sur `http://localhost:3000`

### Scripts Disponibles

- `npm start` - Démarre le serveur de développement
- `npm build` - Construit l'application pour la production
- `npm test` - Lance les tests
- `npm run eject` - Éjecte la configuration (irréversible)

## 🎯 Utilisation

### Navigation
- **Accueil** : Découvrez le slider principal et les fonctionnalités
- **Galerie** : Explorez tous les animaux avec filtres et tri
- **Recherche** : Recherchez des animaux spécifiques
- **Favoris** : Gérez vos animaux favoris
- **Conservation** : Apprenez sur les efforts de conservation
- **Statistiques** : Visualisez les données
- **À Propos** : Informations sur l'application
- **Contact** : Formulaire de contact

### Fonctionnalités Interactives
- Cliquez sur ❤️ pour ajouter aux favoris
- Utilisez 🌙/☀️ pour changer de thème
- Naviguez avec les flèches du slider
- Filtrez par catégorie et statut
- Triez par différents critères

## 🎨 Personnalisation

### Thèmes
L'application supporte les thèmes clair et sombre. Vous pouvez personnaliser les couleurs dans `src/styles/theme.ts`.

### Ajout d'Animaux
Pour ajouter de nouveaux animaux, modifiez le fichier `src/data/animals.ts` en suivant la structure existante.

### Composants
Tous les composants sont modulaires et réutilisables. Vous pouvez facilement les personnaliser ou en créer de nouveaux.

## 🧪 Tests

Lancez les tests avec :
```bash
npm test
```

Les tests couvrent :
- Rendu des composants
- Interactions utilisateur
- Logique métier
- Navigation

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- 📱 Mobile (320px+)
- 📱 Tablette (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

## ♿ Accessibilité

- Navigation au clavier
- Lecteurs d'écran compatibles
- Contrastes optimisés
- Focus visible
- Textes alternatifs

## 🌍 Internationalisation

L'application est actuellement en français, mais la structure permet une internationalisation facile.

## 🚀 Performance

- **Lazy Loading** : Chargement différé des pages
- **Code Splitting** : Division du code pour optimiser le chargement
- **Memoization** : Optimisation des re-rendus
- **Image Optimization** : Images optimisées
- **Caching** : Mise en cache intelligente

## 🔧 Configuration

### Variables d'Environnement
Créez un fichier `.env` à la racine :
```env
REACT_APP_API_URL=https://api.example.com
REACT_APP_VERSION=1.0.0
```

### Build de Production
```bash
npm run build
```

Le build optimisé sera dans le dossier `build/`.

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Développeur Principal** : [Votre Nom]
- **Design** : [Designer]
- **Contenu** : [Rédacteur]

## 🙏 Remerciements

- Images d'animaux : [Source des images]
- Icônes : Lucide React
- Inspiration : Amour de la nature et de la conservation

## 📞 Support

Pour toute question ou problème :
- 📧 Email : support@wildlife-slider-pro.com
- 🐛 Issues : [GitHub Issues](https://github.com/BenLe302/wildlife-slider-pro/issues)
- 📖 Documentation : [Wiki](https://github.com/BenLe302/wildlife-slider-pro/wiki)

---

**Wildlife Slider Pro** - Découvrez, Apprenez, Protégez 🌍🦁🌿