const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "isjayaku",
  password: "2786344J",
  port: 5432,
  database: "jwttutorial"
});

module.exports = pool;