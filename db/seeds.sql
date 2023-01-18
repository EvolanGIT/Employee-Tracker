
INSERT INTO department (id, title)
VALUES  (001, 'SCARE FLOOR D'),
        (002, 'SCARE FLOOR F'),
        (003, 'MAIL ROOM');

INSERT INTO roles(id, title, salary, department_id)
VALUES  (001, 'Scare Assistant', 1500, 001),
        (002, 'Scare Lead', 2500, 001),
        (003, 'Clerk', 2000, 003),
        (004, 'Receptionist', 1250, 003),
        (005, 'Scare Supervisor', 4800, 002);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (001, 'Mike', 'Wazowski', 1, null),
        (002, 'James', 'Sullivan', 2, null),
        (003, 'Celia', 'Mai', 4, null),
        (004, 'Randall', 'Boggs', 2, 1),
        (005, 'Roz', 'Martinez', 3, 3),
        (006, 'Henry', 'Waternoose', 5, 2);