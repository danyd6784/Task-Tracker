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


