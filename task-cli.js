import Task from "./Task.mjs"
import TaskStorage from "./TaskStorage.mjs";

const taskFile = new TaskStorage(".\\tasks.json")

const allowedUtilityCommands = ["ADD", "UPDATE", "DELETE", "MARK-IN-PROGRESS", "MARK-DONE", "LIST"]
const args = process.argv.slice(2); //Get the string array of commandline arguments

try{
    //normalize input and compare against array of allowed values
    let normalizedInput = args[0].toUpperCase()

    if (allowedUtilityCommands.indexOf(normalizedInput) !== -1) {
        const command = normalizedInput
        let id = null;
        let description = null
        let task = null;
        
        switch (command) {
            case "ADD":
                try {
                    id = Number(args[1]);
                    description = args[2]
                    task = new Task(id, description);
                    await taskFile.addTask(task);
                } catch (error) {
                    console.log(error.message);
                }
                break;
            case "UPDATE":
                try {
                    id = Number(args[1]);
                    description = args[2]
                    await taskFile.updateTask(id, description);
                } catch (error) {
                    console.log(error.message);
                }
                break;
            case "DELETE":
                try {
                    id = Number(args[1]);
                    await taskFile.deleteTask(id);
                } catch (error) {
                    console.log(error.message);
                }
                break;
            case "MARK-IN-PROGRESS":
                break;
            case "MARK-DONE":
                break;
            case "LIST":
                console.table(await taskFile.getAllTasks())
                break
            default:
                break;
        }
    } else {
        throw new Error("Error: command parameter must be an allowed value of { Add | Update | Delete | Mark-in-progress | Mark-done | List }")
    }
} catch(err){
    console.warn(err.message);
}