# Task-Tracker
A simple command line task manager built with Node.js that stores tasks in a local JSON file. Project specifications: https://roadmap.sh/projects/task-tracker


## Features
- Add new tasks
- View all tasks
- Persistent storage using a local JSON file

## Requirements
- Node.js v20+

## Installation 
There are no external dependencies for this project aside from the base node modules.

1. Clone the repository: \
    `git clone https://github.com/danyd6784/Task-Tracker.git`

2. Navigate into the project: \
    `cd Task-Tracker` 

## Usage
The keywords are case insensitive.

SYNTAX: \
`
node task-cli { ADD | LIST } {Task ID} {Task Description}
`

#### Add a Task
`
node task-cli add 1 "Get groceries from store"
`

#### List Tasks
`
node task-cli list
`

## Data Storage
Tasks are stored locally in a tasks.json file.
Each task has the following structure:

{\
&ensp; "id": 1,\
&ensp; "description": "Get groceries from store",\
&ensp; "status": "todo",\
&ensp; "createdAt": "2026-04-16T15:53:27.081Z",\
&ensp; "updatedAt": "2026-04-16T15:53:27.081Z"\
}

## Project Structure
.\
├── .gitignore\
├── LICENSE\
├── README.md\
├── task-cli.js\
├── Task.mjs\
├── TaskStorage.mjs\
└── package.json

## Notes 
This project was built to practice file-based persistance, modular design, and basic CLI-architecture in Node.js