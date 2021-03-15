const inquirer = require('inquirer');
const cTable = require('console.table');
const sequelize = require('sequelize');
// const mysql = require('mysql2');
const connection = require('./config/connection');

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  init();
});


const init = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'Add Department',
          'Add Role',
          'Add Employee',
          'View Departments',
          'View Roles',
          'View Employees',
          'Update Employees',
          'Delete Department',
          'Delete Role',
          'Delete Employee',
          'View Department Budget',
        ],
      })
      .then((answer) => {
        switch (answer.action) {

            case 'Add Department':
                addDepartment();
                break;
            
            case 'Add Role':
                addRole();
                break;
  
            case 'Add Employee':
                addEmployee();
                break;
    
            case 'View Departments':
                viewDepartments();
                break;
    
            case 'View Roles':
                viewRoles();
                break;

            case 'View Employees':
                viewEmployees();
                break;

            case 'Update Employees':
                updateEmployees();
                break;

            case 'Delete Department':
                deleteDepartment();
                break;

            case 'Delete Role':
                deleteRole();
                break;
            
            case 'Delete Employee':
                deleteEmployee();
                break;

            case 'View Department Budget':
                viewDepartmentBudget();
                break;
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });
  };
  
{
  function addDepartment(){
    

  }
  function addRole(){

  }

  function addEmployee(){

  }

  function viewDepartments() {
    const query = `SELECT * FROM departments ORDER BY id`
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('DEPARTMENTS');
        console.log('\n');
        console.table(res);
        init();
    });
}

  function viewRoles(){
    const query = `SELECT * FROM role ORDER BY id`
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('ROLES');
        console.log('\n');
        console.table(res);
        init();
    });

  }

  function viewEmployees(){
    const query = `SELECT * FROM employees ORDER BY id`
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('EMPLOYEES');
        console.log('\n');
        console.table(res);
        init();
    });

  }

  function updateEmployees(){

  }

  function deleteDepartment(){

  }

  function deleteRole(){

  }

  function deleteEmployee(){

  }

  function viewDepartmentBudget(){
    
  }
}
