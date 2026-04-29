# Skill Swap Platform

A comprehensive peer-to-peer skill exchange application designed to facilitate knowledge sharing through a professional matching system and real-time communication.

## Demonstration

Video demonstration of the platform:
https://github.com/user-attachments/assets/4da95074-5092-4c49-a711-fbc6cf251ac6

## Project Overview

Skill Swap Platform is a full-stack web application that allows users to list their expertise and discover others who possess the skills they wish to acquire. The platform utilizes an intelligent matching algorithm and real-time messaging to bridge the gap between learners and mentors.

## Key Features

- **Intelligent Matching**: Uses a TF-IDF Cosine Similarity algorithm to suggest the most compatible skill-swap partners based on user profiles.
- **Real-time Communication**: Integrated WebSocket-based messaging system for instant coordination between users.
- **Dynamic Communities**: Specialized groups for domain-specific discussions and networking.
- **Comprehensive Dashboard**: Centralized management of skill requests, matches, and active conversations.
- **Secure Authentication**: Robust JWT-based authentication system with encrypted password storage.
- **Advanced Discovery**: Multi-faceted search and exploration tools to find specific expertise across the network.
- **Responsive Interface**: A professional dark-themed UI built with modern CSS techniques for optimal viewing across all device types.

## Technical Architecture

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks and Context API
- **Networking**: Axios and Socket.io-client

### Backend
- **Runtime**: Node.js
- **Server**: Express.js
- **Database**: SQLite (managed via Prisma ORM)
- **Real-time**: Socket.io
- **Security**: JSON Web Tokens (JWT) and Bcrypt

## Project Structure

```text
├── backend/
│   ├── prisma/          # Database schema and migrations
│   ├── src/
│   │   ├── controllers/ # Request handling logic
│   │   ├── middleware/  # Authentication and security filters
│   │   ├── routes/      # API endpoint definitions
│   │   └── server.js    # Application entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI elements
│   │   ├── layouts/     # Page structure templates
│   │   ├── pages/       # Route-specific views
│   │   └── api/         # Networking configuration
└── render.yaml          # Infrastructure as Code for deployment
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/wcr-karan/skill-swap-new.git
   cd skill-swap-new
   ```

2. Configure Environment Variables:
   Create a `.env` file in the `backend` directory following the provided structure in the codebase.

3. Install Backend Dependencies:
   ```bash
   cd backend
   npm install
   ```

4. Install Frontend Dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Execution

1. Start the Backend Server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the Frontend Development Server:
   ```bash
   cd frontend
   npm run dev
   ```

The application will be accessible at `http://localhost:5173` by default.

## License

This project is licensed under the ISC License.
