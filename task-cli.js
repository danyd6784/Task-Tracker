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
        const taskList = JSON.parse(fileData);
        console.log(taskList);
        return taskList
    } catch(err){
        if (err.code === "ENOENT"){
            console.log(`Error: ${taskFileName} does not exist. Please add a task to continue.`)
        }else{
            console.log(err.message)
        }
        return [];
    }
}

function isValidTaskId(id){
    let isValid = true
    //Task must be a positive integer greater than zero
    if (typeof id !== "number" || !Number.isInteger(id) || Number.parseInt(id) > 0){
        isValid = false
    }
    return isValid
}

function verifyTask(id, description){
    let isTaskValid = true;
    let taskList = readTaskFile();
    //Verify types
    try {
        let intID = Number.parseInt(id);
        console.log(intID)
        if (typeof description === "string" && intID !== NaN && typeof intID === "number"){
            let index = 0;
            let task = {};
            while (isTaskValid === true && index < taskList.length){
                task = taskList[index]
                if (task.id == intID){
                    isTaskValid = false
                }
                index++;
            }
        }else{
            throw new Error("Description must be a text string");
        }
    } catch (error) {
        console.log(error.message);
    }
    return isTaskValid;
}

async function addTask(id, description){
    const taskList = await readTaskFile();
    if (verifyTask(id, description)){
        try{
            let task = new Task(id, description);
            taskList.push(task)
            let add = await fs.writeFile(taskFileName, JSON.stringify(taskList));
            if (add !== undefined) { throw new Error(`Something went wring adding the file to ${taskFileName}`)}
        }catch(err){
            console.log(err.message)
        }
    };
}