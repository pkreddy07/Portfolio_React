# Portfolio 

A full-stack React portfolio application powered by a Node.js/Express REST backend built following the Model-View-Controller (MVC) architecture.

---

## Running the application

The project requires two simple commands to run — one for the backend server and one for the React frontend client.

### 1. Start the Backend Server (`/server`)

```bash
cd server
npm install
npm run dev
# Server will start on http://localhost:5000
```

### 2. Start the Frontend Client (`React + Vite`)

```bash
# In a new terminal window at project root
npm install
npm run dev
# Frontend dev server will start on http://localhost:5173
```

---

## Architecture & directory structure

The backend lives cleanly inside the `/server` folder and enforces a modular MVC structure:

```
Portfolio_React/
├── postman_collection.json    # Exported Postman Collection for B1-B7 endpoints
├── package.json               # Root frontend package.json
├── src/                       # React Frontend
│   ├── components/            # UI components (ProjectCard, ContactForm, Navbar, etc.)
│   ├── pages/                 # Route components (Projects, ProjectDetail, Contact, etc.)
│   └── data/                  # Profile & skills data
└── server/                    # Express Backend (MVC Architecture)
    ├── .env                   # Local environment variables
    ├── .env.example           # Example environment variables template
    ├── server.js              # Express app initialization & server startup
    ├── config/                # Environment configuration
    ├── data/                  # Server-side JSON storage
    │   ├── projects.json      # Project records
    │   └── submissions.json   # Persisted contact submissions
    ├── models/                # Data Layer (MVC Models)
    │   ├── projectModel.js    # Data access for projects
    │   └── contactModel.js    # Data access & file persistence for contact form
    ├── controllers/           # Business Logic Layer (MVC Controllers)
    │   ├── projectController.js # Project endpoints handlers
    │   └── contactController.js # Contact form submission & listing handlers
    ├── routes/                # Routing Layer (MVC Routes)
    │   ├── projectRoutes.js   # Endpoint mappings for /api/projects
    │   └── contactRoutes.js   # Endpoint mappings for /api/contact
    └── middleware/            # Middleware Layer
        ├── notFoundHandler.js # Catch-all 404 handler for undefined routes
        └── errorHandler.js    # Global Express error-handling middleware
```

---

## Environment configuration (`.env.example`)

The backend loads configuration settings from `server/.env` using `dotenv`.

Copy `server/.env.example` to `server/.env`:

```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

---

## API documentation & endpoints

### Health Check

#### `GET /`
- **Description**: Confirms the Express API server is running.
- **Response (200 OK)**:
```json
{
  "status": "ok"
}
```

---

### Projects API

#### `GET /api/projects`
- **Description**: Returns all portfolio project items.
- **Response (200 OK)**:
```json
[
  {
    "id": "luminai",
    "title": "lumin.ai",
    "image": "http://localhost:5000/assets/images/project-luminai.png",
    "description": "Lumin.ai is an AI-powered interview platform...",
    "tech": [
      { "name": "HTML", "dot": "#e34c26" },
      { "name": "CSS", "dot": "#563d7c" },
      { "name": "JavaScript", "dot": "#f7df1e" },
      { "name": "Python", "dot": "#3572a5" }
    ],
    "link": "https://github.com/pkreddy07/LuminAI"
  }
]
```

#### `GET /api/projects/:id`
- **Description**: Fetches details for a single project matching the `id`.
- **Response (200 OK)**:
```json
{
  "id": "luminai",
  "title": "lumin.ai",
  "image": "http://localhost:5000/assets/images/project-luminai.png",
  "description": "Lumin.ai is an AI-powered interview platform...",
  "tech": [
    { "name": "HTML", "dot": "#e34c26" },
    { "name": "CSS", "dot": "#563d7c" },
    { "name": "JavaScript", "dot": "#f7df1e" },
    { "name": "Python", "dot": "#3572a5" }
  ],
  "link": "https://github.com/pkreddy07/LuminAI"
}
```
- **Error Response (404 Not Found)**:
```json
{
  "error": "Project not found"
}
```

---

### Contact API

#### `POST /api/contact`
- **Description**: Accepts a new contact form submission, performs server-side validation, and persists the payload.
- **Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello Pranav, I am interested in collaborating!"
}
```
- **Response (201 Created)**:
```json
{
  "message": "Contact form submitted successfully",
  "submission": {
    "id": "1742048400000",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hello Pranav, I am interested in collaborating!",
    "createdAt": "2026-09-14T14:10:00.000Z"
  }
}
```
- **Error Responses (400 Bad Request)**:
  - Missing field: `{ "error": "Name is required" }` / `{ "error": "Email is required" }` / `{ "error": "Message is required" }`
  - Invalid email: `{ "error": "Invalid email format" }`

#### `GET /api/contact`
- **Description**: Retrieves all stored contact form submissions for evaluation/verification.
- **Note on Security**: This endpoint is intentionally open without authentication for grading & verification purposes.
- **Response (200 OK)**:
```json
[
  {
    "id": "1742048400000",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hello Pranav, I am interested in collaborating!",
    "createdAt": "2026-09-14T14:10:00.000Z"
  }
]
```

---

### Undefined routes & global error handling

#### `GET /api/doesnotexist` (Catch-all 404)
- **Response (404 Not Found)**:
```json
{
  "error": "Route not found"
}
```

#### Global error handler
- Any unhandled runtime errors return HTTP 500 JSON payloads without sending HTML stack traces:
```json
{
  "error": "Internal server error"
}
```

---

## Postman & cURL verification

A ready-to-import Postman Collection is included in the project root: `postman_collection.json`.

Sample cURL commands for manual testing:
```bash
# B1 - Health Check
curl -i http://localhost:5000/

# B2 - Get All Projects
curl -i http://localhost:5000/api/projects

# B3 - Get Single Project
curl -i http://localhost:5000/api/projects/luminai
curl -i http://localhost:5000/api/projects/nonexistent

# B4 - Submit Contact Form
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","message":"Great website!"}'

# B4 - Invalid Email Submission (400)
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Bob","email":"invalidemail","message":"Test"}'

# B5 - List Submissions (Verification Endpoint)
curl -i http://localhost:5000/api/contact

# B6 - Catch-all 404 Handler
curl -i http://localhost:5000/api/doesnotexist
```
