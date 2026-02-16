# Skill Swap Platform

A web application that enables users to connect and swap skills with each other. Users can register, list their skills, find others with complementary skills, and initiate swaps.

## Features
- **User Registration & Authentication**: Secure sign-up and login process.
- **Skill Listing**: Users can showcase the skills they can teach.
- **Skill Search**: Find users based on the skills you want to learn.
- **Swap Requests**: Send and manage skill swap requests.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, Prisma, SQLite

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/wcr-karan/skill-swap-new.git
    cd skill-swap-new
    ```

2.  Install dependencies for the backend:
    ```bash
    cd backend
    npm install
    ```

3.  Install dependencies for the frontend:
    ```bash
    cd ../frontend
    npm install
    ```

### Running the App

1.  Start the backend server:
    ```bash
    cd backend
    npm start
    ```

2.  Start the frontend development server:
    ```bash
    cd frontend
    npm run dev
    ```

3.  Open your browser and visit `http://localhost:5173`.

## Project Structure
- `frontend/`: React application with Tailwind CSS.
- `backend/`: Node.js Express server with Prisma ORM.