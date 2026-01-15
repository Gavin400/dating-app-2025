# Full-Stack Dating Application (.NET & Angular)

This repository contains a full-stack web application developed incrementally over approximately **five months** as a hands-on learning and portfolio project.

The goal of this project was to gain a deep, practical understanding of how real-world web applications are designed, built, and deployed end-to-end, including backend APIs, frontend architecture, authentication, real-time communication, and cloud deployment.

---

## Project Overview

The application is a dating-style platform that allows users to:

- Register and authenticate securely
- Create and manage user profiles
- Upload and display profile photos
- Browse other users with paging, sorting, and filtering
- Like other users and view matches
- Exchange private messages
- See real-time presence and messaging updates

The project follows a clean separation between a **RESTful ASP.NET Core Web API** backend and an **Angular single-page application** frontend.

---

## Technology Stack

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- JWT-based authentication and authorization
- SignalR for real-time messaging and presence
- AutoMapper
- SQL-based persistence with EF Core migrations

### Frontend
- Angular
- Angular Routing and Route Guards
- Reactive Forms and validation
- HTTP interceptors for authentication and error handling
- Tailwind CSS and DaisyUI for UI styling

### Deployment
- Application published to Microsoft Azure
- Cloud-based database and API hosting

---

## Development Timeline

The project was developed incrementally, focusing on understanding each layer before moving on to the next:

- **Month 1:** API setup, Entity Framework Core, basic CRUD operations
- **Month 2:** Authentication, JWT handling, user profiles
- **Month 3:** Angular routing, guards, forms, and validation
- **Month 4:** Private messaging system and real-time features using SignalR
- **Month 5:** Refactoring, performance improvements, bug fixes, and Azure deployment

---

## Key Features Implemented

- Secure user registration and login using JWT authentication
- Protected API endpoints and Angular routes
- Profile photo upload and gallery functionality
- Paging, sorting, and filtering of user data
- Like system and match tracking
- Private messaging between users
- Real-time messaging and online presence using SignalR
- Loading indicators, caching strategies, and UI improvements
- Error handling on both API and frontend layers

---

## Challenges & Learnings

During development, several real-world challenges were encountered and resolved, including:

- Managing JWT tokens and authentication state across the API and Angular application
- Debugging SignalR connection lifecycles and handling reconnect scenarios
- Structuring Angular services and components for scalability
- Handling Entity Framework Core migrations during ongoing development
- Improving perceived performance with caching and loading indicators
- Refactoring features as requirements evolved

---

## Project Purpose

While it is not intended to be a commercial product, it demonstrates practical experience with:

- Full-stack application architecture
- Modern authentication and security patterns
- Real-time communication
- Frontend and backend integration
- Cloud deployment workflows

---

## Future Improvements

Potential future enhancements include:

- Email verification and password reset flows
- Admin and moderation features
- Enhanced monitoring and logging
- Additional UI/UX improvements
- Rate limiting and abuse prevention

---

## Final Notes

This project represents sustained, incremental development and hands-on problem solving over several months. Every feature was implemented, tested, and refined as part of the learning process, with a strong focus on understanding how real-world applications are built and maintained.
