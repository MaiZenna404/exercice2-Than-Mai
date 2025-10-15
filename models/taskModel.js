/**
 * Task Model to manage tasks in-memory
 * Provides methods to add, delete, and retrieve tasks.
 * Each task is an object with the following structure:
 * { id: string, title: string, description: string }
 */

const tasks = []; // List task empty by default

const findIdTask = (id) => tasks.find(task => task.id === id);
const addTask = (task) => tasks.push(task);
const deleteTask = (id) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    // Remove task if id found
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        return true;
    }
    return false;
};

export default {
    tasks,
    findIdTask,
    addTask,
    deleteTask
};