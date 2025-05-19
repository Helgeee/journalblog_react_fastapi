FROM python:3.12-slim

RUN pip install poetry
RUN poetry config virtualenvs.create false

ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY pyproject.toml poetry.lock ./
RUN poetry install --no-interaction --no-ansi --no-root
COPY . .
EXPOSE 4000
CMD ["python", "main.py"]