/* eslint-disable camelcase */
// Import the mongoose module
const mongoose = require('mongoose');

const Project = require('../api/models/project');
const Task = require('../api/models/task');
const User = require('../api/models/user');

const { username, password, dbName } = require('../config.json');
const URL = `mongodb+srv://${username}:${password}@clustermanagementapp.etxew68.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose
    .connect(URL)
    .then(() => console.log('Connected to Mongo'))
    .catch(() => console.log('Failed to Connect'));

const seedData = async () => {
    // clean Users collection
    await User.deleteMany({});

    // create some users
    const manager = await User.create({
        first: "Bee",
        last: "Benson",
        position: "manager",
        isActive: true,
    });

    const manager2 = await User.create({
        first: "Benson",
        last: "Dunwoody",
        position: "manager",
        isActive: true,
    });

    const user = await User.create({
        first: "Gumball",
        last: "Waterson",
        position: "developer",
        isActive: true,
    });

    const user1 = await User.create({
        first: "Anais",
        last: "Waterson",
        position: "developer",
        isActive: true,
    });

    // clean Projects collection
    await Project.deleteMany({});

    // create some projects with VALID relationships
    // associate a user or users to the project because they are not associated to any other project
    const project = await Project.create({
        name: "Homework 3",
        description: "Homework 3 for CS 5220",
        repository: "https://github.com/Jeropin/task-management-application.git",
        manager: manager,
        users: user, 
    });

    const project_two = await Project.create({
        name: "My Second Project",
        description: "My second Project",
        manager: manager2,
        users: user1,
    });

    // clean the Tasks collection
    await Task.deleteMany({});

    // create some Tasks with VALID relationships
    // associate a project to the task
    // associate a user to the task because that user is associated to the project
    const task_one = await Task.create({
        name: "Create Task",
        details: "Create task for My First Project",
        priority: "high",
        status: "assigned",
        timeline:{
            assigned: '2022-12-3',
            due: '2023-02-05',
            lastUpdated: '2023-12-06'
        },
        user: user,
        project: project,
    });

    const task_two = await Task.create({
        name: "My New Task",
        details: "This is a new task",
        priority: "low",
        status: "assigned",
        timeline:{
            assigned: '2022-12-3',
            due: '2023-02-05',
            lastUpdated: '2023-12-04'
        },
        user: user,
        project: project,
    });

    const task_three = await Task.create({
        name: "Commit",
        details: "Commitment",
        priority: "medium",
        status: "assigned",
        timeline:{
            assigned: '2022-11-11',
            due: '2023-02-05',
            lastUpdated: '2023-12-9'
        },
        user: user,
        project: project,
    });

    mongoose.connection.close();
};
seedData();

const runQueries = async () => {
    const user = await User.findById('638c0f03da64f3f44c82c411');
    console.log('USER');
    console.log(JSON.stringify(user, null, 2));

    const taskDetails = await Task.findById('638c0f03da64f3f44c82c41d')
        .populate('project', 'name description')
        .populate('user');

    console.log('TASK');
    console.log(taskDetails);
    console.log(JSON.stringify(taskDetails, null, 2));

    const projectDetail = await Project.findById('638c0f03da64f3f44c82c418')
        .populate('manager')
        .populate('tasks', 'name details status');

    console.log('PROJECT');
    console.log(JSON.stringify(projectDetail, null, 2));

    mongoose.connection.close();
};
// runQueries();
