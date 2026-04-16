//Define class for the tasks to set the shape of the objects that will be written to the JSON File
export default class Task{
    constructor(id, desc){
        //ID VALIDATION
        if (this.#isValidTaskId(id)){
            this.id = id;
        } else{
            throw new Error("Error:Task ID must be an integer value. Please enter an integer for the task id.");
        }

        //DESCRIPTION VALIDATION
        if (this.#isValidDescription(desc)){
            this.description = desc;
        } else{
            throw new Error("Error:Task description must be an non-empty string. Please enter an valid task description.");
        }
        this.status = "todo";
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    //Task should own it's own validation.
    #isValidTaskId(id){
        let isValid = true;
        //Task must be a positive integer greater than zero that is NOT undefined and not NaN
        if ((typeof id !== "number" || !Number.isInteger(id) || Number.parseInt(id) > 0) &&
            (id !== NaN && id !== undefined)){
            isValid = false;
        }
        return isValid;
    }

    #isValidDescription(description){
        let isValid = true;
        //description MUST be a non-empty string
        if (typeof description !== "string" || description.length < 1){
            isValid = false;
        }
        return isValid;
    }
}