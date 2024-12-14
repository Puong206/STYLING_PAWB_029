const pool = require('../configs/database'); // Import the pool directly

module.exports ={
    getContact(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM contacts;', function (error, results) {
                if (error) throw error;
                
                // Check if results contains any data
                if (results.length > 0) {
                    res.render('contact', {
                        url: 'http://localhost:5050/',
                        contacts: results // Pass the contacts data to the view
                    });
                } else {
                    res.render('contact', {
                        url: 'http://localhost:5050/',
                        contacts: [] // Pass an empty array if no data
                    });
                }
            });
            connection.release();
        });
    },
    formContact(req,res){
        res.render("addContact",{
            url : 'http://localhost:5050/',
        });
    },
    saveContact(req, res) {
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
    },    
    editContact(req, res) {
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
    },
    updateContact(req, res) {
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
    },
    deleteContact(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('DELETE FROM contacts WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                res.redirect('/contact');
            });
            connection.release();
        });
    },
};

