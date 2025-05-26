# 📝 FastAPI JournalBlog
## To run : 
```bash
docker compose up
```
http://127.0.0.1:8000/ back
http://127.0.0.1:8080/ adminer
---
A lightweight blog system built with FastAPI, supporting user registration, login, and full CRUD operations for articles. Ideal for learning FastAPI, JWT authentication, and SQLAlchemy ORM in a real-world scenario.

---

## 🚀 Features

- ⚡ High-performance asynchronous RESTful API with FastAPI
- 🧱 SQLAlchemy for database ORM with async support
- 🔐 JWT-based authentication system
- 📦 Dependency injection with FastAPI's DI system
- 🧩 Microservices project structure
- 📄 Interactive API documentation (Swagger UI & Redoc)
- ✅ Unit tests with pytest
- 🔧 Environment configuration management

---
## 🧰 Tech Stack

- **Python 3.8+**
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **SQLAlchemy** - ORM with async support
- **Pydantic** - Data validation
- **JWT** - JSON Web Token authentication
- **pytest** - Testing framework
- **alembic** (Optional) - Database migrations

---
## 📁 Project Structure

```text
fastapi_journalblog/
├── app/
│   ├── main.py              # Application entry point
│   ├── models/              # Database models
│   ├── routers/             # API route handlers
│   ├── schemas/             # Pydantic models
│   ├── services/            # Business logic layer
│   └── dependencies.py      # Auth dependencies
├── tests/                   # Test cases
├── alembic/                 # Database migrations (optional)
├── .env.example             # Environment template
├── LICENSE
├── README.md
└── README.zh.md
