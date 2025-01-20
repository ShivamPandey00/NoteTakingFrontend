# NoteTakingFrontend

This is the frontend for the NoteTaking application. It is built using React and Vite, and styled with Tailwind CSS and `shadcn` components.

## Table of Contents

- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Usage](#usage)

## Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/ShivamPandey00/NoteTakingFrontend.git
   cd NoteTakingFrontend
   ```
2. **Install dependencies:**
```
npm install
```

## Available Scripts
In the project directory, you can run:
```
npm run dev
```

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.


```
npm run build
```
Builds the app for production to the dist folder.
It correctly bundles React in production mode and optimizes the build for the best performance.


```
npm run preview
```
Serves the production build locally.


```
npm run lint
```
Runs ESLint to check for linting errors.

## Project Structure
```
NoteTakingFrontend/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── label.jsx
│   │   ├── Header.jsx
│   │   ├── LoginForm.jsx
│   │   ├── SignupForm.jsx
│   │   ├── NoteLists.jsx
│   │   ├── TextEditor.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── SearchResultsPage.jsx
│   ├── lib/
│   │   ├── utils.js
│   ├── index.css
│   ├── main.jsx
├── .env
├── .gitignore
├── package.json
├── README.md
├── vite.config.js
```
### Usage
#### Login
The login form is located in ``LoginForm.jsx``. It uses the `shadcn` components for styling and handles user authentication.

#### Signup
The signup form is located in `src/components/SignupForm.jsx`. It also uses the shadcn components for styling and handles user registration.

#### Notes
The notes list is displayed in `src/components/NoteLists.jsx`. Users can `view`, `create`, `edit`, and `delete` notes.

#### Categories
The categories page is located in `src/components/CategoryPage.jsx`. Users can view notes by category.

#### Profile
The profile page is located in `src/components/ProfilePage.jsx`. Users can view their profile information.

#### Search
The search results page is located in `src/components/SearchResultsPage.jsx`. Users can search for notes by title or category.


## Note: 
Replace the server URL with ``https://localhost:8080`` if running in local
