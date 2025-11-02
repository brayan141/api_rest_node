const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./src/routes/routes');
const pool = require('./src/config/conexion');

const PORT = process.env.PORT || 3000;

// SERVIDOR
const app = express();

// habilitar body-parser
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Habiliar los cors
app.use(cors());

// Rutas del app
app.use('/api/', routes());

app.listen(PORT, () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error conectando a la base de datos:', err);
      return;
    }
    console.log(`Aplicación iniciada completamente en el puerto ${PORT} y conectada a la base de datos.`);
    console.log('Link de conexión http://localhost:' + PORT + '/api/');
    console.log('URL de conexión a la base de datos: mysql://root:@localhost/sotecemc_claro');
    connection.release();
  });
});
