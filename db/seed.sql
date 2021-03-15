USE department_db;

INSERT INTO departments (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
INSERT INTO role (title,salary)
VALUES 
    ('Sales Lead', 100000),
    ('Lead Engineer', 100000),
    ('Software Engineer', 100000),
    ('Account Manager', 100000),
    ('Salesman', 100000);

INSERT INTO employees (first_name,last_name,role_id,manager_id)
VALUES 
	('John','Doe',1,null),
    ('Billy','Boy',1,1),
    ('Bobby','Boy',1,1),
    ('Johnny','Doe',1,1),
    ('Johnny','Boy',2,null),
    ('Bob','Doe',2,2);
