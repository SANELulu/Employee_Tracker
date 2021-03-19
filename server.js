const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./config/connection');

//initial connection to mysql used to initialize app
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  init();
});
// main menu inquierer 
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
// adds deparment to mysql db
function addDepartment() {
  const query = `SELECT name, id as value FROM departments`
  connection.query(query, (err, departments) => {
    if (err) throw err;
    inquirer
      .prompt([{
        type: 'input',
        message: 'Name of new department?',
        name: 'department'
      }]).then((answer) => {

        console.log(answer)
        let query = `INSERT INTO departments (name)
            VALUES ('${answer.department}');`
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.log('NEW DEPARTMENT ADDED');
          console.log('\n');
          init();
        });
      });
  });
};
// adds role to mysql db 
function addRole() {
  const query = `SELECT name, id as value FROM departments ORDER BY id`
  connection.query(query, (err, departments) => {
    if (err) throw err;
    inquirer
      .prompt([{
        type: 'input',
        message: 'Name of new role?',
        name: 'title'
      },
      {
        type: 'input',
        message: 'What salary does this role have?',
        name: 'salary',
        validate: (value) => { if (value) { return true } else { return "Input a value" } },
      },
      {
        type: 'list',
        message: 'What Department does thie new Role belong to?',
        choices: [...departments],
        name: 'department'
      }
      ]).then((answer) => {

        console.log(answer)
        let query = `INSERT INTO 
                  role (title, salary, department_id )
  VALUES 
    ('${answer.title}','${answer.salary}','${answer.department}');`
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.log('NEW ROLE ADDED');
          console.log('\n');
          init();
        });
      });
  });
};
//adds employee to mysql db
function addEmployee() {
  const query = `SELECT name, id as value FROM departments ORDER BY id`
  connection.query(query, (err, departments) => {
    if (err) throw err;

    const query = `SELECT title as name, id as value FROM role ORDER BY id`
    connection.query(query, (err, roles) => {
      if (err) throw err;

      const query = `SELECT first_name as name, id as value FROM employees WHERE role_id IS NULL`
      connection.query(query, (err, employees) => {
        if (err) throw err;

        inquirer
          .prompt([{
            type: 'input',
            message: 'Employee first name?',
            name: 'first_name'
          },
          {
            type: 'input',
            message: 'Employee last name?',
            name: 'last_name'
          },
          {
            type: 'list',
            name: 'role_id',
            message: 'What Role does this Employee have?',
            choices: roles
          },
          {
            type: 'list',
            name: 'manager_id',
            messages: 'Does this employee have a manager?',
            choices: [...employees, { name: 'none', value: null }]

          }]).then((answer) => {
            console.log(answer)

            let query = `INSERT INTO 
                        employees (first_name, last_name, role_id , manager_id)
        VALUES 
          ('${answer.first_name}','${answer.last_name}','${answer.role_id}',${answer.manager_id});`
            connection.query(query, (err, res) => {
              if (err) throw err;
              console.log('NEW EMPLOYEE ADDED');
              console.log('\n');
              init();
            });
          });
      });
    });
  });
}
// shows all departments
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
// shows all roles
function viewRoles() {
  const query = `SELECT * FROM role ORDER BY id`
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('ROLES');
    console.log('\n');
    console.table(res);
    init();
  });

}
// shows all employees
function viewEmployees() {
  const query = `SELECT * FROM employees ORDER BY id`
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('EMPLOYEES');
    console.log('\n');
    console.table(res);
    init();
  });

}
// updates current employee role and manager
function updateEmployees() {

  const query = `SELECT title as name, id as value FROM role ORDER BY id`
  connection.query(query, (err, roles) => {
    if (err) throw err;

    const query = `SELECT first_name as name, id as value FROM employees`
    connection.query(query, (err, employees) => {


      if (err) throw err;
      console.table(employees);

      inquirer
        .prompt([{
          type: 'list',
          message: 'Update what employee?',
          choices: [...employees],
          name: 'employee'
        },
        {
          type: 'list',
          message: 'Update employee to what role?',
          choices: [...roles],
          name: 'role'
        }
        ]).then((answer) => {

          let query = `UPDATE employees SET role_id = ${answer.role} WHERE id = ${answer.employee}`
          connection.query(query, (err, res) => {
            if (err) throw err;
            console.log('EMPLOYEE UPDATED');
            console.log('\n');
            init();
          });
        });
    });
  });
}
// deletes department from mysql db 
function deleteDepartment() {
  const query = `SELECT name, id as value FROM departments`
  connection.query(query, (err, departments) => {

    if (err) throw err;
    console.table(departments);

    inquirer
      .prompt([{
        type: 'list',
        message: 'Delete what department?',
        choices: [...departments],
        name: 'department'

      }]).then((answer) => {

        console.log(answer);
        let query = `DELETE FROM  departments WHERE id=${answer.department}`
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.log('DEPARTMENT DELETED');
          console.log('\n');
          init();
        });

      });
  });
}
// deletes role from mysql db 
function deleteRole() {

  const query = `SELECT title as name, id as value FROM role`
  connection.query(query, (err, role) => {
    if (err) throw err;
    console.table(role);
    inquirer
      .prompt([{
        type: 'list',
        message: 'Delete what role?',
        choices: [...role],
        name: 'role'
      }]).then((answer) => {

        console.log(answer);
        let query = `DELETE FROM  role WHERE id=${answer.role}`
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.log('ROLE DELETED');
          console.log('\n');
          init();
        });
      });
  });
}
// deletes emmployee from mysql db 
function deleteEmployee() {

  const query = `SELECT first_name as name, id as value FROM employees`
  connection.query(query, (err, employees) => {

    if (err) throw err;
    console.table(employees);

    inquirer
      .prompt([{
        type: 'list',
        message: 'Delete what employee?',
        choices: [...employees],
        name: 'employee'

      }]).then((answer) => {

        console.log(answer);
        let query = `DELETE FROM  employees WHERE id=${answer.employee}`
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.log('EMPLOYEE DELETED');
          console.log('\n');
          init();
        });

      });
  });

}
// shows sum of salaries in each department 
function viewDepartmentBudget() {

  const query = `SELECT departments.name, SUM(role.salary) as budget
    FROM role 
    INNER JOIN departments
    ON role.department_id = departments.id
    GROUP BY department_id;`
  connection.query(query, (err, res) => {

    if (err) throw err;
    console.table(res);
    init();
  });

}

