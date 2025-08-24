# Insta-Fista Social Application

This is a full-featured Insta-Fista built using the MERN stack (MongoDB, Express.js, React.js, Node.js), with Redux for state management, ShadCN UI for modern styling, and Socket.io for real-time features. The application replicates core Instagram functionalities such as user profiles, posts, comments, likes, followers, and real-time notifications.

## 🚀 Live Demo & Repository

- **🌐 Live Application**: [https://new-jfuz.onrender.com/](https://new-jfuz.onrender.com/)
- **📱 GitHub Repository**: [https://github.com/Jitugandhare/Insta](https://github.com/Jitugandhare/Insta)

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)
- [Challenges Faced](#challenges-faced)
- [License](#license)

## Features

- **User Authentication**: Secure login and registration using JWT.
- **User Profiles**: Create, edit, and view user profiles, posts, followers, and following lists.
- **Posts**: Create, edit, delete, and view posts, with support for image uploads.
- **Likes and Comments**: Like and comment on posts with real-time updates.
- **Follow/Unfollow**: Follow or unfollow other users, and see followers/following counts.
- **Real-Time Notifications**: Get real-time notifications for likes, comments, and follows using Socket.io.
- **Real-Time Chat**: Chat with other users in real time.

## Tech Stack

### Frontend:
- **React.js**: For building the single-page application (SPA).
- **Redux**: For state management.
- **ShadCN UI**: For modern user interface styling.

### Backend:
- **Node.js & Express.js**: For building RESTful APIs.
- **MongoDB**: NoSQL database for storing user data, posts, comments, and chats.
- **Socket.io**: For implementing real-time chat and notifications.

## Installation

### Prerequisites:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Steps to Run Locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/Jitugandhare/Insta.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Insta
    ```

3. Install dependencies for both client and server:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

4. Create a `.env` file in the `server` folder and add the following:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

5. Start the server:
    ```bash
    cd backend
    npm start
    ```

6. Start the client:
    ```bash
    cd frontend
    npm start
    ```

7. Open your browser and navigate to `http://localhost:8080`.

## Usage

- **Sign Up / Log In**: Create a new account or log in to an existing one.
- **Create Posts**: Upload images, add captions, and share posts.
- **Engage with Posts**: Like and comment on other users' posts in real-time.
- **Follow Users**: Follow or unfollow users and stay updated with their content.
- **Chat**: Send and receive messages in real-time.
- **Direct Messaging**: Extend chat features to support one-on-one messaging.

## API Endpoints

Here are some key API endpoints used in the application:

### Authentication
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in a user and receive a JWT token.

### Posts
- `POST /posts`: Create a new post.
- `GET /posts`: Get all posts.
- `GET /posts/:postId`: Get a single post by ID.
- `PUT /posts/:postId`: Edit a post.
- `DELETE /posts/:postId`: Delete a post.

### Likes and Comments
- `POST /posts/:postId/like`: Like a post.
- `POST /posts/:postId/comment`: Comment on a post.

### Follow/Unfollow
- `POST /user/followersorunfollow/{userId}`: Follow or unfollow a user.

### Real-Time Notifications
- Socket.io event channels for real-time updates (e.g., `likes`, `comments`, `follows`).

## Future Enhancements

- **Stories**: Allow users to post temporary stories similar to Instagram.
- **Advanced Search**: Add filters for searching posts based on hashtags or keywords.
- **User Analytics**: Add analytics to track user engagement.

## Challenges Faced

- **Real-Time Updates**: Implementing efficient real-time chat and notification systems with Socket.io.
- **Image Uploads**: Handling file uploads and managing image storage.
- **State Management**: Managing the application state efficiently using Redux.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### 👨‍💻 Developer
**Jitu Gandhare**

Feel free to explore the live application and contribute to the project!
