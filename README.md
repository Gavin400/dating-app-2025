# Dating App — ASP.NET Core 9 + Angular 19

A full-stack, real-time web app with member profiles, photo uploads, likes, paged/filtered member search, private messaging and live presence.

🔗 **Live demo:** https://gavin-dating-app.onrender.com
*(hosted on Render's free tier — the first request after a while may take ~30–60s while the service wakes up)*

---

## Where this project comes from

I built the core of this app by working through Neil Cummings' Udemy course *"Build an app with ASP.NET Core and Angular from scratch"*. The early commit history follows the course sections.

I used the course to get hands-on with parts of the .NET/Angular stack I hadn't used much in my enterprise work at Infosys — SignalR, ASP.NET Identity, and Angular signals. Everything after the course baseline is my own work and is listed below.

## What I did beyond the course

- **Moved the database from SQL Server to PostgreSQL.** I switched the EF Core provider to Npgsql, regenerated the migrations and moved production data to a managed **Neon** Postgres instance.
- **Rehosted from Azure to Render.** My Azure access was time-limited, so I wrote a **multi-stage Dockerfile**. It builds the Angular client, publishes the .NET API with the client served from `wwwroot`, and produces a slim ASP.NET runtime image. That image runs on Render.
- **Configuration through environment variables only.** The connection string, JWT key and Cloudinary credentials all come from the environment. No secrets are committed.

*(This list will grow — see "What I'm adding next".)*

---

## Features

- Registration and login with **ASP.NET Identity** and **JWT** (role claims included in the token)
- Member list with **paging, sorting and filtering**
- Profile editing and **photo upload** via Cloudinary, with an **admin photo-approval** workflow
- **Likes** (who I liked / who liked me / mutual)
- **Private messaging** with read receipts
- **Live presence** and new-message notifications over **SignalR**
- **Role- and policy-based authorization** for admin and moderator areas

## Tech stack

| Layer | Tech |
|---|---|
| Backend | ASP.NET Core 9, EF Core, ASP.NET Identity, SignalR, JWT |
| Frontend | Angular 19, Tailwind CSS, DaisyUI, SignalR client |
| Data | PostgreSQL (Neon in production) |
| Media | Cloudinary |
| Hosting | Docker → Render |

---

## Design notes

These are the parts of the system I can explain and defend in detail.

**Authenticated SignalR connections.** The JWT is validated during the WebSocket negotiation, not only on REST endpoints. Hub access is restricted by claims.

**Presence with multiple connections per user.** One user can have several tabs or devices open, so presence is tracked per user as a set of connection IDs. A user only goes offline when their last connection closes.
**Known limitation:** this state lives in memory, so it only works on a single instance. Scaling out would need a Redis backplane or Azure SignalR Service.

**Unit of Work over repositories.** Controllers depend on a Unit of Work that groups the member, likes, message and photo repositories. Related changes are saved in one transaction.

**Policy-based authorization.** Admin and moderator access is defined as named policies rather than scattered role checks, which keeps the controllers thin.

---

## What I'm adding next

- [ ] Redis backplane for SignalR presence, so the app can run on more than one instance
- [ ] Automated tests: xUnit unit tests, plus API integration tests against Postgres using Testcontainers
- [ ] GitHub Actions CI to build and run tests on every push
- [ ] Health-check endpoint and rate limiting on the auth endpoints

---

## Running locally

**Prerequisites:** .NET 9 SDK, Node 22, and a PostgreSQL instance (local or Neon).

Set the configuration, either in `API/appsettings.Development.json` or as environment variables:

```
ConnectionStrings__DefaultConnection=Host=localhost;Database=datingapp;Username=...;Password=...
TokenKey=<a long random string>
CloudinarySettings__CloudName=...
CloudinarySettings__ApiKey=...
CloudinarySettings__ApiSecret=...
```

**API**
```bash
cd API
dotnet restore
dotnet ef database update
dotnet run
```

**Client**
```bash
cd client
npm install
ng serve
```

**Or run everything with Docker**
```bash
docker build -t dating-app .
docker run -p 8080:8080 --env-file .env dating-app
```

---

Built by **Gavin Peris** · Berlin · [LinkedIn](https://www.linkedin.com/in/gavin-peris-25339316a/)
