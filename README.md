# ServicePulse 🔍
A backend-driven service health monitoring dashboard that auto-pings registered URLs and classifies their status as UP, DEGRADED, or DOWN — in real time.



## 🚩 Problem Statement
Developers and teams managing multiple services, APIs, or URLs often struggle to know when something goes down. ServicePulse solves this by continuously monitoring registered endpoints and giving a live, visual status dashboard — no manual checking needed.

## ✨ Features
- 🔐 JWT-based Authentication (Signup / Login)
- 🌐 Register any URL for monitoring
- ⚡ Auto-pings registered services at intervals
- 🟢 Live status classification — UP, DEGRADED, or DOWN
- 📊 React.js dashboard with live status badges
- 🗃️ PostgreSQL-backed history tracking
- 🐳 Fully Dockerized for portable deployment

## 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| Backend | Java, Spring Boot, REST APIs |
| Frontend | React.js, Vite |
| Database | PostgreSQL |
| Auth | JWT (JSON Web Tokens) |
| DevOps | Docker, Docker Compose |

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js v18+
- PostgreSQL
- Docker (optional)

### 1. Clone the repository
```bash
git clone https://github.com/kante-Ramanaidu/servicepulse.git
cd servicepulse
```

### 2. Setup Environment Variables
Create a `.env` file in the root:
```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/servicemonitor
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=86400000
```

### 3. Run with Docker (Recommended)
```bash
docker-compose up --build
```

### 4. Run Manually

**Backend:**
```bash
cd service-monitor
mvn clean package -DskipTests
java -jar target/service-monitor-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
cd monitor-frontend
npm install
npm run dev
```



 👨‍💻 Author
 Kante Ramanaidu
- GitHub: https://github.com/kante-Ramanaidu
- Email: ramkante84@gmail.com
