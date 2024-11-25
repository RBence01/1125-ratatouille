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
    const orderby = req.query.groupby.toLowerCase() || null;
    const order = req.query.order.toLowerCase() || null;
    //const searchterm = req.query.searchterm.
    const offset = (page - 1) * limit;
    try {
        const validOrder = ['asc','desc'];
        if(order) if(!validOrder.includes(order))  order = null; 

        const validOrderBy = ['id', 'species', 'name', 'special_dish', 'height', 'salary', 'ranking', 'job'];
        if(orderby) if(!validOrderBy.includes(orderby)) orderby = null;

        const countResult = await db.query('SELECT COUNT(*) as total FROM tabletek');
        const total = countResult[0][0].total;
        const temp = await db.query('SELECT * FROM tabletek'+ (orderby) ? `ORDER BY ${orderby}` : '' + (order) ? `${order}` : '' + (limit) ? `LIMIT ${limit}` : '' +'  OFFSET ?', [offset]);
        const rows = temp[0];
        const fields = temp[1];
        res.status(200).json({
            data: rows,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error(`Error retrieving phones ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
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
        let tabletData = [req.body.species, req.body.name, req.body.special_dish, req.body.height, req.body.salary, req.body.ranking, req.body.job];
        const [rows, fields] = await db.query('INSERT INTO chef_rats (species, name, special_dish, height, salary, ranking, job) VALUES (?,?,?,?,?,?,?)', tabletData);
        res.redirect('http://localhost:5173/ratlista');
    } 
    catch (error) {
        console.error(`Error inserting phone ${error}`);
        res.status(500).send("Internal Server Error");
    }
})

app.delete('/rats/:id', async (req, res) => {
    try {
        let ratId = parseInt(req.params.id);
        const [rows, fields] = await db.query('DELETE FROM tabletek WHERE id = ?', [ratId]);
    } 
    catch (error) {
        console.error(`Error deleting phone ${error}`);
        res.status(500).send("Internal Server Error");
    }
})

app.listen(3000);