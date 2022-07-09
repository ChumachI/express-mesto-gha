const allowedCors = require('./allowedCors');

const corsOptions = {
  origin(origin, callback) {
    if (allowedCors.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = {
  corsOptions,
};
