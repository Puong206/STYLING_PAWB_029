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

function getContacts(req, res) {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query('SELECT * FROM contacts;', (error, results) => {
      connection.release();
      if (error) throw error;
      res.json(results);
    });
  });
}

function formContact(req, res) {
  res.render("addContact", {
    url: 'http://localhost:5050/',
  });
}

function saveContact(req, res) {
  let { name, email, phone, address } = req.body;
  console.log(name, email, phone, address); 
  if (name && email && phone && address) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?);`,
        [name, email, phone, address], 
        function (error, results) {
          if (error) {
            console.error(error);
            res.send('Gagal menyimpan data');
            return;
          }
          req.flash('color', 'success');
          req.flash('status', 'Yes..');
          req.flash('message', 'Data berhasil disimpan');
          res.redirect('/contact');
        }
      );
      connection.release();
    });
  } else {
    res.send('Data tidak lengkap');
  }
}

function editContact(req, res) {
  const { id } = req.params;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM contacts WHERE id = ?', [id], function (error, results) {
      if (error) throw error;
      if (results.length > 0) {
        res.render('editContact', {
          url: 'http://localhost:5050/',
          contact: results[0]
        });
      } else {
        res.redirect('/contact');
      }
    });
    connection.release();
  });
}

function updateContact(req, res) {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      'UPDATE contacts SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
      [name, email, phone, address, id],
      function (error, results) {
        if (error) throw error;
        res.redirect('/contact');
      }
    );
    connection.release();
  });
}

function deleteContact(req, res) {
  const { id } = req.params;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('DELETE FROM contacts WHERE id = ?', [id], function (error, results) {
      if (error) throw error;
      res.redirect('/contact');
    });
    connection.release();
  });
}

module.exports = {
  getContacts,
  formContact,
  saveContact,
  editContact,
  updateContact,
  deleteContact
};