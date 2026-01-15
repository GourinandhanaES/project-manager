# Project Management Dashboard

A responsive **Project Management Dashboard** built with **React** and **Tailwind CSS**.  
Supports projects, tasks, reminders, and dark/light mode with **localStorage** persistence.

---

## Features

- **Project Management**
  - Create, edit, and view projects
  - Fields: Name, Description, Start & End Dates, Manager, Assignees, Status, Priority
- **Task Management**
  - Add tasks to projects
  - Task fields: Name, Description, Assigned User, Status
  - Automatic completion percentage calculation
- **Reminder Management**
  - Add multiple reminders per project
  - Fields: Date & Description
  - Upcoming reminders highlighted
- **Dashboard & Sidebar**
  - Filters: All, Completed, Pending, On Hold, Near Deadline
  - Sidebar with company logo, project filters, and theme toggle
- **Dark/Light Mode**
  - Toggleable via sidebar
  - Preference saved in localStorage
- **Persistence**
  - All data stored in localStorage
- **Responsive UI**
  - Works on mobile, tablet, and desktop

---

## Technologies

- React, Tailwind CSS, React Router
- Context API for theme
- `uuid` for unique IDs
- Lucide-react icons
- Vite build tool

---

## Project Structure
 components : ProjectCard, ProjectModal, TaskList, ReminderList, Sidebar, ProgressBar
 pages : Dashboard, ProjectDetails
 context: ThemeContext (for dark mode)
 data: projectData.js (for dummy datas)
 utils: localStorage.js (for locally storing project details)
 App.jsx

## Installation

```bash
git clone https://github.com/your-username/project-manager.git
cd project-manager
npm install
npm run dev

