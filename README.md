# Portfolio Vue.js

Un portfolio épuré et minimaliste construit avec Vue.js et Vite.

## Structure du projet

```
portfolio/
├── src/
│   ├── components/       # Composants Vue réutilisables
│   │   ├── Header.vue    # En-tête avec navigation
│   │   ├── Hero.vue      # Section héro avec présentation
│   │   ├── Projects.vue  # Grille de projets
│   │   ├── Skills.vue    # Liste des compétences
│   │   └── Footer.vue    # Pied de page
│   ├── data/
│   │   └── portfolio.json # Données du portfolio (à personnaliser)
│   ├── App.vue           # Composant principal
│   ├── main.js           # Point d'entrée
│   └── style.css         # Styles globaux
├── public/               # Fichiers statiques
└── package.json
```

## Installation

```bash
npm install
```

## Démarrage du serveur de développement

```bash
npm run dev
```

## Build pour la production

```bash
npm run build
```

## Personnalisation

### Modifier les données

Éditez le fichier [src/data/portfolio.json](src/data/portfolio.json) pour personnaliser :

- Vos informations personnelles (nom, titre, bio, liens sociaux)
- Vos projets (titre, description, technologies, liens)
- Vos compétences par catégorie

### Ajouter des images

Placez vos images de projets dans le dossier `public/images/` et référencez-les dans le JSON :

```json
"image": "/images/mon-projet.jpg"
```

## Technologies utilisées

- Vue.js 3
- Vite
- CSS3
