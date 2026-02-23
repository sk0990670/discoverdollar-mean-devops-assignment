In this DevOps task, you need to build and deploy a full-stack CRUD application using the MEAN stack (MongoDB, Express, Angular 15, and Node.js). The backend will be developed with Node.js and Express to provide REST APIs, connecting to a MongoDB database. The frontend will be an Angular application utilizing HTTPClient for communication.

The application will manage a collection of tutorials, where each tutorial includes an ID, title, description, and published status. Users will be able to create, retrieve, update, and delete tutorials. Additionally, a search box will allow users to find tutorials by title.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- MongoDB Atlas account (or a local MongoDB instance)

## Project Setup

### 1. Configure Environment Variables

Before running the backend, create a `.env` file inside the `backend/` directory:

```
MONGODB_URI=<your-mongodb-connection-string>
PORT=8081
```

> A `.env` file is already provided with default credentials. Update it if needed.

---

### 2. Node.js Backend

```bash
cd backend
npm install
npm run dev
```

- Runs the server on **http://localhost:8081** using `nodemon` (auto-restarts on file changes).
- For production: `npm start` (runs with plain `node`).

---

### 3. Angular Frontend

```bash
cd frontend
npm install
ng serve
```

- Navigate to **http://localhost:4200/**
- The frontend communicates with the backend at `http://localhost:8081/api`.
- To change the API URL, update `src/environments/environment.ts`.

---

## API Endpoints

| Method | Endpoint                    | Description                  |
|--------|-----------------------------|------------------------------|
| GET    | /api/tutorials              | Get all tutorials            |
| GET    | /api/tutorials/:id          | Get a tutorial by ID         |
| GET    | /api/tutorials/published    | Get all published tutorials  |
| GET    | /api/tutorials?title=value  | Search tutorials by title    |
| POST   | /api/tutorials              | Create a new tutorial        |
| PUT    | /api/tutorials/:id          | Update a tutorial            |
| DELETE | /api/tutorials/:id          | Delete a tutorial            |
| DELETE | /api/tutorials              | Delete all tutorials         |
