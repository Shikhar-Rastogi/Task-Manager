# Task Management System

A full-stack task-management web application that enables teams to create projects, assign tasks, and track progress, with role-based access control. The application is designed to provide a structured workflow similar to modern project management tools.

---

## Overview

This project allows users to manage projects and tasks efficiently while maintaining a clear separation of responsibilities between administrators and members. It supports authentication, role-based authorization, task tracking, and a dashboard for insights.

---

## Features

### Authentication
- User signup and login
- Secure authentication using tokens
- Persistent login state

### Project Management
- Create and manage projects
- Project creator becomes Admin
- Add and remove team members
- View all assigned projects

### Task Management
- Create tasks with title, description, deadline, and priority
- Assign tasks to specific users
- Update task status:
  - To Do
  - In Progress
  - Done

### Dashboard
- Total tasks overview
- Tasks categorized by status
- Overdue tasks tracking
- Personalized view of assigned tasks

### Role-Based Access Control

**Admin**
- Create and manage projects
- Add or remove members
- Create and assign tasks
- Update any task

**Member**
- View assigned projects
- View assigned tasks
- Update status of assigned tasks only

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
