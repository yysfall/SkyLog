# SkyLog — Personal Skywatching Journal

> A full-stack web application for amateur astronomers and astronomy enthusiasts to record, organize, and manage their personal skywatching observations.

**Live site:** https://yysfall.github.io/SkyLog/
**API:** https://skylog-7til.onrender.com/health 
**Demo video:** https://drive.google.com/drive/folders/1MmTq2xBoGF0Hwwn37qtCMGmXSC2dJsCb

![SkyLog Dashboard](docs/assets/screenshot.png)

## What it does

- Create a new skywatching observation
- Record the name of a celestial object
- Categorize observations by object type
- Record the date and time of an observation
- Record the observation location
- Record equipment used
- Record sky conditions
- Add personal observation notes
- Give an observation a rating from 1 to 5
- Browse saved observations
- View individual observation details
- Edit existing observations
- Delete observations
- Manage observations through a REST API

## Built with

SkyLog is a full-stack JavaScript application using React and Vite on the frontend, Node.js and Express on the backend, and PostgreSQL for persistent data storage.

| **Component** | **Technology** | **Purpose** |
|---|---|---|
| Frontend | React | Builds the user interface |
| Frontend tooling | Vite | Provides the development environment and build system |
| Programming language | JavaScript | Used for frontend and backend application logic |
| Backend runtime | Node.js | Runs the server-side application |
| Backend framework | Express | Handles HTTP requests and REST API routes |
| Database | PostgreSQL | Stores observation records |
| Database library | `pg` | Connects the Express API to PostgreSQL |
| Frontend routing | React Router | Handles navigation between application pages |
| API architecture | REST | Provides Create, Read, Update, and Delete operations |

## Security

Basic security practices were considered during development.

The project:

- Stores database credentials in environment variables.
- Keeps `.env` files out of the source code repository.
- Uses parameterized PostgreSQL queries.
- Validates required fields on the backend.
- Restricts ratings to the range of 1 to 5.
- Handles invalid IDs before performing database operations.
- Does not intentionally expose server stack traces through API responses.
- Uses React's normal JSX rendering for user-provided text instead of inserting raw HTML.

The project's security decisions and checklist are documented separately in:

```text
SECURITY-CHECKLIST.md
```

## Environment Variables

Sensitive environment variables should not be committed to GitHub.

The server uses environment variables for its PostgreSQL connection.

Example:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=skylog_db
DB_USER=postgres
DB_PASSWORD=YOUR_ACTUAL_POSTGRES_PASSWORD
```

### Server Environment Variables

| **Name** | **Purpose** |
|---|---|
| `PORT` | Port used by the Express server |
| `DB_HOST` | PostgreSQL host |
| `DB_PORT` | PostgreSQL port |
| `DB_NAME` | PostgreSQL database name |
| `DB_USER` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |

The actual `.env` file should remain local and should not be committed to the repository.

## Running It Yourself

### Prerequisites

Install the following before running SkyLog:

- Node.js
- npm
- PostgreSQL
- Git
- A modern web browser

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd skylog
```

### 2. Create the PostgreSQL database

Open PostgreSQL or pgAdmin and create a database named:

```text
skylog_db
```

Run the SQL from:

```text
database/schema.sql
```

This creates the `observations` table.

### 3. Configure the backend

Open a terminal and go to the server directory:

```bash
cd server
```

Install the dependencies:

```bash
npm install
```

Create:

```text
server/.env
```

Add:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=skylog_db
DB_USER=postgres
DB_PASSWORD=YOUR_ACTUAL_POSTGRES_PASSWORD
```

Replace the password with your local PostgreSQL password.

### 4. Start the API

From the `server` directory:

```bash
npm run dev
```

The API should be available at:

```text
http://localhost:3000
```

### 5. Test the API

Check whether the Express server is running:

```text
http://localhost:3000/health
```

Check database connectivity:

```text
http://localhost:3000/health/db
```

Check the observations endpoint:

```text
http://localhost:3000/api/observations
```

### 6. Start the React frontend

Open another terminal.

From the project root:

```bash
cd client
npm install
npm run dev
```

Vite will normally provide:

```text
http://localhost:5173
```

Open the provided address in a browser.

## Deployment

SkyLog is designed to use separate hosting for the frontend, API, and database.

```text
┌───────────────────────────────┐
│         GitHub Pages          │
│                               │
│       React + Vite            │
│         Frontend              │
└───────────────┬───────────────┘
                │
                │ HTTPS
                ▼
┌───────────────────────────────┐
│            Render             │
│                               │
│      Node.js + Express        │
│           REST API            │
└───────────────┬───────────────┘
                │
                │ PostgreSQL
                ▼
┌───────────────────────────────┐
│      Hosted PostgreSQL        │
│                               │
│       observations table      │
└───────────────────────────────┘
```

### Frontend

The React/Vite frontend can be deployed to GitHub Pages.

### API

The Express API can be deployed to Render or another Node.js-compatible hosting provider.

The API requires its PostgreSQL environment variables to be configured through the hosting provider.

### Database

The PostgreSQL database can be hosted using a PostgreSQL-compatible provider.

The `database/schema.sql` file should be executed against the hosted database to create the required table.

## CORS

Because the React frontend and Express API are hosted separately, the API must allow requests from the deployed frontend domain.

During local development, the frontend normally runs at:

```text
http://localhost:5173
```

The deployed frontend will use its GitHub Pages address.

The production CORS configuration should allow the actual frontend origin rather than allowing every website to make requests to the API.

## Project Structure

```text
skylog/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ObservationCard.jsx
│   │   │   └── ObservationForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Observations.jsx
│   │   │   ├── ObservationDetails.jsx
│   │   │   └── EditObservation.jsx
│   │   │
│   │   ├── services/
│   │   │   └── observations.js
│   │   │
│   │   ├── styles/
│   │   │   └── global.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── routes/
│   │   └── observations.js
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── database/
│   └── schema.sql
│
├── docs/
│   └── assets/
│       └── screenshot.png
│
├── AI-USAGE.md
├── SECURITY-CHECKLIST.md
├── README.md
└── LICENSE
```

## What I Would Do Next

If development continued beyond the final submission, I would consider:

- Adding user authentication so multiple users could maintain separate observation journals.
- Adding search and filtering by object name, type, date, or location.
- Adding sorting options for observation history.
- Adding astronomy-specific information such as coordinates, magnitude, and visibility conditions.
- Adding charts showing observation activity over time.
- Allowing users to attach observation images.
- Connecting the application to an astronomy API for additional information about celestial objects.
- Improving the mobile experience for users recording observations outdoors.
- Adding automated testing for the REST API and React components.

## Author

Paul Janry Dela Bueno

Bachelor of Science in Computer Science  
Holy Angel University
CS-401

## AI Use

SkyLog was developed with AI assistance during the planning, implementation, debugging, interface design, and documentation stages of the project.

The primary AI assistant used was **ChatGPT**. AI assistance was used to help with areas such as:

- Full-stack project planning
- PostgreSQL setup and schema design
- Express REST API development
- React components
- API service functions
- Form validation
- CRUD implementation
- Debugging
- UI and CSS improvements
- Documentation

AI-generated suggestions and code were reviewed, tested, modified, and integrated during development. The author made development decisions, tested the application, identified and corrected problems, and worked on the integration of the frontend, backend, and database.

[![Built with AI assistance](https://img.shields.io/badge/built%20with-AI%20assistance-0b5fff)](AI-USAGE.md)

The complete record of AI-assisted development, including specific uses, incorrect AI suggestions, corrections, and the parts of the project implemented and understood by the author, is documented in:

[AI-USAGE.md](AI-USAGE.md)

## Licence

MIT License.

See [LICENSE](LICENSE) for the complete license text.
