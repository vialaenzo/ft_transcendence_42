# 🏓 ft_transcendence_42

Final Common Core project at **42**: a **modern, secure, and extensible multiplayer Pong web platform**.
The goal: build a complete webapp with user management, authentication, microservices, and real-time gameplay.

---

## 👥 Team

Project carried out by a group of 42 students:

- **[Enzo Viala](https://github.com/vialaenzo)**
- **[Redwane Bouselham](https://github.com/Boubouss)**
- **[Jean Rasamimanana](https://github.com/Fano435)**
- **[Damien Trala](https://github.com/Undeadamien)**
- **[Lounis Abdellou](https://github.com/LounisAbdellou)**

---

## 🚀 Features

- **Frontend**: SPA with **TypeScript + TailwindCSS**
- **Backend**: **Node.js + Fastify**, **microservices architecture**
- **Database**: **SQLite**
- **Security**: **JWT + 2FA authentication**, HTTPS/WSS, input validation
- **OAuth2**: Login with **Google Sign-In**
- **User Management**: signup, login, avatar, friends, match history
- **Gameplay**:
  - Real-time Pong with WebSockets
  - **Multiplayer** mode (more than 2 players)
  - **Tournaments** and matchmaking
- **Accessibility**: multi-browser compatibility
- **DevOps**: deployment with **Docker**, microservice-oriented architecture

---

## 🛠️ Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- A valid or self-signed SSL certificate (`ssl/localhost.crt` and `ssl/localhost.key`)

---

## ⚙️ Installation & Run

### 1. Clone the repository

```bash
git clone https://github.com/vialaenzo/ft_transcendence_42.git
cd ft_transcendence_42
```

### 2. Generate `.env` files

---

Two options :

#### 🔹 Automatic :

Using the following script:

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
If you wish to use the script, please fill the missing informations.
---

#### 🔹 Manual :

You can complete the `.env.exemple` files located in the project root and in the [FRONT](./sources/front) directory.

---

### 3. Run the project

```bash
docker compose up --build
```

## 📂 Project Structure

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

## 🧪 Implementeds Projects

- ✅ Web : **Fastify backend (Maj)**, **Tailwind frontend (Min)**, **SQLite DB (Min)**
- ✅ User : **User Management (Maj)**, **Google OAuth (Maj)**
- ✅ Security : **JWT + 2FA (Maj)**
- ✅ Gameplay : **Multiplayer (Maj)**, **Player (Maj)**
- ✅ DevOps : **Microservices backend (Maj)**
- ✅ Accessibility : **Compatibilité navigateurs + responsive (Min)**
- ✅ Server-Side : **Pong API Pong (Maj)**

---

## 📧 Your turn

Enjoy playing our Pong game ^^

---

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---
