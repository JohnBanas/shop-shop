const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mernshopping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).
  catch(error => handleError(error));

mongoose.connection.on('error', err => {
  logError(err);
});

module.exports = mongoose.connection;
