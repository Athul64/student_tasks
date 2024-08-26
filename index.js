const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB Atlas connection string
const mongoUri = 'mongodb+srv://athul:mongodb%40athul@cluster0.rupdk.mongodb.net/student_tasks?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas', error);
});


// Define Mongoose Schemas
const TaskSchema = new mongoose.Schema({
    courseId: { type: String, required: true },
    taskName: { type: String, required: true },
    dueDate: { type: Date, required: true },
    details: { type: String, required: true }
});

const Task = mongoose.model('Task', TaskSchema);

// Route to get tasks by courseId
app.get('/courses/:courseId/tasks', async (req, res) => {
    const { courseId } = req.params;

    try {
        const tasks = await Task.find({ courseId });
        if (tasks.length > 0) {
            res.json(tasks);
        } else {
            res.status(404).json({ message: 'No tasks found for this course.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks.', error });
    }
});

// Route to get all tasks
app.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks.', error });
    }
});

// Route to add multiple new tasks
app.post('/tasks', async (req, res) => {
    const tasks = req.body;

    if (!Array.isArray(tasks) || tasks.length === 0) {
        return res.status(400).json({ message: 'Request body must be a non-empty array of task objects.' });
    }

    for (let task of tasks) {
        if (!task.courseId || !task.taskName || !task.dueDate || !task.details) {
            return res.status(400).json({ message: 'Each task must contain courseId, taskName, dueDate, and details fields.' });
        }
    }

    try {
        const insertedTasks = await Task.insertMany(tasks);
        res.status(201).json(insertedTasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add tasks.', error });
    }
});

// Route to update a task by ID
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { courseId, taskName, dueDate, details } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { courseId, taskName, dueDate, details }, { new: true });
        if (updatedTask) {
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating task.', error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
