const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'styling_029'
});

pool.on('error',(err)=> {
    console.error(err);
});

function getApp(req, res) {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query('SELECT * FROM contacts;', (error, results) => { // Updated table name
      connection.release();
      if (error) throw error;
      res.json(results);
    });
  });
}

function formApp(req, res) {
  res.render("addApp", {
    url: 'http://localhost:5050/',
  });
}

function saveApp(req, res) {
  let { name, description } = req.body;
  console.log(name, description); 
  if (name && description) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT INTO contacts (name, description) VALUES (?, ?);`, // Updated table name
        [name, description], 
        function (error, results) {
          if (error) {
            console.error(error);
            res.send('Gagal menyimpan data');
            return;
          }
          req.flash('color', 'success');
          req.flash('status', 'Yes..');
          req.flash('message', 'Data berhasil disimpan');
          res.redirect('/app');
        }
      );
      connection.release();
    });
  } else {
    res.send('Data tidak lengkap');
  }
}

function editApp(req, res) {
  const { id } = req.params;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM contacts WHERE id = ?', [id], function (error, results) { // Updated table name
      if (error) throw error;
      if (results.length > 0) {
        res.render('editApp', {
          url: 'http://localhost:5050/',
          app: results[0]
        });
      } else {
        res.redirect('/app');
      }
    });
    connection.release();
  });
}

function updateApp(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      'UPDATE contacts SET name = ?, description = ? WHERE id = ?', // Updated table name
      [name, description, id],
      function (error, results) {
        if (error) throw error;
        res.redirect('/app');
      }
    );
    connection.release();
  });
}

function deleteApp(req, res) {
  const { id } = req.params;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('DELETE FROM contacts WHERE id = ?', [id], function (error, results) { // Updated table name
      if (error) throw error;
      res.redirect('/app');
    });
    connection.release();
  });
}

module.exports = {
  getApp,
  formApp,
  saveApp,
  editApp,
  updateApp,
  deleteApp
};
