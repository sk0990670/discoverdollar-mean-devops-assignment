# MEAN Stack DevOps Assignment — Containerization & CI/CD Pipeline

This project demonstrates the containerization and automated deployment of a MEAN (MongoDB, Express.js, Angular, Node.js) stack application. The infrastructure is managed using Docker and Docker Compose, with an automated CI/CD pipeline configured via Jenkins. Nginx is used as a reverse proxy to serve the frontend and route API requests securely over port 80.

## 🚀 Technologies Used

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 15 |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Containerization | Docker, Docker Compose |
| Web Server / Reverse Proxy | Nginx |
| CI/CD | Jenkins |
| Cloud Infrastructure | Ubuntu VM (DigitalOcean) |

---

## 📂 Project Structure

```text
.
├── backend/               # Node.js backend application
│   ├── Dockerfile         # Backend container configuration
│   ├── .env               # Environment variables (not committed to Git)
│   └── package.json
├── frontend/              # Angular frontend application
│   ├── Dockerfile         # Multi-stage build (Angular + Nginx)
│   ├── nginx.conf         # Nginx reverse proxy configuration
│   └── package.json
├── docker-compose.yml     # Orchestrates MongoDB, Backend & Frontend containers
├── Jenkinsfile            # Jenkins CI/CD declarative pipeline
└── README.md
```

---

## 💻 Running Locally (Without Docker)

### Prerequisites
- [Node.js](https://nodejs.org/) v16+
- [Angular CLI](https://angular.io/cli): `npm install -g @angular/cli`
- MongoDB Atlas account (or local MongoDB)

### 1. Configure Environment Variables

Create a `.env` file inside `backend/`:

```env
MONGODB_URI=<your-mongodb-connection-string>
PORT=8081
```

> A `.env` file is already provided with default credentials. Update it if needed.

### 2. Run the Backend

```bash
cd backend
npm install
npm run dev
```

Server runs on **http://localhost:8081**

### 3. Run the Frontend

```bash
cd frontend
npm install
ng serve
```

Navigate to **http://localhost:4200**

---

## 🐳 Running with Docker Compose

```bash
docker-compose up -d --build
```

Navigate to **http://localhost** — Nginx serves the Angular frontend on port 80 and proxies `/api` requests to the backend on port 8081.

To stop all containers:
```bash
docker-compose down
```

---

## ⚙️ CI/CD Pipeline — Jenkins + GitHub Webhooks

### 1. Prerequisites (Ubuntu VM)

Ensure your VM has the following installed and that ports `80` (HTTP) and `8080` (Jenkins) are open in your cloud firewall:

```bash
# Stop any host-level Nginx to avoid port conflicts with Docker
sudo systemctl stop nginx
sudo systemctl disable nginx
```

### 2. Jenkins Configuration

1. Open Jenkins Dashboard: `http://<YOUR_VM_IP>:8080`
2. Add Docker Hub credentials:
   - **Manage Jenkins → Credentials → Add**
   - Kind: `Username with password`
   - **ID:** `docker-cred`
3. Create a new **Pipeline** job
4. Under Pipeline section → **Pipeline script from SCM**
5. Select **Git** → provide your repository URL
6. Branch: `main` | Script Path: `Jenkinsfile`

### 3. GitHub Webhook (Auto-trigger on Push)

In your GitHub repository → **Settings → Webhooks → Add webhook**:

```
Payload URL: http://<YOUR_VM_IP>:8080/github-webhook/
Content type: application/json
Trigger: Just the push event
```

### 4. Pipeline Stages

| Stage | Description |
|-------|-------------|
| `Git Checkout` | Pulls latest code from GitHub |
| `Build Docker Images` | Builds backend & frontend Docker images |
| `Push to Docker Hub` | Pushes images to `solosahej/discoverdollar-backend` and `solosahej/discoverdollar-frontend` |
| `Docker Deploy` | Runs `docker-compose up -d --build` to redeploy containers |

---

## 🏗️ Architecture Overview

```
Internet
    │
    ▼ Port 80
 [Nginx Container]
    │
    ├─── /          → Angular static files (built app)
    └─── /api/*     → Proxy → [Backend Container :8081]
                                      │
                                      ▼
                              [MongoDB Container :27017]
                              (Persistent: mongo-data volume)
```

---

## 🌐 Accessing the Deployed Application

Once Jenkins completes the **Docker Deploy** stage:

```
http://<YOUR_VM_PUBLIC_IP>
```

No port needed — Nginx serves everything on port 80.

---

## 📸 Assignment Deliverables & Screenshots

### 1. CI/CD Configuration and Execution
><img width="2159" height="1163" alt="image" src="https://github.com/user-attachments/assets/2e6616d0-fafe-4ebe-aaec-c064a1f2a0da" />
* — Jenkins Dashboard showing successful stages: *Git Checkout → Docker Build → Docker Push → Docker Deploy*

### 2. Docker Image Build and Push
><img width="2159" height="1161" alt="image" src="https://github.com/user-attachments/assets/e1034c25-6469-4b5c-82bc-05c4f3ca8fdc" />
 — Docker Hub showing pushed `discoverdollar-backend` and `discoverdollar-frontend` repositories

### 3. Application Deployment and Working UI
> <img width="2159" height="1299" alt="image" src="https://github.com/user-attachments/assets/d44acdd9-0f8a-4d8f-be2b-7c0eecd372d5" />
 — Browser showing the Angular frontend loaded via the VM's public IP

### 4. Running Containers (Nginx on Port 80)
> <img width="1719" height="355" alt="image" src="https://github.com/user-attachments/assets/529f39e1-39fc-45ad-a623-cda86083692e" />

 — VM terminal output of `docker ps` showing 3 running containers with `0.0.0.0:80->80/tcp`

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tutorials | Get all tutorials |
| GET | /api/tutorials/:id | Get tutorial by ID |
| GET | /api/tutorials/published | Get published tutorials |
| GET | /api/tutorials?title=value | Search by title |
| POST | /api/tutorials | Create tutorial |
| PUT | /api/tutorials/:id | Update tutorial |
| DELETE | /api/tutorials/:id | Delete tutorial |
| DELETE | /api/tutorials | Delete all tutorials |

## 📝 Detailed Documentation (Notion)

For a comprehensive, step-by-step guide detailing everything from Jenkins installation to the final application deployment, please refer to my complete Notion documentation below:

🔗 **[Discover Dollar DevOps Assignment - Complete Setup Guide](https://www.notion.so/Discover-Dollar-DevOps-Engineer-Internship-Assignment-3103356021ee806ea6e5ef4fdea00c5f?source=copy_link)**

---
