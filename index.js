const inquirer = require("inquirer");
const mysql = require("mysql");
const express = require("express");


const employeeArray= [];

function userInput(){
    inquirer
    .prompt({
        type: "input",
        message: "What is the Team Member being set up?",
        name: "askName",
    }
    ).then(function (response){
        employeeArray.push(response.teamName);
        statusEmployee();
    })
}

function statusEmployee(){
    inquirer
    .prompt (
        {
            type: "input",
            message: "What would you like to to with this Team Member?",
            name: "addName",
            choices: ["Add", "Remove", "Update"]
        }).then(function (response){
            if(response.addName === "Add"){
                addQuestions();
            } else if (response.addName === "Remove"){
                removeQuestions();
            } else {
                updateQuestions();
            }
        });
    
}

function addQuestions(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "Enter employees email address:",
            name: "addEmail"
        },
        {
            type: "input",
            message: "Enter employees salary/hourly rate:",
            name: "addSalary",
        },
        {
            type: "input",
            message: "Enter employees job title:",
            name: "addRole",
            choices: ["Sales Representative", "Sales Manager", "Engineer", "Software Engineer", "Quality Assurance"]
        },
        {
           type: "input",
           message: "Who is the new employees manager?", 
           name: "addManager",
           choices: ["Christopher Wallace", "Marshall Mathers", "Curtis Jackson"]
        },
        {
            type:"input",
            message: "Would you like to add, remove or update another employee?",
            name: "addContinue",
            choices: ["yes", "no"]
        }
    ]).then(function (respoonse){
        const update = new Update(response.addEmail, response.addSalary, response.addRole, response.addManager, response.addContinue);
        employeeArray.push(update);
        if (response.addContinie === "no"){
            afterPrompts();
        } else {
            statusEmployee();
        }
    })
}

function removeQuestions (){
    inquirer
    .prompt ([
        {
            type: "input",
            message: "Enter reason for termination:",
            name: "removeReason",
        },
        {
            type: "input",
            message: "Enter termination date for employee?",
            name: "removeDate",
        },
        {
            type:"input",
            message: "Would you like to add, remove, or update another employee?",
            name: "removeContinue",
            choices: ["yes", "no"]
        }
    ]).then(function(response){
        const remove = new Remove(response.removeReason, response.removeDate, response.removeContinue);
        employeeArray.push(remove);
        if (response.removeContinue === "no"){
            afterPrompts();
        } else {
            statusEmployee();
        }
    })
}

function updateQuestions (){
    inquirer
    .prompt ([
        {
            type: "input",
            message: "Enter the employees new role:",
            name: "updateRole",
            choices: ["VP Sales", "Sales Manager", "Software Engineer", "Quality Assurance"]
        },
        {
            type: "input",
            message: "Enter the employees new salary/hourly rate:",
            name: "updateSalary",
        },
        {
            type:"input",
            message: "Would you like to add, remove, or update another employee?",
            name: "updateContinue",
            choices: ["yes", "no"]
        }

    ]).then(function (response){
        const update = new Update(response.updateRole, response.updateSalary, response.updateContinue);
        emplpoyeeArray.push(update);
        if (response.updateContinue === "no"){
            afterPrompts();
        } else {
            statusEmployee();
        }
    });
}