// error message handler
const handleError = (err, res) => {
  switch (err.code) {
    case 401:
      return res.status(401).json({ status: 401, message: err.message });
    case 404:
      return res.status(404).json({ status: 404, message: err.message });
    default:
      return res.status(400).json({ status: 400, message: err.message });
  }
};
// success message handler
const handleSuccess = (code, body, res) => {
  switch (code) {
    case 201:
      return res.status(201).json({ status: 201, data: body });
    default:
      return res.status(200).json({ status: 200, data: body });
  }
};
module.exports = { handleError, handleSuccess };
