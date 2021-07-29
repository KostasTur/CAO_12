const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running on port ${PORT}...`));

const mysqlConfig = {
  host: 'db-mysql-kosto-do-user-9588869-0.b.db.ondigitalocean.com',
  user: 'doadmin',
  password: '',
  database: 'items',
  port: '25060',
};

// create table

const createTable = async () => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    let tableName = 'items';

    let createtable = await con.query(
      `CREATE TABLE ${tableName}(
        id INT AUTO_INCREMENT,
        title VARCHAR(255),
        PRIMARY KEY(id)
    )`,
      console.log('table created')
    );
    await con.end();
  } catch (e) {
    console.log(e);
  }
};

// app.get('/', async (req, res) => {
//   try {
//     // Bandom prisijungti prie duomenų bazės
//     const con = await mysql.createConnection(mysqlConfig);
//     console.log('Success: ' + con);

//     // Čia bus siunčiamas SQL į duomenų bazę naudojant con.execute('');

//     // Atsijungiam nuo duomenų bazės
//     await con.end();
//   } catch (e) {
//     console.log(e);
//   }
// });

// Routes
// GET
// -- get all items
app.get('/items', async (req, res) => {
  const con = await mysql.createConnection(mysqlConfig);
  let data = await con.query('SELECT * FROM items');
  res.json(data);
  await con.end();
});

// POST
// -- add item to table
app.post('/items', async (req, res) => {
  const con = await mysql.createConnection(mysqlConfig);
  let item = req.body;

  let query = await con.query('INSERT INTO items SET ?', item);
  console.log(`item added: `, item);
  res.send('item added');
  await con.end();
});

// -- get single car based on ID
app.get('/items/:id', async (req, res) => {
  const con = await mysql.createConnection(mysqlConfig);
  let carId = req.params.id;
  let data = await con.query(`SELECT * FROM cars WHERE id = ${carId}`);
  res.json(data);
  await con.end();
});

app.delete('/items/:id', (req, res) => {
  let carId = req.params.id;
  let query = con.query;
});
