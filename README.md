### Task Management API in Node.js with Express
This project is a simple RESTful API for managing tasks, built using Node.js and Express. It allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks.

#### Features
- Create a new task
- Get the list of all tasks
- Delete a task by ID

#### Prerequisites
- Node.js installed on your machine
- Postman or any other API testing tool (ex: HTTPie, curl)

### Project and Directory Architecture

This project does follow the MVC (Model-View-Controller) architecture pattern, which separates the application logic into three interconnected components.

```

Project Root
├── server.js              # Entry point of the application
├── .env                    # Environment variables
├── controllers/            # Handles application logic
│   └── taskControllers.js  # Task Controllers
├── models/                 # Manages data and business logic
│   └── taskModel.js        # Task Model
├── routes/                 # Defines API endpoints
│   └── taskRoutes.js       # Task CRUD Routes
├── data/                   # (Optional) Stores in-memory data
│   └── tasks.js            # In-memory task storage (if used)
├── package.json            # Project metadata and dependencies
├── README.md               # Project documentation

```

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   node server.js
   ```

### Setting Up Environment Variables
Create a `.env` file in the root directory and add the following environment variables:
```
PORT=3000
LOCALHOST_URI=http://localhost:

```
#### API Endpoints
- **GET /tasks**: Retrieve the list of all tasks.
- **POST /tasks**: Create a new task. Requires a JSON body with `title` and `description`.
- **DELETE /tasks/:id**: Delete a task by its ID.

#### Usage
Use Postman or any API testing tool to interact with the API endpoints after the server is running. 

For example, to create a new task, send a POST request to `http://localhost:3000/tasks` with a JSON body:
```json
{
    "title": "New Task",
    "description": "Task description"
}
```