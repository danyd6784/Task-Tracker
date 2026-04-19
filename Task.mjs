//Define class for the tasks to set the shape of the objects that will be written to the JSON File
export default class Task{
    //Simulated enumerated data types 
    #statuses = {
        TODO: "todo",
        IN_PROGRESS: "in-progress",
        DONE: "done"
    }

    constructor(id, desc, taskStatus = this.#statuses.TODO, createdDate = new Date(), updatedDate = new Date()){
        //ID VALIDATION
        this.id = this.#validateTaskID(id);
      
        //DESCRIPTION VALIDATION
        this.description = this.#validateDescription(desc);

        this.status = taskStatus;
        this.createdAt = createdDate;
        this.updatedAt = updatedDate;
    }
    
    //Task should own it's own validation.
    #validateTaskID(taskID){
        const id = Number(taskID);

        //Test NaN and Undefined
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
        
        return id;
    }
    
    #validateDescription(taskDesc){
        //description MUST be a non-empty string
        if (taskDesc === undefined || taskDesc === null){
            throw new Error("Task description is required")
        }
        if (typeof taskDesc !== "string"){
            throw new Error("Task description mustmust be a string")
        }
        //Task description cannot be empty space
        if (taskDesc.trim().length === 0){
            throw new Error("Task description cannot be empty")
        }
        return taskDesc;
    }
    
    updateDescription(desc){
        this.description = this.#validateDescription(desc);
        this.updatedAt = new Date();
    }
    markTaskInProgress(){
        this.status = this.#statuses.IN_PROGRESS;
        this.updatedAt = new Date();
    }
}