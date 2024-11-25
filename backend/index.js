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
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
        const countResult = await db.query('SELECT COUNT(*) as total FROM tabletek');
        const total = countResult[0][0].total;
        const temp = await db.query('SELECT * FROM tabletek LIMIT ? OFFSET ?', [limit, offset]);
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
        const temp = await db.query('SELECT * FROM tablets WHERE id = ?', [id]);
        const row = temp[0][0];
        res.status(200).json(row);
    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/rats', async (req, res) => {
    try {
        let tabletData = [req.body.nev, req.body.ar, req.body.processzor_sebesseg, req.body.hattertar, req.body.felbontas];
        const [rows, fields] = await db.query('INSERT INTO tabletek (nev, ar, processzor_sebesseg, hattertar, felbontas) VALUES (?,?,?,?,?)', tabletData);
        res.redirect('http://localhost:5173/tabletek-lista');
    } 
    catch (error) {
        console.error(`Error inserting phone ${error}`);
        res.status(500).send("Internal Server Error");
    }
})

app.delete('/rats/:id', async (req, res) => {
    try {
        let ratId = parseInt(req.params.id);
        const [rows, fields] = await db.query('DELETE FROM tabletek WHERE id = ?', [tabletId]);
    } 
    catch (error) {
        console.error(`Error deleting phone ${error}`);
        res.status(500).send("Internal Server Error");
    }
})

app.listen(3000);
