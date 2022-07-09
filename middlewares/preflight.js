const preflight = (req, res, next) => {
  const { method } = req;
  if (method === 'OPTIONS') {
    const requestHeaders = req.headers['access-control-request-headers'];
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
};

module.exports = {
  preflight,
};
