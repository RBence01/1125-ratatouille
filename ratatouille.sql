CREATE TABLE chef_rats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    species VARCHAR(100),
    name VARCHAR(100),
    special_dish VARCHAR(255),
    height DECIMAL(5,2),
    salary DECIMAL(10,2),
    ranking INT UNIQUE,
    job VARCHAR(100),
    is_working BOOLEAN DEFAULT TRUE
);

INSERT INTO chef_rats (species, name, special_dish, height, salary, ranking, job, is_working) VALUES
('Rattus gourmetus', 'Remy', 'Ratatouille', 0.40, 50000.00, 1, 'Head Chef', TRUE),
('Rattus domestica', 'Squeaky', 'Cheese Platter', 0.35, 45000.00, 2, 'Sous Chef', TRUE),
('Rattus norvegicus', 'Whiskers', 'Spaghetti Bolognese', 0.38, 42000.00, 3, 'Line Cook', FALSE),
('Rattus rattus', 'Gus Gus', 'Pizza Margherita', 0.45, 43000.00, 4, 'Pizza Chef', TRUE),
('Rattus gourmetus', 'Truffle', 'Mushroom Risotto', 0.38, 47000.00, 5, 'Pastry Chef', TRUE),
('Rattus norvegicus', 'Sniffles', 'Beef Wellington', 0.42, 49000.00, 6, 'Grill Master', TRUE),
('Rattus rattus', 'Cheddar', 'Mac and Cheese', 0.39, 44000.00, 7, 'Prep Cook', TRUE),
('Rattus gourmetus', 'Tater', 'Potato Gnocchi', 0.36, 46000.00, 8, 'Sous Chef', FALSE),
('Rattus domestica', 'Nibble', 'Lobster Bisque', 0.37, 48000.00, 9, 'Executive Chef', TRUE),
('Rattus norvegicus', 'Pip', 'Steak Tartare', 0.41, 50000.00, 10, 'Head Sous Chef', TRUE);
