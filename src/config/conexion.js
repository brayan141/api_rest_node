const mysql = require('mysql2');

/**
 * @description PROD
 */
// const config = {
//   host: "localhost",
//   user: "sotecemc_root",
//   password: "Recco2468*.",
//   database: "sotecemc_claro"
// };

/**
 * @description LOCAL
 */
const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "sotecemc_claro"
};

const pool = mysql.createPool(config);

module.exports = pool;