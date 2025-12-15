# Collaborative Task Manager

## Objective
1) Design Fullstack task management application
2) Implement core logic, ensure data integrity, handles realtime communication using JS/TS best practices (in both frontend and backend)


## Requirements

### User Authentication and authorization
- Secure Auth: User registration and login, hash the passwords.
- Session Management: Implement Session Handling, preferably JWT Tokens.
- User profiles: Allow users to view and update profile/name.

### Task Management (CRUD)
1) title (string, max 100 chars)
2) description (string, multi-line)
3) dueDate (date/time)
4) priority (Enum: Low, Medium, High, Urgent)
5) status (Enum: To Do, In Progress, Review, Completed)
6) creatorId (The ID of the user who created the task)
7) assignedToId (The ID of the registered user currently responsible for the task)

### Realtime Collaboration
- Live Updates: When a task's status, priority, or assignee is updated by any user, all other users currently viewing the task list or dashboard must see the change instantly.
- Assignment Notification: Send an instant, persistent in-app notification to a user when a task is assigned to them.

### User Dashboard & Data exploration
- Personal Views: A dedicated dashboard page showing:
    - Tasks assigned to the current user.
    - Tasks created by the current user.
    - Tasks that are Overdue (based on the dueDate).
- Filtering & Sorting: Implement filtering on the task list based on Status and Priority. Implement sorting by Due Date.

## TECH STACK
| Layer | Technology | Requirement |
| ----- | ----- | ----- |
| Frontend | React (via Vite or Next.js Pages Router) | Must use TypeScript and Tailwind CSS. |
| Data Fetching | SWR or React Query | Mandatory for managing server state and caching. |
| Backend |Node.js + Express (with TypeScript) | Must implement a clear service/repository pattern. |
| Database | PostgreSQL or MongoDB | Choose one and justify the selection in your README. |
| ORM/ODM | Prisma (Highly Recommended) or Mongoose | Use an industry-standard library for database interaction. |
| Real-Time | Socket.io |Mandatory for collaboration features. |
| Deployment | Vercel/Netlify (FE) + Render/Railway (BE/DB) | Mandatory live deployment.

