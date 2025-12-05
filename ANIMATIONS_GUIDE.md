# Guide des Animations et Transitions

## 🎨 Système de Thème Clair/Sombre

### Fonctionnement

Le toggle de thème est maintenant **100% fonctionnel** avec :

- **Bouton toggle** dans le header (icône soleil/lune)
- **Sauvegarde automatique** de la préférence dans localStorage
- **Détection du thème système** au premier chargement
- **Transitions fluides** (0.4s) entre les thèmes
- **Variables CSS** pour une cohérence globale

### Variables CSS Disponibles

```css
:root {
  --bg-primary: #0a0a0a;        /* Fond principal */
  --bg-secondary: #121212;       /* Fond secondaire */
  --text-primary: #e4e4e7;       /* Texte principal */
  --text-secondary: rgba(255, 255, 255, 0.7);  /* Texte secondaire */
  --text-tertiary: rgba(255, 255, 255, 0.5);   /* Texte tertiaire */
}

:root.light {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #1a1a1a;
  --text-secondary: #4a4a4a;
  --text-tertiary: #6a6a6a;
}
```

### Utilisation dans les Composants

Pour supporter le mode clair dans un composant :

```css
/* Utiliser les variables CSS */
.mon-element {
  color: var(--text-primary);
  background: var(--bg-primary);
}

/* OU cibler directement le mode clair */
.mon-element {
  color: #e4e4e7;
  background: #0a0a0a;
}

:root.light .mon-element {
  color: #1a1a1a;
  background: #ffffff;
}
```

## ✨ Animations entre Sections

### Animation de Base

Toutes les sections ont maintenant une **animation d'apparition progressive** :

```css
section {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease-out forwards;
}
```

### Délais en Cascade

Les sections s'animent avec un léger délai pour un effet fluide :
- Section 1 : 0s
- Section 2 : 0.1s
- Section 3 : 0.2s
- etc.

## 🎭 Bibliothèque d'Animations

### Fichier: `src/styles/animations.css`

Ce fichier contient une **collection complète** d'animations réutilisables :

#### Animations de Révélation au Scroll

```html
<!-- Classes utilitaires -->
<div class="reveal-fade-up">Apparaît du bas</div>
<div class="reveal-fade-down">Apparaît du haut</div>
<div class="reveal-fade-left">Apparaît de la gauche</div>
<div class="reveal-fade-right">Apparaît de la droite</div>
<div class="reveal-scale">Apparaît avec zoom</div>

<!-- Avec délais -->
<div class="reveal-fade-up delay-200">Délai de 200ms</div>
<div class="reveal-fade-up delay-500">Délai de 500ms</div>
```

Les éléments avec ces classes s'animent automatiquement quand ils apparaissent dans le viewport.

#### Animations de Survol

```html
<div class="hover-lift">S'élève au survol</div>
<div class="hover-grow">Grossit au survol</div>
<div class="hover-glow">Brille au survol</div>
```

#### Animations de Chargement

```html
<div class="loading-spin">Rotation</div>
<div class="loading-pulse">Pulsation</div>
<div class="loading-shimmer">Effet shimmer</div>
```

## 🔧 Mixin ScrollReveal

### Fichier: `src/mixins/scrollReveal.js`

Un **mixin Vue.js** pour ajouter facilement des animations au scroll dans n'importe quel composant :

```javascript
import { scrollRevealMixin } from '@/mixins/scrollReveal'

export default {
  mixins: [scrollRevealMixin],
  // Le composant s'animera automatiquement au scroll
}
```

### Fonctionnement

1. Utilise **Intersection Observer API** pour détecter quand un élément entre dans le viewport
2. Ajoute automatiquement la classe `.revealed` à l'élément
3. Se déconnecte après l'animation (optimisation)
4. Fonctionne avec les classes `reveal-*` du CSS

## 📋 Animations Déjà Implémentées

### Composants avec Animations

1. **Timeline** - Animations au scroll pour chaque item
2. **Hero** - Animation d'apparition progressive
3. **About** - Cartes avec effets de survol
4. **Projects** - Transitions de filtres fluides
5. **Certifications** - Effets de survol sur les cartes
6. **ContactForm** - Animations des états (succès, erreur)
7. **GitHubActivity** - Barres de progression animées

### Effets Spéciaux

- **Parallax** dans le Hero
- **Hover effects** sur toutes les cartes
- **Transitions** entre filtres de projets
- **Fade in/out** des icônes du theme toggle
- **Stagger** des éléments de timeline

## 🚀 Comment Ajouter une Animation

### Méthode 1: Classes Utilitaires

```html
<template>
  <div class="reveal-fade-up delay-300">
    Mon contenu qui s'anime
  </div>
</template>
```

### Méthode 2: Mixin

```vue
<script>
import { scrollRevealMixin } from '@/mixins/scrollReveal'

export default {
  mixins: [scrollRevealMixin]
}
</script>

<style scoped>
.mon-composant {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease;
}

.mon-composant.revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>
```

### Méthode 3: Animations CSS Personnalisées

```css
@keyframes monAnimation {
  from {
    opacity: 0;
    transform: scale(0.5) rotate(-180deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.mon-element {
  animation: monAnimation 0.6s ease-out;
}
```

## ♿ Accessibilité

Le système respecte les préférences utilisateur :

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Les utilisateurs qui préfèrent moins d'animations verront des transitions instantanées.

## 📊 Performance

### Optimisations Implémentées

1. **GPU Acceleration** avec `transform: translateZ(0)`
2. **Will-change** sur les éléments animés
3. **Intersection Observer** au lieu de scroll listeners
4. **Déconnexion des observers** après animation
5. **Transitions CSS** plutôt que JavaScript

### Classe Utilitaire

```html
<div class="gpu-accelerated">
  <!-- Contenu utilisant l'accélération GPU -->
</div>
```

## 🎯 Bonnes Pratiques

### ✅ À Faire

- Utiliser `transform` et `opacity` pour les animations (performant)
- Limiter la durée à 0.3s - 1s maximum
- Utiliser `ease-out` pour les entrées, `ease-in` pour les sorties
- Tester avec `prefers-reduced-motion`
- Utiliser `will-change` avec parcimonie

### ❌ À Éviter

- Animer `width`, `height`, `left`, `top` (lourd)
- Animer trop d'éléments simultanément
- Durées trop longues (> 1s)
- Oublier les états de hover/focus
- Animations sur mobile trop complexes

## 🔍 Exemples Complets

### Card avec Hover et Reveal

```vue
<template>
  <div class="card reveal-fade-up delay-200 hover-lift">
    <h3>Titre</h3>
    <p>Contenu</p>
  </div>
</template>

<style scoped>
.card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  padding: 2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.card:hover {
  background: var(--card-bg-hover);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
</style>
```

### Liste avec Stagger

```vue
<template>
  <div class="list">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="item reveal-fade-up"
      :class="`delay-${index * 100}`"
    >
      {{ item.title }}
    </div>
  </div>
</template>
```

## 📝 Notes Importantes

1. Toutes les animations sont définies dans `src/styles/animations.css`
2. Les variables de thème sont dans `src/App.vue`
3. Le mixin ScrollReveal est dans `src/mixins/scrollReveal.js`
4. Le ThemeToggle fonctionne avec localStorage
5. Les transitions sont fluides grâce aux cubic-bezier

## 🎨 Personnalisation

Pour modifier les animations globalement :

```css
/* Dans src/styles/animations.css */
:root {
  --animation-duration: 0.6s;
  --animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal-fade-up.revealed {
  transition: all var(--animation-duration) var(--animation-easing);
}
```

Profitez de ce système d'animations complet et performant ! 🚀
