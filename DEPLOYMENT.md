# Documentation de Déploiement - OVH Cloud

Guide complet pour mettre en production le portfolio sur OVH Cloud.

## Table des matières

1. [Prérequis](#prérequis)
2. [Préparation du projet](#préparation-du-projet)
3. [Build de production](#build-de-production)
4. [Configuration OVH Cloud](#configuration-ovh-cloud)
5. [Déploiement via FTP/SFTP](#déploiement-via-ftpsftp)
6. [Configuration du domaine](#configuration-du-domaine)
7. [Optimisations post-déploiement](#optimisations-post-déploiement)
8. [Maintenance et mises à jour](#maintenance-et-mises-à-jour)

---

## Prérequis

### Localement
- Node.js (v16 ou supérieur)
- npm ou yarn
- Client FTP/SFTP (FileZilla, WinSCP, ou ligne de commande)

### Chez OVH
- Un hébergement web OVH actif (mutualisé, VPS, ou Public Cloud)
- Accès à l'espace client OVH
- Identifiants FTP/SSH fournis par OVH
- Nom de domaine configuré (optionnel)

---

## Préparation du projet

### 1. Vérifier les données du portfolio

Assurez-vous que toutes vos données personnelles sont à jour dans [src/data/portfolio.json](src/data/portfolio.json) :

```json
{
  "personal": {
    "name": "Votre Nom",
    "title": "Votre Titre",
    "email": "votre@email.com",
    "github": "votre-username",
    "linkedin": "votre-profil"
  }
}
```

### 2. Vérifier les images

- Placez toutes vos images dans le dossier `public/images/`
- Optimisez les images pour le web (compression, format WebP si possible)
- Vérifiez que les chemins dans `portfolio.json` sont corrects

### 3. Tester localement

```bash
# Installer les dépendances
npm install

# Tester en mode développement
npm run dev

# Tester le build de production
npm run build
npm run preview
```

---

## Build de production

### 1. Créer le build optimisé

```bash
npm run build
```

Cette commande génère un dossier `dist/` contenant tous les fichiers optimisés pour la production :

```
dist/
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
├── images/
├── index.html
└── ...
```

### 2. Vérifier le build

```bash
# Prévisualiser le site de production localement
npm run preview
```

Vérifiez que :
- Toutes les pages s'affichent correctement
- Les images se chargent
- Les liens fonctionnent
- Le formulaire de contact fonctionne (si utilisé)
- Les liens vers les réseaux sociaux sont corrects

---

## Configuration OVH Cloud

### Option 1 : Hébergement Web Mutualisé OVH

#### 1. Récupérer les informations de connexion

Dans l'espace client OVH :
1. Allez dans `Web Cloud` > `Hébergements`
2. Sélectionnez votre hébergement
3. Onglet `FTP-SSH` pour obtenir :
   - Serveur FTP : `ftp.votre-domaine.com` ou `ssh.cluster0XX.hosting.ovh.net`
   - Login FTP : généralement `votre-domaine.com` ou identifiant fourni
   - Serveur : cluster0XX.hosting.ovh.net

#### 2. Activer le SFTP (recommandé)

Dans l'espace client OVH :
1. `Web Cloud` > `Hébergements` > Votre hébergement
2. Onglet `FTP-SSH`
3. Cliquez sur les `...` à côté de votre utilisateur
4. `Modifier` et activez SSH si disponible

### Option 2 : VPS OVH

Si vous utilisez un VPS, vous aurez besoin de :
- Accès SSH root ou sudo
- Installer un serveur web (Nginx ou Apache)
- Configuration de domaine

---

## Déploiement via FTP/SFTP

### Méthode 1 : FileZilla (Interface graphique)

#### 1. Installer FileZilla
Téléchargez depuis [filezilla-project.org](https://filezilla-project.org/)

#### 2. Configurer la connexion

```
Hôte : sftp://ftp.votre-domaine.com ou ssh.cluster0XX.hosting.ovh.net
Identifiant : votre-login-ftp
Mot de passe : votre-mot-de-passe-ftp
Port : 22 (SFTP) ou 21 (FTP)
```

#### 3. Téléverser les fichiers

1. Connectez-vous à votre hébergement
2. Naviguez vers le dossier `www/` ou `public_html/`
3. **Supprimez les anciens fichiers** si nécessaire (gardez `.htaccess` si présent)
4. Glissez-déposez **tout le contenu du dossier `dist/`** (pas le dossier lui-même)
5. Attendez la fin du transfert

**Structure finale sur le serveur :**
```
www/ ou public_html/
├── assets/
├── images/
├── index.html
└── ...
```

### Méthode 2 : Ligne de commande (SFTP)

#### Utiliser rsync (recommandé)

```bash
# Synchroniser le dossier dist avec le serveur
rsync -avz --delete dist/ votre-login@ftp.votre-domaine.com:/www/

# Ou avec SSH
rsync -avz -e "ssh -p 22" --delete dist/ votre-login@ssh.cluster0XX.hosting.ovh.net:/home/votre-login/www/
```

#### Utiliser scp

```bash
# Copier tous les fichiers
scp -r dist/* votre-login@ftp.votre-domaine.com:/www/
```

#### Utiliser SFTP manuel

```bash
# Se connecter en SFTP
sftp votre-login@ftp.votre-domaine.com

# Une fois connecté
cd www
lcd dist
put -r *
exit
```

### Méthode 3 : Git + SSH (VPS uniquement)

Si vous avez un VPS avec accès SSH complet :

```bash
# Sur le serveur
cd /var/www/html
git clone https://github.com/votre-username/votre-repo.git .
npm install
npm run build

# Configurer Nginx ou Apache pour pointer vers dist/
```

---

## Configuration du domaine

### 1. Domaine OVH

Si votre domaine est chez OVH et l'hébergement aussi, c'est généralement automatique.

Dans l'espace client OVH :
1. `Web Cloud` > `Hébergements` > Votre hébergement
2. Onglet `Multisite`
3. Vérifiez que votre domaine pointe vers le dossier `www` ou `public_html`

### 2. Domaine externe

Si votre domaine est ailleurs, configurez les DNS :

**Enregistrements DNS à créer :**
```
Type A  : @ ou votre-domaine.com → IP de l'hébergement OVH
Type A  : www → IP de l'hébergement OVH
```

**Pour un hébergement mutualisé OVH :**
```
Type A  : @ → 213.186.33.5 (exemple, vérifiez dans votre espace client)
Type A  : www → 213.186.33.5
```

### 3. HTTPS / SSL

#### Activer SSL gratuit (Let's Encrypt)

Dans l'espace client OVH :
1. `Web Cloud` > `Hébergements` > Votre hébergement
2. Onglet `Informations générales`
3. Section `Certificat SSL`
4. Cliquez sur `Commander un certificat SSL`
5. Choisissez `Certificat gratuit (Let's Encrypt)`
6. Validez

**Temps de propagation :** 2 à 24 heures

#### Forcer HTTPS avec .htaccess

Créez ou modifiez le fichier `.htaccess` à la racine de votre site :

```apache
# Redirection HTTP vers HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirection www vers non-www (optionnel)
RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
```

---

## Optimisations post-déploiement

### 1. Configuration .htaccess pour SPA

Créez un fichier `.htaccess` dans le dossier `www/` :

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # SPA - Redirection vers index.html
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compression GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache navigateur
<IfModule mod_expires.c>
  ExpiresActive On

  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"

  # CSS et JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"

  # Fonts
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
</IfModule>

# Sécurité
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

### 2. Optimiser Vite pour la production

Modifiez [vite.config.js](vite.config.js) :

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    // Optimisations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Supprimer les console.log en production
        drop_debugger: true
      }
    },
    // Chunking intelligent
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue'],
          emailjs: ['@emailjs/browser']
        }
      }
    },
    // Optimiser les assets
    assetsInlineLimit: 4096, // Inline les assets < 4kb
    cssCodeSplit: true,
    sourcemap: false // Pas de sourcemaps en production
  }
})
```

### 3. Vérifier les performances

Testez votre site avec :
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

---

## Maintenance et mises à jour

### Processus de mise à jour

#### 1. Méthode manuelle

```bash
# 1. Faire vos modifications localement
# 2. Tester
npm run dev

# 3. Build
npm run build

# 4. Déployer avec rsync
rsync -avz --delete dist/ votre-login@ftp.votre-domaine.com:/www/
```

#### 2. Script de déploiement automatique

Créez un fichier `deploy.sh` à la racine du projet :

```bash
#!/bin/bash

echo "🚀 Déploiement sur OVH Cloud..."

# Variables (à personnaliser)
FTP_HOST="ftp.votre-domaine.com"
FTP_USER="votre-login"
FTP_PATH="/www/"

# Build
echo "📦 Build du projet..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi

# Déploiement
echo "📤 Upload des fichiers..."
rsync -avz --delete dist/ $FTP_USER@$FTP_HOST:$FTP_PATH

if [ $? -eq 0 ]; then
    echo "✅ Déploiement réussi!"
    echo "🌍 Visitez votre site : https://votre-domaine.com"
else
    echo "❌ Erreur lors du déploiement"
    exit 1
fi
```

Rendez-le exécutable :
```bash
chmod +x deploy.sh
```

Utilisez-le :
```bash
./deploy.sh
```

### Workflow Git recommandé

```bash
# 1. Créer une branche pour vos modifications
git checkout -b feature/ma-modification

# 2. Faire vos modifications et commit
git add .
git commit -m "Description de la modification"

# 3. Merger dans main
git checkout main
git merge feature/ma-modification

# 4. Build et déployer
npm run build
./deploy.sh

# 5. Tag de version (optionnel)
git tag -a v1.0.1 -m "Version 1.0.1"
git push origin main --tags
```

---

## Checklist de déploiement

Avant chaque déploiement :

- [ ] Tester localement avec `npm run dev`
- [ ] Vérifier les données dans `portfolio.json`
- [ ] Optimiser les images
- [ ] Tester le build avec `npm run preview`
- [ ] Vérifier les URLs des liens externes
- [ ] Tester le formulaire de contact (si applicable)
- [ ] Créer un backup du site actuel (si mise à jour)
- [ ] Builder avec `npm run build`
- [ ] Déployer via FTP/SFTP
- [ ] Vider le cache du navigateur
- [ ] Tester le site en production
- [ ] Vérifier HTTPS
- [ ] Tester sur mobile et desktop
- [ ] Vérifier les performances (PageSpeed)

---

## Dépannage

### Le site affiche une page blanche

**Causes possibles :**
- Chemins des assets incorrects
- Fichiers non uploadés correctement
- Erreurs JavaScript

**Solutions :**
1. Vérifiez la console du navigateur (F12)
2. Vérifiez que tous les fichiers du dossier `dist/` sont bien uploadés
3. Vérifiez les permissions des fichiers (644 pour fichiers, 755 pour dossiers)

### Les images ne s'affichent pas

**Solutions :**
1. Vérifiez les chemins dans `portfolio.json` (doivent commencer par `/`)
2. Vérifiez que le dossier `images/` est bien uploadé
3. Vérifiez les permissions des fichiers images

### Erreur 404 lors du rafraîchissement

**Cause :** Configuration SPA manquante

**Solution :** Ajoutez le fichier `.htaccess` avec la configuration SPA (voir section Optimisations)

### Le certificat SSL ne fonctionne pas

**Solutions :**
1. Attendez 24h après l'activation
2. Vérifiez dans l'espace client OVH que le certificat est bien actif
3. Videz le cache DNS : `ipconfig /flushdns` (Windows) ou `sudo dscacheutil -flushcache` (Mac)

### Le site est lent

**Solutions :**
1. Optimisez les images (compression, WebP)
2. Activez la compression GZIP (`.htaccess`)
3. Activez le cache navigateur (`.htaccess`)
4. Minimisez les CSS/JS (normalement fait par Vite)

---

## Support

- Documentation OVH : https://docs.ovh.com/fr/
- Support OVH : https://www.ovh.com/fr/support/
- Documentation Vite : https://vitejs.dev/
- Documentation Vue.js : https://vuejs.org/

---

## Commandes utiles

```bash
# Développement
npm run dev              # Serveur de développement
npm run build            # Build de production
npm run preview          # Prévisualiser le build

# Git
git status               # Voir les modifications
git add .                # Ajouter tous les fichiers
git commit -m "message"  # Commit
git push                 # Pousser sur GitHub

# FTP/SFTP
rsync -avz dist/ user@host:/path/   # Synchroniser
scp -r dist/* user@host:/path/      # Copier

# Permissions (si accès SSH)
chmod 644 fichier        # Permissions fichier
chmod 755 dossier        # Permissions dossier
```

---

**Dernière mise à jour :** 2025-12-06
