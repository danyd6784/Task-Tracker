import fs from "node:fs/promises";
import Task from "./Task.mjs";

export default class TaskStorage {
    constructor(filename){
        this.filepath = filename
    }

    async getAllTasks() {
        try{
            const data = await fs.readFile(this.filepath, "utf-8");
            const taskList = JSON.parse(data)
            return taskList.map((task) => {
                return new Task(task.id, task.description, task.createdAt, task.updatedAt);
            })
        } catch(err){
            //Handle when the file doesn't exist
            if (err.code === "ENOENT") {
                return [];
            }

            //Handle when the JSON file is corrupted
            if (err instanceof SyntaxError){
                throw new Error(`Error: Invalid JSON format in ${this.filepath} file`);
            }

            //If all else fails throw the error to handle in the main business logic.
            throw err
        }
    }

    async addTask(task) {
        try {
            //add task to array
            const tasks = await this.getAllTasks();

            //Ensure that the task to be added doesn't have a duplicate id
            for (let index = 0; index < tasks.length; index++){
                if (tasks[index].id === task.id){
                    throw new Error("Task is already a part of the list");
                }
            }
            tasks.push(task);
            await fs.writeFile(this.filepath, JSON.stringify(tasks, null, 2));
        } catch (error) {
            throw new Error(`Error: Failed to add task - ${error.message}`);
        }
    }

    async updateTask(taskID, updatedDescription){
        try{
            const tasks = await this.getAllTasks();
            let taskFound = false
            let index = 0;
            while (!taskFound && index < tasks.length){
                if (tasks[index].id === taskID){
                    taskFound = true;
                    tasks[index].updateDescription(updatedDescription);
                }
                index++;
            }
            if (!taskFound){
                throw new Error("Task not found");
            }
            await fs.writeFile(this.filepath, JSON.stringify(tasks, null, 2));
        }catch(error){
            throw new Error(`Error: Failed to update task ${taskID}: ${error.message}`);
        }
    }

    async deleteTask(taskID){
        try{
            //Validate the taskID
            //Test NaN and Undefined
            const id = taskID
            if (isNaN(id) || id === undefined || id === null){
                throw new Error("Task ID must be a number");
            }
            //Test for integer
            if (!Number.isInteger(id)){
                throw new Error("Task ID must be an integer");
            }
            //Test for positive integer
            if (id < 1){
                throw new Error("Task ID must be a positive integer");
            }

            const tasks = await this.getAllTasks();
            let taskFound = false
            let index = 0;
            while (!taskFound && index < tasks.length){
                if (tasks[index].id === id){
                    taskFound = true;
                    tasks.splice(index, 1);
                }
                index++;
            }
            if (!taskFound){
                throw new Error("Task not found");
            }
            await fs.writeFile(this.filepath, JSON.stringify(tasks, null, 2));
        }catch(error){
            throw new Error(`Error: Failed to delete task ${taskID}: ${error.message}`);
        }
    }
}