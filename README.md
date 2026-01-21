# Full-Stack Dating Application (.NET & Angular)

A **full-stack web application** built as a self-directed portfolio project, focusing on **real-world features** such as authentication, real-time communication, and role-based access control.

---

## 🚀 Key Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based and policy-based access (User / Admin)

### 💬 Real-Time Messaging (SignalR)
- Online/offline presence tracking
- Private messaging with group-based hubs
- Authenticated SignalR connections
- Message persistence using Entity Framework Core

### 🧑‍💼 Admin Features
- Protected admin routes
- User management
- Photo management and moderation
- Role-based UI rendering

### 🎨 User Experience
- Profile management and photo uploads
- Paging, sorting, and filtering
- Responsive UI using Tailwind CSS and DaisyUI
- Toast notifications and loading indicators

---

## 🧱 Tech Stack

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- ASP.NET Identity
- JWT Authentication
- SignalR (real-time messaging & presence)
- AutoMapper
- SQLite (development)

### Frontend
- Angular
- Angular Routing & Route Guards
- Reactive Forms & Validation
- HTTP Interceptors
- SignalR Client
- Tailwind CSS & DaisyUI

### Tooling
- Git & GitHub
- Visual Studio Code
- Angular CLI & .NET CLI

---

## ▶️ Run Locally

```bash
# Backend
cd API
dotnet restore
dotnet ef database update
dotnet run

# Frontend
cd ../client
npm install
ng serve
```

## Local URLs

- API: https://localhost:5001
- Client: http://localhost:4200

##  ☁️ Deployment (In Progress)

- The application is currently being prepared for deployment to Microsoft Azure, including:
- API hosting on Azure App Service
- Cloud database configuration
- Environment-based configuration
- A live URL will be added once deployment is complete.

##  🔮 Future Improvements

- Email verification and password reset flows
- Read receipts and typing indicators
- Admin analytics dashboard
- Improved monitoring and logging
- CI/CD pipeline using GitHub Actions
- Performance and scalability enhancements
