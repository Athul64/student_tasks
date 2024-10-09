# Student Task Manager- Backend

### Objective  

A web application designed to help students manage their tasks for different courses. Built using Express.js, MongoDB, HTML, CSS, and JavaScript, this app allows students to easily organize and track their academic tasks.

##  Key Features
- **Task Management by Course**: Students can input tasks for different courses, specifying task names, due dates, and additional details.
- **Retrieve Tasks by Course**: A dedicated route allows users to retrieve all tasks for a specific course using its course ID.
- **User-Friendly Frontend**: The frontend interface allows students to input task details via forms and view their tasks organizationally.


## Technologies  Stack
- **Backend**: Express.js for server-side logic and routing.
- **Database**: MongoDB for storing course and task information.
- **Frontend**: HTML, CSS for UI design, and JavaScript for dynamic functionality.

## Project Setup
- **MongoDB Setup**:
  - Ensure MongoDB is installed and running locally or on a remote server.
  - Create a database named `student_tasks`.
  - Create collections of courses and tasks for storing course and task information, respectively.
    
## Frontend Implementation:

- HTML and CSS for creating forms to input course ID, task name, due date, and task details.
JavaScript functions to handle form submissions and send task data to the backend.
Backend Implementation (Express.js):

- Set up an Express.js server to handle routes and HTTP requests.
Implement the route `/courses/:courseId/tasks` to retrieve tasks for a specific course.
Connect to MongoDB and fetch tasks using the provided course ID.
Implement error handling to display messages if no course or tasks are found.


##  API  Route:
- Retrieves all tasks for the specified course ID. Returns a JSON response containing the task details for the given course.
``` bash
GET /
```

## Error Handling

- If the course or tasks are not found, meaningful error messages are returned to guide users.

# Setup Instructions:
1 *Clone the repository*.
```bash
git clone https://github.com/yourusername/students_tasks
```
2 *Install dependencies: npm install*.
```bash
npm i
```
3 *Start the server: npm start*.
```bash
npm run dev
```
4 *Open your browser* and go to http://locathost:5173 to see the application in action
5 *Configure MongoDB connection*.
6 *Use Postman to test API endpoints*.
  
# Deployed Version:
  Deployed Link: [students_tasks](https://athul64.github.io/student_tasks-frontend/)
