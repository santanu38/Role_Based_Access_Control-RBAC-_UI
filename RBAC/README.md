# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Role-Based Access Control (RBAC) Dashboard

## Overview
This project is a Role-Based Access Control (RBAC) Dashboard that allows administrators to manage users, roles, and permissions within a system. It includes features such as adding, editing, deleting users, and assigning roles and permissions based on different access levels.

The application is built using **React** for the frontend, with **Redux** for state management, and **TailwindCSS** for styling. It demonstrates how to handle access control by implementing role-based user management.

## Features
- **User Management**: Add, edit, and delete users.
- **Role Assignment**: Assign specific roles (e.g., Admin, User) to each user.
- **Permissions Control**: Control what each role can access within the application.
- **Responsive UI**: Fully responsive design using **TailwindCSS**.
- **Redux State Management**: Efficient state handling with Redux for user and role data.

## Technologies Used
- **React**: For building the user interface.
- **Redux**: For state management of users and roles.
- **TailwindCSS**: For utility-first CSS styling.
- **React Modal**: For modals to edit or add users.
- **JavaScript (ES6+)**: For functionality and logic.
- **Local Storage/Backend (optional)**: Store users' data (either locally or through API calls).

## Installation Instructions



Navigate to the project directory
 --cd rbac-dashboard
Install dependencies
 --npm install
Run the application
  ---npm run dev

Usage
Once the app is running, you can:

Add Users: Click on the "Add User" button to open a modal to add a new user with a specific role (Admin, User, etc.).
Edit Users: Click the "Edit" button next to a user's name to modify their details or role.
Delete Users: Click the "Delete" button next to a user to remove them from the system.
Role and Permission Management: Based on user roles, access control is enforced to allow different users to view or perform specific actions.

Project Structure

 /src
  /components
    - AddUserModal.jsx    # Modal for adding users
    - EditUserModal.jsx   # Modal for editing users
    - UserTable.jsx      # Displays the list of users
    -PermissionMatrix.jsx #Display role and their permissions
    -RoleManagement.jsx   #dispaly role of lists
  /features
    - userSlice.jsx       #Redux slice to mange roles
    -roleSlice.jsx       # Redux slice to manage users and roles
  /assets
    - images, styles     # Application assets like images and custom styles
  - App.js               # Main React component to set up routes and UI
  - index.js             # Entry point to render the app
