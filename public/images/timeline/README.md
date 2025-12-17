# Timeline Images

Ce dossier contient les images/logos pour les éléments de votre parcours professionnel et académique.

## Format recommandé

- **Format** : PNG avec fond transparent (recommandé) ou JPG
- **Dimensions** : 60x60px minimum (le CSS redimensionne automatiquement)
- **Résolution** : 120x120px recommandé pour les écrans Retina
- **Poids** : < 50KB par image pour de meilleures performances

## Images nécessaires

Vous devez ajouter les images suivantes dans ce dossier :

1. **cruisetech.png** - Logo de CruiseTech SARL
2. **supdevinci.png** - Logo de Sup de Vinci / EEMI
3. **coderhapsodie.png** - Logo de CodeRhapsodie
4. **silamir.png** - Logo de Silamir
5. **depiltech.png** - Logo de Depiltech
6. **iut-gap.png** - Logo IUT d'Aix-Marseille (Gap)
7. **iut-aix.png** - Logo IUT d'Aix-Marseille (Aix)

## Comment optimiser vos images

### Avec ImageMagick (ligne de commande)
```bash
# Redimensionner à 120x120px
convert logo.png -resize 120x120 logo-optimized.png

# Optimiser la taille du fichier
convert logo.png -strip -quality 85 logo-optimized.png
```

### Avec un outil en ligne
- [TinyPNG](https://tinypng.com/) - Compression PNG/JPG
- [Squoosh](https://squoosh.app/) - Compression et redimensionnement

### Avec Photoshop / GIMP
1. Redimensionner à 120x120px
2. Exporter en PNG-8 ou PNG-24 avec transparence
3. Activer "Optimiser pour le web"

## Notes

- Si une image n'est pas disponible, l'icône par défaut sera affichée à la place
- Les images sont chargées avec `loading="lazy"` pour de meilleures performances
- Utilisez des noms de fichiers en minuscules et sans espaces
