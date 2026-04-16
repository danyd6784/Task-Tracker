import Task from "./Task.mjs"
import TaskStorage from "./TaskStorage.mjs";

const taskFile = new TaskStorage(".\\tasks.json")

const allowedUtilityCommands = ["ADD", "UPDATE", "DELETE", "MARK-IN-PROGRESS", "MARK-DONE", "LIST"]
const args = process.argv.slice(2);

try{
    if (typeof args[0] === "string"){
        //normalize input and compare against array of allowed values
        let normalizedInput = args[0].toUpperCase()

        if (allowedUtilityCommands.indexOf(normalizedInput) !== -1) {
            const command = normalizedInput
            
            switch (command) {
                case "ADD":
                    let id = Number.parseInt(args[1]);
                    console.log(Number.parseInt(id) > 0)
                    let description = args[2]
                    let task = new Task(id, description);
                    taskFile.addTask(task);
                    break;
                case "UPDATE":
                    break;
                case "DELETE":
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
    } else {
        throw new Error("Error: Parameter must be a string in { Add | Update | Delete | Mark-in-progress | Mark-done | List }")
    }
} catch(err){
    console.warn(err.message);
}