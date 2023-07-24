const mysql = require('mysql2');
const bcrypt =require ("bcryptjs")
const URL= process.env.DATABASE_URL

const pool = mysql.createPool(URL);
const connection = pool.promise();

connection
  .execute('SELECT 1')
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log(err);
  });

// Colis ===========================================================================================================
const getAllItems = () => {
    const sql = 'SELECT * FROM colis';
    return pool.promise().query(sql)
      .then(([rows, fields]) => {
        return rows;
      })
      .catch((err) => {
        throw err;
      });
  };
  
  const getOne = (data) => {
    const sql = 'SELECT * FROM colis WHERE id = ?';
    return pool.promise().query(sql, data)
    .then(([rows, fields]) => {
        return rows;
      })
      .catch((err) => {
        throw err;
      });
  };
  
  const updateOne = (data) => {
    const sql = 'UPDATE colis SET ? WHERE id = ?';
    return pool.promise().query(sql, data);
  };
  
  const addOne = (data) => {
    const sql = 'INSERT INTO colis SET ?';
    return pool.promise().query(sql, data);
  };
  
  const deleteOne = (id) => {
    const sql = `DELETE FROM colis WHERE id = ?`;
    return pool.promise().query(sql, [id]);
  };
  
// Utilisateurs ===========================================================================================================
const getAllUsers = () => {
  const sql = 'SELECT * FROM utilisateurs';
  return pool.promise().query(sql)
    .then(([rows, fields]) => {
      return rows;
    })
    .catch((err) => {
      throw err;
    });
};

const getOneUser = (data) => {
  const sql = 'SELECT * FROM utilisateurs WHERE id = ?';
  return pool.promise().query(sql, data)
  .then(([rows, fields]) => {
      return rows;
    })
    .catch((err) => {
      throw err;
    });
};

const updateUser = (data) => {
  const sql = 'UPDATE utilisateurs SET ? WHERE id = ?';
  return pool.promise().query(sql, data);
};

const register = (nom, telephone, email, password, MF, role, frais_de_livraison, frais_de_retour,addresse) => {
  const sql = `INSERT INTO utilisateurs (nom, telephone, email, password, MF, role, frais_de_livraison, frais_de_retour,addresse) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [nom, telephone, email, password, MF, role, frais_de_livraison, frais_de_retour,addresse];

  return pool.promise().query(sql, values);
};

const login = (email, password) => {
  const sql = `SELECT * FROM utilisateurs WHERE email = ?`;
  return pool.promise().query(sql, [email])
    .then(([rows, fields]) => {
      if (rows.length === 0) {
        return null; // User not found
      }

      const user = rows[0];
      return bcrypt.compare(password, user.password)
        .then((isValidPassword) => {
          if (isValidPassword) {
            // Password is correct, return the user object without the password
            delete user.password;
            return user;
          } else {
            return null; // Invalid password
          }
        });
    });
};

module.exports = { getAllItems, getOne, updateOne, addOne, deleteOne, getAllUsers, register, login, getOneUser, updateUser, connection};