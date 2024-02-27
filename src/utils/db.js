const mongoose=require('mongoose');
const { error } = require('winston');

const connectToDB = () => {
  const connectionString = process.env.CONNECTION_STRING;
  if (!connectionString) {
    console.error('CONNECTION_STRING is not defined');
    // 0 -> exit normally
    // not 0-> abnormally exit
    process.exit(1)
  }

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error('DB connection error:', err);
    process.exit(2);
  });
  db.on('connected', () => {
    console.log('DB connected');
  });
  db.on('disconnected', () => {
    console.log('DB disconnected');
  });

  return mongoose.connect(connectionString).catch(err => {
    console.error('Error connecting to DB:', err);
    process.exit(3);
  });
};

module.exports = connectToDB;