# IronTrack — Bodybuilding Platform

## Stack
- Frontend: React 19 + Vite + Bootstrap 5 + Axios + React Router DOM
- Backend: ASP.NET Core 8 Web API (C#) + JWT Auth
- DB: MongoDB (MongoDB.Driver)
- DevOps: Docker + Docker Compose + GitHub

## Architecture
- Frontend: components/ pages/ services/ hooks/ context/ routes/
- Backend: Controllers/ Services/ Repositories/ Models/ DTOs/ Middleware/
- Collections: users, programs, workout_sessions, exercises, personal_records, notifications

## Core Features
- Auth: register/login/logout JWT + refresh token + RBAC (User / Coach / Admin)
- Programs: create/edit/clone programs → weeks → days → exercises (sets, reps, rest, RPE)
- Workout Logger: live session logging — weight, reps, RPE, rest timer, auto-save
- PR Detection: auto-detect personal records + 1RM estimate (Epley formula)
- Stats: volume charts, muscle heatmap, frequency, streak, plateau detection, CSV/PDF export
- Coach: multi-athlete dashboard, assign programs, review logs
- Admin: user management, content moderation, exercise library management

## Models (key fields)
- workout_sessions: userId, programId, date, duration, exercises[{name, sets[{weight,reps,rpe,isSuccess}]}], totalVolume
- personal_records: userId, exerciseId, type(1RM|max_reps|max_volume), value, achievedAt
- programs: userId, name, goal, weeks[{days[{exercises[{exerciseId,sets,reps,rest}]}]}]

## Rules
- Functional components only, custom hooks, services for all API calls
- Repository pattern + DTO pattern, async/await, global exception middleware
- Every collection has: createdAt, updatedAt, isDeleted (soft delete)
- Passwords: BCrypt | JWT: HS256, 1h expiry | Rate limit: 100req/min/IP
- HTTP: 200 OK / 201 Created / 400 / 401 / 403 / 404 / 500

## Colors
Primary #DC2626 | Dark #1C1C1E | Success #16A34A | Warning #EA580C | BG #F1F5F9

## Progress

### Done
- Full backend: Models, DTOs, Repositories, Services, Controllers, Middleware, Helpers (Epley formula), JWT auth + BCrypt
- Full frontend: services, context, hooks, routes, components (Navbar, Footer, AnimatedCounter, WorkoutNavbar, LangSwitcher, InviteModal), pages (Landing, Login, Register, Dashboard, Programs, WorkoutLogger, Stats, Profile, OpenCode)
- Docker Compose (MongoDB + backend:5000 + frontend:3000) with Nginx SPA routing
- 8 workout programs (full exercise data) + i18n (5 languages + RTL Arabic)
- Programs page redesigned as AI Coach chatbot with 40+ KB entries
- SMTP email backend + Invite modal (copy link + SMTP send)
- **15 workout sessions seeded** for user `aziz` (63,609 kg total volume, 15 sessions spanning 30 days)
- **6 personal records seeded** (1RM + Volume PRs for Bench/Squat/Deadlift)
- **10 exercises seeded** in MongoDB (Bench Press, Squat, Deadlift, OHP, Pull Up, etc.)
- **Translation fixes**: Added `beginnerToAdvanced` + `intermediateToAdvanced` to fr/ar; Fixed English descriptions for massGain/strength/aesthetic
- **Bootstrap RTL**: Dynamic CSS loading via CDN — `bootstrap.rtl.min.css` for Arabic, `bootstrap.min.css` for LTR
- **Invite modal redesigned**: 2 modes (Copy Link → works without SMTP + Email → SMTP required)
- **SMTP placeholder validation removed**: Backend no longer blocks placeholder credentials (Gmail decides)
- **SMTP diagnostic improved**: Tests real TCP connectivity to smtp.gmail.com:587
- **Responsive CSS**: 11 media queries covering 900/600/400px breakpoints for all pages

### In Progress
- None

### Blocked
- Gmail SMTP — requires user to generate App Password at https://myaccount.google.com/apppasswords and update docker-compose.yml

## DB Seed Data
- User `aziz@gmail.com` / pw not known (can reset via registration)
- 15 workout sessions (12 completed, 63,609 kg total)
- Test user `seeddemo` / `Demo123!` (can create more test data)
