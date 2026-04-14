const fs = require("node:fs/promises");

//Define class for the tasks to set the shape of the objects that will be written to the JSON File
class Task{
    constructor(id, desc, taskStatus){
        this.id = id;
        this.description = desc;
        this.status = taskStatus;
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
            console.log(command);
        } else {
            throw new Error("Error: command parameter must be an allowed value of { Add | Update | Delete | Mark-in-progress | Mark-done | List }")
        }
    } else {
        throw new Error("Error: Parameter must be a string in { Add | Update | Delete | Mark-in-progress | Mark-done | List }")
    }
} catch(err){
    console.warn(err.message);
}
