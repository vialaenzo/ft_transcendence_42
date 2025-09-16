# 🏓 ft_transcendence_42

Projet de fin de tronc commun à **42** : une **plateforme web de Pong multijoueur** moderne, sécurisée et extensible.
L’objectif : construire une webapp complète avec gestion d’utilisateurs, authentification, microservices et gameplay en temps réel.

---

## 👥 Équipe

Projet réalisé par un groupe d’étudiants de 42 :

- **[Enzo Viala](https://github.com/vialaenzo)**
- **[Redwane Bouselham](https://github.com/Boubouss)**
- **[Jean Rasamimanana](https://github.com/Fano435)**
- **[Damien Trala](https://github.com/Undeadamien)**
- **[Lounis Abdellou](https://github.com/LounisAbdellou)**

---

## 🚀 Fonctionnalités

- **Frontend** : SPA en **TypeScript + TailwindCSS**
- **Backend** : **Node.js + Fastify**, architecture **microservices**
- **Base de données** : **SQLite**
- **Sécurité** : Authentification **JWT + 2FA**, HTTPS/WSS, validation des inputs
- **OAuth2** : Connexion via **Google Sign-In**
- **User Management** : inscription, login, avatar, amis, historique de matchs
- **Gameplay** :
  - Pong **temps réel** avec WebSockets
  - Mode **multijoueur** (plus de 2 joueurs)
  - **Tournois** et matchmaking
- **Accessibilité** : compatibilité multi-navigateurs
- **DevOps** : déploiement via **Docker**, architecture orientée microservices

---

## 🛠️ Prérequis

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- Un certificat SSL auto-signé ou valide (`ssl/localhost.crt` et `ssl/localhost.key`)

---

## ⚙️ Installation & Lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/vialaenzo/ft_transcendence_42.git
cd ft_transcendence_42
```

### 2. Générer les fichiers `.env`

---

Deux options :

#### 🔹 Automatique :

via ce script :

```bash
#!/bin/bash

# Récupère le hostname FQDN

DOMAIN="$(hostname -f)"

# ----- .env front -----

FRONT_ENV_PATH="sources/front/.env"

cat > "$FRONT_ENV_PATH" <<EOF
VITE_API_USER="https://$DOMAIN:3443/api/user"
VITE_API_GAME="https://$DOMAIN:3443/api/game"
VITE_API_LOGIC="https://$DOMAIN:3443/api/logic"

VITE_USER_WSS="wss://$DOMAIN:3443/wss/user/friends"
VITE_LOBBY_WSS="wss://$DOMAIN:3443/wss/game/lobby"
VITE_LOGIC_WSS="wss://$DOMAIN:3443/wss/logic/ws"
EOF

echo ".env front généré avec succès ✅ ($FRONT_ENV_PATH, domaine détecté : $DOMAIN)"

# ----- .env global -----

GLOBAL_ENV_PATH=".env"

cat > "$GLOBAL_ENV_PATH" <<EOF
HTTPS_KEY="./ssl/localhost.key"
HTTPS_CERT="./ssl/localhost.crt"

JWT_KEY=""

MAILER_ADDR=""
MAILER_PSWD=""

GOOGLE_OAUTH_ID=""
GOOGLE_OAUTH_SECRET=""
GOOGLE_OAUTH_URI=""

FRONT_URL="https://$DOMAIN:3443"
FRONT_DOMAIN="$DOMAIN"

API_USER="https://user:3000"
API_LOGIC="https://logic:3002"
API_GAME="https://game:3001"

EOF

echo ".env global généré avec succès ✅ ($GLOBAL_ENV_PATH)"

```

Si vous souhaitez utiliser le script alors veuillez remplir les informations manquantes.

---

#### 🔹 Manuel :

Vous pouvez completer les .env.exemple présent dans la racine du projet ainsi que dans le dossier [FRONT](./sources/front) .

---

### 3. Lancer le projet

```bash
docker compose up --build
```

## 📂 Structure du projet

```
ft_transcendence_42/
├── sources/
│   ├── front/        # SPA React/TS + Tailwind
│   ├── user/         # Microservice User (Fastify + SQLite)
│   ├── game/         # Microservice Game (Fastify)
│   └── logic/        # Microservice Logic (Fastify)
├── ssl/              # Certificats SSL
├── docker-compose.yml
├── env.sh            # Script génération auto .env
└── README.md
```

---

## 🧪 Modules implémentés

- ✅ Web : **Fastify backend (Maj)**, **Tailwind frontend (Min)**, **SQLite DB (Min)**
- ✅ User : **User Management (Maj)**, **Google OAuth (Maj)**
- ✅ Security : **JWT + 2FA (Maj)**
- ✅ Gameplay : **Multiplayer (Maj)**, **Player (Maj)**
- ✅ DevOps : **Microservices backend (Maj)**
- ✅ Accessibility : **Compatibilité navigateurs + responsive (Min)**
- ✅ Server-Side Pong (Maj API Pong)

---

## 📧 A toi de jouer

Amuse toi bien avec notre pong ^^

---

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---
