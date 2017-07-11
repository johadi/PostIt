const handleError = (err, res) => {
  switch (err.code) {
    case 401:
      return res.status(401).send(err.message);
    case 404:
      return res.status(404).send(err.message);
    default:
      return res.status(400).send(err);
  }
};
const handleSuccess = (code, body, res) => {
  switch (code) {
    case 201:
      return res.status(201).send(body);
    default:
      return res.status(200).send(body);
  }
};
module.exports = { handleError, handleSuccess };
