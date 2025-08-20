# Superhero Database Frontend

This is the frontend for a superhero database web application built with **React** and **TypeScript**. It allows users to perform CRUD operations on a superhero model, including creating, updating, and viewing superheroes, with support for image uploads and pagination. The frontend communicates with a Nest.js backend to manage data.

## Features

- **List Superheroes**: Displays a paginated list of superheroes (5 per page) with their nickname and one image each.
- **View Hero Details**: Shows detailed information about a superhero, including all associated images.
- **Create/Update Hero**: Allows creating or updating a superhero with fields for nickname, real name, origin description, superpowers, catchphrase, and multiple image uploads.
- **Delete Hero**: Removes a superhero from the database.
- **Routing**: Uses `react-router-dom` for client-side navigation.

## Tech Stack

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Adds static typing for better developer experience and type safety.
- **React Router**: Handles client-side routing (`HashRouter` for compatibility).
- **SCSS**.
- **Backend**: Communicates with a Nest.js API (see [Backend Repository](https://github.com/Reaffith/superhero_back)).


## Installation
# To ensure that project works corecrly install backend first

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Reaffith/superhero_front.git
   cd superhero_front
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   ```
   The app will run at `http://localhost:5173`.

## Usage

- **Home Page (`/`)**: Displays the `HeroesList` component with a paginated list of superheroes (5 per page).
- **Create Hero (`/create`)**: Opens a form to create a new superhero, allowing input of details and multiple image uploads.
- **Update Hero (`/update/:id`)**: Opens a form to edit an existing superhero, pre-filled with current data, with options to update fields, add new images, or delete existing images.
- **Hero Details (`/hero/:id`)**: Shows full details of a superhero, including all images.

## Backend

The frontend communicates with a **Nest.js** backend that manages the superhero database. The backend provides RESTful APIs for CRUD operations and handles image uploads using Multer with `MemoryStorage`. For details, see the backend repository:  
[**Superhero Database Backend**](https://github.com/Reaffith/superhero_back).
