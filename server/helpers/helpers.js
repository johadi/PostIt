const handleError = (err, res) => {
  switch (err.code) {
    case 401:
      return res.status(401).json(err.message);
    case 404:
      return res.status(404).json(err.message);
    default:
      return res.status(400).json(err);
  }
};
const handleSuccess = (code, body, res) => {
  switch (code) {
    case 201:
      return res.status(201).json(body);
    default:
      return res.status(200).json(body);
  }
};
module.exports = { handleError, handleSuccess };
