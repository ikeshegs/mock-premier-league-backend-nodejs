const idCheck = (req, res, next) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      error: 'Invalid ID'
    });
  }
  return next();
}

module.exports = idCheck;