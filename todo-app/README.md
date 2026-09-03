# Todo App (React + Express, No Database)

Simple two-tier Todo application:
- **Frontend:** React + Vite (npm)
- **Backend:** Node.js + Express (npm), data stored **in-memory** (no database)

## Project Structure

```
todo-app/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml
└── Jenkinsfile
```

## Run Locally (without Docker)

### Backend
```bash
cd backend
npm install
npm start
```
Backend runs on `http://localhost:5000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`

## Run with Docker Compose

```bash
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Run with Docker (without compose)

```bash
docker network create todo-net

docker build -t todo-backend ./backend
docker run -d --name todo-backend --network=todo-net -p 5000:5000 todo-backend

docker build -t todo-frontend ./frontend
docker run -d --name todo-frontend --network=todo-net -p 3000:80 todo-frontend
```

## API Endpoints (Backend)

| Method | Endpoint       | Description          |
|--------|----------------|-----------------------|
| GET    | /todos         | Get all todos         |
| POST   | /todos         | Add a new todo         |
| PUT    | /todos/:id     | Toggle done/not-done   |
| DELETE | /todos/:id     | Delete a todo          |
| GET    | /health        | Health check            |

## Jenkins Pipeline

The included `Jenkinsfile` runs:
1. Checkout code from GitHub
2. Install & test backend (npm)
3. Install & build frontend (npm)
4. Build Docker images for both
5. Deploy using docker-compose

### Jenkins Agent Requirements
- Git
- Node.js and npm
- Docker
- Docker Compose

## Notes
- No database is used — todos reset when the backend restarts (in-memory storage).
- Update `VITE_API_URL` in `docker-compose.yml` if backend runs on a different host.
