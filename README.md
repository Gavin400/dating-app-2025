# Real-Time Full-Stack Application

**ASP.NET Core 9 · Angular 19 · SignalR · Azure**

🔗 **Live Demo:** https://dat-2025.azurewebsites.net  
📦 **CI/CD:** GitHub Actions → Azure App Service  
☁️ **Database:** Azure SQL  
🗄 **Storage:** Azure Blob Storage  

---

## Overview

This project was built to explore real-time system design, connection lifecycle management, and production-ready cloud deployment using the .NET ecosystem.

Having worked primarily on structured enterprise backend systems at Infosys (PwC client), I wanted to build something where architectural decisions, trade-offs, and domain boundaries had to be defined from scratch.

The result is a real-time web application that combines:

- Stateful WebSocket communication  
- JWT-based authentication  
- Policy-based authorization  
- Cloud-native deployment  
- CI/CD automation  

---

## Architecture
<img width="1024" height="1536" alt="ChatGPT Image Feb 23, 2026, 11_52_09 PM" src="https://github.com/user-attachments/assets/e5340ce5-4cc3-41e2-9d9f-696568430dfc" />


- Real-time communication handled via SignalR hubs  
- Deployment automated through GitHub Actions  
- Environment-based configuration throughout  
- No secrets stored in source control  

---

## Key Technical Decisions

### Authenticated SignalR Connections

JWT authentication is validated during WebSocket negotiation, not only on REST endpoints.  
Hub access is restricted via claims-based authorization.

---

### Presence Tracking with Multiple Active Connections

People can open the site in different tabs or on several devices all at once. That means a user might show up with multiple connections happening. Connections get tracked based on the user overall. 

```csharp
Dictionary<string, List<string>>
```

A user is marked offline only when their final connection closes.

This implementation is intentionally in-memory.
For horizontal scaling across multiple instances, a distributed cache (e.g., Redis) or Azure SignalR Service would be required.

---

### Policy-Based Authorization

At first, role-based checks seemed to handle things okay. But then there were these more detailed needs, like making sure users could only change their own resources or something like that. It got to the point where policy-based authorization had to step in, I guess.

Defining access rules in a declarative way keeps the controllers from getting too bulky. And yeah, that probably makes everything easier to read overall. Some parts feel a bit straightforward, but it works.

---

### Separation of Concerns

- Controllers remain lightweight
- Business logic lives in services
- Repository pattern abstracts persistence
- Messaging concerns are partially separated from profile logic

  One improvement I would make in a larger system would be clearer domain isolation between messaging and user management earlier in development.

---

 ## Technology Stack

 ### Backend
 - ASP.NET Core 9
 - Entity Framework Core
 - ASP.NET Identity
 - SignalR
 - JWT Authentication

 ### Frontend
 - Angular 19
 - Tailwind CSS
 - DaisyUI
 - SignalR Client

 ### Infrastructure
 - SQL Server (Docker locally → Azure SQL in production)
 - Azure Blob Storage
 - Azure App Service
 - GitHub Actions CI/CD
 - Environment-based configuration

 ---

 ## Deployment

 Push to ``` main ``` → GitHub Actions pipeline builds → Deploys to Azure App Service.
 - Database migrations execute on startup
 - Production configuration uses Azure-managed connection strings.

 ---

 ## Development Workflow

 Docker was used locally to run SQL Server, ensuring development and production database engines remained aligned.
 The application was later deployed using Azure SQL for managed cloud hosting.

 ---

 ## Use of AI Assistance

 AI tools were used during development as an assistive resource for:

 - Researching edge cases
 - Exploring alternative implementations
 - Reviewing architectural trade-offs
 - Iterating on documentation

 All architectural decisions, integration work, debugging, and deployment configuration were implemented and validated manually.

 ---

  ## Running Locally

  ### Backend

  ```
  cd API
  dotnet restore
  dotnet ef database update
  dotnet run
  ```

  ### Frontend

  ```
  cd client
  npm install
  ng serve
  ```

  Runs at:
  ```
  https://localhost:4200
  ```
 ---

<p align="center">
  <img src="https://avatars.githubusercontent.com/u/40817689?v=4" width="30" height="30" style="border-radius:50px;vertical-align:middle;" />
  <sub style="vertical-align:middle;">
    Made with ❤️ by <b>Gavin Peris</b> | 
    <a href="https://www.linkedin.com/in/gavin-peris-25339316a/">LinkedIn</a> | 
    Based in Berlin
  </sub>
</p>



 

 
