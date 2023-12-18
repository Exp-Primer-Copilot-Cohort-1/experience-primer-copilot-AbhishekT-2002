// Create web server

// Import the express module
const express = require('express');

// Import the mysql module
const mysql = require('mysql');

// Create a router object
const router = express.Router();

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'comments'
});

// Get all comments
router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        else {
            console.log(`Connection ID: ${connection.threadId}`);
            connection.query('SELECT * FROM comments', (err, rows) => {
                if (err) throw err;
                else {
                    res.send(rows);
                }
            });
        }
    });
});

// Get a single comment
router.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        else {
            console.log(`Connection ID: ${connection.threadId}`);
            connection.query(`SELECT * FROM comments WHERE id = ${req.params.id}`, (err, rows) => {
                if (err) throw err;
                else {
                    res.send(rows);
                }
            });
        }
    });
});

// Add a comment
router.post('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        else {
            console.log(`Connection ID: ${connection.threadId}`);
            const params = req.body;
            connection.query('INSERT INTO comments SET ?', params, (err, rows) => {
                if (err) throw err;
                else {
                    res.send(`Comment with the name: ${params.name} has been added.`);
                }
            });
        }
    });
});

// Delete a comment
router.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        else {
            console.log(`Connection ID: ${connection.threadId}`);
            connection.query(`DELETE FROM comments WHERE id = ${req.params.id}`, (err, rows) => {
                if (err) throw err;
                else {
                    res.send(`Comment with the ID: ${req.params.id} has been deleted.`);
                }
            });
        }
    });
});

// Update a comment
router.put('/', (req, res) => {}