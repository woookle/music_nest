# 🇷🇺 Music Nest API

MusicNest API — это RESTful API, разработанный на NestJS, который позволяет управлять музыкальными файлами и пользователями. Проект использует MongoDB для хранения данных, Express для обработки HTTP-запросов, Multer для загрузки файлов и UUID для генерации уникальных идентификаторов.

## 🚀 Начало работы

### ⚙️ Предварительные требования

- Node.js (v14 или выше)
- MongoDB (v4.0 или выше)

##

### 🛠️ Установка

1. **🔗 Клонируйте репозиторий**
   ```bash
   git clone https://github.com/yourusername/music_nest.git
   cd music_nest
2. **📦 Установите зависимости**
   ```bash
   npm install
3. **🌐 Создайте файл .env в корне проекта и добавьте следующие переменные окружения**
   ```bash
   DATABASE_URL = mongodb://localhost:27017/mydatabase
   PORT = 3000
4. **✨ Запустите проект**
   ```bash
   npm run start
## 📂 Директория для сохранения файлов

В вашем проекте есть директория `uploads`, которая содержит поддиректории `images` и `audios` для сохранения изображений и аудиофайлов соответственно.

### Настройка директории для сохранения файлов

1. **📁 Создайте директорию `uploads`:**
   ```bash
   mkdir uploads
1. **📁 Создайте директорию `uploads`:**
   ```bash
   mkdir uploads/images
   mkdir uploads/audios
## 📓 Документация

### API Endpoints

### 🎶 Музыка

- **GET `/music`** - Получить все музыкальные файлы.

- **GET `/music/:userId`** - Получить все музыкальные файлы пользователя.
  - **Параметры:**
    ```json
    {
      "userId": "string"
    }
    ```

- **POST `/music/upload`** - Загрузить новый музыкальный файл.
  - **Параметры:**
    ```json
    {
      "image": "file",
      "audio": "file",
      "name": "string",
      "userId": "string"
    }
    ```

- **DELETE `/music/delete`** - Удалить музыкальный файл.
  - **Параметры:**
    ```json
    {
      "musicId": "string"
    }
    ```

##

### 👤 Пользователи

- **POST `/user/register`** - Зарегистрировать нового пользователя.
  - **Параметры:**
    ```json
    {
      "nickname": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **POST `/user/login`** - Авторизовать пользователя.
  - **Параметры:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **PATCH `/user/addfavorites`** - Добавить музыкальный файл в избранное.
  - **Параметры:**
    ```json
    {
      "userId": "string",
      "musicId": "string"
    }
    ```

- **DELETE `/user/removefavorites`** - Удалить музыкальный файл из избранного.
  - **Параметры:**
    ```json
    {
      "userId": "string",
      "musicId": "string"
    }
    ```

- **PATCH `/user/changeavatar`** - Изменить аватар пользователя.
  - **Параметры:**
    ```json
    {
      "userId": "string",
      "image": "file"
    }
    ```

- **PATCH `/user/changenickname`** - Изменить никнейм пользователя.
  - **Параметры:**
    ```json
    {
      "userId": "string",
      "newnickname": "string"
    }
    ```

- **PATCH `/user/changepassword`** - Изменить пароль пользователя.
  - **Параметры:**
    ```json
    {
      "userId": "string",
      "newpassword": "string"
    }
    ```

## 🎉 Заключение

<div align='center'>
  <img src='https://media1.tenor.com/m/HBTbcCNvLRIAAAAC/syno-i-love-you-syno.gif' />
  <p><b>Спасибо за интерес к MusicNest API! Мы надеемся, что этот проект поможет вам<br>управлять музыкальными файлами и пользователями легко и эффективно</b> 😊</p>
</div>
