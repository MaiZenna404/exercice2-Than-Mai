/**
 * Task Model to manage tasks in-memory
 * Provides methods to add, delete, and retrieve tasks.
 * Each task is an object with the following structure:
 * { id: string, title: string, description: string }
 */

class TaskModel {
    constructor() {
        this.tasks = []; // empty list by default
    }

    // Find a task by its ID
    findIdTask(id) {
        return this.tasks.find(task => task.id === id);
    }

    // Add a new task
    addTask(task) {
        this.tasks.push(task);
    }

    // Delete a task by its ID
    deleteTask(id) {
        const taskIdx = this.findIdTask(id);
        taskIdx ? this.tasks.splice(this.tasks.indexOf(taskIdx), 1) : false;
        return taskIdx ? true : false;
    }

    // fetch all tasks
    fetchAllTasks() {
        return this.tasks;
    }

}

export default new TaskModel();