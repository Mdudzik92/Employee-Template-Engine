const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { listenerCount } = require("process");
let employeeList = []

function createManager(){
    return inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What's the manager's name?"
        },
        {
            type: "input",
            name: "managerId",
            message: "What's the manager's ID?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What's the manager's email address??"
        },
        {
            type: "input",
            name: "managerOffice",
            message: "What's the manager's office number?"
        }
    ])
    .then(function(answers) {
        console.log(answers)
        var newManager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffice)
        employeeList.push(newManager)
        createTeamMembers()
    })
}

function createTeamMembers(){
    inquirer.prompt({
        type: "list",
        name: "memberType",
        message: "Do you want an engineer or an intern?",
        choices: ["engineer", "intern", "exit"]
    })
    .then(function(answers) {
        console.log(answers.memberType)
        if(answers.memberType === "engineer"){
            createEngineer()
        }
        if(answers.memberType === "intern"){
            createIntern()
        }
        if(answers.memberType === "exit"){
            buildTeam()
        }
    })
}

function buildTeam() {
    fs.writeFileSync("index.html", render(employeeList), "utf-8")
}

function createEngineer() {
    return inquirer.prompt(
        [
            {
                type: "input",
                name: "engineerName",
                message: "What's the engineer's name?"
            },
            {
                type: "input",
                name: "engineerId",
                message: "What's the engineer's ID?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What's the engineer's email address??"
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What's the engineer's github?"
            }
        ]
    )
    .then(function(answers) {
        console.log(answers)
        var newEngineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
        employeeList.push(newEngineer)
        createTeamMembers()
    })
}

function createIntern() {
    return inquirer.prompt(
        [
            {
                type: "input",
                name: "internName",
                message: "What's the intern's name?"
            },
            {
                type: "input",
                name: "internId",
                message: "What's the intern's ID?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "What's the intern's email address??"
            },
            {
                type: "input",
                name: "internSchool",
                message: "What's the intern's school?"
            }
        ]
    )
    .then(function(answers) {
        console.log(answers)
        var newIntern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
        employeeList.push(newIntern)
        createTeamMembers()
    })
}

createManager()

// What's the manager's name?
// What's the manager's ID?
// What's the manager's email address?
// What's the manager's office number?
// create manager object based on those inputs

// same thing for employees, then engineers. based on what they respond you'll ask questions for either the engineer or the intern
// then go through the same process of creating those different objects
// last step is passing in the list of employees into their render function to create the HTML page.

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
