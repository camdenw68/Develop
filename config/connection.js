// Assuming you are using Sequelize to connect to the database

const { Sequelize } = require('sequelize');

// Parse the DATABASE_URL to get connection information
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  protocol: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false // For self-signed certificates
    }
  }
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
