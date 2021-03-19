USE department_db;

INSERT INTO departments (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
INSERT INTO role (title,salary,department_id)
VALUES 
    
    ('Sales Lead', 50000,1),
    ('Salesman', 45000,1),
    ('Lead Engineer', 75000,2),
    ('Software Engineer', 65000,2),
    ('Account Manager', 50000,3),
    ('Lawyer',200000,4)
    

INSERT INTO employees (first_name,last_name,role_id,manager_id)
VALUES 
	('Wilson','Ramirez',3,null),
    ('Lulu','Diaz',4,1),
    ('Johnny','Boy',1,null),
    ('Edward','Doe',2,3),
    ('James','Man',5,3),
    ('Bob','Doe',6,null);
