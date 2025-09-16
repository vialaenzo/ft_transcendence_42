Voici la version du README.md avec les liens LinkedIn de ton équipe :

````markdown
# 🏓 ft_transcendence_42

Projet de fin de tronc commun à **42** : une **plateforme web de Pong multijoueur** moderne, sécurisée et extensible.
L’objectif : construire une webapp complète avec gestion d’utilisateurs, authentification, microservices et gameplay en temps réel.

---

## 👥 Équipe

Projet réalisé par un groupe d’étudiants de 42 :

- **[Enzo Viala](https://www.linkedin.com/in/vla-enzo/)**
- **[Redwane Bouselham](https://www.linkedin.com/in/redwane-bouselham?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACX_knABh1bQze00S2Rbfe9XYvUn11ABag4&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3Bpl4CaNvERBec4%2FAymj0o1A%3D%3D)**
- **[Jean Rasamimanana](https://www.linkedin.com/in/jean-rasamimanana-643b76271/)**
- **Damien Trala**
- **[Lounis Abdellou](https://www.linkedin.com/in/lounis-abdellou/)**

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
- **Accessibilité** : compatibilité multi-navigateurs, responsive design
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
````

### 2. Générer les fichiers `.env`

Deux options :

#### 🔹 Automatique (recommandé)

Exécuter le script `env.sh` :

```bash
chmod +x env.sh
./env.sh
```

👉 Le script détecte automatiquement le **FQDN / IP de la machine** avec :

```bash
hostname -f
```

C’est cette adresse (ou l’IP de ta VM/serveur) qu’il faudra utiliser pour accéder au site.

Exemple :

- Si `$DOMAIN = transcendance.42.fr`, alors l’accès se fera sur :

  - `https://transcendance.42.fr:3443`

- Si `$DOMAIN = 192.168.1.50`, alors :

  - `https://192.168.1.50:3443`

#### 🔹 Manuel

Copier les fichiers exemples :

```bash
cp sources/front/.env.example sources/front/.env
cp .env.example .env
```

Puis modifier les variables (`DOMAIN`, clés OAuth, JWT_KEY, etc.) selon votre configuration.

---

### 3. Lancer le projet

```bash
docker compose up --build
```

---

## 🌐 Connexion

- **Frontend** : `https://<DOMAIN>:3443`
- **API User** : `https://<DOMAIN>:3443/api/user`
- **API Game** : `https://<DOMAIN>:3443/api/game`
- **API Logic** : `https://<DOMAIN>:3443/api/logic`
- **WebSockets** :

  - `wss://<DOMAIN>:3443/wss/user/friends`
  - `wss://<DOMAIN>:3443/wss/game/lobby`
  - `wss://<DOMAIN>:3443/wss/logic/ws`

ℹ️ Remplacer `<DOMAIN>` par l’**IP locale** (`hostname -I`) ou le **nom de domaine** configuré.

---

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

## 📧 Contact

Projet réalisé par le groupe **ft_transcendence_42** (École 42).

```

Si tu veux, je peux te générer directement le README.md complet prêt à coller dans ton repo, ou faire une version allégée ?
```
