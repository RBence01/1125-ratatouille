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
    database: 'webbolt'
}).promise();

app.get('/tablets', async (req, res) => {
    try {
        const temp = await db.query('SELECT * FROM tablets');
        const rows = temp[0];
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.get('/tablets/search', async (req, res) => {
    try {
        let { search, orderBy, limit, direction, page } = req.query;

        limit = parseInt(limit) || 10;
        direction = direction && direction.toUpperCase() === "ASC" ? "ASC" : "DESC";
        page = parseInt(page) || 1;
        if (search) search = "%" + search + "%";

        const validOrderByFields = ['name', 'brand', 'price', 'discounted_from', 'rating', 'review_count', 'operating_system', 'processor_clock_speed', 'processor_cores', 'display_size', 'display_resolution', 'storage_capacity'];
        if (orderBy && !validOrderByFields.includes(orderBy.toLowerCase())) {
            return res.status(400).json({ error: "Invalid orderBy value" });
        }

        const searchConditions = validOrderByFields.map(field => `${field} LIKE ?`).join(' OR ');
        const sql = `SELECT * FROM tablets` + (search ? ` WHERE ${searchConditions}` : '') +
            (orderBy ? ` ORDER BY ${orderBy} ${direction}` : '') +
            ` LIMIT ? OFFSET ?`;

        const params = [];
        if (search) for (let i = 0; i < validOrderByFields.length; i++) params.push(search);
        params.push(limit);
        params.push((page - 1) * limit);
        const data = (await db.query(sql, params))[0];
        
        const count = (await db.query('SELECT COUNT(*) FROM tablets'))[0][0]['COUNT(*)'];
        res.status(200).json({data, pages: Math.ceil(count / limit)});
    } catch (error) {
        console.error(`Error searching tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/tablets/order', async (req, res) => {
    try {
        let { orderBy, limit, direction } = req.query;
        if (!orderBy || !limit) {
            res.status(400).json({ error: "Invalid request" });
        }
        limit = parseInt(limit);
        if (isNaN(limit)) {
            res.status(400).json({ error: "Invalid request: limit must be a number" });
            return;
        }
        if (!direction) direction = "DESC";
        else if (direction != "DESC") direction = "ASC";
        if (!['name', 'brand', 'price', 'discounted_from', 'rating', 'review_count', 'operating_system', 'processor_clock_speed', 'processor_cores', 'display_size', 'display_resolution', 'storage_capacity'].includes(orderBy.toLowerCase())) {
            res.status(400).json({ error: "Invalid orderBy value" })
        }
        const temp = await db.query('SELECT * FROM tablets ORDER BY ' + orderBy + ' ' + direction + ' LIMIT ?', [limit]);
        const rows = temp[0];
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.get('/tablets/:id', async (req, res) => {
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


app.post('/tablets', async (req, res) => {
    try {
        const { name, brand, price, discounted_price: discounted_from, operating_system,
            display_resolution, display_size, processor_clock_speed,
            processor_cores, storage_capacity, image_src } = req.body;

        if (!name || !brand || !price || price < 0 || !discounted_from ||
            !operating_system || !display_resolution || !display_size ||
            !processor_clock_speed || !processor_cores || !storage_capacity ||
            !image_src) {
            res.status(400).send("Bad Request");
            return;
        }
        const temp = await db.query(
            'INSERT INTO tablets (brand, name, price, discounted_from, operating_system, display_resolution, display_size, processor_clock_speed, processor_cores, storage_capacity, image_src) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [brand, name, price, discounted_from, operating_system, display_resolution, display_size, processor_clock_speed, processor_cores, storage_capacity, image_src]
        );
        res.sendStatus(201);
    } catch (error) {
        console.error(`Error inserting phone ${error}`);
        res.status(500).send("Internal Server Error");
    }
})

app.delete('/tablets/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Bad Request");
            return;
        }
        const temp = await db.query('DELETE FROM tablets WHERE id = ?', [id]);
        res.sendStatus(204);
    } catch (error) {
        console.error(`Error deleting phone ${error}`);
        res.status(500).send("Internal Server Error");
    }
})




app.listen(3000);
