# Staskode Dashboard

Документы с поиском и предпросмотром на Vue 3 (Composition API) + Pinia + TypeScript.

## Запуск

1. Установить зависимости:
```bash
npm i
```
2. Создать файл `.env.local` (или использовать переменные окружения) и указать:
```bash
VITE_API_BASE_URL=https://test-app-csm.up.railway.app
```
3. Дев-сервер:
```bash
npm run dev
```

## Продакшн сборка
```bash
npm run build
npm run preview
```

## Docker
```bash
docker build -t staskode-dashboard .
docker run -p 5173:80 -e VITE_API_BASE_URL=https://test-app-csm.up.railway.app staskode-dashboard
```
Или docker-compose:
```bash
docker-compose up --build
```

## Структура
- `src/stores/documents.ts` — Pinia store, запросы, загрузка, ошибки, выбор документа, скачивание, удаление
- `src/shared/*` — переиспользуемые компоненты
- `src/pages/Dashboard.vue` — страница дашборда

Шрифт Montserrat подключен через Google Fonts. Стили адаптивны, компоненты используют scoped стили.
