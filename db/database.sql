-- Extension used for uuid generation

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE column_item(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    UNIQUE(name)
);

CREATE TABLE tasks(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    priority VARCHAR(20),
    column_item_id INTEGER REFERENCES column_item(id)
);

-- Standard columns that will not change

INSERT INTO column_item (name) VALUES ('TO DO');
INSERT INTO column_item (name) VALUES ('IN PROGRESS');
INSERT INTO column_item (name) VALUES ('IN REVIEW');
INSERT INTO column_item (name) VALUES ('COMPLETED');

-- mock task data below

-- INSERT INTO tasks (title, description, priority, column_item_id) VALUES ('First Task', 'You will need to do X on this first task', 'high', 1);
-- INSERT INTO tasks (title, description, priority, column_item_id) VALUES ('Second Task', 'You will need to do X on this second task', 'high', 1);
-- INSERT INTO tasks (title, description, priority, column_item_id) VALUES ('Third Task', 'You will need to do X on this third task', 'low', 1);
-- INSERT INTO tasks (title, description, priority, column_item_id) VALUES ('Fourth Task', 'You will need to do X on this fourth task', 'medium', 1);
-- INSERT INTO tasks (title, description, priority, column_item_id) VALUES ('Fifth Task', 'You will need to do X on this fifth task', 'medium', 1);
