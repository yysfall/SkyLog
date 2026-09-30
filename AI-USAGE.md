# AI Usage — SkyLog

**Project:** SkyLog — Personal Skywatching Journal  
**Badge:** Builds Full-Stack JavaScript and AI  

---

## 1. How I Used AI

I used ChatGPT as a development and learning assistant throughout the development of SkyLog. I used it to help me understand unfamiliar concepts, plan the project structure, create initial code suggestions, troubleshoot errors, improve the user interface, and organize project documentation.

I did not treat AI-generated code as automatically correct. I reviewed the suggestions, compared them with my existing implementation, tested them in the application, and modified or rejected them when necessary.

The following entries document the main instances where I used AI during the development of SkyLog.

---

### Entry 1 — Project Planning and Structure

**Date:** September 20, 2026  
**Tool:** ChatGPT

#### What I asked it for

I asked ChatGPT to help me plan a full-stack application called SkyLog, which is a personal skywatching journal.

#### What it gave me

ChatGPT suggested separating the project into a frontend, backend, and database layer.

It suggested a structure similar to:

```text
skylog/
├── client/
├── server/
└── database/
```

It also suggested pages for viewing observations, creating observations, and viewing individual observation details.

#### What I kept

I kept the general separation between:

- React frontend
- Express backend
- PostgreSQL database

I also kept the idea of dividing development into increments instead of attempting to complete the entire application at once.

#### What I changed

I adapted the suggested structure to the actual requirements of SkyLog.

I made the final decisions about which pages and features were needed for my project.

#### Why

The AI suggestions gave me a starting point, but I needed to decide which features were realistic and relevant to my own application.

#### Commit

https://github.com/yysfall/SkyLog/commit/791990ee454b980d7a7ef587078a6987313a8dc2

---

### Entry 2 — PostgreSQL Setup and Schema

**Date:** September 20, 2026  
**Tool:** ChatGPT

#### What I asked it for

I asked ChatGPT how to start PostgreSQL and how I should structure the database for SkyLog.

#### What it gave me

ChatGPT explained that the PostgreSQL database contains the actual database structure used by the application, while the schema file contains SQL statements that can be used to recreate that structure.

#### What I kept

I kept the use of:

```text
database/schema.sql
```

as the database schema file.

The main table is:

```text
observations
```

The table stores:

- Observation ID
- Object name
- Object type
- Observation date and time
- Location
- Equipment
- Sky conditions
- Notes
- Rating
- Creation timestamp

#### What I changed

I chose the fields based on what I wanted a user to record when making a skywatching observation.

#### Why

I wanted the database to represent an actual observation journal instead of being a generic CRUD example.

For example, `equipment` allows the user to record the telescope or equipment used, while `sky_conditions` records the condition of the sky during the observation.

#### Commit

https://github.com/yysfall/SkyLog/commit/3e160d3ccf8e63f7c04d48bd18099b827cbbf569

---

### Entry 3 — Express REST API

**Date:** September 20, 2026  
**Tool:** ChatGPT

#### What I asked it for

I asked ChatGPT for help implementing the Express backend and REST API for SkyLog.

I wanted the backend to support CRUD operations for observations.

#### What it gave me

ChatGPT explained how Express routes correspond to HTTP methods and suggested an initial API structure:

```text
GET    /api/observations
GET    /api/observations/:id
POST   /api/observations
DELETE /api/observations/:id
```
#### What I kept

I kept the REST API approach and later added the Update operation:

```text
PUT /api/observations/:id
```
#### What I changed

I adapted the API to the actual fields in my PostgreSQL table.

I also added validation and error handling.

I also used parameterized SQL queries.

#### Why

The AI-generated API examples were only starting points. They needed to be changed to work with my actual database structure and application requirements.

#### Commit

https://github.com/yysfall/SkyLog/commit/c909a9715e6c35c92a5751ffde5b1ecf540aa606

---

### Entry 4 — React API Service

**Date:** September 20, 2026  
**Tool:** ChatGPT

#### What I asked it for

I asked ChatGPT how to organize API requests in the React application.

I wanted to avoid putting all of the `fetch()` requests directly into each page.

#### What it gave me

ChatGPT suggested creating a separate service file for API communication.

I created:

```text
client/src/services/observations.js
```

#### What I kept

The service contains functions for:

```text
getObservations()
getObservationById()
createObservation()
updateObservation()
deleteObservation()
```

I also used a shared response-handling function to process successful and unsuccessful API responses.

#### What I changed

I adapted the service functions to the actual URL of my Express API and the response format returned by my backend.

#### Why

Separating API requests into a service file makes the React pages easier to understand.

The page can call:

```js
await updateObservation(id, form);
```

without needing to contain all of the HTTP request details.

#### Commit

https://github.com/yysfall/SkyLog/commit/c909a9715e6c35c92a5751ffde5b1ecf540aa606

---

### Entry 5 — Observation Form

**Date:** September 27, 2026  
**Tool:** ChatGPT

#### What I asked it for

I asked ChatGPT for help creating the React form used to create an observation.

I wanted the form to use React state and validate important fields before submitting.

#### What it gave me

ChatGPT suggested using controlled inputs with React `useState`.

The form stores its current values in React state and updates the state whenever the user changes an input.

#### What I kept

I kept the controlled form approach.

#### What I changed

I adapted the form to SkyLog's actual options.

Object types include:

```text
Planet
Moon
Star
Galaxy
Nebula
Star Cluster
Other
```

The rating is represented using values from 1 to 5.

I also added form error handling and a saving state.

#### Why

The form needed to match the actual purpose of SkyLog rather than being a generic form.

I also wanted the form structure to be reusable when editing an existing observation.

#### Commit

https://github.com/yysfall/SkyLog/commit/c2b60341ce1590be84c51145f1b2552db1e142f6

---

### Entry 6 — Update and Edit Functionality

**Date:** September 27, 2026  
**Tool:** ChatGPT

#### What I asked it for

I asked ChatGPT for help implementing the Update part of CRUD.

I needed users to be able to open an existing observation, edit its information, save the changes, and return to the observation details.

#### What it gave me

ChatGPT suggested:

```text
PUT /api/observations/:id
```

and an `updateObservation()` function on the frontend.

It also suggested creating:

```text
/observations/:id/edit
```

as the edit route.

#### What I kept

I kept the general workflow:

```text
Observation Details
        ↓
Edit button
        ↓
Edit Observation page
        ↓
Load existing data
        ↓
Change form values
        ↓
PUT request
        ↓
PostgreSQL UPDATE
        ↓
Return to Details
```

#### What I changed

I adapted the implementation to my existing React Router configuration and components.

I also had to handle date conversion.

PostgreSQL returns the observation date as a timestamp, while the HTML `datetime-local` input expects a specific format.

I therefore converted the database timestamp before placing it into the form.

#### Why

The generated code did not automatically know the exact structure of my existing application or how my database timestamp was being returned.

I needed to integrate the feature into my existing project rather than simply copying the generated example.

#### Commit

https://github.com/yysfall/SkyLog/commit/caafac9bb45130c98d1027e244b3001a1785189f
https://github.com/yysfall/SkyLog/commit/2868ee66ce8a5c315ef1bc0269fca65dd5ce107b
https://github.com/yysfall/SkyLog/commit/2233e8964bbd1872a9b7393938ced1ae7b255827

---

### Entry 7 — UI and Visual Design

**Date:** October 1, 2026  
**Tool:** ChatGPT

#### What I asked it for

I asked ChatGPT to help improve the SkyLog user interface because the original interface looked too generic and relied heavily on standard rounded cards.

I wanted the application to have a more distinctive astronomy and observatory logbook style.

#### What it gave me

ChatGPT suggested improvements involving:

- Layout
- Typography
- Spacing
- Cards
- Buttons
- Forms
- Navigation
- Visual hierarchy
- Interactive states

#### What I kept

I established and used the following SkyLog color palette:

| Color | Hex | Purpose |
|---|---|---|
| Midnight Navy | `#0B1020` | Main application background |
| Deep Space | `#141B2D` | Cards and elevated surfaces |
| Stellar Blue | `#253858` | Secondary surfaces and borders |
| Starlight | `#F4F6FC` | Main text |
| Muted Silver | `#A7B0C0` | Secondary text |
| Cosmic Purple | `#9B8AFB` | Primary accent |
| Aurora Teal | `#5ED6C0` | Positive/success states |
| Alert Coral | `#F17C83` | Errors and destructive actions |

#### What I changed

I did not keep every AI-generated design suggestion.

I adjusted the CSS to make the interface more consistent with the SkyLog concept.

I reduced unnecessary rounded-card styling and used:

- Dark astronomy-inspired surfaces
- Thin borders
- Editorial spacing
- Stronger visual hierarchy
- Subtle astronomy-inspired elements
- More distinctive buttons
- Responsive layouts

I also specifically improved the Save Observation button so that the main action was visually clear.

#### Why

I wanted SkyLog to look like a dedicated astronomy observation journal rather than a generic AI-generated CRUD application.

The final visual decisions were based on the purpose of the application and my preferred design direction.

#### Commit

https://github.com/yysfall/SkyLog/commit/3683f5976c33872feabc365c67db897cec21e97d

---

# 2. Where the AI Got It Wrong

AI-generated code was not always correct.

There were multiple occasions where the generated code either caused an error, did not match my existing implementation, or required changes before it could be used.

These examples were important because I had to inspect the actual project, identify the problem, and make the final correction myself.

---

## Example 1 — Edit Page Displayed a Blank Page

**Date:** October 1, 2026  
**Tool:** ChatGPT

### What AI gave me

ChatGPT provided an implementation for the Edit Observation page and suggested adding a React Router route for it.

### What was wrong

After applying the changes, the Edit page displayed a blank page.

The generated implementation did not initially match the existing routing and component structure in my project.

The issue was not necessarily that the concept of an edit page was wrong. The problem was that the generated code assumed a project structure that did not completely match my existing implementation.

### What I did instead

I inspected the React application and checked the browser console.

I verified the route:

```jsx
<Route
  path="/observations/:id/edit"
  element={<EditObservation />}
/>
```

I also checked:

- The `EditObservation` import
- The route placement
- The component file
- The navigation link from the details page
- The API service functions

I corrected the implementation so the route and component matched the actual project.

### What I learned

I learned that adding a new React page requires checking all of the connections around it.

The route, component, imports, navigation links, and API service all have to agree with each other.

A generated code example may look complete but still fail when inserted into an existing project.

---

## Example 2 — `request is not defined`

**Date:** September 27, 2026  
**Tool:** ChatGPT

### What AI gave me

ChatGPT provided code related to the Update Observation functionality.

### What was wrong

After applying the generated code, the application produced a JavaScript runtime error similar to:

```text
ReferenceError: request is not defined
```

The generated implementation referred to a variable called `request`, but that variable did not exist in the component where the code was being used.

### What I did instead

I used the browser console to identify the runtime error.

I traced the error back to the component and inspected the variables used by the generated code.

I changed the implementation so it used the actual variables and functions that existed in my project.

I then tested the Update functionality again.

### What I learned

I learned that variable names from AI-generated examples cannot be assumed to exist in my project.

I also learned that reading the browser console is an important part of debugging because it provides the actual runtime error rather than just showing that something is not working.

---

## Example 3 — Save Observation Button Change Caused a Blank Page

**Date:** October 1, 2026  
**Tool:** ChatGPT

### What AI gave me

ChatGPT suggested improving the Save Observation button by adding a saving state and additional styling.

The suggested implementation used values such as:

```text
saving
submitLabel
```

### What was wrong

After applying the changes, the application displayed a blank page.

The new code referenced state or properties that were not properly defined in the existing component.

### What I did instead

I reviewed the complete form component instead of only looking at the button.

I made sure the required state was actually defined:

```js
const [saving, setSaving] = useState(false);
```

I also made sure that the component props and button references matched the actual implementation.

After fixing the component, I tested the form again.

### What I learned

I learned that even a small UI change can introduce a JavaScript runtime error.

I also learned that when using AI-generated code, I need to check whether every variable, prop, import, and function used by the suggestion actually exists in my project.

---

# 3. Who Wrote What

The project was developed with AI assistance, but I also wrote, implemented, adapted, tested, and debugged significant parts of the application.

The following sections identify the parts of the project that I can explain in my own words and understand how they work.

---

## 3.1 PostgreSQL Database Structure

**File:**

```text
database/schema.sql
```

### What I wrote

I created and adapted the database structure used by SkyLog.

The main table is:

```text
observations
```

It contains:

```text
id
object_name
object_type
date_observed
location
equipment
sky_conditions
notes
rating
created_at
```

### What it does

The database stores each skywatching observation as a record.

For example, a user can record:

```text
Object Name: Jupiter
Object Type: Planet
Date: 2026-09-20 21:00
Location: Backyard
Equipment: Telescope
Sky Conditions: Clear
Rating: 5
Notes: Visible cloud bands
```

### Why I built it this way

I chose the fields based on what a personal skywatching journal needs to record.

I also used constraints such as:

```sql
rating INTEGER CHECK (rating BETWEEN 1 AND 5)
```

so the database itself prevents ratings outside the intended range.

I understand that the database is the persistent storage layer of the application and that the Express backend communicates with it.

---

## 3.2 Express Observation API

**File:**

```text
server/routes/observations.js
```
### What I wrote

I implemented and adapted the Express routes that handle observations.

The API supports:

```text
GET    /api/observations
GET    /api/observations/:id
POST   /api/observations
PUT    /api/observations/:id
DELETE /api/observations/:id
```

### What it does

The API acts as the connection between the React frontend and PostgreSQL.

For example:

```text
React
  ↓
HTTP Request
  ↓
Express Route
  ↓
PostgreSQL
  ↓
Express Response
  ↓
React
```

### Why I built it this way

I used REST endpoints so that each operation has a clear purpose.

For example:

```text
GET    = retrieve
POST   = create
PUT    = update
DELETE = remove
```

This made it easier to connect the frontend to the database through the backend.

---

## 3.3 Parameterized SQL Queries

**File:**

```text
server/routes/observations.js
```
### What I wrote or substantially adapted

I worked with the SQL queries used by the Express routes.

For example:

```js
const result = await pool.query(
  "SELECT * FROM observations WHERE id = $1",
  [id]
);
```

### What it does

The `$1` is a parameter placeholder.

The value of `id` is passed separately:

```js
[id]
```

instead of directly inserting it into the SQL string.

### Why I used it

I used parameterized queries so user-provided values are kept separate from the SQL statement.

This is safer than constructing SQL by concatenating input into a query string.

### What I understand

I understand that:

```text
$1
```

represents the first parameter, and:

```js
[id]
```

provides the actual value for that parameter.

This pattern is used throughout the database queries where user-provided values are involved.

---

## 3.4 Observation Form

**File:**

```text
client/src/components/ObservationForm.jsx
```
### What I wrote or substantially adapted

I worked on the form used to create and edit observations.

The form collects:

```text
Object Name
Object Type
Date and Time Observed
Location
Equipment
Sky Conditions
Rating
Notes
```

### What it does

The form uses React state to store the values entered by the user.

For example:

```js
const [form, setForm] = useState({
  object_name: "",
  object_type: "",
  date_observed: "",
  location: "",
  equipment: "",
  sky_conditions: "",
  notes: "",
  rating: "",
});
```

When the user changes an input, the corresponding state value is updated.

### Validation

The form checks required values before submitting.

For example:

```js
if (!form.object_name.trim()) {
  setError("Object name is required.");
  return;
}
```

It also checks that the rating is within the allowed range.

### Why I built it this way

I wanted validation to happen before sending obviously invalid data to the backend.

The backend also performs validation, so the application has validation on both sides.

---

## 3.5 CRUD Workflow

**Files:**

```text
client/src/services/observations.js
server/routes/observations.js
client/src/pages/Observations.jsx
client/src/pages/ObservationDetails.jsx
client/src/pages/EditObservation.jsx
```
### What I implemented

I worked on the complete CRUD workflow:

```text
CREATE
  ↓
READ
  ↓
UPDATE
  ↓
DELETE
```

### Create

A user enters information into the observation form.

The frontend sends a:

```text
POST /api/observations
```

request.

The Express backend inserts the observation into PostgreSQL.

### Read

The frontend requests observations using:

```text
GET /api/observations
```

or retrieves an individual observation using:

```text
GET /api/observations/:id
```

### Update

The user can open the Edit Observation page.

The frontend sends:

```text
PUT /api/observations/:id
```

with the updated information.

### Delete

The user can delete an observation using:

```text
DELETE /api/observations/:id
```

### What I understand

I understand how the CRUD operations move through the application from the React interface, through Express, into PostgreSQL, and back to the interface.

---

## 3.6 React Routing

**File:**

```text
client/src/App.jsx
```

### What I wrote or adapted

I configured the React routes for the main pages of SkyLog.

The routes are:

```text
/                       → Dashboard
/observations           → Observation List
/observations/:id       → Observation Details
/observations/:id/edit  → Edit Observation
```

The application uses React Router.

For example:

```jsx
<Route path="/" element={<Dashboard />} />
<Route path="/observations" element={<Observations />} />
<Route
  path="/observations/:id"
  element={<ObservationDetails />}
/>
<Route
  path="/observations/:id/edit"
  element={<EditObservation />}
/>
```

### Why I built it this way

Each page has a specific responsibility.

The dashboard provides an overview, the observations page manages the list, the details page displays one record, and the edit page handles updating a record.

---

## 3.7 React State and Loading/Error Handling

**Files:**

```text
client/src/pages/Observations.jsx
client/src/pages/ObservationDetails.jsx
client/src/pages/EditObservation.jsx
client/src/components/ObservationForm.jsx
```
### What I wrote or adapted

I worked with React state to manage:

- Observation data
- Form values
- Loading states
- Saving states
- Error messages
- Selected observations

For example:

```js
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [error, setError] = useState("");
```

### Why

The application needs to tell the user what is happening.

For example:

```text
Loading observation...
Saving...
Failed to load observation.
```

This prevents the application from appearing unresponsive and provides feedback when an operation fails.

---

## 3.8 Edit Observation Page

**File:**

```text
client/src/pages/EditObservation.jsx
```

### What I wrote or substantially adapted

I worked on the page responsible for editing an existing observation.

The page:

1. Gets the observation ID from the URL.
2. Requests the observation from the API.
3. Displays its current information.
4. Allows the user to change the information.
5. Sends the updated data to the backend.
6. Navigates back to the details page.

The overall process is:

```text
/observations/:id/edit
        ↓
useParams()
        ↓
getObservationById(id)
        ↓
Display existing data
        ↓
User edits data
        ↓
updateObservation(id, data)
        ↓
PUT request
        ↓
Navigate to details
```

### Why I built it this way

The edit page allows the Update operation to be completed through the same application interface instead of requiring direct API requests.

---

# One AI-Assisted Piece of Code I Understand Best

## `client/src/services/observations.js`

One AI-assisted part of the project that I understand well is the `updateObservation()` function.

```js
export async function updateObservation(id, observation) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(observation),
  });

  return handleResponse(response);
}
```

### What the function does

The function sends the edited observation from the React frontend to the Express backend.

The first parameter is:

```js
id
```

This identifies which observation should be updated.

The second parameter is:

```js
observation
```

This contains the new values submitted by the user.

The request URL is:

```js
`${API_URL}/${id}`
```

which produces a URL such as:

```text
http://localhost:3000/api/observations/5
```

The request uses:

```js
method: "PUT"
```

because the operation modifies an existing observation.

The header:

```js
"Content-Type": "application/json"
```

tells the server that the request body contains JSON.

The observation object is converted to JSON using:

```js
JSON.stringify(observation)
```

The request is then sent to the Express backend.

### How the backend handles it

The Express route receives the request:

```text
PUT /api/observations/:id
```

It obtains the ID from the URL and the updated observation information from the request body.

It then performs a PostgreSQL update.

The backend returns the updated observation if the operation succeeds.

### Overall data flow

```text
User edits observation
        ↓
React form
        ↓
updateObservation()
        ↓
fetch()
        ↓
PUT /api/observations/:id
        ↓
Express route
        ↓
Validation
        ↓
PostgreSQL UPDATE
        ↓
Database response
        ↓
Express response
        ↓
React
        ↓
Observation Details
```

### Why I kept this code

I kept this structure because it separates API communication from the React user interface.

Instead of putting the complete HTTP request directly inside every component, the service file provides reusable functions.

For example, the edit page can simply call:

```js
await updateObservation(id, form);
```

This makes the component easier to read and keeps API-related code organized.

### What I understand

I understand:

1. Why the observation ID is passed into the function.
2. Why the request uses `PUT`.
3. Why the URL includes the ID.
4. Why the `Content-Type` header is needed.
5. Why `JSON.stringify()` is used.
6. How the request reaches Express.
7. How Express uses the ID to identify the PostgreSQL record.
8. How PostgreSQL updates the record.
9. How the response is returned to React.
10. How the frontend handles the result.

I can therefore explain and modify this code instead of treating it as code that I copied without understanding.

---

# Evidence of My Own Work

The following areas represent parts of the project that I implemented, adapted, tested, or debugged and can explain in my own words.

| Area | File(s) | What I contributed |
|---|---|---|
| Database structure | `database/schema.sql` | Designed and adapted the observation database structure |
| Backend routes | `server/routes/observations.js` | Implemented/adapted CRUD routes and validation |
| SQL queries | `server/routes/observations.js` | Worked with PostgreSQL queries and parameterized values |
| API service | `client/src/services/observations.js` | Connected React operations to the Express API |
| Observation form | `client/src/components/ObservationForm.jsx` | Implemented/adapted fields, state, validation, and submission |
| Edit page | `client/src/pages/EditObservation.jsx` | Implemented/adapted observation editing workflow |
| React routing | `client/src/App.jsx` | Configured the application routes |
| State handling | React page/components | Managed loading, saving, errors, and form state |
| UI styling | `client/src/styles/global.css` | Adapted and refined the SkyLog visual design |
| Debugging | Multiple files | Investigated runtime errors and corrected incompatible code |

---

# Commit Evidence

The assignment requires each AI-use entry and own-code section to have a commit associated with it.

I will replace the placeholders below with the actual GitHub commit links before submitting the project.

| Development Work | Commit |
|---|---|
| Project structure and initial planning | https://github.com/yysfall/SkyLog/commit/791990ee454b980d7a7ef587078a6987313a8dc2 |
| PostgreSQL schema | https://github.com/yysfall/SkyLog/commit/3e160d3ccf8e63f7c04d48bd18099b827cbbf569 |
| Express REST API | https://github.com/yysfall/SkyLog/commit/c909a9715e6c35c92a5751ffde5b1ecf540aa606 |
| React API service | https://github.com/yysfall/SkyLog/commit/c909a9715e6c35c92a5751ffde5b1ecf540aa606 |
| Observation form | https://github.com/yysfall/SkyLog/commit/c2b60341ce1590be84c51145f1b2552db1e142f6 |
| Update/Edit functionality | https://github.com/yysfall/SkyLog/commit/2868ee66ce8a5c315ef1bc0269fca65dd5ce107b |
| UI redesign | https://github.com/yysfall/SkyLog/commit/3683f5976c33872feabc365c67db897cec21e97d |
