const fs = require("node:fs/promises");
const taskFileName = ".\\tasks.json"

//Define class for the tasks to set the shape of the objects that will be written to the JSON File
class Task{
    constructor(id, desc){
        this.id = id;
        this.description = desc;
        this.status = "todo";
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

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
                    addTask(args[1], args[2]);
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

async function readTaskFile(){
    try{
        const fileData = await fs.readFile(taskFileName, "utf-8");
        console.log(fileData);
    } catch(err){
        if (err.code === "ENOENT"){
            console.log(`Error: ${taskFileName} does not exist. Please add a task to continue.`)
            return undefined;
        }else{
            console.log(err.message)
        }
    }
}

function verifyTask(id, description){
    let exists = false;
    //Verify types
    if ((typeof id === "number" && Number.isInteger(id)) &&
        typeof description === "string"){
            const tasks = readTaskFile();
            if (tasks !== undefined){
                let index = 0;
                while (exists === false){
                    if (tasks[index].id === id){
                        exists = true
                    }
                }
            }
    }
    return !exists
}

async function addTask(id, description){
    if (verifyTask(id, description)){
        try{
            let task = new Task(id, description);
            let add = await fs.appendFile(taskFileName, JSON.stringify(task));
            if (add !== undefined) { throw new Error(`Something went wring adding the file to ${taskFileName}`)}
        }catch(err){
            console.log(err.message)
        }
    };
}