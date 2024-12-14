const mysql = require('mysql');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: 'puong206', 
  database: 'Styling_029', 
});

module.exports = {
    profile(req, res) {
        const id = req.session.userid;
        
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting MySQL connection:', err);
                return res.status(500).send('Internal Server Error');
            }

            try {
                connection.query(
                    'SELECT * FROM users WHERE id = ?',
                    [id],
                    (error, results) => {
                        connection.release();
                        
                        if (error) {
                            console.error('Error executing MySQL query:', error);
                            return res.status(500).send('Internal Server Error');
                        }
                        
                        if (results.length === 0) {
                            return res.status(404).send('User not found');
                        }

                        res.render("profile", {
                            url: 'http://localhost:5050/',
                            userName: req.session.username,
                            nama: results[0].nama,
                            email: results[0].email
                        });
                    }
                );
            } catch (error) {
                connection.release();
                console.error('Unexpected error:', error);
                return res.status(500).send('Internal Server Error');
            }
        });
    }
};