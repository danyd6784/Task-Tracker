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
                return new Task(task.id, task.description);
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
            tasks.push(task);
            await fs.writeFile(this.filepath, JSON.stringify(tasks, null, 2));
        } catch (error) {
            throw new Error(`Error: Failed to add task - ${error.message}`);
        }
    }
}