use company_db;
insert into department (id,depName) VALUES (1, 'Transportation');
insert into department (id,depName) VALUES (2, 'Delivery');

insert into roles (id, title, salary, department_id) VALUES (1, 'Dispatcher', 62000.00, 1);
insert into roles (id, title, salary, department_id) VALUES (2, 'Driver',56000.00, 2);


insert into employee (id, first_name, last_name, role_id) VALUES (1, 'John', 'Johns', 1);
insert into employee (id, first_name, last_name, role_id) VALUES (2, 'Ronin', 'Saffire', 2);