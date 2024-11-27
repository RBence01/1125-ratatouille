import express from "express";
import cors from 'cors';
import mysql from 'mysql2';

const app = express();

app.use(cors())

app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chef_rats'
}).promise();

app.get('/rats', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || null;
    let orderby = req.query.orderby || null;
    if (orderby) orderby = orderby.toLowerCase();
    let order = req.query.order || null;
    if (order) order = order.toLowerCase();
    let searchterm = req.query.searchterm || null;
    let offset = null;
    if (limit) offset = (page - 1) * limit;
    //try {
        const validOrder = ['asc', 'desc'];
        if (order) if (!validOrder.includes(order)) order = null;

        const validOrderBy = ['id', 'species', 'name', 'special_dish', 'height', 'salary', 'ranking', 'job', 'is_working'];
        if(orderby) if(!validOrderBy.includes(orderby)) orderby = null;

        if (searchterm) searchterm = validOrderBy.map(e => e + ` LIKE '%${searchterm}%'`).join(' OR ');

        const countResult = await db.query('SELECT COUNT(*) as total FROM chef_rats' + ((searchterm) ? ` WHERE ${searchterm}` : ''));
        const total = countResult[0][0].total;
        const temp = await db.query('SELECT * FROM chef_rats ' + ((searchterm) ? `WHERE ${searchterm} ` : '') + ((orderby) ? `ORDER BY ${orderby} ` + (order ? `${order}` : '') : '') + ((limit) ? `LIMIT ${limit}` : '') + (offset && offset != 0 ? '  OFFSET ?' : ''));
        const rows = temp[0];
        const fields = temp[1];
        res.status(200).json({
            data: rows,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    /*} catch (error) {
        console.error(`Error retrieving rats ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }*/
})

app.get('/rats/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.sendStatus(500);
            return;
        }
        const temp = await db.query('SELECT * FROM chef_rats WHERE id = ?', [id]);
        const row = temp[0][0];
        res.status(200).json(row);
    } catch (error) {
        console.error(`Error retrieving chef_rats ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/rats', async (req, res) => {
    try {
        let ratData = [req.body.species, req.body.name, req.body.special_dish, req.body.height, req.body.salary, req.body.ranking, req.body.job, req.body.is_working];
        const [rows, fields] = await db.query('INSERT INTO chef_rats (species, name, special_dish, height, salary, ranking, job, is_working) VALUES (?,?,?,?,?,?,?,?)', ratData);
        res.redirect('http://localhost:5173/list');
    } 
    catch (error) {
        console.error(`Error inserting rats in the cage ${error}`);
        res.status(500).send("Internal Server Error");
    }
})

app.patch('/rats/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { species, name, special_dish, height, salary, ranking, job } = req.body;

        const [rows, fields] = await db.query(
            'UPDATE chef_rats SET ' + (species ? `species = ${species}, ` : '') + (name ? `name = ${name}, ` : '') + (special_dish ? `special_dish = ${special_dish}, ` : '') + (height ? `height = ${height}, ` : '') + (salary ? `salary = ${salary}, ` : '') + (ranking ? `ranking = ${ranking}, ` : '') + (job ? `job = ${job}, ` : '') +'WHERE id = ?',
            [id]
        );

        if (rows.affectedRows > 0) {
            res.redirect('http://localhost:5173/list');
        } else {
            res.status(404).send("Rat not found");
        }
    }
    catch (error) {
        console.error(`Error updating the rat record: ${error}`);
        res.status(500).send("Internal Server Error");
    }
});

app.delete('/rats/:id', async (req, res) => {
    try {
        let ratId = parseInt(req.params.id);
        const [rows, fields] = await db.query('DELETE FROM chef_rats WHERE id = ?', [ratId]);
    }
    catch (error) {
        console.error(`Error deleting rats ${error}`);
        res.status(500).send("Internal Server Error");
    }
})

app.listen(3000);
