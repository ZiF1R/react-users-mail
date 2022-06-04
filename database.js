const { Pool } = require('pg');

const pool = new Pool({
  user: "iotrvwwoeytrfb",
  password: "f093e9a8c260653de3ffb483cfd77b7dfceeaa6944efc0fce30580a14f5969c4",
  database: "dajr6vbbnn3ouq",
  host: "ec2-63-32-248-14.eu-west-1.compute.amazonaws.com",
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;