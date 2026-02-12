# Dating App — Real-Time Full Stack Project

ASP.NET Core 9 · Angular 19 · SignalR · Azure



I know what you're thinking — another dating app tutorial project. It's not.

After spending three years at Infosys building backend systems for PwC, most of my production work followed well-defined patterns. REST APIs, database queries, JWT auth, standard stuff. Good work, but client requirements don't leave much room to make architectural decisions from scratch.

I wanted a personal project where I had to figure things out rather than follow a spec. A dating platform forced me to deal with problems I hadn't tackled in production: real-time connections, presence tracking, authorization that's more nuanced than checking a role. It's a good stress test because it needs all of it at once — identity, messaging, admin moderation, stateful client-server interaction.



## What I actually cared about building

**Authenticated SignalR connections.** Getting JWT auth to work on WebSocket handshakes, not just REST routes, was the first real hurdle. Most examples online gloss over this part.

**Presence tracking.** This sounds simple until you realise a user might have three tabs open. If they close one tab, they're still online. You only broadcast "offline" when the last connection drops. I ended up tracking connections per user rather than just users — a `Dictionary<string, List<string>>` mapping usernames to connection IDs. It works, but it's in-memory, which means it breaks the moment you scale horizontally. Redis would fix that. I know where the problem is, I just didn't need to solve it for this scale.

**Policy-based authorization.** I started with `[Authorize(Roles = "Admin")]` and it was fine for the first few routes. Then I added photo moderation and needed to say "a user can only delete their own photo." Role checks can't express that cleanly. Policies can. Moving to policy-based auth made the controllers simpler and the access rules easier to reason about.

**Keeping business logic out of controllers.** I've maintained code where controllers do everything — validation, queries, business rules, response mapping. It's painful. This project has a proper service layer and repository pattern, partly because I wanted to practice it properly, partly because I knew I'd be reading my own code three months later.



## Stack

Backend: ASP.NET Core 9, EF Core, ASP.NET Identity, SignalR, JWT  
Frontend: Angular 19, Tailwind CSS, DaisyUI, SignalR client  
Database: SQL Server / Azure SQL  
Storage: Azure Blob Storage  
Deployment: Azure App Service, GitHub Actions CI/CD



## What I'd do differently

The boundary between messaging and user profile management got blurry as features grew. Both touch the `AppUser` entity, and some services ended up doing too much. I'd separate those concerns earlier next time — a proper messaging domain rather than letting it mix with profile logic. You don't see the problem until you're three features in.



## Running it locally

```bash
# Backend
cd API
dotnet restore
dotnet ef database update
dotnet run

# Frontend
cd client
npm install
ng serve
```

Runs at `https://localhost:4200`



## Deployment

Azure App Service. Environment-based config, no secrets in code, migrations run on startup, CI/CD via GitHub Actions.

Live demo: [link once deployment is finalised]

---

Built by Gavin Peris · [LinkedIn](https://www.linkedin.com/in/gavin-peris-25339316a/) · Berlin