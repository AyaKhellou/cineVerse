# Movie App 🎬

A movie discovery web application built with React and Firebase.

Users can browse trending movies, search for titles, explore genres, view detailed movie information, and save favorite movies to their personal account.

## Live Demo

[live]

## Screenshots

![alt text](./public/image.png)
![alt text](./public/image-1.png)
![alt text](./public/image-2.png)
![alt text](./public/image-3.png)
![alt text](./public/image-4.png)
![alt text](./public/image-5.png)

## Features

- 🔍 Search movies using TMDB API
- 🎭 Browse movies by genre
- 📈 Discover trending movies
- ❤️ Save and manage favorites
- 🔐 User authentication with Firebase
- 👤 User profile page
- 🎬 Detailed movie pages with:
  - Overview
  - Ratings
  - Cast information
  - Similar movie recommendations
- 📱 Responsive design for desktop and mobile

## Tech Stack

### Frontend

- React 19
- Vite
- React Router DOM

### Backend & Database

- Firebase Authentication
- Cloud Firestore

### External APIs

- TMDB (The Movie Database) API

### Styling

- Modular CSS architecture
- CSS Variables
- Shared utility classes
- Responsive layouts

## Project Structure

```txt
src/
├── components/
├── pages/
├── hooks/
├── services/
├── context/
├── styles/
├── App.jsx
└── main.jsx
```

## Installation

### Clone the repository

```bash
git clone https://github.com/AyaKhellou/movie-app.git
```

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Environment Variables

Create a `.env` file and add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_api_key
```

If using your own Firebase project, update the configuration inside:

```txt
src/firebase-config.js
```

## What I Learned

Through this project I practiced:

- Building a multi-page React application
- Working with external REST APIs
- Authentication and user management
- Firestore database operations
- State management with React hooks and context
- Responsive UI development
- Organizing a scalable React project structure