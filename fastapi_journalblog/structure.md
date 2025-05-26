app/
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── README.md
├── alembic.ini
├── compose.yml
├── pyproject.toml
├── poetry.lock
├── requirements.txt
├── src/                      # Основной код приложения
│   ├── main.py               # Точка входа (может быть переименована в app.py)
│   ├── config.py             # Конфигурация приложения
│   ├── api/                  # API endpoints
│   │   ├── v1/               # Версия API
│   │   │   ├── init.py
│   │   │   ├── endpoints/    # Разделение эндпоинтов по модулям
│   │   │   │   ├── auth.py
│   │   │   │   ├── demo_auth.py
│   │   │   │   └── ...
│   │   │   └── routers.py    # Или здесь можно объединить все роутеры
│   ├── core/                 # Ядро приложения
│   │   ├── security.py       # Аутентификация, JWT и т.д.
│   │   └── config.py         # Может заменить config.py на верхнем уровне
│   ├── db/                   # Работа с базой данных
│   │   ├── models.py         # ORM модели
│   │   ├── repositories.py   # Паттерн репозиторий (опционально)
│   │   └── session.py        # Сессии БД
│   ├── migrations/           # Миграции Alembic
│   └── schemas/              # Pydantic схемы
├── nginx/                    # Конфигурация nginx
└── tests/                    # Тесты (можно добавить позже)