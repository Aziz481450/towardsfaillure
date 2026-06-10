# IronTrack — Cahier des Charges

## Aperçu du Projet

**IronTrack** est une plateforme de musculation full-stack permettant aux utilisateurs de créer des programmes d'entraînement, logger leurs séances, suivre leurs statistiques et détecter automatiquement leurs records personnels. L'application supporte 5 langues (Français, Anglais, Arabe, Espagnol, Allemand) avec RTL pour l'arabe.

---

## Architecture Technique

| Composant | Technologie |
|-----------|-------------|
| Frontend  | React 19 + TypeScript + Vite |
| UI        | Bootstrap 5 (CDN dynamique) + CSS personnalisé |
| Backend   | ASP.NET Core 8 Web API (C#) |
| Base de données | MongoDB 7 |
| Auth      | JWT (HS256, 1h) + BCrypt |
| Déploiement | Docker + Docker Compose + Nginx |

---

## Structure du Projet

```
/
├── frontend/                  # React 19 + Vite
│   ├── src/
│   │   ├── components/        # Composants réutilisables
│   │   ├── context/           # AuthContext
│   │   ├── hooks/             # Custom hooks (useAuth, useCountUp)
│   │   ├── i18n/              # Système de traduction (5 langues)
│   │   ├── pages/             # Pages de l'application
│   │   ├── routes/            # Configuration des routes
│   │   ├── services/          # Services API (Axios)
│   │   └── styles/            # CSS personnalisé (88 KB)
│   ├── Dockerfile
│   └── nginx.conf
├── backend/
│   └── TowardsFailure.API/
│       ├── Controllers/       # API Controllers
│       ├── Services/          # Business logic
│       ├── Repositories/      # Accès MongoDB
│       ├── Models/            # Entités MongoDB
│       ├── DTOs/              # Data Transfer Objects
│       ├── Middleware/        # Global exception handler
│       └── Helpers/           # JWT, Email, SocialAuth settings
├── docker-compose.yml
└── README.md
```

---

# Plan de Développement — 5 Jours

---

## Jour 1 : Infrastructure & Modèles de Données

### Objectif
Mettre en place l'architecture complète du projet, les modèles de données, et l'infrastructure Docker.

### Backend (.NET 8)
- [x] Initialisation du projet ASP.NET Core 8 Web API
- [x] Configuration MongoDB (connection string, database name)
- [x] Modèles de données : `User`, `Program`, `WorkoutSession`, `Exercise`, `PersonalRecord`, `Notification`
- [x] Enums : `UserRole`, `GoalType`, `DifficultyLevel`, `MuscleGroup`, `PRType`
- [x] DTOs de base : `Auth`, `Program`, `Workout`, `User`, `PR`, `Common`
- [x] `BaseRepository<T>` pattern avec MongoDB.Driver
- [x] `IConfiguration` pour les settings (JWT, MongoDB, Email, SocialAuth)
- [x] `Program.cs` avec DI, CORS, JWT auth, Swagger

### Frontend (React 19 + Vite)
- [x] Initialisation Vite + React 19 + TypeScript
- [x] Configuration : `vite.config.ts`, `tsconfig.json`
- [x] Dépendances : `react-router-dom`, `axios`, `bootstrap`
- [x] Structure des dossiers : `components/`, `pages/`, `services/`, `hooks/`, `context/`, `routes/`, `i18n/`, `styles/`
- [x] Routage de base : `/`, `/login`, `/register`, `/dashboard`, `/programs`, `/workout`, `/stats`, `/profile`
- [x] Système de traduction (LangContext + 5 fichiers de langue)
- [x] Layouts : PublicLayout, AuthLayout, ProtectedRoute

### DevOps
- [x] `docker-compose.yml` : MongoDB 7 + backend:5000 + frontend:3000
- [x] `Dockerfile` backend (multi-stage, dotnet publish)
- [x] `Dockerfile` frontend (node build + nginx)
- [x] `nginx.conf` avec SPA routing + proxy `/api/` → backend
- [x] `frontend/.env` avec variables d'environnement
- [x] `.gitignore`

### Livrables
- Projet compilable et déployable via `docker compose up`
- API accessible sur `http://localhost:5000/swagger`
- Frontend accessible sur `http://localhost:3000`
- Tous les modèles MongoDB créés automatiquement au premier insert

---

## Jour 2 : Authentification & Gestion des Utilisateurs

### Objectif
Système d'authentification complet avec JWT, BCrypt, rôles (User/Coach/Admin), et pages de connexion/inscription premium.

### Backend
- [x] `AuthService` : Register, Login, SocialLogin (Google/Facebook/Instagram)
- [x] `AuthController` : POST `/api/auth/register`, `/api/auth/login`, `/api/auth/social-login`
- [x] `UserRepository` : CRUD + GetByEmail, GetByUsername
- [x] JWT Helper : génération de tokens HS256 avec claims (id, email, username, role)
- [x] Middleware : GlobalExceptionHandler
- [x] Rate limiting : 100 req/min/IP
- [x] Magic link auth : `POST /api/auth/send-magic-link`, `GET /api/auth/verify-magic-link`
- [x] `MagicLoginToken` model + repository
- [x] `EmailService` : template HTML pour magic link + invitation

### Frontend
- [x] `AuthContext` : état global user/token, login/register/logout
- [x] `useAuth` hook personnalisé
- [x] `authService` : appels API auth + magic link
- [x] Page Login premium : mesh gradient, particles, orbs parallax, glassmorphism card
- [x] Page Register premium : mêmes animations + champs fullName/username
- [x] Magic link UI : toggle "Send magic link instead" + confirmation
- [x] Inputs flottants avec icônes SVG, toggle password
- [x] Bouton submit avec shimmer gradient + spinner

### Design
- [x] Thème sombre (#0A0A0F, #1C1C1E)
- [x] Couleur primaire : #DC2626 (rouge IronTrack)
- [x] Animations : 40 particles, 3 orbs, muscle lines SVG, dumbbell flottant
- [x] GymEquipment background : barre olympique + 7 paires de disques + squat rack
- [x] Responsive : 900px, 600px, 400px breakpoints
- [x] RTL support pour arabe

---

## Jour 3 : Programmes & Logger d'Entraînement

### Objectif
Création de programmes d'entraînement (4 semaines) et logger de séances en direct.

### Backend
- [x] `ProgramService` : CRUD, clone, assign to athlete
- [x] `ProgramController` : GET/POST/PUT/DELETE `/api/programs`
- [x] `WorkoutService` : start session, log sets, complete session
- [x] `WorkoutController` : POST `/api/workouts`, GET `/api/workouts/history`
- [x] `ExerciseService` + `ExerciseRepository` : catalogue d'exercices
- [x] Seed data : 8 programmes complets (Push/Pull/Legs, Upper/Lower, PPL, etc.)
- [x] Seed data : 10 exercices de base (Bench Press, Squat, Deadlift, OHP, etc.)

### Frontend
- [x] Page Programs (AI Coach) : chatbot avec 40+ entrées KB
- [x] 8 catégories : Mass Gaining, Strength, Aesthetic, Beginner, etc.
- [x] Keyword scoring + typing animation
- [x] Page WorkoutLogger : sélection programme, timer, set grid
- [x] Ajout de sets en direct (weight, reps, RPE)
- [x] Auto-save + notes

### i18n
- [x] 200+ clés de traduction × 5 langues (EN/FR/AR/ES/DE)
- [x] Détection automatique `navigator.language`
- [x] Persistance `localStorage`
- [x] Direction RTL pour arabe

---

## Jour 4 : Dashboard, Statistiques & Profil

### Objectif
Tableau de bord interactif, statistiques détaillées, et page profil utilisateur premium.

### Backend
- [x] `StatsService` : volume total, fréquence, streak, plateau detection
- [x] `StatsController` : GET `/api/stats/dashboard`, `/api/stats/history`
- [x] `PersonalRecordService` : détection PR (1RM, max reps, max volume)
- [x] `PersonalRecordController` : GET/POST `/api/personal-records`
- [x] Epley formula helper pour estimation 1RM
- [x] CSV/PDF export endpoints

### Frontend
- [x] Dashboard : hero section, 6 stat counters animés (IntersectionObserver + useCountUp)
- [x] Glassmorphism stats cards, featured program card, 8-card grid
- [x] Session history avec staggered fadeIn
- [x] Page Stats : 6 metric cards, bar chart hebdo, muscle distribution
- [x] Page Profile : cover photo upload, avatar upload (base64, localStorage)
- [x] 3 tabs : Overview / Records / Settings
- [x] Level system avec XP bar + streak card + timeline
- [x] PR list, settings form avec bio, logout modal
- [x] Animated background particles + orbs + dumbbells

### Seed Data
- [x] 15 workout sessions pour user `aziz` (63,609 kg total volume)
- [x] 6 personal records (1RM + Volume PRs)
- [x] Test user `seeddemo` / `Demo123!`

---

## Jour 5 : Fonctionnalités Premium, Export & Finalisation

### Objectif
Fonctionnalités avancées : invitation coach, landing page premium, animations de haut niveau, déploiement final.

### Landing Page
- [x] Mesh gradient animé (3 couches)
- [x] Floating orbs with parallax, 40 particles
- [x] Muscle lines SVG (3 courbes animées stroke-dashoffset)
- [x] 5 assiettes flottantes qui tournent
- [x] Barbell illustration SVG (barre tournante + balancement)
- [x] Grid overlay, gradient title, scroll indicator
- [x] 3D tilt feature cards (perspective + shine on mousemove)
- [x] Stat counters animés (useCountUp)

### Coach Invitation
- [x] InviteModal : 6 canaux partage (Copy link, Email mailto:, WhatsApp, SMS, Messenger, Texte brut)
- [x] Template email HTML professionnel (table-based, dark design)
- [x] SMTP email service (configurable, fallback mailto:)

### Animations CSS (30+ keyframes)
- [x] fadeIn, fadeInUp, scaleIn, slideInRight, pulse, shimmer
- [x] meshShift, particleRise, orbFloat, shapeFloat, plateFloat
- [x] benchPress, authParticleRise, authOrbFloat, authMuscleDraw
- [x] authShimmer, authSpin, gymBarGlow, gymPlateSway
- [x] Classes réutilisables : anim-fade, card-hover, btn-pulse, page-enter

### Nettoyage & Déploiement
- [x] Suppression social login (Google/Facebook/Instagram) inutilisés
- [x] Suppression composants morts (BenchPressAnimation, OAuthCallback, socialAuthService)
- [x] Build final : 0 erreurs TypeScript, 0 erreurs Vite
- [x] Taille finale : ~90 KB CSS, ~460 KB JS
- [x] 3 conteneurs Docker opérationnels

---

## Règles & Conventions

### Code
- Composants fonctionnels uniquement (pas de classes)
- Custom hooks pour la logique réutilisable
- Services dédiés pour tous les appels API (Axios)
- Repository pattern + DTO pattern côté backend
- Async/await partout
- Middleware global d'exception

### Base de données
- Chaque collection : `createdAt`, `updatedAt`, `isDeleted` (soft delete)
- Index sur : email, username, userId, exerciseId

### Sécurité
- Mots de passe : BCrypt
- JWT : HS256, 1h d'expiration
- Rate limit : 100 req/min/IP
- CSRF : Header `X-IRONTRACK-CSRF: 1`

### Design System
| Element | Valeur |
|---------|--------|
| Primaire | #DC2626 |
| Fond sombre | #1C1C1E |
| Fond page | #F1F5F9 |
| Succès | #16A34A |
| Warning | #EA580C |
| Texte clair | #F0EEE8 |
| Bordures | rgba(240,238,232,0.04-0.12) |

### HTTP Codes
200 OK / 201 Created / 400 Bad Request / 401 Unauthorized / 403 Forbidden / 404 Not Found / 500 Internal
