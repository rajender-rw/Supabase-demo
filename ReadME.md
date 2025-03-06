# Supabase Backend Application

This application is a backend server built with Node.js, Express, and Supabase. It provides APIs for user management, authentication, and file uploads.

## Features

*   **User Management:**
    *   Retrieve a list of all users.
    *   Create new users.
*   **Authentication:** (Although the `authRoutes.js` file is not provided, the server is prepared to handle it).
    *   Secure user registration and login (implementation needed).
    *   JWT (JSON Web Token) based authentication.
*   **File Uploads:**
    *   Upload various file types (images, videos, PDFs, etc.) to Supabase storage.
    *   Retrieve public URLs for uploaded files.
*   **CORS Support:** Allows requests from different origins.
* **Environment variables:** uses `.env` file to store sensitive information.

## Technologies Used

*   **Node.js:** JavaScript runtime environment.
*   **Express:** Web framework for Node.js.
*   **Supabase:** Backend-as-a-Service (BaaS) platform.
*   **JWT (JSON Web Tokens):** For secure authentication.
*   **Multer:** Middleware for handling `multipart/form-data` (file uploads).
*   **Bcrypt:** For hashing passwords (implementation needed).
*   **CORS:** For enabling Cross-Origin Resource Sharing.
* **Uuid:** generate unique ids.
* **Dotenv:** Manage environment variables.

## Prerequisites

*   **Node.js:** Make sure you have Node.js installed on your system.
*   **Supabase Account:** You'll need a Supabase account and a project set up.
*   **Supabase Project:** Set up a Supabase project and a database with a `users` table.
* **Storage Bucket**: you will need to create a bucket on your supabase project called `uploads`.

## Setup and Installation

1.  **Clone the Repository:**

    ```bash
    git clone <repository_url>
    cd supabase
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**

    *   Create a `.env` file in the root directory of the project.
    *   Add the following environment variables, replacing the placeholders with your actual values:

        ```ini
        SUPABASE_URL="your_supabase_project_url"
        SUPABASE_ANON_KEY="your_supabase_anon_key"
        PORT=3000
        JWT_SECRET="your_jwt_secret"
        ```

        *   **`SUPABASE_URL`:** Your Supabase project's URL.
        *   **`SUPABASE_ANON_KEY`:** Your Supabase project's `anon` public key.
        *   **`PORT`:** The port on which the server will run (default: 3000).
        *   **`JWT_SECRET`:** A strong secret key for JWT token generation.

4.  **Generate a Secure JWT Secret (Recommended):**

    *   Use the following command to generate a random, secure key:

        ```bash
        openssl rand -base64 32
        ```

    *   Copy the generated key and paste it as the value for `JWT_SECRET` in your `.env` file.

5. **Run the project**
    ```bash
    npm run dev
    ```

## Database Schema

The application expects a `users` table in your Supabase database with at least the following columns:

*   **id** (UUID, primary key)
*   **name** (text)
*   **email** (text, unique)
    If you implement auth, it needs password as well.

## API Endpoints

### User Management

*   **`GET /api/users`**
    *   **Description:** Retrieves all users from the database.
    *   **Response:**
        *   **200 OK:** An array of user objects.
        *   **400 Bad Request:** If there's an error fetching users.
*   **`POST /api/users`**
    *   **Description:** Creates a new user.
    *   **Request Body:**
        ```json
        {
          "name": "John Doe",
          "email": "john.doe@example.com"
        }
        ```
    *   **Response:**
        *   **200 OK:**  `{ message: "User added", data: [/* new user data */] }`
        *   **400 Bad Request:** If there's an error inserting the user.

### File Upload

*   **`POST /api/users/upload`**
    *   **Description:** Uploads a file to Supabase storage.
    *   **Request Body (form-data):**
        *   `file`: The file to upload.
    *   **Response:**
        *   **200 OK:**  `{ message: "File uploaded successfully", url: "public_file_url" }`
        *   **400 Bad Request:** If no file is provided.
        *   **500 Internal Server Error:** If there's an error during the upload.

### Auth Management (Not fully implemented)

* It will require more files, it's prepared to create them, but it needs to be implemented.
    *   **`/api/auth/login`**
    *   **`/api/auth/register`**
    *   **`/api/auth/logout`**
    *   **...**

## How to Generate a Secure JWT Secret?
### Generate a Random Secret Key Using OpenSSL
Run this command in your terminal:

```sh
openssl rand -base64 32
```
It will generate a random 32-character key, something like:

```ini
4nfk8dfJadf+Pd0sae+HksdfsaPoa9dsf923kfs9fdA=
```
Copy this and add it to your .env file:

```ini
JWT_SECRET=4nfk8dfJadf+Pd0sae+HksdfsaPoa9dsf923kfs9fdA=
```