# Configuration EmailJS pour le formulaire de contact

## Étapes pour activer l'envoi d'emails

### 1. Créer un compte EmailJS
1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit (200 emails/mois)

### 2. Configurer le service Email
1. Connectez-vous à votre dashboard EmailJS
2. Allez dans "Email Services"
3. Cliquez sur "Add New Service"
4. Sélectionnez votre fournisseur d'email (Gmail, Outlook, etc.)
5. Suivez les instructions pour connecter votre email
6. Notez le **Service ID** (ex: `service_xxxxxxx`)

### 3. Créer un template d'email
1. Allez dans "Email Templates"
2. Cliquez sur "Create New Template"
3. Utilisez ce template pour votre email :

```
Subject: {{subject}}

Nouveau message de {{from_name}}

Email: {{from_email}}
Sujet: {{subject}}

Message:
{{message}}

---
Ce message a été envoyé depuis votre portfolio
```

4. Notez le **Template ID** (ex: `template_xxxxxxx`)

### 4. Récupérer votre clé publique
1. Allez dans "Account" > "General"
2. Trouvez votre **Public Key** (ex: `xxxxxxxxxxxxxxxxxx`)

### 5. Configurer les variables d'environnement
Ajoutez ces lignes à votre fichier `.env` :

```bash
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxx
```

Remplacez les valeurs par celles obtenues aux étapes précédentes.

### 6. Tester le formulaire
1. Lancez votre application : `npm run dev`
2. Remplissez le formulaire de contact
3. Vérifiez votre boîte mail !

## Mode de fonctionnement

- **Sans configuration** : Le formulaire fonctionne en mode simulation (validation uniquement)
- **Avec configuration** : Les emails sont réellement envoyés via EmailJS

## Sécurité

- Les clés EmailJS sont stockées dans `.env` qui est ignoré par Git
- La clé publique EmailJS peut être exposée côté client (c'est normal)
- Configurez les domaines autorisés dans EmailJS pour éviter les abus

## Limites du plan gratuit

- 200 emails par mois
- Branding EmailJS dans les emails
- Pour plus d'emails, consultez les plans payants sur emailjs.com
