require('dotenv').config();
const cron = require('node-cron');
const axios = require('axios');

const bcrypt =require ("bcryptjs")
const jwt =require ("jsonwebtoken")

const express = require('express');
const cors =require('cors');

const {getAllItems, getOne, updateOne, addOne, deleteOne, getAllUsers, register, login, getOneUser, updateUser, connection} = require("./Mysql/index.js")
const port = process.env.PORT;
const app = express();
app.use(express.json())

const db = require("./Mysql")
app.use(cors());

// Warm-up route
app.get('/warm-up', (req, res) => {
  const sql = 'SELECT 1';
  connection.execute(sql)
    .then(() => {
      res.status(200).send("Warm-up successful");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Warm-up failed");
    });
});
// End Warm-up route
// Warm-up scheduler: Schedule the warm-up task to run every hour ('0 * * * *') or every 3 minuts ('*/3 * * * *')
cron.schedule('*/2 * * * *', () => {
  axios.get(`${process.env.BASE_URL}/warm-up`)
    .then((response) => {
      console.log('Warm-up triggered successfully');
    })
    .catch((error) => {
      console.error('Error occurred during warm-up:', error);
    });
});
// End Warm-up scheduler

// Colis ===========================================================================================================
app.get('/colis', (req, res) => {
   getAllItems()
     .then((results) => {
       res.status(200).send(results);
     })
     .catch((err) => {
       res.status(500).send(err);
     });
 });
 
 app.get('/colis/:id', (req, res) => {
   getOne([req.params.id])
     .then((results) => {
       res.status(200).send(results);
     })
     .catch((err) => {
       res.status(500).send(err);
     });
 });

app.put('/colis/:id', (req, res) => {
   updateOne([req.body, req.params.id])
     .then((results) => {
       res.status(200).send("updated");
     })
     .catch((err) => {
       res.status(500).send(err);
     });
 });

app.post('/colis/add', (req, res) => {
   addOne(req.body)
     .then((results) => {
       res.status(200).send("colis ajouté avec succès");
     })
     .catch((err) => {
       res.status(500).send(err);
     });
 });

 app.delete('/colis/:id', (req, res) => {
  deleteOne([req.params.id])
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.delete('/colis/:id', (req, res) => {
  const id = req.params.id;

  deleteOne(id)
    .then((results) => {
      res.status(200).send("colis supprimé avec succès");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// Utilisateurs ===========================================================================================================
app.get('/utilisateurs', (req, res) => {
  getAllUsers()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get('/utilisateurs/:id', (req, res) => {
  getOneUser([req.params.id])
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put('/utilisateurs/:id', (req, res) => {
  updateUser([req.body, req.params.id])
    .then((results) => {
      res.status(200).send("User updated");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post('/utilisateurs/register', (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const {
    nom,
    telephone,
    email,
    MF,
    role,
    frais_de_livraison,
    frais_de_retour,
    addresse
  } = req.body;

  register(nom, telephone, email, hash, MF, role, frais_de_livraison, frais_de_retour, addresse)
    .then((results) => {
      res.status(200).send("utilisateur ajouté avec succès");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  // JWT secret key, you should keep this value in an environment variable for security
  const secretKey = 'delivery';

  // Set the token expiration to 24 hours (in seconds)
  const expiration = 24 * 60 * 60;

  return jwt.sign(payload, secretKey, { expiresIn: expiration });
};

app.post('/utilisateurs/login', (req, res) => {
  const { email, password } = req.body;

  login(email, password)
    .then((user) => {
      if (user) {
        // Generate JWT token
        const token = generateToken(user);

        res.status(200).json({ token, user});
      } else {
        res.status(401).send("Invalid credentials");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});


app.listen(port, ()=>{
console.log(`listening on ${port}`);
})